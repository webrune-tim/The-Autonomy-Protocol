// sites/teacher-site/src/routes/contact/+page.server.ts
import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData()

		const name = data.get('name')
		const email = data.get('email')
		const comments = data.get('comments')
		const isOfferingHelp = data.get('isOfferingHelp') // String from hidden input

		// Basic server-side validation and type guarantees
		if (
			typeof name !== 'string' ||
			typeof email !== 'string' ||
			typeof comments !== 'string'
		) {
			return fail(400, {
				error: 'All fields are required and must be valid text.',
				values: { name, email, comments }
			})
		}

		const endpoint = 'https://formspree.io/f/mdkdqygd'

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					name,
					email,
					comments,
					isOfferingHelp: isOfferingHelp === 'true'
				})
			})

			if (response.ok) {
				return { success: true }
			} else {
				return fail(500, { error: 'The mail server rejected the request.' })
			}
		} catch {
			// Removed the unused error assignment to clear the eslint rule
			return fail(500, { error: 'Server connection error.' })
		}
	}
}
