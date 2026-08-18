<script lang="ts">
	import { SEO } from '@autonomy/seo'

	let { data } = $props()
	const Content = $derived(data.content)

	const docJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: `${data.meta.title} - Senior Capstone Transition`,
		description:
			data.meta.description ||
			`Senior transition guide for adult autonomy, career readiness, and workplace executive functioning in ${data.meta.title}.`,
		publisher: {
			'@type': 'EducationalOrganization',
			name: 'The Autonomy Protocol'
		},
		datePublished: data.meta.date
	})
</script>

<SEO
	title="{data.meta.title} - Senior Capstone Transition | Student Portal"
	description={data.meta.description ||
		`Senior transition guide for adult autonomy, career readiness, and workplace executive functioning in ${data.meta.title}.`}
	type="article"
	keywords="senior transition, {data.meta.title}, adult life management, college and career readiness"
	jsonLd={docJsonLd}
/>

{#if Content}
	<Content />
{/if}
