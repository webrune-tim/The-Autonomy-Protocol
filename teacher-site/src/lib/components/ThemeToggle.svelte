<script>
	import { themeState } from '$stores/theme.svelte.js'
	import Moon from '@lucide/svelte/icons/moon'
	import Sun from '@lucide/svelte/icons/sun'
</script>

<button
	onclick={() => themeState.toggle()}
	class="theme-toggle"
	aria-label="Toggle light/dark mode"
>
	{#if themeState.value === 'dark'}
		<Sun />
	{:else}
		<Moon />
	{/if}
</button>

<style>
	.theme-toggle {
		background: none;
		border: none;
		outline: none;
		color: var(--brand-blue);
		cursor: pointer;
	}
</style>
