<script lang="ts">
	import { moduleState, getModuleProgress, initModuleState, toggleSection } from '$stores/moduleStore.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Set which module this page represents
	const moduleId = $derived(data.module.id);

	// Initialize the module state when the page loads
	$effect(() => {
		if (moduleId) {
			initModuleState(moduleId, data.module.sections.map(s => s.id));
		}
	});

	// $derived ensures this variable recalculates anytime moduleState changes
	let progress = $derived(getModuleProgress(moduleId as any));

	// Helper for safe checkbox binding
	function getSectionState(secId: string) {
		if (!moduleState[moduleId]) return false;
		return moduleState[moduleId][secId] ?? false;
	}
</script>

<div class="module-container">
	<header class="angled-bottom-box">
		<h1 class="reveal-header">{data.module.title}</h1>

		<div class="progress-wrapper">
			<div class="progress-bar" style="width: {progress}%;"></div>
		</div>
		<p class="larger-text">{progress}% Completed</p>
	</header>

	<main class="margin-top-2">
		{#each data.module.sections as section (section.id)}
			<section class="content">
				<h2>{section.title}</h2>
				<p>{section.content}</p>

				<label>
					<input
						type="checkbox"
						checked={getSectionState(section.id)}
						onchange={(e) => toggleSection(moduleId, section.id, e.currentTarget.checked)}
					/>
					Mark "{section.title}" as complete
				</label>
			</section>
		{/each}
	</main>
</div>

<style>
	.module-container {
		max-width: 800px;
		margin: 0 auto;
		padding: var(--gap-2);
	}

	.progress-wrapper {
		width: 100%;
		background-color: var(--surface-3);
		border-radius: var(--border-radius);
		height: 12px;
		overflow: hidden;
		margin: var(--gap-1) 0;
	}

	.progress-bar {
		height: 100%;
		background-color: var(--brand-secondary);
		transition: width 0.3s ease;
	}

	.content {
		margin-bottom: var(--gap-3);
	}

	label {
		display: flex;
		align-items: center;
		gap: var(--gap-1);
		margin-top: var(--gap-1);
		cursor: pointer;
	}
</style>
