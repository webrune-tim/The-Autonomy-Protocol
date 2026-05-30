<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		children: Snippet
	}

	let { children }: Props = $props()
</script>

<footer>
	{@render children()}
</footer>

<style>
	footer {
		max-height: fit-content;
		--color: var(--brand-primary);
		display: flex;
		flex-direction: column;
		align-items: center;

		/* Force the footer base text to high contrast */
		color: var(--brand-primary-contrast);
		background: var(--brand-primary-dark);

		/* Padding & Typography Layout */
		padding: var(--gap-2) var(--gap-1);
		font-size: var(--font-size-3);
	}
</style>
