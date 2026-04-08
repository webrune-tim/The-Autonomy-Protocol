<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import "./global.css"

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="layout-wrapper">
	<header>
		<div class="logo"><h1>AP</h1></div>
		<nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
			<a href="/curriculum">Curriculum</a>
			<a href="/resources">Resources</a>
            <a href="/contact">Contact</a>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<p>The Autonomy Project &copy; {new Date().getFullYear()}</p>
	</footer>
</div>

<style>
	.layout-wrapper {
		min-height: 100svh;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
</style>