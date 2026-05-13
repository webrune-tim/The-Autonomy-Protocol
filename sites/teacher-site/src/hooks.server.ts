import type { Handle } from "@sveltejs/kit";
import { building } from "$app/environment";
import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { session as sessionTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

const handleBetterAuth: Handle = async ({ event, resolve }) => {
  // Populate locals.user and locals.session for use in load functions and actions
  const session = await auth.api.getSession({ headers: event.request.headers });

  if (session) {
    // FRESHNESS CHECK: Verify the session still exists in Turso
    const activeSession = await db
      .select()
      .from(sessionTable)
      .where(eq(sessionTable.id, session.session.id))
      .get();

    if (activeSession) {
      event.locals.session = session.session;
      event.locals.user = session.user;
    } else {
      event.locals.session = null;
      event.locals.user = null;
    }
  } else {
    event.locals.session = null;
    event.locals.user = null;
  }

  // --- START PROTECTION LOGIC ---
  const isProtectedRoute = event.route.id?.includes("(protected)");

  if (isProtectedRoute && !event.locals.session) {
    throw redirect(303, "/login");
  }
  // --- END PROTECTION LOGIC ---

  return resolve(event);
};

export const handle: Handle = handleBetterAuth;
