// sites/teacher-site/src/routes/(protected)/pdf-to-md/+page.server.ts
import { fail, redirect } from "@sveltejs/kit";
import { eq, or, and, sql } from "drizzle-orm";
import { db } from "$lib/server/db";
import { user, document, documentShare, conversionTask } from "$lib/server/db/schema";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async (event) => {
  // Access your application's session context layer dynamically to bypass strict App.Locals typing bounds
  const authContext = (event.locals as any).auth;
  const session = authContext ? await authContext.getSession() : null;

  if (!session?.user) {
    throw redirect(302, "/login");
  }

  const currentUser = session.user;

  // Query both owned assets AND assets explicitly shared with this teacher
  const mySharedLinks = await db
    .select({ documentId: documentShare.documentId })
    .from(documentShare)
    .where(eq(documentShare.sharedWithUserId, currentUser.id));

  const sharedDocIds = mySharedLinks.map((link) => link.documentId);

  const availableDocuments = await db
    .select()
    .from(document)
    .where(
      or(
        eq(document.ownerId, currentUser.id),
        sharedDocIds.length > 0 ? sql`${document.id} IN (${sharedDocIds})` : sql`false`,
      ),
    );

  // Fetch historical ingestion tasks for UI monitoring tracking
  const activePipelines = await db
    .select()
    .from(conversionTask)
    .where(eq(conversionTask.userId, currentUser.id))
    .orderBy(sql`${conversionTask.createdAt} DESC`);

  // Maintain your existing search administrative data pipeline state
  const url = new URL(event.request.url);
  const searchQuery = url.searchParams.get("q") || "";
  let searchResults: any[] = [];

  const isAdmin = ["admin", "superadmin"].includes(currentUser.role || "");
  if (isAdmin && searchQuery) {
    searchResults = await db
      .select()
      .from(user)
      .where(
        or(
          sql`${user.name} LIKE ${"%" + searchQuery + "%"}`,
          sql`${user.email} LIKE ${"%" + searchQuery + "%"}`,
        ),
      );
  }

  return {
    user: currentUser,
    isAdmin,
    searchResults,
    myDocuments: availableDocuments,
    pipelines: activePipelines,
  };
};

export const actions: Actions = {
  uploadAndConvert: async ({ request, locals }) => {
    const authContext = (locals as any).auth;
    const session = authContext ? await authContext.getSession() : null;
    if (!session?.user) return fail(401, { error: "Unauthorized session" });

    const data = await request.formData();
    const file = data.get("pdf-file") as File;

    if (!file || file.size === 0) {
      return fail(400, { error: "No valid document asset provided" });
    }

    // 1. Log the initiation of the parsing track
    const [taskRecord] = await db
      .insert(conversionTask)
      .values({
        userId: session.user.id,
        originalFileName: file.name,
        status: "processing",
      })
      .returning();

    try {
      // Mock parsing engine placeholder for converting layout data structures
      const fakeConvertedMarkdown = `# Processed Target: ${file.name}\n\nGenerated automatically via legacy layout pipeline extraction on ${new Date().toLocaleDateString()}.\n\n### Core Contents\nThis text acts as raw asset space for structured lesson distribution.`;

      // 2. Persist the generated document body text
      const [newDoc] = await db
        .insert(document)
        .values({
          title: file.name.replace(/\.[^/.]+$/, ""), // Strip file extension
          content: fakeConvertedMarkdown,
          ownerId: session.user.id,
        })
        .returning();

      // 3. Mark ingestion trace task complete
      await db
        .update(conversionTask)
        .set({
          status: "completed",
          associatedDocumentId: newDoc.id,
        })
        .where(eq(conversionTask.id, taskRecord.id));

      return { success: true };
    } catch (err: any) {
      await db
        .update(conversionTask)
        .set({
          status: "failed",
          errorMessage: err?.message || "Unknown processing conversion fault",
        })
        .where(eq(conversionTask.id, taskRecord.id));

      return fail(500, { error: "Conversion task pipeline failed." });
    }
  },

  shareDocument: async ({ request, locals }) => {
    const authContext = (locals as any).auth;
    const session = authContext ? await authContext.getSession() : null;
    if (!session?.user) return fail(401, { error: "Unauthorized session" });

    const data = await request.formData();
    const documentId = data.get("documentId") as string;
    const teacherEmail = data.get("teacherEmail") as string;

    // Verify target coworker account exists
    const [targetUser] = await db.select().from(user).where(eq(user.email, teacherEmail)).limit(1);

    if (!targetUser) {
      return fail(404, { error: "Recipient teacher email address not found." });
    }

    // Ensure sharing permissions don't conflict with existing records
    const [existingShare] = await db
      .select()
      .from(documentShare)
      .where(
        and(
          eq(documentShare.documentId, documentId),
          eq(documentShare.sharedWithUserId, targetUser.id),
        ),
      )
      .limit(1);

    if (!existingShare && targetUser.id !== session.user.id) {
      await db.insert(documentShare).values({
        documentId,
        sharedWithUserId: targetUser.id,
      });
    }

    return { success: true };
  },

  updateRole: async ({ request, locals }) => {
    const authContext = (locals as any).auth;
    const session = authContext ? await authContext.getSession() : null;
    if (!session?.user || !["admin", "superadmin"].includes(session.user.role || "")) {
      return fail(403, { error: "Forbidden" });
    }

    const data = await request.formData();
    const userId = data.get("userId") as string;
    const targetRole = data.get("role") as string;

    await db.update(user).set({ role: targetRole }).where(eq(user.id, userId));

    return { success: true };
  },
};
