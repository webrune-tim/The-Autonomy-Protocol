import { redirect, type Handle } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { session as sessionTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

const handleBetterAuth: Handle = async ({ event, resolve }) => {
  // Populate locals.user and locals.session for use in load functions and actions
  const session = await auth.api.getSession({ headers: event.request.headers });

  if (session) {
    // FRESHNESS CHECK: Verify the session still exists in the DB and get the latest user data
    const activeSession = await db.query.session.findFirst({
      where: eq(sessionTable.id, session.session.id),
      with: {
        user: true,
      },
    });

    if (activeSession) {
      event.locals.session = activeSession;
      event.locals.user = activeSession.user;
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
    redirect(303, "/login");
  }
  // --- END PROTECTION LOGIC ---

  return resolve(event);
};

export const handle: Handle = handleBetterAuth;
