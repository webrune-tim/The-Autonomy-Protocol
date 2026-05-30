<script lang="ts">
	import { page } from '$app/state'
	import { ReadingTime } from '@autonomy/reading-time'
	import { ArrowLeft } from '@lucide/svelte'

	let { children } = $props()

	const colors = [
		{ bg: 'var(--brand-primary)', fg: 'var(--brand-primary-contrast)' },
		{ bg: 'var(--brand-secondary)', fg: 'var(--brand-secondary-contrast)' },
		{ bg: 'var(--brand-tertiary)', fg: 'var(--brand-tertiary-contrast)' }
	]
	const color = colors[Math.floor(Math.random() * colors.length)]

	const alt_color = () => {
		if (color.bg === colors[0].bg) {
			return colors[1].bg
		} else if (color.bg === colors[1].bg) {
			return colors[2].bg
		} else {
			return colors[0].bg
		}
	}
</script>

<article
	class="unangled-box no-bottom-margin"
	style="--color: {color.bg}; --text_color: {color.fg} !important;"
>
	<nav>
		<a class="cta" href="/resources">
			<ArrowLeft size={32} />
			Back to Resources
		</a>
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

		<ReadingTime
			targetSelector="#doc-content"
			textColor="var(--bg)"
			iconColor="var(--bg)"
			fontSize="--font-size-4"
		/>

		{#if page.data.meta?.description}
			<p class="description">{page.data.meta.description}</p>
		{/if}
	</header>

	<div id="doc-content" class="markdown-body" style="--alt-color: {alt_color()}">
		{@render children()}
	</div>

	<footer>
		<a class="cta" href="/resources">
			<ArrowLeft size={32} />
			Back to Resources
		</a>
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
		color: var(--fg);

		@media print {
			display: none;
		}

		@media (max-width: 600px) {
			display: none;
		}
	}

	/* :global(h4) {
		color: var(--bg);
	} */

	nav,
	footer {
		margin: var(--gap-1) 0;
	}
</style>
