// If user is logged in, log them out

import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/auth";
import { APIError } from "better-auth/api";

export const load: PageServerLoad = (event) => {
  const redirectTo = event.url.searchParams.get("redirectTo") || "/dashboard";
  if (event.locals.user) {
    return redirect(302, redirectTo);
  }
  return {};
};
