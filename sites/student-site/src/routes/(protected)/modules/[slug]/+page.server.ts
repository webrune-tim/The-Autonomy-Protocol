import { db } from "$lib/server/db";
import { modules, sections } from "$lib/server/db/schema";
import { error } from "@sveltejs/kit";
import { eq, asc } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
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

  return {
    module,
  };
};
