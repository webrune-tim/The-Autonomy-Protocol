import { db } from "$lib/server/db";
import { modules, userProgress } from "$lib/server/db/schema";
import { asc, eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { lutimes } from "node:fs/promises";

export const load: PageServerLoad = async ({ locals }) => {
  const userId = locals.user!.id;

  const allModules = await db.query.modules.findMany({
    orderBy: [asc(modules.order)],
    with: {
      sections: {
        columns: {
          id: true,
        },
      },
    },
  });

  const progress = await db.query.userProgress.findMany({
    where: eq(userProgress.userId, userId),
  });

  return {
    modules: allModules.map((m) => ({
      ...m,
      totalSections: m.sections.length,
    })),
    userProgress: progress,
    user: locals.user,
  };
};
