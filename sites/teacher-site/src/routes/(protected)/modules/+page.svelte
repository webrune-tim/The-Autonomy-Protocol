<script lang="ts">
	import { enhance } from '$app/forms';
	import { MODULE_CATEGORIES, getCategoryById } from '$lib/constants/categories';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedCategoryFilter = $state<string>('all');

	const filteredModules = $derived(() => {
		if (selectedCategoryFilter === 'all') return data.modules;
		return data.modules.filter((m) => (m.category || 'step') === selectedCategoryFilter);
	});
</script>

<div class="teacher-container">
	<header class="bold-border-box" style="--color: var(--brand-primary);">
		<h1 class="reveal-header">Curriculum Management</h1>
		<p>Create, categorize, and configure educational modules for The Autonomy Protocol.</p>
	</header>

	<main class="margin-top-2">
		<!-- Create Module Form -->
		<section class="bold-border-box mb-4">
			<h2>Create New Module</h2>
			<form method="POST" action="?/create" use:enhance class="create-form">
				<div class="form-row">
					<div class="form-group flex-2">
						<label for="title">Module Title</label>
						<input
							type="text"
							id="title"
							name="title"
							required
							placeholder="e.g. Precision of Speech"
						/>
					</div>
					<div class="form-group flex-1">
						<label for="category">Curriculum Track / Group</label>
						<select id="category" name="category" required>
							{#each MODULE_CATEGORIES as cat (cat.id)}
								<option value={cat.id}>{cat.label} ({cat.systemTitle})</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="description">Brief Description</label>
					<textarea
						id="description"
						name="description"
						required
						placeholder="What cognitive shifts and executive functioning skills will students master?"
					></textarea>
				</div>
				<button type="submit" class="action-btn">Initialize Module</button>
			</form>
		</section>

		<!-- Existing Modules with Category Filter -->
		<section class="module-list">
			<div class="section-header-wrap">
				<h2>Existing Modules</h2>
				<nav class="category-filter-tabs" aria-label="Filter modules by category">
					<button
						type="button"
						class="filter-tab"
						class:active={selectedCategoryFilter === 'all'}
						onclick={() => (selectedCategoryFilter = 'all')}
					>
						All ({data.modules.length})
					</button>
					{#each MODULE_CATEGORIES as cat (cat.id)}
						{@const count = data.modules.filter((m) => (m.category || 'step') === cat.id).length}
						<button
							type="button"
							class="filter-tab"
							class:active={selectedCategoryFilter === cat.id}
							onclick={() => (selectedCategoryFilter = cat.id)}
						>
							{cat.label} ({count})
						</button>
					{/each}
				</nav>
			</div>

			<div class="table-wrapper">
				<table class="admin-table">
					<thead>
						<tr>
							<th>Order</th>
							<th>Category Track</th>
							<th>Title</th>
							<th>Sections</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredModules() as module (module.id)}
							{@const cat = getCategoryById(module.category || 'step')}
							<tr>
								<td><code>#{module.order}</code></td>
								<td>
									<span class="category-pill">{cat.label}</span>
								</td>
								<td><strong>{module.title}</strong></td>
								<td>{module.sections.length} sections</td>
								<td class="actions-cell">
									<a href="/modules/{module.id}" class="edit-link">Edit Content</a>
									<form method="POST" action="?/delete" use:enhance>
										<input type="hidden" name="id" value={module.id} />
										<button
											type="submit"
											class="delete-btn"
											onclick={(e) => {
												if (
													!confirm(
														'Are you sure you want to delete this module and all its sections?'
													)
												)
													e.preventDefault();
											}}>Delete</button
										>
									</form>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>

				{#if filteredModules().length === 0}
					<div class="empty-table-notice">
						<p>No modules found in this category.</p>
					</div>
				{/if}
			</div>
		</section>
	</main>
</div>

<style>
	.teacher-container {
		max-width: 1050px;
		margin: 0 auto;
		padding: var(--gap-2);
	}

	.create-form {
		display: grid;
		gap: var(--gap-1);
		margin-top: var(--gap-1);
	}

	.form-row {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.flex-1 {
		flex: 1;
		min-width: 220px;
	}

	.flex-2 {
		flex: 2;
		min-width: 280px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-family: monospace;
		text-transform: uppercase;
		font-size: 0.8rem;
		color: var(--brand-secondary);
	}

	input,
	select,
	textarea {
		padding: 0.75rem;
		background: var(--surface-1);
		border: 1px solid var(--surface-3);
		color: var(--fg);
		border-radius: 4px;
		font-family: inherit;
		font-size: 0.95rem;
	}

	select {
		cursor: pointer;
	}

	textarea {
		min-height: 100px;
		resize: vertical;
	}

	.action-btn {
		background-color: var(--brand-primary);
		color: var(--bg);
		border: none;
		padding: 0.75rem 1.5rem;
		font-weight: bold;
		text-transform: uppercase;
		cursor: pointer;
		margin-top: 0.5rem;
		width: fit-content;
		font-family: monospace;
		letter-spacing: 0.05em;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.9;
		}
	}

	.section-header-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: var(--gap-1);
	}

	.category-filter-tabs {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	.filter-tab {
		background: var(--surface-1);
		border: 1px solid var(--surface-3);
		color: var(--fg);
		padding: 0.35rem 0.75rem;
		font-family: monospace;
		font-size: 0.8rem;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			border-color: var(--brand-secondary);
		}

		&.active {
			background: var(--brand-secondary);
			color: var(--bg);
			border-color: var(--brand-secondary);
			font-weight: bold;
		}
	}

	.admin-table {
		width: 100%;
		border-collapse: collapse;
		margin-top: var(--gap-1);
	}

	.admin-table th,
	.admin-table td {
		padding: 1rem;
		text-align: left;
		border-bottom: 1px solid var(--surface-3);
	}

	.admin-table th {
		font-family: monospace;
		font-size: 0.8rem;
		text-transform: uppercase;
		color: var(--brand-secondary);
		letter-spacing: 0.05em;
	}

	.category-pill {
		display: inline-block;
		padding: 0.2rem 0.55rem;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--surface-3);
		font-family: monospace;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--fg);
		white-space: nowrap;
	}

	.actions-cell {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.edit-link {
		color: var(--brand-secondary);
		text-decoration: underline;
		font-weight: bold;
	}

	.delete-btn {
		background: none;
		border: 1px solid #ff4444;
		color: #ff4444;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		font-size: 0.8rem;
		text-transform: uppercase;
		font-family: monospace;
	}

	.empty-table-notice {
		padding: 2rem;
		text-align: center;
		opacity: 0.7;
		font-style: italic;
	}

	.mb-4 {
		margin-bottom: 2rem;
	}
</style>
