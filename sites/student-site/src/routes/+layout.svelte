<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'
	import OgImg from '$images/og-img.png'

	// Import the shared packages
	import '@autonomy/theme/styles.css';

	// Import the local packages
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

	:global(:root) {
		--accent-1: oklab(0.61 -0.06 -0.22);
		--accent-2: oklab(0.72 0.16 0.16);
		--accent-3: oklab(0.8 -0.17 -0.03);
	}

	:global(:root[data-theme="light"]) {
		--brand-blue: oklab(0.45 -0.05 -0.17);
		--brand-orange: oklab(0.57 0.13 0.13);
		--brand-teal: oklab(0.64 -0.14 -0.02);
		--accent-3: oklab(0.64 -0.14 -0.02);
	}

	@media (color-gamut: p3) {
		:global(:root) {
			--brand-blue: oklch(0.6132 0.2245 254);
			--brand-orange: oklch(0.7191 0.2269 45);
			--accent-3: oklch(0.8015 0.1751 190);
		}

		:global(:root[data-theme="light"]) {
			--brand-blue: oklch(0.4485 0.1751 254.74);
			--brand-orange: oklch(0.5691 0.1801 45);
			--accent-3: oklch(0.6397 0.1431 190);
		}
	}
</style>
