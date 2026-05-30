<script lang="ts">
	import { base } from '$app/paths'

	let { activeTab, allLinks } = $props()

	// Define the text content for each tab in one place
	const contentMap = {
		steps: {
			title: 'Twelve Steps',
			desc: 'Practical guides for governing self.',
			path: 'steps'
		},
		agreements: {
			title: 'Five Agreements',
			desc: 'Flexible agreements for community governance.',
			path: 'agreements'
		},
		freshmen: {
			title: 'Freshman Worksheets',
			desc: 'Foundational materials for new students.',
			path: 'freshman'
		},
		seniors: {
			title: 'Senior Worksheets',
			desc: 'Advanced synthesis and governance materials.',
			path: 'senior'
		}
	}

	// Use $derived to fix the {@const} invalid placement error
	let current = $derived(
		activeTab in contentMap
			? contentMap[activeTab as keyof typeof contentMap]
			: contentMap.steps // Default fallback
	)
</script>

{#snippet ResourceGrid(links, path)}
	<ul class="grid-container {path}">
		{#each links as { slug, metadata } (slug)}
			<li>
				<a href="{base}/resources/{path}/{slug}">
					{metadata.title ?? 'Untitled Resource'}
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

<div class="tab-content-wrapper">
	<h2 class="reveal-header">{current.title}</h2>
	<p>{current.desc}</p>

	{#if allLinks[activeTab].length > 0}
		{@render ResourceGrid(allLinks[activeTab], current.path)}
	{:else}
		<p>No resources found for this section.</p>
	{/if}
</div>

<style>
	.tab-content-wrapper {
		color: var(--black-80);
	}
	h2 {
		text-transform: uppercase;
		font-weight: 900;
		margin-bottom: 1rem;
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-flow: column;
		gap: 0.75rem 2rem;
		/* margin: 2rem 0; */
		list-style: none;
		padding: 0;
	}

	/* Row heights based on the content type */
	.grid-container.steps {
		grid-template-rows: repeat(6, auto);
	}
	.grid-container:not(.steps) {
		grid-template-rows: repeat(3, auto);
	}

	.grid-container li {
		display: flex;
		align-items: center;
		font-size: 1.1rem;
	}
	.grid-container li::before {
		content: '';
		display: inline-block;
		width: 6px;
		height: 6px;
		background: currentColor;
		margin-right: 12px;
	}

	.grid-container a {
		color: inherit;
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	@media (max-width: 768px) {
		.grid-container {
			grid-template-columns: 1fr;
			grid-auto-flow: row;
			grid-template-rows: none !important;
		}
	}
</style>
