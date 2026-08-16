<script lang="ts">
	import { enhance } from '$app/forms';
	import { MODULE_CATEGORIES, getCategoryById } from '#lib/constants/categories.js';
	import { GripVertical, ArrowUp, ArrowDown, Check, Loader2, AlertCircle } from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let modulesList = $state<typeof data.modules>([]);
	let selectedCategoryFilter = $state<string>('all');

	// Keep local state in sync when page data updates
	$effect(() => {
		modulesList = [...data.modules];
	});

	const filteredModules = $derived(
		selectedCategoryFilter === 'all'
			? modulesList
			: modulesList.filter((m) => (m.category || 'step') === selectedCategoryFilter)
	);

	// Drag & Drop / Reordering State
	let draggedId = $state<string | null>(null);
	let dragOverId = $state<string | null>(null);
	let dropPosition = $state<'above' | 'below' | null>(null);
	let saveStatus = $state<'idle' | 'saving' | 'saved' | 'error'>('idle');

	async function persistOrder(updatedList: typeof modulesList) {
		saveStatus = 'saving';
		try {
			const payload = updatedList.map((m, idx) => ({ id: m.id, order: idx }));
			const formData = new FormData();
			formData.append('orders', JSON.stringify(payload));

			const res = await fetch('?/reorder', {
				method: 'POST',
				body: formData
			});

			if (res.ok) {
				saveStatus = 'saved';
				setTimeout(() => {
					if (saveStatus === 'saved') saveStatus = 'idle';
				}, 2200);
			} else {
				saveStatus = 'error';
			}
		} catch (err) {
			console.error('Failed to save module order:', err);
			saveStatus = 'error';
		}
	}

	function moveModule(srcId: string, targetId: string, position: 'above' | 'below') {
		const currentList = [...modulesList];
		const srcIndex = currentList.findIndex((m) => m.id === srcId);
		const targetIndex = currentList.findIndex((m) => m.id === targetId);

		if (srcIndex === -1 || targetIndex === -1 || srcIndex === targetIndex) return;

		const [movedItem] = currentList.splice(srcIndex, 1);
		let insertIndex = currentList.findIndex((m) => m.id === targetId);
		if (position === 'below') {
			insertIndex += 1;
		}
		currentList.splice(insertIndex, 0, movedItem);

		// Automatically update order indices sequentially
		currentList.forEach((m, idx) => {
			m.order = idx;
		});

		modulesList = currentList;
		persistOrder(currentList);
	}

	function moveStep(id: string, direction: 'up' | 'down') {
		const visible = filteredModules;
		const visibleIdx = visible.findIndex((m) => m.id === id);
		if (visibleIdx === -1) return;

		const targetVisibleIdx = direction === 'up' ? visibleIdx - 1 : visibleIdx + 1;
		if (targetVisibleIdx < 0 || targetVisibleIdx >= visible.length) return;

		const targetId = visible[targetVisibleIdx].id;
		const position = direction === 'up' ? 'above' : 'below';
		moveModule(id, targetId, position);
	}

	function handleDragStart(e: DragEvent, id: string) {
		draggedId = id;
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', id);
		}
	}

	function handleDragOver(e: DragEvent, id: string) {
		if (!draggedId || draggedId === id) return;
		e.preventDefault();
		if (e.dataTransfer) {
			e.dataTransfer.dropEffect = 'move';
		}

		const targetEl = e.currentTarget as HTMLElement;
		const rect = targetEl.getBoundingClientRect();
		const midpoint = rect.top + rect.height / 2;
		const pos = e.clientY < midpoint ? 'above' : 'below';

		dragOverId = id;
		dropPosition = pos;
	}

	function handleDragLeave(e: DragEvent, id: string) {
		const related = e.relatedTarget as HTMLElement | null;
		const current = e.currentTarget as HTMLElement | null;
		if (current && related && current.contains(related)) {
			return;
		}
		if (dragOverId === id) {
			dragOverId = null;
			dropPosition = null;
		}
	}

	function handleDrop(e: DragEvent, targetId: string) {
		e.preventDefault();
		if (!draggedId || draggedId === targetId) {
			handleDragEnd();
			return;
		}

		const srcId = draggedId;
		const pos = dropPosition || 'below';
		handleDragEnd();

		moveModule(srcId, targetId, pos);
	}

	function handleDragEnd() {
		draggedId = null;
		dragOverId = null;
		dropPosition = null;
	}
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

		<!-- Existing Modules with Category Filter & Drag/Drop Reordering -->
		<section class="module-list">
			<div class="section-header-wrap">
				<div class="title-with-status">
					<h2>Existing Modules</h2>
					{#if saveStatus === 'saving'}
						<span class="save-status-pill saving" role="status">
							<Loader2 size={13} class="spin-icon" /> Saving order...
						</span>
					{:else if saveStatus === 'saved'}
						<span class="save-status-pill saved" role="status">
							<Check size={13} /> Order saved
						</span>
					{:else if saveStatus === 'error'}
						<span class="save-status-pill error" role="status">
							<AlertCircle size={13} /> Error saving order
						</span>
					{/if}
				</div>

				<nav class="category-filter-tabs" aria-label="Filter modules by category">
					<button
						type="button"
						class="filter-tab"
						class:active={selectedCategoryFilter === 'all'}
						onclick={() => (selectedCategoryFilter = 'all')}
					>
						All ({modulesList.length})
					</button>
					{#each MODULE_CATEGORIES as cat (cat.id)}
						{@const count = modulesList.filter((m) => (m.category || 'step') === cat.id).length}
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
							<th class="th-order">Order</th>
							<th>Category Track</th>
							<th>Title</th>
							<th>Sections</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredModules as module, index (module.id)}
							{@const cat = getCategoryById(module.category || 'step')}
							{@const isFirst = index === 0}
							{@const isLast = index === filteredModules.length - 1}
							<tr
								class:is-dragging={draggedId === module.id}
								class:drop-above={dragOverId === module.id && dropPosition === 'above'}
								class:drop-below={dragOverId === module.id && dropPosition === 'below'}
								ondragover={(e) => handleDragOver(e, module.id)}
								ondragleave={(e) => handleDragLeave(e, module.id)}
								ondrop={(e) => handleDrop(e, module.id)}
							>
								<td class="order-cell">
									<div class="order-cell-content">
										<button
											type="button"
											class="drag-handle"
											draggable="true"
											ondragstart={(e) => handleDragStart(e, module.id)}
											ondragend={handleDragEnd}
											title="Drag to reorder module"
											aria-label="Drag to reorder {module.title}"
										>
											<GripVertical size={16} />
										</button>
										<code class="order-badge">#{module.order}</code>
										<div class="order-quick-actions" aria-label="Reorder step">
											<button
												type="button"
												class="step-btn"
												disabled={isFirst}
												onclick={() => moveStep(module.id, 'up')}
												title="Move Up"
												aria-label="Move module up"
											>
												<ArrowUp size={12} />
											</button>
											<button
												type="button"
												class="step-btn"
												disabled={isLast}
												onclick={() => moveStep(module.id, 'down')}
												title="Move Down"
												aria-label="Move module down"
											>
												<ArrowDown size={12} />
											</button>
										</div>
									</div>
								</td>
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

				{#if filteredModules.length === 0}
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

	.title-with-status {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.title-with-status h2 {
		margin: 0;
	}

	.save-status-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: monospace;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.25rem 0.6rem;
		border-radius: 4px;
		border: 1px solid transparent;
		transition: all 0.2s ease;
	}

	.save-status-pill.saving {
		color: var(--brand-secondary);
		background: rgba(112, 0, 255, 0.12);
		border-color: rgba(112, 0, 255, 0.35);
	}

	.save-status-pill.saved {
		color: var(--brand-primary);
		background: rgba(0, 255, 102, 0.12);
		border-color: rgba(0, 255, 102, 0.35);
	}

	.save-status-pill.error {
		color: #ff4444;
		background: rgba(255, 68, 68, 0.12);
		border-color: rgba(255, 68, 68, 0.35);
	}

	:global(.spin-icon) {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
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

	.table-wrapper {
		overflow-x: auto;
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

	.admin-table th.th-order {
		min-width: 130px;
	}

	.admin-table tbody tr {
		transition:
			background-color 0.15s ease,
			opacity 0.15s ease,
			box-shadow 0.15s ease;
	}

	.admin-table tbody tr:hover {
		background: rgba(255, 255, 255, 0.02);
	}

	.admin-table tbody tr.is-dragging {
		opacity: 0.35;
		background: rgba(0, 255, 102, 0.06);
		outline: 1px dashed var(--brand-primary);
	}

	.admin-table tbody tr.drop-above {
		border-top: 2px solid var(--brand-primary) !important;
		box-shadow: inset 0 2px 4px -2px var(--brand-primary);
		background: rgba(0, 255, 102, 0.06);
	}

	.admin-table tbody tr.drop-below {
		border-bottom: 2px solid var(--brand-primary) !important;
		box-shadow: inset 0 -2px 4px -2px var(--brand-primary);
		background: rgba(0, 255, 102, 0.06);
	}

	.order-cell-content {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
	}

	.drag-handle {
		background: transparent;
		border: 1px solid transparent;
		color: rgba(255, 255, 255, 0.4);
		padding: 0.25rem;
		border-radius: 4px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: grab;
		user-select: none;
		transition: all 0.15s ease;

		&:hover {
			color: var(--brand-primary);
			background: rgba(0, 255, 102, 0.1);
			border-color: rgba(0, 255, 102, 0.25);
		}

		&:active {
			cursor: grabbing;
		}
	}

	.order-badge {
		display: inline-block;
		font-family: monospace;
		font-weight: 700;
		font-size: 0.9rem;
		color: var(--brand-primary);
		background: var(--surface-1);
		border: 1px solid var(--surface-3);
		padding: 0.2rem 0.45rem;
		border-radius: 4px;
		min-width: 2.2rem;
		text-align: center;
	}

	.order-quick-actions {
		display: inline-flex;
		flex-direction: column;
		gap: 1px;
	}

	.step-btn {
		background: transparent;
		border: none;
		color: rgba(255, 255, 255, 0.35);
		padding: 2px;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 2px;
		transition: all 0.15s ease;

		&:hover:not(:disabled) {
			color: var(--brand-primary);
			background: rgba(255, 255, 255, 0.08);
		}

		&:disabled {
			opacity: 0.15;
			cursor: not-allowed;
		}
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
