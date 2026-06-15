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

  const userId = locals.user!.id;
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

    if (!sectionId) {
      return { success: false, error: "Missing sectionId" };
    }

    await db
      .insert(userProgress)
      .values({
        userId,
        sectionId,
        completed,
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.sectionId],
        set: { completed, updatedAt: new Date() },
      });

    return { success: true };
  },
};
