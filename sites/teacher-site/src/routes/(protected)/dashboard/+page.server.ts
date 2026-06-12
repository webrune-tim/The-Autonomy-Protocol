import { fail, redirect } from "@sveltejs/kit";
import { eq, or, and, sql, inArray } from "drizzle-orm";
import { db } from "$lib/server/db";
import {
  user,
  session as sessionTable,
  document,
  documentShare,
  conversionTask,
} from "$lib/server/db/schema";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
  const currentUser = locals.user;
  if (!currentUser) {
    throw redirect(302, "/login");
  }

  // --- START DOCUMENT HUB DATA ---
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
        sharedDocIds.length > 0 ? inArray(document.id, sharedDocIds) : sql`false`,
      ),
    );

  // Fetch historical ingestion tasks for UI monitoring tracking
  const activePipelines = await db
    .select()
    .from(conversionTask)
    .where(eq(conversionTask.userId, currentUser.id))
    .orderBy(sql`${conversionTask.createdAt} DESC`);
  // --- END DOCUMENT HUB DATA ---

  const isAdmin = ["admin", "superadmin"].includes(currentUser.role || "");
  let searchResults: any[] = [];

  if (isAdmin) {
    const query = url.searchParams.get("q");
    if (query) {
      searchResults = await db
        .select({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        })
        .from(user)
        .where(
          or(
            sql`${user.email} LIKE ${"%" + query + "%"}`,
            sql`${user.name} LIKE ${"%" + query + "%"}`,
          ),
        )
        .limit(10);
    }
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
    const sessionUser = locals.user;
    if (!sessionUser) return fail(401, { error: "Unauthorized session" });

    const data = await request.formData();
    const file = data.get("pdf-file") as File;

    if (!file || file.size === 0) {
      return fail(400, { error: "No valid document asset provided" });
    }

    const [taskRecord] = await db
      .insert(conversionTask)
      .values({
        userId: sessionUser.id,
        originalFileName: file.name,
        status: "processing",
      })
      .returning();

    try {
      // Real parsing engine: Integrating with pdf2md.deepdiy.net API
      const arrayBuffer = await file.arrayBuffer();
      const response = await fetch("https://pdf2md.deepdiy.net/v1/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: arrayBuffer,
      });

      if (response.status === 429) {
        return fail(429, {
          error: "Conversion service is busy. Please try again in a moment.",
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Service responded with status ${response.status}`);
      }

      const result = await response.json();
      const convertedMarkdown = result.markdown || "";

      if (!convertedMarkdown) {
        throw new Error("Conversion service returned empty content.");
      }

      const [newDoc] = await db
        .insert(document)
        .values({
          title: file.name.replace(/\.[^/.]+$/, ""),
          content: convertedMarkdown,
          ownerId: sessionUser.id,
        })
        .returning();

      await db
        .update(conversionTask)
        .set({
          status: "completed",
          associatedDocumentId: newDoc.id,
        })
        .where(eq(conversionTask.id, taskRecord.id));

      return {
        success: true,
        message: "Document converted successfully.",
        markdown: convertedMarkdown,
      };
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
    const sessionUser = locals.user;
    if (!sessionUser) return fail(401, { error: "Unauthorized session" });

    const data = await request.formData();
    const documentId = data.get("documentId") as string;
    const teacherEmail = data.get("teacherEmail") as string;

    const [targetUser] = await db.select().from(user).where(eq(user.email, teacherEmail)).limit(1);

    if (!targetUser) {
      return fail(404, { error: "Recipient teacher email address not found." });
    }

    if (targetUser.id === sessionUser.id) {
      return fail(400, { error: "Cannot share a document with yourself." });
    }

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

    if (existingShare) {
      return fail(400, { error: "Document is already shared with this user." });
    }

    await db.insert(documentShare).values({
      documentId,
      sharedWithUserId: targetUser.id,
    });

    return { success: true };
  },

  updateRole: async ({ request, locals }) => {
    const sessionUser = locals.user;
    if (!sessionUser || !["admin", "superadmin"].includes(sessionUser.role || "")) {
      return fail(403, { error: "Forbidden" });
    }

    const data = await request.formData();
    const userIdValue = data.get("userId");
    const roleValue = data.get("role");

    if (typeof userIdValue !== "string" || typeof roleValue !== "string") {
      return fail(400, { message: "Missing or invalid userId or role" });
    }

    const userId = userIdValue;
    const newRole = roleValue as "user" | "teacher" | "admin" | "superadmin";

    if (newRole === "superadmin" && sessionUser.role !== "superadmin") {
      return fail(403, { message: "Only superadmins can appoint other superadmins" });
    }

    try {
      await db.update(user).set({ role: newRole }).where(eq(user.id, userId));
      await db.delete(sessionTable).where(eq(sessionTable.userId, userId));

      if (userId === sessionUser.id) {
        throw redirect(303, "/login");
      }

      return { success: true };
    } catch (error) {
      if (error instanceof Response) throw error;
      return fail(500, { message: "Internal server error" });
    }
  },
};
