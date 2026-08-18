<script lang="ts">
	import { ModuleCard } from '#lib/components';
	import { initModuleState, getModuleStats } from '#lib/stores/moduleStore.svelte';
	import { MODULE_CATEGORIES, getCategoryById } from '#lib/constants/categories.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedCategory = $state<string>('all');

	// Initialize all modules into the store for accurate progress bars
	$effect(() => {
		data.modules.forEach((m) => {
			const moduleProgress = data.userProgress.filter((p) =>
				m.sections.some((s) => s.id === p.sectionId)
			);
			initModuleState(
				m.id,
				m.sections.map((s) => s.id),
				moduleProgress
			);
		});
	});

	// Group modules by category
	const groupedModules = $derived(() => {
		const groups: Record<string, typeof data.modules> = {};
		
		// Initialize standard categories
		MODULE_CATEGORIES.forEach((cat) => {
			groups[cat.id] = [];
		});

		// Bucket modules
		data.modules.forEach((m) => {
			const catKey = m.category || 'step';
			if (!groups[catKey]) {
				groups[catKey] = [];
			}
			groups[catKey].push(m);
		});

		return groups;
	});

	// List of categories that currently have modules or are standard categories
	const activeCategories = $derived(() => {
		const groups = groupedModules();
		return MODULE_CATEGORIES.filter(
			(cat) => (groups[cat.id] && groups[cat.id].length > 0) || selectedCategory === cat.id
		);
	});

	// Filtered list when a specific category tab is active
	const currentCategoryModules = $derived(() => {
		const groups = groupedModules();
		if (selectedCategory === 'all') return data.modules;
		return groups[selectedCategory] || [];
	});
</script>

