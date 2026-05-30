import { auth } from '$lib/server/auth'
import { redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db'
import { session as sessionTable } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		await auth.api.signOut({ headers: request.headers })
	} catch (err) {
		console.warn('[logout] auth.api.signOut threw; clearing manually', err)
		const sessionId = locals.session?.id
		if (sessionId) {
			await db.delete(sessionTable).where(eq(sessionTable.id, sessionId))
		}
	}
	// 303 See Other is the correct status code for redirecting after a POST
	redirect(303, '/login')
}
