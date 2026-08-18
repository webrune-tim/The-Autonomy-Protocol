<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import type { LayoutData } from './$types';
	import { foresight } from '@autonomy/actions';

	// Assets
	import favicon from '#lib/assets/favicon.svg';

	// Styles
	import '@autonomy/style/index.css';

	// Shared Components
	import { Banner } from '@autonomy/banner';
	import { Footer } from '@autonomy/footer';
	import { Header } from '@autonomy/header';
	import { Logo } from '@autonomy/logo';
	import { DropNav, FooterNav } from '@autonomy/nav';
	import { Pill } from '@autonomy/pill';
	import { ScrollToTop } from '@autonomy/scroll-to-top';
	import { SessionWarning } from '@autonomy/session-warning';
	import { ThemeToggle, themeState } from '@autonomy/theme-toggle';
	import { motionState } from '#lib/motion.svelte.js';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();

	// Initialize theme from server data
	$effect(() => {
		themeState.init(data.theme);
	});

	const navLinks = $derived([
		{ href: '/', label: 'Home' },
		...(data.user ? [{ href: '/dashboard', label: 'Dashboard' }] : []),
		{ href: '/modules', label: 'Create Module' },
		{ href: '/curriculum', label: 'Curriculum' },
		{ href: '/resources', label: 'Resources' },
		{ href: '/mission', label: 'Mission' },
		{ href: '/road-map', label: 'Road Map' },
		{ href: '/join-us', label: 'Join Us' },
		{ href: '/contact', label: 'Contact' },
		{ href: '/donate', label: 'Donate' }
	]);

	const footerLinks = $derived([
		{ href: '/', label: 'Home' },
		{ href: '/mission', label: 'Mission' },
		{ href: '/join-us', label: 'Join Us' },
		{ href: '/curriculum', label: 'Curriculum' },
		{ href: '/resources', label: 'Resources' },
		{ href: '/road-map', label: 'Road Map' },
		{ href: '/contact', label: 'Contact' },
		{ href: '/donate', label: 'Donate' }
	]);

	$effect(() => {
		const localStorageKey = `scroll-y-position-${window.location.href}`;
		const savedPosition = localStorage.getItem(localStorageKey);

		if (savedPosition) {
			window.scrollTo(0, parseInt(savedPosition, 10));
		}

		const handleScroll = () => {
			localStorage.setItem(localStorageKey, window.scrollY.toString());
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	onNavigate((navigation) => {
		if (navigation.shallow) return;
		if (!document.startViewTransition || motionState.reduced) return;

		return new Promise((resolve) => {
			const isBack = navigation.type === 'popstate';

			if (isBack) {
				document.documentElement.classList.add('back-transition');
			}

			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});

			transition.finished.finally(() => {
				document.documentElement.classList.remove('back-transition');
			});
		});
	});

	const canonicalOrigin = $derived.by(() => {
		const raw = page.url?.origin;
		if (!raw || raw.includes('localhost') || raw.includes('sveltekit-prerender')) {
			return 'https://the-autonomy-protocol.vercel.app';
		}
		return raw;
	});
	const canonicalUrl = $derived(
		page.url
			? `${canonicalOrigin}${page.url.pathname}`
			: 'https://the-autonomy-protocol.vercel.app/'
	);

	const orgJsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'EducationalOrganization',
				'@id': 'https://the-autonomy-protocol.vercel.app/#organization',
				name: 'The Autonomy Protocol',
				url: 'https://the-autonomy-protocol.vercel.app',
				logo: 'https://the-autonomy-protocol.vercel.app/icon512_rounded.png',
				description:
					'Foundational curriculum for executive functioning, psychological literacy, and internal self-governance in secondary education.',
				sameAs: ['https://github.com/webrune-tim/The-Autonomy-Protocol']
			},
			{
				'@type': 'WebSite',
				'@id': 'https://the-autonomy-protocol.vercel.app/#website',
				url: 'https://the-autonomy-protocol.vercel.app',
				name: 'The Autonomy Protocol - Educator Portal',
				publisher: {
					'@id': 'https://the-autonomy-protocol.vercel.app/#organization'
				}
			}
		]
	};
</script>

<svelte:head>
	<title>The Autonomy Protocol | Educator Portal</title>
	<meta
		name="description"
		content="Transforming campus culture through student-led internal accountability, psychological literacy, and executive functioning."
	/>
	<link rel="canonical" href={canonicalUrl} />
	<link rel="stylesheet" href="/print.css" media="print" />
	<link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
	<meta name="theme-color" content="#388bfd" />
	<link rel="icon" href={favicon} />

	<!-- Open Graph / Social -->
	<meta property="og:site_name" content="The Autonomy Protocol" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content="The Autonomy Protocol | Educator Portal" />
	<meta
		property="og:description"
		content="Transforming campus culture through student-led internal accountability, psychological literacy, and executive functioning."
	/>
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content="{canonicalOrigin}/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="The Autonomy Protocol - Educator Portal" />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="The Autonomy Protocol | Educator Portal" />
	<meta
		name="twitter:description"
		content="Transforming campus culture through student-led internal accountability, psychological literacy, and executive functioning."
	/>
	<meta name="twitter:image" content="{canonicalOrigin}/og-image.png" />
	<meta name="twitter:image:alt" content="The Autonomy Protocol - Educator Portal" />

	<!-- Structured Data -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(orgJsonLd)}<\/script>`}
</svelte:head>

{#snippet headerLogo()}
	<a class="home-link" href="/" use:foresight><Logo /></a>
{/snippet}

{#snippet headerActions()}
	<Pill>α Alpha</Pill>
	<ThemeToggle />
{/snippet}

{#snippet headerNav()}
	<DropNav links={navLinks} currentPath={page.url.pathname} />
{/snippet}

<div class="layout-wrapper">
	<Header logo={headerLogo} actions={headerActions} nav={headerNav} />

	<div class="main-container">
		<Banner bannerName="site-under-development">
			<p>This educator portal is under active development. Pedagogical resources and curricula are updated continuously.</p>
			<p>
				If you encounter any issues, please report them via our
				<a href="/contact" use:foresight>contact page</a> or on our
				<a href="https://github.com/webrune-tim/The-Autonomy-Protocol/issues" target="_blank" rel="noreferrer">
					GitHub Issues page
				</a>.
			</p>
		</Banner>

		<main>
			{@render children()}
			<ScrollToTop />
		</main>
	</div>

	<SessionWarning user={data.user} />

	<Footer>
		<FooterNav links={footerLinks} currentPath={page.url.pathname} />
		<hr class="footer-divider" />
		<p class="copyright">The Autonomy Protocol © {new Date().getFullYear()} • Educator Portal</p>
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
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: var(--bg);
	}

	.main-container {
		width: 100%;
		max-width: var(--max-content-width, 1400px);
		margin-inline: auto;
		padding-inline: clamp(1rem, 3.5vw, 2.5rem);
		padding-block: var(--gap-2);
		flex: 1 0 auto;
		display: flex;
		flex-direction: column;
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
		max-width: 600px;
		border: none;
		border-top: 1px solid var(--ui-border);
		opacity: 0.5;
		margin-block: var(--gap-1);
	}

	:global(.copyright) {
		color: var(--text-muted);
		font-size: var(--font-size-sm);
		letter-spacing: 0.04em;
		margin: 0;
		text-align: center;
	}
</style>
