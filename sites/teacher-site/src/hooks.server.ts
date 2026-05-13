import type { Handle } from "@sveltejs/kit";
import { building } from "$app/environment";
import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { session as sessionTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

const handleBetterAuth: Handle = async ({ event, resolve }) => {
  const session = await auth.api.getSession({ headers: event.request.headers });

  if (session) {
    // FRESHNESS CHECK: Verify the session still exists in Turso
    // This catches invalidations made by SQL Triggers or other admins instantly
    const activeSession = await db
      .select()
      .from(sessionTable)
      .where(eq(sessionTable.id, session.session.id))
      .get();

    if (activeSession) {
      event.locals.session = session.session;
      event.locals.user = session.user;
    } else {
      // Session was revoked! Clear the state
      event.locals.session = null;
      event.locals.user = null;
    }
  }

  // --- START PROTECTION LOGIC ---

  // Define which paths require a session
  // You can check by prefix (e.g., /dashboard) or by route ID
  const isProtectedRoute = event.route.id?.includes("(protected)");

  if (isProtectedRoute && !session) {
    throw redirect(303, "/login");
  }

  // --- END PROTECTION LOGIC ---

  return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = handleBetterAuth;
