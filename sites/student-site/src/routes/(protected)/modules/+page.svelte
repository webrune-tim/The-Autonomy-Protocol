<script lang="ts">
	import { ModuleCard } from '$components';
	import { getModuleStats } from '$stores/moduleStore.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="card-grid">
	{#each data.modules as module (module.id)}
		{@const stats = getModuleStats(module.id)}
		<ModuleCard
			moduleId={module.id}
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
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		padding: var(--gap-1);
	}
</style>
