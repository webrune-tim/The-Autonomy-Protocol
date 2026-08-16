import { db } from "#lib/server/db/index.js";
import { modules } from "#lib/server/db/schema.js";
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

    const existingModules = await db.query.modules.findMany({
      columns: { order: true },
    });
    const nextOrder =
      existingModules.length > 0
        ? Math.max(...existingModules.map((m) => m.order ?? 0)) + 1
        : 0;

    await db.insert(modules).values({
      id,
      slug,
      title,
      description,
      category,
      cardColor: "primary",
      order: nextOrder,
    });

    throw redirect(303, `/modules/${id}`);
  },

  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id") as string;

    await db.delete(modules).where(eq(modules.id, id));

    return { success: true };
  },

  reorder: async ({ request }) => {
    const data = await request.formData();
    const ordersRaw = data.get("orders") as string;
    if (!ordersRaw) {
      return { success: false, error: "Missing orders payload" };
    }

    try {
      const items: { id: string; order: number }[] = JSON.parse(ordersRaw);
      for (const item of items) {
        await db
          .update(modules)
          .set({ order: item.order })
          .where(eq(modules.id, item.id));
      }
      return { success: true };
    } catch (err) {
      console.error("Failed to reorder modules:", err);
      return { success: false, error: (err as Error).message };
    }
  },
};
