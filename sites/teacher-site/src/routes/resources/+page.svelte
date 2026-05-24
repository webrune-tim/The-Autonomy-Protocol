<script lang="ts">
	import { thickMargins } from '@autonomy/actions'

    const activeTab<'steps' || 'agreements' || 'freshman' || 'senior'> = $state('steps');

    function setTab(tab: string) {
        activeTab = tab;
    }

	// Define what a single Markdown module looks like
	interface MarkdownModule {
		metadata: {
			order?: number
			[key: string]: any
		}
		default?: any // The rendered content, if needed
	}

	/**
	 * Transforms Vite glob imports into a sorted array of link objects.
	 */
	function transformGlobToLinks<T extends Record<string, any>>(files: T) {
		return Object.entries(files)
			.map(([path, module]) => {
				// Cast the module to our expected structure
				const file = module as MarkdownModule

				return {
					slug: path.split('/').at(-1)?.replace('.md', ''),
					metadata: file.metadata
				}
			})
			.sort((a, b) => {
				const orderA = a.metadata.order ?? 99
				const orderB = b.metadata.order ?? 99
				return orderA - orderB
			})
	}

	const steps = import.meta.glob('$docs/steps/*.md', { eager: true })
	const agreements = import.meta.glob('$docs/agreements/*.md', { eager: true })

	// Now it's just one line each
	const step_links = transformGlobToLinks(steps)
	const agreement_links = transformGlobToLinks(agreements)
</script>

<section class="angled-bottom-box" style="--color: var(--brand-primary)">
	<h1>Resources</h1>
	<p>
		These resources will help your guide your students through 
        <strong>The Autonomy Protocol</strong>.
	</p>
    <nav>
        <ul>
            <li>
                <button>The Steps</button>
            </li>
            <li>
                <button>The Agreements</button>
            </li>
            <li>
                <button>Freshman Worksheets</button>
            </li>
            <li>
                <button>Senior Worksheets</button>
            </li>
        </ul>
    </nav>
</section>

<section
	class="angled-top-bottom-box thick-margins"
	use:thickMargins
	style="--color: var(--brand-tertiary)"
>
	<h2>Twelve Steps</h2>
	<p>
		The Steps are a series of practical guides that walk you through the process of
		taking control of your life and starting to govern yourself. Each Step is
		designed to be actionable and easy to follow, so you can start making progress
		right away.
	</p>

	{#if step_links.length > 0}
		<ul class="grid-container steps">
			{#each step_links as { slug, metadata }}
				<li>
					<a href="/resources/steps/{slug}">
						{metadata.title ?? 'Untitled Resource'}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No resources found.</p>
	{/if}
</section>

<section
	class="angled-top-box no-bottom-margin"
	use:thickMargins
	style="--color: var(--brand-secondary)"
>
	<h2>Five Agreements</h2>
	<p>
		The Agreements are a collection of agreements that you can use to govern yourself
		and your relationships with others. These agreements are designed to be flexible
		and customizable, so you can adapt them to fit your own needs and circumstances.
	</p>

	{#if agreement_links.length > 0}
		<ul class="grid-container agreements">
			{#each agreement_links as { slug, metadata }}
				<li>
					<a href="/resources/agreements/{slug}">
						{metadata.title ?? 'Untitled Resource'}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No resources found.</p>
	{/if}
</section>

<style>
	a {
		/* color: var(--bg); */
		text-decoration: underline !important;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-flow: column;
		gap: 0.75rem 2rem;

		list-style: none;
		padding: 0;
		margin: 1.5rem 0;

		&.steps {
			grid-template-rows: repeat(6, auto);
		}

		&.agreements {
			grid-template-rows: repeat(3, auto);
		}
	}

	/* To match the all-caps look in your reference image */
	h2 {
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
</style>
