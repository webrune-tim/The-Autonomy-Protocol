// sites/student-site/src/routes/(protected)/modules/[slug]/+page.server.ts
import { db } from "$lib/server/db";
import { modules, sections, userProgress } from "$lib/server/db/schema";
import { error } from "@sveltejs/kit";
import { eq, asc, and, inArray } from "drizzle-orm";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const module = await db.query.modules.findFirst({
    where: eq(modules.slug, params.slug),
    with: {
      sections: {
        orderBy: [asc(sections.order)],
      },
    },
  });

  if (!module) {
    throw error(404, "Module not found");
  }

  // --- START: MARK MODULE AS STARTED ---
  // If the module hasn't been started yet, mark it as true
  const userId = locals.user!.id;
  const userModuleProgress = await db.query.userProgress.findFirst({
    where: and(eq(userProgress.userId, userId), eq(userProgress.moduleId, module.id)),
  });

  if (!userModuleProgress?.started) {
    await db
      .insert(userProgress)
      .values({
        userId,
        moduleId: module.id,
        started: true,
        sectionId: module.sections[0]?.id || "system-module-start",
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.sectionId],
        set: { started: true },
      });
  }
  // --- END: MARK MODULE AS STARTED ---

  const sectionIds = module.sections.map((s) => s.id);

  let progress: (typeof userProgress.$inferSelect)[] = [];
  if (sectionIds.length > 0) {
    progress = await db.query.userProgress.findMany({
      where: and(eq(userProgress.userId, userId), inArray(userProgress.sectionId, sectionIds)),
    });
  }

  return {
    module,
    userProgress: progress,
  };
};

export const actions: Actions = {
  toggleSection: async ({ request, locals }) => {
    const userId = locals.user!.id;
    const formData = await request.formData();
    const sectionId = formData.get("sectionId") as string;
    const completed = formData.get("completed") === "true";
    const response = formData.get("response") as string | null;
    const moduleId = formData.get("moduleId") as string | null;

    if (!sectionId) {
      return { success: false, error: "Missing sectionId" };
    }

    const updateSet: Record<string, any> = {
      completed,
      updatedAt: new Date(),
    };
    if (response !== null) {
      updateSet.response = response;
    }
    if (moduleId) {
      updateSet.moduleId = moduleId;
    }

    await db
      .insert(userProgress)
      .values({
        userId,
        sectionId,
        completed,
        ...(response !== null ? { response } : {}),
        ...(moduleId ? { moduleId } : {}),
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.sectionId],
        set: updateSet,
      });

    return { success: true };
  },

  saveResponse: async ({ request, locals }) => {
    const userId = locals.user!.id;
    const formData = await request.formData();
    const sectionId = formData.get("sectionId") as string;
    const response = formData.get("response") as string | null;
    const moduleId = formData.get("moduleId") as string | null;

    if (!sectionId) {
      return { success: false, error: "Missing sectionId" };
    }

    const updateSet: Record<string, any> = {
      response: response ?? "",
      updatedAt: new Date(),
    };
    if (moduleId) {
      updateSet.moduleId = moduleId;
    }

    await db
      .insert(userProgress)
      .values({
        userId,
        sectionId,
        response: response ?? "",
        ...(moduleId ? { moduleId } : {}),
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.sectionId],
        set: updateSet,
      });

    return { success: true };
  },
};
