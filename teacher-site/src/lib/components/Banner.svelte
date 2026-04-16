<script lang="ts">
	import { onMount } from 'svelte'
	import X from '@lucide/svelte/icons/x'

	let { bannerName, children } = $props()

	let showBanner = $state(false)

	onMount(() => {
		if (localStorage.getItem(bannerName) !== 'dismissed') {
			showBanner = true
		}
	})

	function dismissBanner() {
		showBanner = false
		localStorage.setItem(bannerName, 'dismissed')
	}
</script>

{#if showBanner}
	<div class="banner">
		<button onclick={dismissBanner}>
			<X />
			<span class="sr-only">Dismiss banner</span>
		</button>
		{@render children()}
	</div>
{/if}

<style>
	:global(.banner) {
		position: relative;
		color: var(--brand-blue);
		background: rgb(from var(--brand-blue) r g b / 0.25);
		border: 1px solid var(--brand-blue);
		border-radius: var(--border-radius);
		padding: 10px var(--gap-1);
		margin-bottom: var(--gap-2);
		height: fit-content;

		button {
			position: absolute;
			top: 5px;
			right: 5px;
			background: none;
			border: none;
			color: var(--brand-blue);
			font-size: 1.25rem;
			cursor: pointer;
		}
	}
</style>
