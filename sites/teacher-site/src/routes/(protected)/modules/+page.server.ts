import { db } from "$lib/server/db";
import { modules } from "$lib/server/db/schema";
import { redirect } from "@sveltejs/kit";
import { asc, eq } from "drizzle-orm";
import type { PageServerLoad, Actions } from "./$types";

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
    modules: allModules,
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const category = (data.get("category") as string) || "step";
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const id = crypto.randomUUID();

    await db.insert(modules).values({
      id,
      slug,
      title,
      description,
      category,
      cardColor: "primary",
      order: 0,
    });

    throw redirect(303, `/modules/${id}`);
  },

  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id") as string;

    await db.delete(modules).where(eq(modules.id, id));

    return { success: true };
  },
};
