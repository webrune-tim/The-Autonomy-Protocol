<script lang="ts">
	import { ModuleCard } from '$components';
	import { getModuleStats } from '$stores/moduleStore.svelte.ts';

	const cards = [
		{
			moduleId: 'module-1',
			cardColor: 'primary',
			moduleName: 'Introduction to TAP',
			description: 'Learn the foundational principles of The Autonomy Protocol.',
			href: '/modules/welcome'
		},
		{
			moduleId: 'module-2',
			cardColor: 'secondary',
			moduleName: '12 Steps',
			description: 'The Accountability Cycle for internal regulation and behavioral alignment.',
			href: '#'
		},
		{
			moduleId: 'module-3',
			cardColor: 'tertiary',
			moduleName: '5 Agreements',
			description: 'The Integrity Protocol for maintaining professional and interpersonal excellence.',
			href: '#'
		},
		{
			moduleId: 'module-4',
			cardColor: 'primary',
			moduleName: 'Finding A Sponsor',
			description: 'Identifying and engaging with peer leadership for objective guidance.',
			href: '#'
		},
		{
			moduleId: 'module-5',
			cardColor: 'secondary',
			moduleName: 'Being A Sponsor',
			description: 'Transitioning to mentorship and sustaining collective wisdom.',
			href: '#'
		}
	];
</script>

<div class="card-grid">
	{#each cards as card (card.moduleId)}
		{@const stats = getModuleStats(card.moduleId)}
		<ModuleCard
			{...card}
			completedSteps={stats.completed}
			totalSteps={stats.total}
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
