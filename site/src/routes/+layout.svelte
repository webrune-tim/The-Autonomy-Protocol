<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'
	import './global.css'

	import { Banner, Footer, Header } from '$components'

	let { children } = $props()
</script>

<svelte:head>
    <title>The Autonomy Protocol</title>
    <meta
        name="description"
        content="Stop letting drama and stress run the show. Learn the 'Life Skills' you actually need to be your own boss."
    />
    <link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
    <meta name="theme-color" content="#fdd505" />
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="layout-wrapper">
	<Header />

	<main>
		<Banner bannerName="dev-warning">
			<p>
				This site is still under heavy development. Content may change without
				notice.
			</p>
			<p>
				If you encounter any issues, please report them via our <a href="/contact"
					>contact page</a
				>
				or on
				<a href="https://github.com/webrune-tim/The-Autonomy-Protocol/issues"
					>GitHub Issues</a
				> page.
			</p>
		</Banner>
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.layout-wrapper {
		max-width: 800px;
		margin: var(--gap-2) auto;
		min-height: 100svh;
		display: grid;
		padding: clamp(1rem, 2.75svw, 2rem);
		grid-template-rows: auto 1fr auto;
		background-color: var(--blue-60);
		box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
	}
</style>
