import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { db } from '$lib/server/db'
import { user } from '$lib/server/db/auth.schema'
import { eq } from 'drizzle-orm'

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 })
	}

	const { theme } = await request.json()

	if (!theme || !['light', 'dark', 'system'].includes(theme)) {
		return json({ error: 'Invalid theme' }, { status: 400 })
	}

	await db.update(user).set({ theme }).where(eq(user.id, locals.user.id))

	return json({ success: true })
}
