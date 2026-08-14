<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		children: Snippet
	}

	let { children }: Props = $props()
</script>

<footer>
	<div class="footer-inner">
		{@render children()}
	</div>
</footer>

<style>
	footer {
		width: 100%;
		background: var(--surface-1);
		border-top: 1px solid var(--ui-border);
		color: var(--fg);
		margin-top: auto;
		padding-block: var(--gap-3);
		transition: background-color 0.2s ease, border-color 0.2s ease;
	}

	.footer-inner {
		width: 100%;
		max-width: var(--max-content-width, 1400px);
		margin-inline: auto;
		padding-inline: clamp(1rem, 3vw, 2.5rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--gap-2);
	}
</style>
