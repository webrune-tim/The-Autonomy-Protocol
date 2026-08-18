<script lang="ts">
	import { SEO } from '@autonomy/seo'

	let { data } = $props()
	const Content = $derived(data.content)

	const docJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: `${data.meta.title} - The Accountability Cycle`,
		description:
			data.meta.description ||
			`Student guide and self-governance exercise for ${data.meta.title} of The Autonomy Protocol.`,
		publisher: {
			'@type': 'EducationalOrganization',
			name: 'The Autonomy Protocol'
		},
		datePublished: data.meta.date
	})
</script>

<SEO
	title="{data.meta.title} - The Accountability Cycle | Student Portal"
	description={data.meta.description ||
		`Student guide and self-governance exercise for ${data.meta.title} of The Autonomy Protocol.`}
	type="article"
	keywords="accountability cycle, {data.meta.title}, student self-governance, high school executive functioning"
	jsonLd={docJsonLd}
/>

{#if Content}
	<Content />
{/if}
