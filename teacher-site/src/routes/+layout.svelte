<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'
	import OgImg from '$images/og-img.png'
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
	<meta name="theme-color" content="#ff9661" />
	<link rel="icon" href={favicon} />
	<meta property="og:title" content="The Autonomy Protocol" />
	<meta property="og:type" content="image/png" />
	<meta property="og:url" content="https://the-autonomy-protocol.vercel.app/" />
	<meta property="og:image" content={OgImg} />
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
		max-width: 1000px;
		margin: var(--gap-2) auto;
		min-height: 100svh;
		display: grid;
		padding: var(--gap-2);
		grid-template-rows: auto 1fr auto;
		background: var(--surface-4);
	}
</style>
