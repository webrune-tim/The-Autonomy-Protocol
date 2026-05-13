import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		
		const name = data.get('name');
		const email = data.get('email');
		const comments = data.get('comments');
		const isOfferingHelp = data.get('isOfferingHelp'); // String from hidden input

		// Basic server-side validation
		if (!name || !email || !comments) {
			return fail(400, { 
				error: 'All fields are required.',
				values: { name, email, comments } 
			});
		}

		const endpoint = 'https://formspree.io/f/mdkdqygd';

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					name,
					email,
					comments,
					isOfferingHelp: isOfferingHelp === 'true'
				})
			});

			if (response.ok) {
				return { success: true };
			} else {
				return fail(500, { error: 'The mail server rejected the request.' });
			}
		} catch (err) {
			return fail(500, { error: 'Server connection error.' });
		}
	}
};
