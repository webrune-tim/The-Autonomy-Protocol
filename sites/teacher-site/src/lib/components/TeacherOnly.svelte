<script lang="ts">
	import { page } from '$app/state'
	import type { Snippet } from 'svelte'
	import TeacherCta from './TeacherCta.svelte'

	let {
		children,
		showCta = true
	}: {
		children: Snippet
		showCta?: boolean
	} = $props()

	const user = $derived(page.data.user)
	const isAuthorized = $derived(
		Boolean(user && user.role !== 'student')
	)
</script>

{#if isAuthorized}
	<div class="new-page"></div>
	<aside
		class="bold-border-box margin-top"
		style="--border-color: var(--bg); --text_color: var(--fg);"
		aria-label="Teacher Toolkit"
	>
		<div class="teacher-header">
			<h3 class="reveal-header">Teacher Toolkit</h3>
		</div>
		<div class="teacher-content">
			{@render children()}
		</div>
	</aside>
{:else if showCta}
	<TeacherCta />
{/if}

<style>
	.teacher-header {
		margin-bottom: var(--gap-1);
		padding-bottom: 0.25rem;
		border-bottom: 1px solid var(--ui-border, rgba(255, 255, 255, 0.15));
	}

	.teacher-header h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-family: var(--font-header-sans-2);
		color: var(--brand-tertiary);
	}

	.teacher-content {
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--fg);
	}

	.teacher-content :global(h2) {
		color: var(--brand-primary);
		font-size: 1.35rem;
		font-weight: 800;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		letter-spacing: -0.01em;
	}

	.teacher-content :global(h3) {
		color: var(--brand-secondary);
		font-size: 1.1rem;
		font-weight: 700;
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.teacher-content :global(h4),
	.teacher-content :global(h5),
	.teacher-content :global(h6) {
		color: var(--brand-tertiary);
		font-size: 1rem;
		font-weight: 700;
		margin-top: 1rem;
		margin-bottom: 0.35rem;
	}

	.teacher-content :global(p) {
		margin: 0.5rem 0 1rem 0;
		color: var(--fg);
	}

	.teacher-content :global(ul),
	.teacher-content :global(ol) {
		margin: 0.5rem 0 1rem 1.25rem;
		padding: 0;
		color: var(--fg);
	}

	.teacher-content :global(li) {
		margin-bottom: 0.5rem;
		line-height: 1.5;
		color: var(--fg);
	}

	.teacher-content :global(strong) {
		color: var(--fg);
		font-weight: 700;
	}

	.teacher-content :global(hr) {
		border: 0;
		border-top: 1px solid var(--ui-border, rgba(255, 255, 255, 0.2));
		margin: 1.5rem 0;
	}
</style>
