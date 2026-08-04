import { db } from "$lib/server/db";
import { modules } from "$lib/server/db/schema";
import { inArray, notInArray, asc } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return {
      user: null,
      startedModules: [],
      availableModules: await db.query.modules.findMany({
        orderBy: [asc(modules.order)],
        limit: 5,
      }),
    };
  }

  const userId = user.id;

  // Get all user progress
  const allProgress = await db.query.userProgress.findMany({
    where: (userProgress, { eq }) => eq(userProgress.userId, userId),
  });

  const startedModuleIds = new Set(
    allProgress
      .filter((p) => p.started)
      .map((p) => p.moduleId)
      .filter(Boolean) as string[],
  );

  const startedIdsList = Array.from(startedModuleIds);

  const startedModulesRaw =
    startedIdsList.length > 0
      ? await db.query.modules.findMany({
          where: inArray(modules.id, startedIdsList),
          orderBy: [asc(modules.order)],
        })
      : [];

  // Get total section counts for all modules to avoid N+1
  const allSections = await db.query.sections.findMany({
    columns: {
      id: true,
      moduleId: true,
    },
  });

  const sectionCounts = allSections.reduce(
    (acc, sec) => {
      if (sec.moduleId) {
        acc[sec.moduleId] = (acc[sec.moduleId] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const startedModules = startedModulesRaw.map((module) => {
    const total = sectionCounts[module.id] || 0;

    // Use only sections that are explicitly marked as completed
    const completed = allProgress.filter(
      (p) => p.moduleId === module.id && p.completed === true,
    ).length;

    // If moduleId is unreliable, we fall back to checking all progress for sections of this module
    let finalCompleted = completed;
    if (completed === 0) {
      const moduleSectionIds = allSections.filter((s) => s.moduleId === module.id).map((s) => s.id);
      finalCompleted = allProgress.filter(
        (p) => moduleSectionIds.includes(p.sectionId) && p.completed === true,
      ).length;
    }

    const percentage = total > 0 ? Math.min(100, Math.round((finalCompleted / total) * 100)) : 0;

    return { ...module, progress: percentage };
  });

  const availableModules = await db.query.modules.findMany({
    where: startedIdsList.length > 0 ? notInArray(modules.id, startedIdsList) : undefined,
    orderBy: [asc(modules.order)],
    limit: 5,
  });

  return {
    user,
    startedModules,
    availableModules,
  };
};
