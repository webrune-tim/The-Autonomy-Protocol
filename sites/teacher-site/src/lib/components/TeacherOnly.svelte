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
		user?.role === 'teacher' || user?.role === 'admin' || user?.role === 'superadmin'
	)
</script>

{#if isAuthorized}
	<aside class="bold-border-box margin-top" style="--border-color: var(--fg)" aria-label="Teacher Toolkit">
		<div class="teacher-header">
			<h3>Teacher Toolkit</h3>
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
	}

	.teacher-header h3 {
		margin: 0;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-family: var(--font-header-sans-2);
	}

	.teacher-content {
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--fg);
	}

	/* Ensure markdown content inside looks okay */
	.teacher-content :global(p) {
		margin: 0.5rem 0;
	}

	.teacher-content :global(strong) {
		color: var(--brand-orange);
	}
</style>
