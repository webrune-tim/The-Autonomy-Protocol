<script lang="ts">
	import { SEO } from '@autonomy/seo'

	let { data } = $props()
	const Content = $derived(data.content)

	const docJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: `${data.meta.title} - Freshman Advisory Practicum`,
		description:
			data.meta.description ||
			`Freshman orientation and self-governance lesson guide for ${data.meta.title} of The Autonomy Protocol.`,
		publisher: {
			'@type': 'EducationalOrganization',
			name: 'The Autonomy Protocol'
		},
		datePublished: data.meta.date
	})
</script>

<SEO
	title="{data.meta.title} - Freshman Advisory Practicum | The Autonomy Protocol"
	description={data.meta.description ||
		`Freshman orientation and self-governance lesson guide for ${data.meta.title} of The Autonomy Protocol.`}
	type="article"
	keywords="freshman advisory, {data.meta.title}, transition curriculum, high school behavioral baseline"
	jsonLd={docJsonLd}
/>

{#if Content}
	<Content />
{/if}
