<script lang="ts">
	import type { Snippet } from 'svelte'

	// Define the prop type
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
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: fit-content;
		border-radius: 100px;
		color: var(--fg);
		background-color: rgb(from var(--brand-primary) r g b / 0.15);
		border: 1px solid var(--brand-primary);
		padding: 0.5rem;
		font-size: 12px;
		font-family: 'Poppins', sans-serif;
	}
</style>
