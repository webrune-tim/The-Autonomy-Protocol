<script lang="ts">
	import { onMount } from 'svelte'

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
		<button onclick={dismissBanner}>×</button>
		{@render children()}
	</div>
{/if}

<style>
	:global(.banner) {
		position: relative;
		color: var(--accent-1);
		background: rgb(from var(--accent-1) r g b / 0.25);
		border: 1px solid var(--accent-1);
		border-radius: var(--gap-1);
		padding: 10px var(--gap-1);
		margin-bottom: var(--gap-2);
		height: fit-content;

		button {
			position: absolute;
			top: 5px;
			right: 5px;
			background: none;
			border: none;
			color: var(--accent-1);
			font-size: 1.25rem;
			cursor: pointer;
		}
	}

	:global(.banner a) {
		color: white;
	}
</style>
