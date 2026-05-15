<script lang="ts">
	import { page } from '$app/state'
	let { children } = $props()

	const colors = ['var(--brand-blue)', 'var(--brand-orange)', 'var(--brand-teal)']
	const color = colors[Math.floor(Math.random() * colors.length)]
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

	<div class="markdown-body">
		{@render children()}
	</div>
</article>

<button onclick={() => window.print()} class="no-print">
  Print Lesson Plan
</button>

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
