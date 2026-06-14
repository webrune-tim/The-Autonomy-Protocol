<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let editingSectionId = $state<string | null>(null);

	function editSection(section: any) {
		editingSectionId = section.id;
		// Scroll to form or handle UI focus
	}

	function cancelEdit() {
		editingSectionId = null;
	}
</script>

<div class="teacher-container">
	<header class="angled-bottom-box" style="--color: var(--brand-secondary);">
		<h1 class="reveal-header">Edit Module: {data.module.title}</h1>
		<a href="/teacher/modules" class="back-link">← Back to Modules</a>
	</header>

	<main class="margin-top-2">
		<!-- Module Settings -->
		<section class="bold-border-box mb-4">
			<h2>Module Configuration</h2>
			<form method="POST" action="?/updateModule" use:enhance class="edit-form">
				<div class="form-row">
					<div class="form-group flex-2">
						<label for="title">Module Title</label>
						<input type="text" id="title" name="title" value={data.module.title} required />
					</div>
					<div class="form-group flex-1">
						<label for="order">Display Order</label>
						<input type="number" id="order" name="order" value={data.module.order} required />
					</div>
				</div>
				<div class="form-group">
					<label for="description">Description</label>
					<textarea id="description" name="description" required>{data.module.description}</textarea>
				</div>
				<button type="submit" class="action-btn">Update Configuration</button>
			</form>
		</section>

		<!-- Section List -->
		<section class="mb-4">
			<h2>Module Sections</h2>
			<div class="section-list">
				{#each data.module.sections as section (section.id)}
					<div class="section-item bold-border-box">
						<div class="section-header">
							<h3>{section.title}</h3>
							<div class="section-actions">
								<button class="small-btn" onclick={() => editSection(section)}>Edit</button>
								<form method="POST" action="?/deleteSection" use:enhance>
									<input type="hidden" name="sectionId" value={section.id} />
									<button type="submit" class="delete-btn-small" onclick={(e) => { if (!confirm('Delete this section?')) e.preventDefault(); }}>Delete</button>
								</form>
							</div>
						</div>
						<div class="section-preview">
							{section.content.substring(0, 150)}{section.content.length > 150 ? '...' : ''}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Upsert Section Form -->
		<section class="bold-border-box">
			<h2>{editingSectionId ? 'Edit Section' : 'Add New Section'}</h2>
			<form method="POST" action="?/upsertSection" use:enhance={() => {
				return async ({ update }) => {
					await update();
					editingSectionId = null;
				};
			}} class="edit-form">
				{#if true}
					{@const editingSection = data.module.sections.find(s => s.id === editingSectionId)}
					<input type="hidden" name="sectionId" value={editingSectionId || ''} />
					<div class="form-row">
						<div class="form-group flex-2">
							<label for="sec-title">Section Title</label>
							<input type="text" id="sec-title" name="title" value={editingSection?.title || ''} required placeholder="e.g. 1. Introduction" />
						</div>
						<div class="form-group flex-1">
							<label for="sec-order">Order</label>
							<input type="number" id="sec-order" name="order" value={editingSection?.order || data.module.sections.length + 1} required />
						</div>
					</div>
					<div class="form-group">
						<label for="content">Section Content (Markdown Supported)</label>
						<textarea id="content" name="content" required placeholder="Detailed lesson content...">{editingSection?.content || ''}</textarea>
					</div>
				{/if}
				<div class="form-actions">
					<button type="submit" class="action-btn">{editingSectionId ? 'Update Section' : 'Add Section'}</button>
					{#if editingSectionId}
						<button type="button" class="cancel-btn" onclick={cancelEdit}>Cancel</button>
					{/if}
				</div>
			</form>
		</section>
	</main>
</div>

<style>
	.teacher-container {
		max-width: 1000px;
		margin: 0 auto;
		padding: var(--gap-2);
	}

	.back-link {
		display: inline-block;
		margin-top: 0.5rem;
		color: var(--fg);
		font-family: monospace;
		text-transform: uppercase;
		font-size: 0.8rem;
		text-decoration: none;
	}

	.edit-form {
		display: grid;
		gap: var(--gap-1);
		margin-top: var(--gap-1);
	}

	.form-row {
		display: flex;
		gap: 1rem;
	}

	.flex-1 { flex: 1; }
	.flex-2 { flex: 2; }

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

	input, textarea {
		padding: 0.75rem;
		background: var(--surface-1);
		border: 1px solid var(--surface-3);
		color: var(--fg);
		border-radius: 4px;
	}

	textarea {
		min-height: 120px;
		resize: vertical;
	}

	.action-btn {
		background-color: var(--brand-secondary);
		color: var(--bg);
		border: none;
		padding: 0.75rem 1.5rem;
		font-weight: bold;
		text-transform: uppercase;
		cursor: pointer;
		width: fit-content;
	}

	.section-list {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	.section-item {
		padding: 1rem;
		background: var(--surface-1);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.section-header h3 {
		margin: 0;
		font-size: 1.1rem;
		color: var(--brand-tertiary);
	}

	.section-actions {
		display: flex;
		gap: 0.5rem;
	}

	.small-btn {
		background: var(--surface-3);
		border: none;
		color: var(--fg);
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		font-size: 0.75rem;
		text-transform: uppercase;
	}

	.delete-btn-small {
		background: none;
		border: 1px solid #ff4444;
		color: #ff4444;
		padding: 0.2rem 0.4rem;
		cursor: pointer;
		font-size: 0.75rem;
		text-transform: uppercase;
	}

	.section-preview {
		font-size: 0.9rem;
		opacity: 0.8;
		line-height: 1.4;
	}

	.form-actions {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.cancel-btn {
		background: none;
		border: 1px solid var(--surface-3);
		color: var(--fg);
		padding: 0.75rem 1.5rem;
		font-weight: bold;
		text-transform: uppercase;
		cursor: pointer;
	}

	.mb-4 {
		margin-bottom: 2rem;
	}
</style>
