import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { user, session as sessionTable } from "$lib/server/db/schema";
import { eq, like, or } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  const currentUser = event.locals.user;
  if (!currentUser) {
    return redirect(302, "/login");
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
  signOut: async (event) => {
    try {
      await auth.api.signOut({
        headers: event.request.headers,
      });
    } catch (err) {
      // iOS Safari can drop/rotate session cookies before this fires; if
      // better-auth can't find the session to revoke it throws. We still want
      // to clear server-side state and redirect the user to /login regardless.
      console.warn("[signOut] auth.api.signOut threw; clearing manually", err);
      const sessionId = event.locals.session?.id;
      if (sessionId) {
        await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
      }
    }
    redirect(303, "/login");
  },
  updateRole: async (event) => {
    const currentUser = event.locals.user;
    if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "superadmin")) {
      return fail(403, { message: "Unauthorized" });
    }

    const formData = await event.request.formData();
    const userId = formData.get("userId")?.toString();
    const newRole = formData.get("role")?.toString() as "user" | "teacher" | "admin" | "superadmin";

    if (!userId || !newRole) {
      return fail(400, { message: "Missing userId or role" });
    }

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
      if (error instanceof Response) throw error; // Handle the redirect
      console.error("[updateRole] Error during role update:", error);
      return fail(500, { message: "Internal server error" });
    }
  },
};
