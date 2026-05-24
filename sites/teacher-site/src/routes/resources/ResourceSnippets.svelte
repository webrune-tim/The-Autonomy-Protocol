<script lang="ts">
	import { base } from '$app/paths'

	let { activeTab, step_links, agreement_links, freshman_links, senior_links } =
		$props()
</script>

<div class="tab-content-wrapper">
	{#if activeTab === 'steps'}
		<h2>Twelve Steps</h2>
		<p>Practical guides for governing self and starting the protocol.</p>
		<ul class="grid-container steps">
			{#each step_links as { slug, metadata } (slug)}
				<li>
					<a href="{base}/resources/steps/{slug}">
						{metadata.title ?? 'Untitled Resource'}
					</a>
				</li>
			{/each}
		</ul>
	{:else if activeTab === 'agreements'}
		<h2>Five Agreements</h2>
		<p>Flexible agreements for relationships and community governance.</p>
		<ul class="grid-container agreements">
			{#each agreement_links as { slug, metadata } (slug)}
				<li>
					<a href="{base}/resources/agreements/{slug}">
						{metadata.title ?? 'Untitled Resource'}
					</a>
				</li>
			{/each}
		</ul>
	{:else if activeTab === 'freshmen'}
		<h2>Freshman Worksheets</h2>
		<p>Foundational materials for new students.</p>
		<ul class="grid-container freshman">
			{#each freshman_links as { slug, metadata } (slug)}
				<li>
					<a href="{base}/resources/freshman/{slug}">
						{metadata.title ?? 'Untitled Resource'}
					</a>
				</li>
			{/each}
		</ul>
	{:else if activeTab === 'seniors'}
		<h2>Senior Worksheets</h2>
		<p>Advanced synthesis and governance materials.</p>
		<ul class="grid-container senior">
			{#each senior_links as { slug, metadata } (slug)}
				<li>
					<a href="{base}/resources/senior/{slug}">
						{metadata.title ?? 'Untitled Resource'}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.tab-content-wrapper {
		color: var(--black-80);
	}

	h2 {
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 900;
		margin: 0 0 1rem 0;
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-flow: column;
		gap: 0.75rem 2rem;
		margin: 2rem 0;
		list-style: none;
		padding: 0;
	}

	.grid-container.steps {
		grid-template-rows: repeat(6, auto);
	}

	/* Adding classes for freshman/senior to ensure the grid behaves if needed */
	.grid-container.agreements,
	.grid-container.freshman,
	.grid-container.senior {
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
		flex-shrink: 0;
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
