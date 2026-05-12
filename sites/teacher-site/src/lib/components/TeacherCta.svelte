<script lang="ts">
	import { page } from '$app/state'

	const currentPath = $derived(page.url.pathname + page.url.search)
	const loginUrl = $derived(`/login?redirectTo=${encodeURIComponent(currentPath)}`)
</script>

<aside class="box trans-black margin-top">
	<div class="cta-grid">
		<div class="cta-content">
			<h4>Pedagogical Infrastructure Available</h4>
			<p>
				Additional instructional strategies, discussion starters, and practicums are
				available for verified educators.
			</p>
		</div>
		<div class="cta-action">
			<a href={loginUrl} class="login-button"> Access Teacher Toolkit </a>
		</div>
	</div>
</aside>

<style>
	.cta-grid {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--gap-2);
		align-items: center;
	}

	@media (max-width: 600px) {
		.cta-grid {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.cta-action {
			justify-self: center;
		}
	}

	h4 {
		margin: 0 0 0.5rem 0;
		color: var(--brand-orange);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 0.9rem;
	}

	p {
		margin: 0;
		font-size: 0.95rem;
		color: var(--fg);
		opacity: 0.9;
	}

	.login-button {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background-color: var(--brand-orange);
		color: var(--bg) !important;
		text-decoration: none !important;
		font-weight: 700;
		font-size: 0.85rem;
		text-transform: uppercase;
		border-radius: var(--border-radius);
		transition:
			transform 0.2s ease,
			filter 0.2s ease;
	}

	.login-button:hover {
		transform: translateY(-2px);
		filter: brightness(1.1);
	}
</style>
