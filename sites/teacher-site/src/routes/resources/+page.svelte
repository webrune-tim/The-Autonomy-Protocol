<script lang="ts">
	import { thickMargins } from '@autonomy/actions'
	import { ArrowBigRight, Route } from '@lucide/svelte'
	import ResourceSnippets from './ResourceSnippets.svelte'

	type Tab = 'steps' | 'agreements' | 'freshmen' | 'seniors'
	let activeTab = $state<Tab>('steps')

	const tabColors: Record<Tab, string> = {
		steps: 'var(--brand-tertiary)',
		agreements: 'var(--brand-secondary)',
		freshmen: 'var(--brand-tertiary)',
		seniors: 'var(--brand-secondary)'
	}
	const tabContrastColors: Record<Tab, string> = {
		steps: 'var(--brand-tertiary-contrast)',
		agreements: 'var(--brand-secondary-contrast)',
		freshmen: 'var(--brand-tertiary-contrast)',
		seniors: 'var(--brand-secondary-contrast)'
	}

	interface MarkdownModule {
		metadata: { order?: number; title?: string }
	}

	function transformGlobToLinks(files: Record<string, any>) {
		return Object.entries(files)
			.map(([path, module]) => ({
				slug: path.split('/').at(-1)?.replace('.md', ''),
				metadata: (module as MarkdownModule).metadata
			}))
			.sort((a, b) => (a.metadata.order ?? 99) - (b.metadata.order ?? 99))
	}

	const allLinks = {
		steps: transformGlobToLinks(
			import.meta.glob('$docs/steps/*.md', { eager: true })
		),
		agreements: transformGlobToLinks(
			import.meta.glob('$docs/agreements/*.md', { eager: true })
		),
		freshmen: transformGlobToLinks(
			import.meta.glob('$docs/freshman/*.md', { eager: true })
		),
		seniors: transformGlobToLinks(
			import.meta.glob('$docs/senior/*.md', { eager: true })
		)
	}
</script>

<section
	class="angled-bottom-box"
	style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast)"
>
	<h1>Resources</h1>
	<p class="description">
		A centralized library of worksheets, frameworks, and assessment guides to
		streamline your delivery of <strong>The Autonomy Protocol</strong> across all grade
		levels.
	</p>
	<a class="cta" href="/contact">
		<Route /> Need Custom Support? <ArrowBigRight />
	</a>

	<nav class="angled-bottom-box bottom-padding">
		<ul class="tab-list">
			{#each ['steps', 'agreements', 'freshmen', 'seniors'] as tab (tab)}
				<li>
					<button
						class:active={activeTab === tab}
						onclick={() => (activeTab = tab as Tab)}
					>
						{tab}
					</button>
				</li>
			{/each}
		</ul>
	</nav>
</section>

<section
	class="angled-top-box thick-margins no-bottom-margin"
	use:thickMargins
	style="--color: {tabColors[activeTab]}; --text_color: {tabContrastColors[
		activeTab
	]}"
>
	<ResourceSnippets {activeTab} {allLinks} />
</section>

<style>
	nav {
		margin-top: var(--gap-2);
		padding: 1rem;
		background: var(--brand-primary-dark);
	}

	.tab-list {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0;
		gap: 4px;
		overflow-x: auto;
	}

	.tab-list li {
		flex: 1;
		flex-shrink: 0;
		margin: 0;
	}

	button {
		width: 100%;
		background: transparent;
		border: none;
		color: var(--white);
		opacity: 0.8;
		/* padding: 12px 16px; */
		font-family: inherit;
		font-size: var(--font-size-4);
		font-weight: 800;
		text-transform: uppercase;
		cursor: pointer;
	}

	button.active {
		opacity: 1;
		background: var(--brand-secondary);
		color: var(--bg);
	}
</style>
