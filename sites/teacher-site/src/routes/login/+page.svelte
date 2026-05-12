<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'

	let { form }: { form: ActionData } = $props()
</script>

<h1>Login</h1>

<section class="unangled-box">
	<form method="post" action="?/signInEmail" use:enhance>
		<label>
			Email
			<input type="email" name="email" />
		</label>
		<label>
			Password
			<input type="password" name="password" />
		</label>
		<label>
			Name (for registration)
			<input name="name" />
		</label>
		<button>Login</button>
		<button formaction="?/signUpEmail">Register</button>
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
