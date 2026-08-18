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
			`Interpersonal dynamics and communication standards for ${data.meta.title} of The Autonomy Protocol.`,
		publisher: {
			'@type': 'EducationalOrganization',
			name: 'The Autonomy Protocol'
		},
		datePublished: data.meta.date
	})
</script>

<SEO
	title="{data.meta.title} - The Integrity Protocol | The Autonomy Protocol"
	description={data.meta.description ||
		`Interpersonal dynamics and communication standards for ${data.meta.title} of The Autonomy Protocol.`}
	type="article"
	keywords="integrity protocol, {data.meta.title}, four agreements secular, emotional neutrality, precision of speech"
	jsonLd={docJsonLd}
/>

{#if Content}
	<Content />
{/if}