<div class="modules-page">
	<header class="angled-bottom-box" style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast);">
		<div class="header-content">
			<div class="header-text">
				<h1 class="reveal-header">Curriculum Directory</h1>
				<p>
					Master the core frameworks of self-governance, interpersonal precision, and operational resilience.
				</p>
			</div>
			{#if data.user?.role && ['teacher', 'admin', 'superadmin'].includes(data.user.role)}
				<div class="header-actions">
					<a href="/modules" class="cta">Curriculum Directory</a>
				</div>
			{/if}
		</div>

		<!-- Category Filter Navigation -->
		<nav class="category-tabs" aria-label="Module Categories">
			<button
				type="button"
				class="tab-btn"
				class:active={selectedCategory === 'all'}
				onclick={() => (selectedCategory = 'all')}
			>
				<span>All Tracks</span>
				<span class="tab-count">{data.modules.length}</span>
			</button>

			{#each MODULE_CATEGORIES as cat (cat.id)}
				{@const count = (groupedModules()[cat.id] || []).length}
				<button
					type="button"
					class="tab-btn"
					class:active={selectedCategory === cat.id}
					onclick={() => (selectedCategory = cat.id)}
				>
					<span>{cat.label}</span>
					<span class="tab-count">{count}</span>
				</button>
			{/each}
		</nav>
	</header>

	<main class="margin-top-2">
		{#if selectedCategory === 'all'}
			<!-- Grouped Layout for All Modules -->
			{#each activeCategories() as cat (cat.id)}
				{@const catModules = groupedModules()[cat.id] || []}
				{#if catModules.length > 0}
					<section class="category-section">
						<header class="section-banner">
							<div class="section-title-wrap">
								<span class="framework-tag">{cat.framework}</span>
								<h2>{cat.systemTitle} <span class="group-alias">({cat.label})</span></h2>
							</div>
							<p class="section-desc">{cat.description}</p>
						</header>

						<div class="card-grid">
							{#each catModules as module (module.id)}
								{@const stats = getModuleStats(module.id)}
								<ModuleCard
									moduleId={module.order}
									category={module.category}
									cardColor={module.cardColor}
									moduleName={module.title}
									description={module.description}
									href={`/modules/${module.slug}`}
									completedSteps={stats.completed}
									totalSteps={module.totalSections}
								/>
							{/each}
						</div>
					</section>
				{/if}
			{/each}

			{#if data.modules.length === 0}
				<div class="empty-state">
					<p>No modules are currently available in the curriculum database.</p>
				</div>
			{/if}
		{:else}
			<!-- Single Category Filtered View -->
			{@const activeMeta = getCategoryById(selectedCategory)}
			{@const filtered = currentCategoryModules()}

			<section class="category-section">
				<header class="section-banner">
					<div class="section-title-wrap">
						<span class="framework-tag">{activeMeta.framework}</span>
						<h2>{activeMeta.systemTitle} <span class="group-alias">({activeMeta.label})</span></h2>
					</div>
					<p class="section-desc">{activeMeta.description}</p>
				</header>

				{#if filtered.length > 0}
					<div class="card-grid">
						{#each filtered as module (module.id)}
							{@const stats = getModuleStats(module.id)}
							<ModuleCard
								moduleId={module.order}
								category={module.category}
								cardColor={module.cardColor}
								moduleName={module.title}
								description={module.description}
								href={`/modules/${module.slug}`}
								completedSteps={stats.completed}
								totalSteps={module.totalSections}
							/>
						{/each}
					</div>
				{:else}
					<div class="empty-state">
						<p>No modules are currently published under the <strong>{activeMeta.label}</strong> pathway.</p>
						<button
							type="button"
							class="link-btn"
							onclick={() => (selectedCategory = 'all')}
						>
							View All Tracks
						</button>
					</div>
				{/if}
			</section>
		{/if}
	</main>
</div>

<style>
	.modules-page {
		max-width: 1300px;
		margin: 0 auto;
		padding: var(--gap-1);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--gap-2);
		flex-wrap: wrap;
		margin-bottom: var(--gap-1);
	}

	.header-text {
		flex: 1;
		min-width: 280px;
	}

	.header-actions {
		display: flex;
		align-items: center;
	}

	/* Category Filter Navigation Tabs */
	.category-tabs {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-top: var(--gap-1);
		padding-top: var(--gap-1);
		border-top: 1px solid rgb(from var(--text_color) r g b / 0.2);
	}

	.tab-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.55rem 0.95rem;
		border-radius: 6px;
		background: rgba(0, 0, 0, 0.25);
		border: 1px solid rgb(from var(--text_color) r g b / 0.25);
		color: var(--text_color);
		font-family: monospace;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		transition: all 0.2s ease;

		&:hover {
			background: rgba(0, 0, 0, 0.45);
			border-color: var(--text_color);
			transform: translateY(-1px);
		}

		&.active {
			background: var(--text_color);
			color: var(--color);
			border-color: var(--text_color);
			font-weight: 800;
		}
	}

	.tab-count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.3rem;
		height: 1.3rem;
		padding: 0 0.35rem;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.35);
		font-size: 0.75rem;
		line-height: 1;

		.active & {
			background: var(--color);
			color: var(--text_color);
		}
	}

	/* Category Section */
	.category-section {
		margin-bottom: var(--gap-4);
	}

	.section-banner {
		padding: var(--gap-1) var(--gap-2);
		margin-bottom: var(--gap-1);
		border-left: 4px solid var(--brand-primary);
		background: rgba(255, 255, 255, 0.02);
		border-radius: 0 var(--border-radius) var(--border-radius) 0;
	}

	.section-title-wrap {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-bottom: 0.25rem;
	}

	.section-banner h2 {
		margin: 0;
		font-size: clamp(1.3rem, 2vw, 1.7rem);
		color: var(--fg);
	}

	.group-alias {
		font-size: 0.9em;
		opacity: 0.75;
		font-weight: 400;
		font-family: monospace;
	}

	.framework-tag {
		font-family: monospace;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid var(--brand-primary);
		color: var(--brand-primary);
	}

	.section-desc {
		margin: 0.25rem 0 0 0;
		font-size: 0.95rem;
		color: var(--fg-surface, var(--fg));
		opacity: 0.85;
		max-width: 800px;
	}

	.card-grid {
		display: grid;
		gap: var(--gap-2);
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		padding: var(--gap-1) 0;
	}

	.empty-state {
		padding: var(--gap-3);
		text-align: center;
		background: var(--surface-1);
		border: 1px dashed var(--surface-3);
		border-radius: var(--border-radius);
		margin: var(--gap-2) 0;
		color: var(--fg);
		opacity: 0.85;
	}

	.link-btn {
		margin-top: 1rem;
		background: var(--brand-primary);
		color: var(--bg);
		border: none;
		padding: 0.6rem 1.2rem;
		font-family: monospace;
		font-weight: bold;
		text-transform: uppercase;
		cursor: pointer;
		border-radius: 4px;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.9;
		}
	}
</style>
