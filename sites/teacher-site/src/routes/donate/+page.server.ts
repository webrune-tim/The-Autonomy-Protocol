// sites/teacher-site/src/routes/donate/+page.server.ts
import { fail, redirect, type Actions } from '@sveltejs/kit'

export const actions: Actions = {
	donate: async ({ request }) => {
		const data = await request.formData()
		const amountString = data.get('amount')
		const amount = Number(amountString)

		if (!amountString || isNaN(amount) || amount <= 0) {
			return fail(400, {
				error: true,
				message: 'Please enter a valid donation amount.'
			})
		}

		// Usually, you'd confirm payment here.
		// For now, we redirect to the success page with the amount as a param.
		throw redirect(303, `/donate/thank-you?amount=${amount}`)
	}
}
