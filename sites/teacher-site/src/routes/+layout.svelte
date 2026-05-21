<script lang="ts">
	import type { Snippet } from 'svelte'
	import { themeState } from '@autonomy/theme-toggle'
	import { page } from '$app/stores'
	import type { LayoutData } from './$types'

	// Assets
	import favicon from '$lib/assets/favicon.svg'
	import OgImg from '$images/og-img.png'
	import '@autonomy/style/index.css'

	// Shared Components
	import { Banner } from '@autonomy/banner'
	// import { BatteryLevel } from '@autonomy/battery-level'
	import { Footer } from '@autonomy/footer'
	import { Header } from '@autonomy/header'
	import { Logo } from '@autonomy/logo'
	import { DropNav, FooterNav } from '@autonomy/nav'
	import { Pill } from '@autonomy/pill'
	import { ScrollToTop } from '@autonomy/scroll-to-top'

	// Local components
	// import { ThemeToggle } from '$components'

	interface Props {
		data: LayoutData
		children: Snippet
	}

	let { data, children }: Props = $props()

	// Initialize theme from server data
	$effect(() => {
		themeState.init(data.theme)
	})

	const navLinks = $derived([
		{ href: '/', label: 'Home' },
		{ href: '/mission', label: 'Mission' },
		{ href: '/join-us', label: 'Join Us' },
		{ href: '/curriculum', label: 'Curriculum' },
		{ href: '/resources', label: 'Resources' },
		{ href: '/road-map', label: 'Road Map' },
		{ href: '/contact', label: 'Contact' },
		...(data.user ? [{ href: '/dashboard', label: 'Dashboard' }] : [])
	])

	const footerLinks = $derived([
		{ href: '/', label: 'Home' },
		{ href: '/mission', label: 'Mission' },
		{ href: '/join-us', label: 'Join Us' },
		{ href: '/curriculum', label: 'Curriculum' },
		{ href: '/resources', label: 'Resources' },
		{ href: '/road-map', label: 'Road Map' },
		{ href: '/contact', label: 'Contact' }
	])

	$effect(() => {
		const localStorageKey = `scroll-y-position-${window.location.href}`

		const savedPosition = localStorage.getItem(localStorageKey)
		if (savedPosition) {
			window.scrollTo(0, parseInt(savedPosition, 10))
		}

		const handleScroll = () => {
			localStorage.setItem(localStorageKey, window.scrollY.toString())
		}

		window.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})
</script>

<svelte:head>
	<title>The Autonomy Protocol</title>
	<meta
		name="description"
		content="Stop letting drama and stress run the show. Learn the 'Life Skills' you actually need to be your own boss."
	/>
	<link rel="stylesheet" href="/print.css" media="print" />
	<link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
	<meta name="theme-color" content="#ff9661" />
	<link rel="icon" href={favicon} />
	<meta property="og:title" content="The Autonomy Protocol" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://the-autonomy-protocol.vercel.app/" />
	<meta property="og:image" content={OgImg} />
</svelte:head>

{#snippet headerLogo()}
	<a class="home-link" href="/"><Logo /></a>
{/snippet}

{#snippet headerActions()}
	<Pill>&#945; Alpha</Pill>
	<!-- <ThemeToggle /> -->
{/snippet}

{#snippet headerNav()}
	<DropNav links={navLinks} currentPath={$page.url.pathname} />
{/snippet}

<div class="layout-wrapper">
	<Header logo={headerLogo} actions={headerActions} nav={headerNav} />

	<Banner bannerName="site-under-development">
		<p>
			This site is still under heavy development. Content may change without notice.
		</p>
		<p>
			If you encounter any issues, please report them via our
			<a href="/contact">contact page</a> or on
			<a
				href="https://github.com/webrune-tim/The-Autonomy-Protocol/issues"
				target="_blank"
			>
				GitHub Issues page
			</a>.
		</p>
	</Banner>

	<main>
		<!-- {#if import.meta.env.DEV}
			<BatteryLevel />
		{/if} -->
		{@render children()}
		<ScrollToTop />
	</main>

	<Footer>
		<FooterNav links={footerLinks} currentPath={$page.url.pathname} />
		<hr class="footer-divider" />
		<p class="copyright">The Autonomy Protocol &copy; {new Date().getFullYear()}</p>
	</Footer>
</div>

<style>
	.layout-wrapper {
		max-width: 1000px;
		margin: var(--gap-2) auto;
		min-height: 100svh;
		display: grid;
		padding: var(--gap-2);
		grid-template-rows: auto auto 1fr auto; /* Adjusted for Banner */
		background: var(--surface-4);
		gap: var(--gap-2);
	}

	main {
		width: 100%;
	}

	.home-link,
	.home-link:hover {
		text-decoration: none;
	}

	:global(.footer-divider) {
		width: 100%;
		border: none;
		/* Keeping your cool clamp logic for that technical line aesthetic */
		border-top: clamp(1px, 0.1svw, 2px) solid var(--fg);
		opacity: 0.3; /* Softens the line so it doesn't distract from the text */
		margin: var(--gap-1) 0;
	}

	:global(.copyright) {
		font-size: 0.8rem;
		letter-spacing: 0.05em;
		opacity: 0.6; /* Mutes the copyright to establish visual hierarchy */
		margin: 0;
		text-align: center;
	}
</style>
