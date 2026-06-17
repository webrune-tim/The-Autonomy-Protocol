<script lang="ts">
	import { ModuleCard } from '$components';
	import { initModuleState, getModuleStats } from '$stores/moduleStore.svelte';
	import type { PageData } from './$types';

	let { data, user }: { data: PageData; user: typeof data.user } = $props();

	// Initialize all modules into the store for accurate progress bars
	$effect(() => {
		data.modules.forEach(m => {
			const moduleProgress = data.userProgress.filter(p =>
				m.sections.some(s => s.id === p.sectionId)
			);
			initModuleState(m.id, m.sections.map(s => s.id), moduleProgress);
		});
	});
</script>

{#if data.user && ['teacher', 'admin', 'superadmin'].includes(data.user.role)}
  <a href="/teacher/modules" class="cta">Modules Configuration</a>
{/if}

<div class="card-grid">
	{#each data.modules as module (module.id)}
		{@const stats = getModuleStats(module.id)}
		<ModuleCard
			moduleId={module.order}
			cardColor={module.cardColor}
			moduleName={module.title}
			description={module.description}
			href={`/modules/${module.slug}`}
			completedSteps={stats.completed}
			totalSteps={module.totalSections}
		/>
	{/each}
</div>

<style>
	.card-grid {
		display: grid;
		gap: var(--gap-2);
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		padding: var(--gap-1);
	}
</style>
