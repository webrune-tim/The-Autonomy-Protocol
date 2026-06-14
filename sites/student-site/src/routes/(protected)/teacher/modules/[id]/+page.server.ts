import { db } from "$lib/server/db";
import { modules, sections } from "$lib/server/db/schema";
import { error } from "@sveltejs/kit";
import { eq, asc } from "drizzle-orm";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const user = locals.user;

  if (!user || !["teacher", "admin", "superadmin"].includes(user.role as string)) {
    throw error(403, "Forbidden");
  }

  const module = await db.query.modules.findFirst({
    where: eq(modules.id, params.id),
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

export const actions: Actions = {
  updateModule: async ({ request, params, locals }) => {
    const user = locals.user;

    if (!user || !["teacher", "admin", "superadmin"].includes(user.role as string)) {
      throw error(403, "Forbidden");
    }

    const data = await request.formData();
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const order = parseInt(data.get("order") as string) || 0;

    await db.update(modules).set({ title, description, order }).where(eq(modules.id, params.id));

    return { success: true };
  },

  upsertSection: async ({ request, params, locals }) => {
    const user = locals.user;

    if (!user || !["teacher", "admin", "superadmin"].includes(user.role as string)) {
      throw error(403, "Forbidden");
    }

    const data = await request.formData();
    const sectionId = data.get("sectionId") as string;
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const order = parseInt(data.get("order") as string) || 0;

    if (sectionId) {
      await db.update(sections).set({ title, content, order }).where(eq(sections.id, sectionId));
    } else {
      await db.insert(sections).values({
        id: crypto.randomUUID(),
        moduleId: params.id,
        title,
        content,
        order,
      });
    }

    return { success: true };
  },

  deleteSection: async ({ request, locals }) => {
    const user = locals.user;

    if (!user || !["teacher", "admin", "superadmin"].includes(user.role as string)) {
      throw error(403, "Forbidden");
    }

    const data = await request.formData();
    const sectionId = data.get("sectionId") as string;

    await db.delete(sections).where(eq(sections.id, sectionId));

    return { success: true };
  },
};
