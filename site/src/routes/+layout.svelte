<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './global.css';

	import Header from '$components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="layout-wrapper">
	<Header />

	<main>
		{@render children()}
	</main>

	<footer>
		<p>The Autonomy Project &copy; {new Date().getFullYear()}</p>
	</footer>
</div>

<style>
	.layout-wrapper {
		max-width: 800px;
		margin: var(--gap-2) auto;
		min-height: 100svh;
		display: grid;
		padding: clamp(1rem, 2.75svh, 2rem);
		grid-template-rows: auto 1fr auto;
		background-color: var(--blue-60);
		box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
	}
</style>
