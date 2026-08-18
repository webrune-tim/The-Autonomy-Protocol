<script lang="ts">
	import { SEO } from '@autonomy/seo'

	let { data } = $props()
	const Content = $derived(data.content)

	const docJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: `${data.meta.title} - The Integrity Protocol`,
		description:
			data.meta.description ||
			`Interpersonal integrity principles and conflict reduction skills for ${data.meta.title} of The Autonomy Protocol.`,
		publisher: {
			'@type': 'EducationalOrganization',
			name: 'The Autonomy Protocol'
		},
		datePublished: data.meta.date
	})
</script>

<SEO
	title="{data.meta.title} - The Integrity Protocol | Student Portal"
	description={data.meta.description ||
		`Interpersonal integrity principles and conflict reduction skills for ${data.meta.title} of The Autonomy Protocol.`}
	type="article"
	keywords="integrity protocol, {data.meta.title}, emotional neutrality, precision of speech, student agreements"
	jsonLd={docJsonLd}
/>

{#if Content}
	<Content />
{/if}
