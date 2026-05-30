// sites/teacher-site/src/routes/(protected)/+layout.server.ts
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// Check if the user is logged in (using your existing logic from locals)
	if (!locals.user) {
		// Redirect to login, and optionally remember the intended destination
		throw redirect(303, `/login?redirectTo=${url.pathname}`)
	}

	return {
		user: locals.user
	}
}
