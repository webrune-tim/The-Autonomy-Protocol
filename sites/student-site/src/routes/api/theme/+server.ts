import type { RequestHandler } from "./$types";
import { db } from "#lib/server/db/index.js";
import { user } from "#lib/server/db/auth.schema.js";
import { eq } from "drizzle-orm";

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { theme } = await request.json();

  if (!theme || !["light", "dark"].includes(theme)) {
    return Response.json({ error: "Invalid theme" }, { status: 400 });
  }

  await db.update(user).set({ theme }).where(eq(user.id, locals.user.id));

  return Response.json({ success: true });
};
