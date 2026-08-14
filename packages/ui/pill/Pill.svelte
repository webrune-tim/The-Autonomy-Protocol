<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		children: Snippet
	}

	let { children }: Props = $props()
</script>

<div class="pill">
	{@render children()}
</div>

<style>
	.pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		max-width: fit-content;
		border-radius: 9999px;
		color: var(--brand-primary);
		background-color: oklch(from var(--brand-primary) l c h / 0.12);
		border: 1px solid oklch(from var(--brand-primary) l c h / 0.4);
		padding: 0.25rem 0.65rem;
		font-size: 0.75rem;
		font-weight: 700;
		font-family: var(--font-ui, sans-serif);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		white-space: nowrap;
	}
</style>
