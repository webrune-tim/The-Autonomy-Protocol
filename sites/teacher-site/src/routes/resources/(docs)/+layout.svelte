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

<!-- <style>
	/* Base Layout */
	.resource-layout {
		max-width: 900px;
		margin: 0 auto;
		padding: var(--gap-3) var(--gap-2);
		font-family: var(--font-sans-2); /* Inter */
	}

	/* Navigation Link */
	.nav-link {
		color: var(--brand-orange);
		font-weight: 500;
		text-transform: capitalize;
	}

	/* Header Section */
	.doc-header {
		margin-top: var(--gap-2);
		margin-bottom: var(--gap-3);
	}

	/* "Step One" / Title */
	h1 {
		color: var(--brand-orange);
		font-family: var(--font-header-sans-1); /* Poppins */
		font-size: var(--font-size-1);
		font-weight: 900;
		margin: 0;
		line-height: 1.1;
	}

	.description {
		color: var(--fg);
		font-size: var(--font-size-4);
		margin-top: var(--gap-1);
		opacity: 0.8;
	}

	/* --- Markdown Content Body --- */

	/* Large Blue Subtitles (e.g., "As a student...") */
	.markdown-body :global(h2) {
		color: var(--brand-blue);
		font-family: var(--font-header-sans-1);
		font-size: var(--font-size-2);
		font-weight: 800;
		line-height: 1.2;
		margin-top: var(--gap-3);
		margin-bottom: var(--gap-1);
	}

	/* Teal Section Headers (e.g., "The Autonomy Solution") */
	.markdown-body :global(h3) {
		color: var(--brand-teal);
		font-family: var(--font-header-sans-1);
		font-size: var(--font-size-3);
		font-weight: 700;
		margin-top: var(--gap-2);
	}

	.markdown-body :global(p) {
		line-height: 1.6;
		font-size: 1.1rem;
		color: var(--fg);
		margin-bottom: var(--gap-2);
	}

	/* Styled Bullet Points */
	.markdown-body :global(ul) {
		list-style: none;
		padding-left: 0;
	}

	.markdown-body :global(li) {
		position: relative;
		padding-left: 1.5rem;
		margin-bottom: 0.75rem;
		font-size: 1.1rem;
	}

	/* Custom Bullet Marker */
	.markdown-body :global(li::before) {
		content: '•';
		color: var(--brand-orange);
		font-weight: bold;
		display: inline-block;
		width: 1.5rem;
		margin-left: -1.5rem;
	}

	/* Strong Tags use the Brand Orange per your CSS */
	.markdown-body :global(strong) {
		color: var(--brand-orange);
		font-weight: 700;
	}

	/* Blue Emphasis for Specific Sections (like the "CANNOT control" list) */
	.markdown-body :global(.control-header) {
		color: var(--brand-blue);
		font-weight: 800;
	}

	/* Dark Theme aesthetic adjustment */
	:global(body) {
		background-color: var(--bg);
		color: var(--fg);
	}
</style> -->

<style>
	:global(h4) {
		color: var(--bg);
	}

	.back-link {
		color: var(--bg);
		font-weight: 700;
		text-transform: uppercase;
	}
</style>
