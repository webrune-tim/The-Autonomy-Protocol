<script lang="ts">
	import { page } from '$app/state'
	import { ReadingTime } from '@autonomy/reading-time'

	let { children } = $props()

	const colors = ['var(--brand-primary)', 'var(--brand-secondary)', 'var(--brand-tertiary)']
	const color = colors[Math.floor(Math.random() * colors.length)]

	const alt_color = () => {
		if (color === colors[0]) {
			return colors[1]
		} else if (color === colors[1]) {
			return colors[2]
		} else {
			return colors[0]
		}
	}
</script>

<article class="unangled-box no-bottom-margin" style="--color: {color}">
	<nav>
		<a class="back-link" href="/resources">← Back to Resources</a>
	</nav>

	<button
		onclick={() => window.print()}
		class="print"
		style="--color: {alt_color()}"
	>
		Print Lesson Plan
	</button>

	<header class="doc-header">
		<h1>{page.data.meta?.title}</h1>
		{#if page.data.meta?.description}
			<p class="description">{page.data.meta.description}</p>
		{/if}
	</header>

	<ReadingTime
		targetSelector="#doc-content"
		textColor="var(--bg)"
		iconColor="var(--bg)"
		fontSize="--font-size-4"
	/>

	<div id="doc-content" class="markdown-body" style="--alt-color: {alt_color()}">
		{@render children()}
	</div>

    <footer>
		<a class="back-link" href="/resources">← Back to Resources</a>
	</footer>
</article>

<style>
	article {
		position: relative;
	}

	.print {
		position: absolute;
		top: var(--gap-2);
		right: var(--gap-2);

		@media print {
			display: none;
		}

		@media (max-width: 600px) {
			display: none;
		}
	}

	:global(h4) {
		color: var(--bg);
	}

	.back-link {
		color: var(--bg);
		font-weight: 700;
		text-transform: uppercase;
	}

	nav,
    footer {
		margin: var(--gap-1) 0;
	}
</style>
