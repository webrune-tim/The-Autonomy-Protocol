import { redirect } from "@sveltejs/kit";
import type { Handle } from "@sveltejs/kit/hooks";
import { building } from "$app/env";
import { auth } from "#lib/server/auth.js";

const handleBetterAuth: Handle = async ({ event, resolve }) => {
  // Skip auth checks during build/prerendering
  if (building) return resolve(event);

  try {
    // Populate locals.user and locals.session for use in load functions and actions
    const session = await auth.api.getSession({ headers: event.request.headers });

    if (session) {
      event.locals.session = session.session;
      event.locals.user = session.user;
    } else {
      event.locals.session = null;
      event.locals.user = null;
    }
  } catch (err) {
    console.error("Auth session retrieval error:", err);
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
