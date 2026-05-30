// sites/teacher-site/src/routes/(protected)/pdf-to-md/+page.server.ts
import { fail, redirect } from '@sveltejs/kit'
import { eq, or, and, sql, inArray } from 'drizzle-orm'
import { db } from '$lib/server/db'
import { user, document, documentShare, conversionTask } from '$lib/server/db/schema'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ locals, request }) => {
	const currentUser = locals.user

	if (!currentUser) {
		throw redirect(302, '/login')
	}

	// Query both owned assets AND assets explicitly shared with this teacher
	const mySharedLinks = await db
		.select({ documentId: documentShare.documentId })
		.from(documentShare)
		.where(eq(documentShare.sharedWithUserId, currentUser.id))

	const sharedDocIds = mySharedLinks.map((link) => link.documentId)

	const availableDocuments = await db
		.select()
		.from(document)
		.where(
			or(
				eq(document.ownerId, currentUser.id),
				sharedDocIds.length > 0 ? inArray(document.id, sharedDocIds) : sql`false`
			)
		)

	// Fetch historical ingestion tasks for UI monitoring tracking
	const activePipelines = await db
		.select()
		.from(conversionTask)
		.where(eq(conversionTask.userId, currentUser.id))
		.orderBy(sql`${conversionTask.createdAt} DESC`)

	// Maintain your existing search administrative data pipeline state
	const url = new URL(request.url)
	const searchQuery = url.searchParams.get('q') || ''
	let searchResults: any[] = []

	const isAdmin = ['admin', 'superadmin'].includes(currentUser.role || '')
	if (isAdmin && searchQuery) {
		searchResults = await db
			.select()
			.from(user)
			.where(
				or(
					sql`${user.name} LIKE ${'%' + searchQuery + '%'}`,
					sql`${user.email} LIKE ${'%' + searchQuery + '%'}`
				)
			)
	}

	return {
		user: currentUser,
		isAdmin,
		searchResults,
		myDocuments: availableDocuments,
		pipelines: activePipelines
	}
}

export const actions: Actions = {
	uploadAndConvert: async ({ request, locals }) => {
		const sessionUser = locals.user
		if (!sessionUser) return fail(401, { error: 'Unauthorized session' })

		const data = await request.formData()
		const file = data.get('pdf-file') as File

		if (!file || file.size === 0) {
			return fail(400, { error: 'No valid document asset provided' })
		}

		// 1. Log the initiation of the parsing track
		const [taskRecord] = await db
			.insert(conversionTask)
			.values({
				userId: sessionUser.id,
				originalFileName: file.name,
				status: 'processing'
			})
			.returning()

		try {
			// Real parsing engine: Integrating with pdf2md.deepdiy.net API
			const arrayBuffer = await file.arrayBuffer()
			const response = await fetch('https://pdf2md.deepdiy.net/v1/convert', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/pdf'
				},
				body: arrayBuffer
			})

			if (response.status === 429) {
				return fail(429, {
					error: 'Conversion service is busy. Please try again in a moment.'
				})
			}

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}))
				throw new Error(
					errorData.error || `Service responded with status ${response.status}`
				)
			}

			const result = await response.json()
			const convertedMarkdown = result.markdown || ''

			if (!convertedMarkdown) {
				throw new Error('Conversion service returned empty content.')
			}

			// 2. Persist the generated document body text
			const [newDoc] = await db
				.insert(document)
				.values({
					title: file.name.replace(/\.[^/.]+$/, ''),
					content: convertedMarkdown,
					ownerId: sessionUser.id
				})
				.returning()

			// 3. Mark ingestion trace task complete
			await db
				.update(conversionTask)
				.set({
					status: 'completed',
					associatedDocumentId: newDoc.id
				})
				.where(eq(conversionTask.id, taskRecord.id))

			return { success: true, markdown: convertedMarkdown }
		} catch (err: any) {
			await db
				.update(conversionTask)
				.set({
					status: 'failed',
					errorMessage: err?.message || 'Unknown processing conversion fault'
				})
				.where(eq(conversionTask.id, taskRecord.id))

			return fail(500, { error: 'Conversion task pipeline failed.' })
		}
	},

	shareDocument: async ({ request, locals }) => {
		const sessionUser = locals.user
		if (!sessionUser) return fail(401, { error: 'Unauthorized session' })

		const data = await request.formData()
		const documentId = data.get('documentId') as string
		const teacherEmail = data.get('teacherEmail') as string

		// Verify target coworker account exists
		const [targetUser] = await db
			.select()
			.from(user)
			.where(eq(user.email, teacherEmail))
			.limit(1)

		if (!targetUser) {
			return fail(404, { error: 'Recipient teacher email address not found.' })
		}

		if (targetUser.id === sessionUser.id) {
			return fail(400, { error: 'Cannot share a document with yourself.' })
		}

		// Ensure sharing permissions don't conflict with existing records
		const [existingShare] = await db
			.select()
			.from(documentShare)
			.where(
				and(
					eq(documentShare.documentId, documentId),
					eq(documentShare.sharedWithUserId, targetUser.id)
				)
			)
			.limit(1)

		if (existingShare) {
			return fail(400, { error: 'Document is already shared with this user.' })
		}

		await db.insert(documentShare).values({
			documentId,
			sharedWithUserId: targetUser.id
		})

		return { success: true }
	},

	updateRole: async ({ request, locals }) => {
		const sessionUser = locals.user
		if (!sessionUser || !['admin', 'superadmin'].includes(sessionUser.role || '')) {
			return fail(403, { error: 'Forbidden' })
		}

		const data = await request.formData()
		const userId = data.get('userId') as string
		const targetRole = data.get('role') as string

		const validRoles = ['user', 'student', 'teacher', 'admin', 'superadmin']
		if (!validRoles.includes(targetRole)) {
			return fail(400, { error: 'Invalid role specified.' })
		}

		await db.update(user).set({ role: targetRole }).where(eq(user.id, userId))

		return { success: true }
	}
}
