<script lang="ts">
	import { SEO } from '@autonomy/seo'

	let { data } = $props()
	const Content = $derived(data.content)

	const docJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: `${data.meta.title} - Senior Capstone Pathway`,
		description:
			data.meta.description ||
			`Senior transition guide for collegiate and workplace executive functioning in ${data.meta.title} of The Autonomy Protocol.`,
		publisher: {
			'@type': 'EducationalOrganization',
			name: 'The Autonomy Protocol'
		},
		datePublished: data.meta.date
	})
</script>

<SEO
	title="{data.meta.title} - Senior Capstone Pathway | The Autonomy Protocol"
	description={data.meta.description ||
		`Senior transition guide for collegiate and workplace executive functioning in ${data.meta.title} of The Autonomy Protocol.`}
	type="article"
	keywords="senior capstone, {data.meta.title}, workplace readiness, adult executive functioning, post-secondary transition"
	jsonLd={docJsonLd}
/>

{#if Content}
	<Content />
{/if}
