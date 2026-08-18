<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		title: string;
		description: string;
		canonical?: string;
		type?: 'website' | 'article';
		image?: string;
		imageAlt?: string;
		keywords?: string;
		noindex?: boolean;
		siteName?: string;
		jsonLd?: Record<string, any> | Array<Record<string, any>>;
	}

	let {
		title,
		description,
		canonical,
		type = 'website',
		image,
		imageAlt = 'The Autonomy Protocol - Self-Governance and Psychological Literacy Curriculum',
		keywords,
		noindex = false,
		siteName = 'The Autonomy Protocol',
		jsonLd
	}: Props = $props();

	const defaultOrigin = $derived.by(() => {
		if (siteName.includes('Student') || (page?.url && page.url.hostname.includes('student'))) {
			return 'https://the-autonomy-protocol-student.vercel.app';
		}
		return 'https://the-autonomy-protocol.vercel.app';
	});

	const effectiveOrigin = $derived.by(() => {
		const raw = page?.url?.origin;
		if (!raw || raw.includes('localhost') || raw.includes('sveltekit-prerender')) {
			return defaultOrigin;
		}
		return raw;
	});

	const canonicalUrl = $derived(
		canonical || (page?.url ? `${effectiveOrigin}${page.url.pathname}` : `${defaultOrigin}/`)
	);

	const imageUrl = $derived.by(() => {
		if (image) {
			if (image.startsWith('http://') || image.startsWith('https://')) {
				return image;
			}
			return `${effectiveOrigin}${image.startsWith('/') ? '' : '/'}${image}`;
		}
		return `${effectiveOrigin}/og-image.png`;
	});

	const jsonLdString = $derived(jsonLd ? JSON.stringify(jsonLd) : null);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:site_name" content={siteName} />
	<meta property="og:type" content={type} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	{#if canonicalUrl}
		<meta property="og:url" content={canonicalUrl} />
	{/if}
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:alt" content={imageAlt} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content={imageAlt} />

	<!-- JSON-LD Structured Data -->
	{#if jsonLdString}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script type="application/ld+json">${jsonLdString}<\/script>`}
	{/if}
</svelte:head>
