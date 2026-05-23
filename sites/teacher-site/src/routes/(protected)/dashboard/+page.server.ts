// sites/teacher-site/src/routes/(protected)/dashboard/+page.server.ts
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { user, session as sessionTable } from "$lib/server/db/schema";
import { eq, like, or } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  const currentUser = event.locals.user;
  if (!currentUser) {
    throw redirect(302, "/login");
  }

  const isAdmin = currentUser.role === "admin" || currentUser.role === "superadmin";
  let searchResults: any[] = [];

  if (isAdmin) {
    const query = event.url.searchParams.get("q");
    if (query) {
      searchResults = await db
        .select({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        })
        .from(user)
        .where(or(like(user.email, `%${query}%`), like(user.name, `%${query}%`)))
        .limit(10);
    }
  }

  return {
    user: currentUser,
    isAdmin,
    searchResults,
  };
};

export const actions: Actions = {
  updateRole: async (event) => {
    const currentUser = event.locals.user;
    if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "superadmin")) {
      return fail(403, { message: "Unauthorized" });
    }

    const formData = await event.request.formData();
    const userIdValue = formData.get("userId");
    const roleValue = formData.get("role");

    // Strictly ensure fields are safe text strings instead of raw objects
    if (typeof userIdValue !== "string" || typeof roleValue !== "string") {
      return fail(400, { message: "Missing or invalid userId or role" });
    }

    const userId = userIdValue;
    const newRole = roleValue as "user" | "teacher" | "admin" | "superadmin";

    // Prevent non-superadmins from promoting to superadmin
    if (newRole === "superadmin" && currentUser.role !== "superadmin") {
      return fail(403, { message: "Only superadmins can appoint other superadmins" });
    }

    console.log(`[updateRole] Attempting to update user ${userId} to role ${newRole}`);
    try {
      // 1. Update the user role
      await db.update(user).set({ role: newRole }).where(eq(user.id, userId));

      // 2. Invalidate all sessions for this user
      await db.delete(sessionTable).where(eq(sessionTable.userId, userId));

      // 3. If the user updated THEMSELVES, force an immediate logout redirect
      if (userId === currentUser.id) {
        throw redirect(303, "/login");
      }

      return { success: true };
    } catch (error) {
      if (error instanceof Response) throw error; // Handle SvelteKit's layout engine redirect
      console.error("[updateRole] Error during role update:", error);
      return fail(500, { message: "Internal server error" });
    }
  },
};
