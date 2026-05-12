import type { Handle } from "@sveltejs/kit";
import { building } from "$app/environment";
import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { redirect } from "@sveltejs/kit";

const handleBetterAuth: Handle = async ({ event, resolve }) => {
  const session = await auth.api.getSession({ headers: event.request.headers });

  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
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
