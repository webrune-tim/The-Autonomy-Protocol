import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user,
		theme: locals.user?.theme || null
	}
}
