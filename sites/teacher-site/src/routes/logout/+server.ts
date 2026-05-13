import { auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  await auth.api.signOut({ headers: request.headers });
  // 303 See Other is the correct status code for redirecting after a POST
  throw redirect(303, "/");
};
