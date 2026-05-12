<script lang="ts">
	import type { Snippet } from 'svelte'
	import { themeState } from '$lib/stores/theme.svelte'
	import { page } from '$app/stores'
	import type { LayoutData } from './$types'

	// Assets
	import favicon from '$lib/assets/favicon.svg'
	import OgImg from '$images/og-img.png'
	import '@autonomy/new-style/index.css'

	// Shared Components
	import { Banner } from '@autonomy/banner'
	import { Footer } from '@autonomy/footer'
	import { FooterNav } from '@autonomy/footer-nav'
	import { Header } from '@autonomy/header'
	import { Logo } from '@autonomy/logo'
	import { DropNav } from '@autonomy/nav'
	import { Pill } from '@autonomy/pill'

	// Local components
	import { ThemeToggle } from '$components'

	interface Props {
		data: LayoutData
		children: Snippet
	}

	let { data, children }: Props = $props()

	// Initialize theme from server data
	$effect(() => {
		themeState.init(data.theme)
	})

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/mission', label: 'Mission' },
		{ href: '/join-us', label: 'Join Us' },
		{ href: '/curriculum', label: 'Curriculum' },
		{ href: '/resources', label: 'Resources' },
		{ href: '/road-map', label: 'Road Map' },
		{ href: '/contact', label: 'Contact' }
	]

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
	<link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
	<meta name="theme-color" content="#ff9661" />
	<link rel="icon" href={favicon} />
	<meta property="og:title" content="The Autonomy Protocol" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://the-autonomy-protocol.vercel.app/" />
	<meta property="og:image" content={OgImg} />
</svelte:head>

{#snippet headerLogo()}
	<Logo />
{/snippet}

{#snippet headerActions()}
	<Pill>&#945; Alpha</Pill>
	<ThemeToggle />
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
		{@render children()}
	</main>

	<Footer>
		<p>The Autonomy Project &copy; {new Date().getFullYear()}</p>
		<FooterNav links={navLinks} currentPath={$page.url.pathname} />
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
</style>
