<script lang="ts">
	import { page } from '$app/state'
    import { ScrollToTop } from '@autonomy/scroll-to-top'
	import { derived } from 'svelte/store'
	let { children } = $props()

	const colors = ['var(--brand-blue)', 'var(--brand-orange)', 'var(--brand-teal)']
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

	<header class="doc-header">
		<h1>{page.data.meta?.title}</h1>
		{#if page.data.meta?.description}
			<p class="description">{page.data.meta.description}</p>
		{/if}
	</header>

	<div class="markdown-body" style="--alt-color: {alt_color()}">
		{@render children()}
	</div>
</article>

<button onclick={() => window.print()} class="no-print" style="--color: {alt_color()}">
  Print Lesson Plan
</button>

<ScrollToTop />

<style>
	:global(h4) {
		color: var(--bg);
	}

	.back-link {
		color: var(--bg);
		font-weight: 700;
		text-transform: uppercase;
	}

    nav {
        margin: var(--gap-1) 0;
    }
</style>
