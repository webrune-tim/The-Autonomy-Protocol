import { auth } from "#lib/server/auth.js";
import { redirect } from "@sveltejs/kit";
import { db } from "#lib/server/db/index.js";
import { session as sessionTable } from "#lib/server/db/schema.js";
import { eq } from "drizzle-orm";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    await auth.api.signOut({ headers: request.headers });
  } catch (err) {
    console.warn("[logout] auth.api.signOut threw; clearing manually", err);
    const sessionId = locals.session?.id;
    if (sessionId) {
      await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
    }
  }
  // 303 See Other is the correct status code for redirecting after a POST
  redirect(303, "/login");
};
