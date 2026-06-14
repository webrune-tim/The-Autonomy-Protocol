import { db } from "$lib/server/db";
import { modules } from "$lib/server/db/schema";
import { asc } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
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

  return {
    modules: allModules.map((m) => ({
      ...m,
      totalSections: m.sections.length,
    })),
  };
};
