<script lang="ts">
	import type { Snippet } from 'svelte'
	import { page } from '$app/stores'
	import { onNavigate } from '$app/navigation'
	import type { LayoutData } from './$types'

	// Assets
	import favicon from '$lib/assets/favicon.svg'
	import OgImg from '$images/og-image.png'

	// Styles
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
	import { themeState } from '@autonomy/theme-toggle'
	import { motionState } from '$lib/motion.svelte'

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
		{ href: '/donate', label: 'Donate' },
		...(data.user ? [{ href: '/dashboard', label: 'Dashboard' }] : [])
	])

	const footerLinks = $derived([
		{ href: '/', label: 'Home' },
		{ href: '/mission', label: 'Mission' },
		{ href: '/join-us', label: 'Join Us' },
		{ href: '/curriculum', label: 'Curriculum' },
		{ href: '/resources', label: 'Resources' },
		{ href: '/road-map', label: 'Road Map' },
		{ href: '/contact', label: 'Contact' },
		{ href: '/donate', label: 'Donate' }
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

	onNavigate((navigation) => {
		if (!document.startViewTransition || motionState.reduced) return

		return new Promise((resolve) => {
			// Determine if we are going "back"
			const isBack = navigation.type === 'popstate'

			if (isBack) {
				document.documentElement.classList.add('back-transition')
			}

			const transition = document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})

			// Clean up the class after the transition finishes
			transition.finished.finally(() => {
				document.documentElement.classList.remove('back-transition')
			})
		})
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
	<meta name="theme-color" content="#bf616a" />
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
	@media (prefers-reduced-motion: reduce) {
		:global(*) {
			transition: none !important;
			animation: none !important;
		}
	}

	/* --- Default (Forward) Transitions --- */
	:global(::view-transition-group(root)) {
		animation-duration: 200ms;
	}

	:global(::view-transition-old(root)) {
		animation-name: slide-out-to-left;
	}

	:global(::view-transition-new(root)) {
		animation-name: slide-in-from-right;
	}

	/* --- Backwards Transitions --- */
	:global(.back-transition::view-transition-old(root)) {
		animation-name: slide-out-to-right;
	}

	:global(.back-transition::view-transition-new(root)) {
		animation-name: slide-in-from-left;
	}

	/* --- Keyframes --- */
	@keyframes -global-slide-out-to-left {
		to {
			transform: translateX(-100%);
		}
	}
	@keyframes -global-slide-in-from-right {
		from {
			transform: translateX(100%);
		}
	}

	@keyframes -global-slide-out-to-right {
		to {
			transform: translateX(100%);
		}
	}
	@keyframes -global-slide-in-from-left {
		from {
			transform: translateX(-100%);
		}
	}

	.layout-wrapper {
		max-width: 1200px;
		min-height: 100svh;
		margin: 0 auto;
		display: grid;
		padding: var(--gap-2);
		grid-template-rows: auto auto 1fr auto;
		gap: var(--gap-2);

		p {
			font-weight: bolder;
		}
	}

	main {
		width: 100%;
	}

	.home-link,
	.home-link:hover {
		text-decoration: none;
	}

	:global(.footer-divider) {
		margin-left: calc(var(--gap-1) * -1);
		margin-right: calc(var(--gap-1) * -1);
		width: calc(100% + (var(--gap-1) * 2));

		/* Base styles */
		border: none;
		opacity: 0.4;
		margin-top: var(--gap-1);
		margin-bottom: var(--gap-1);
	}

	:global(.copyright) {
		color: var(--nord4);
		font-size: var(--font-size-4);
		letter-spacing: 0.05em;
		opacity: 0.8;
		margin: 0;
		text-align: center;
	}
</style>
