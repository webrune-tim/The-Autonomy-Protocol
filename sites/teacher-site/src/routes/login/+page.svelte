<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/state'
	import type { ActionData } from './$types'

	let { form }: { form: ActionData } = $props()
	const redirectTo = $derived(page.url.searchParams.get('redirectTo'))
	const actionWithRedirect = $derived(redirectTo ? `?/signInEmail&redirectTo=${encodeURIComponent(redirectTo)}` : '?/signInEmail')
	const signupWithRedirect = $derived(redirectTo ? `?/signUpEmail&redirectTo=${encodeURIComponent(redirectTo)}` : '?/signUpEmail')
</script>

<h1>Login</h1>

<section class="unangled-box">
	<form method="post" action={actionWithRedirect} use:enhance>
		<label>
			Email
			<input type="email" name="email" required />
		</label>
		<label>
			Password
			<input type="password" name="password" required />
		</label>
		<label>
			Name (for registration)
			<input name="name" />
		</label>
		<button>Login</button>
		<button formaction={signupWithRedirect}>Register</button>
	</form>
	<p style="color: red">{form?.message ?? ''}</p>
</section>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		label {
			display: flex;
			flex-direction: column;
			align-items: start;

			input {
				width: 100%;
				background: #333;
			}
		}

		button {
			background-color: var(--brand-orange);
			color: var(--fg);
			border: none;
			padding: 0.5rem 1rem;
		}
	}
</style>
