import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (event) => {
  const redirectTo = event.url.searchParams.get("redirectTo") || "/";
  if (event.locals.user) {
    return redirect(302, redirectTo);
  }
  return {};
};
