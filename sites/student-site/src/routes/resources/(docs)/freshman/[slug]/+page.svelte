<script lang="ts">
	import { SEO } from '@autonomy/seo'

	let { data } = $props()
	const Content = $derived(data.content)

	const docJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: `${data.meta.title} - Freshman Orientation Practicum`,
		description:
			data.meta.description ||
			`Freshman orientation and self-regulation guide for ${data.meta.title} of The Autonomy Protocol.`,
		publisher: {
			'@type': 'EducationalOrganization',
			name: 'The Autonomy Protocol'
		},
		datePublished: data.meta.date
	})
</script>

<SEO
	title="{data.meta.title} - Freshman Orientation Practicum | Student Portal"
	description={data.meta.description ||
		`Freshman orientation and self-regulation guide for ${data.meta.title} of The Autonomy Protocol.`}
	type="article"
	keywords="freshman orientation, {data.meta.title}, transition to high school, student self-regulation"
	jsonLd={docJsonLd}
/>

{#if Content}
	<Content />
{/if}
