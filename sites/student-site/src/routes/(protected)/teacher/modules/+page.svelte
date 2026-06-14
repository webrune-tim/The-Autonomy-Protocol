<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="teacher-container">
	<header class="angled-bottom-box" style="--color: var(--brand-primary);">
		<h1 class="reveal-header">Curriculum Management</h1>
		<p>Create and edit educational modules for The Autonomy Protocol.</p>
	</header>

	<main class="margin-top-2">
		<section class="bold-border-box mb-4">
			<h2>Create New Module</h2>
			<form method="POST" action="?/create" use:enhance class="create-form">
				<div class="form-group">
					<label for="title">Module Title</label>
					<input type="text" id="title" name="title" required placeholder="e.g. Advanced Executive Functioning" />
				</div>
				<div class="form-group">
					<label for="description">Brief Description</label>
					<textarea id="description" name="description" required placeholder="What will students learn?"></textarea>
				</div>
				<button type="submit" class="action-btn">Initialize Module</button>
			</form>
		</section>

		<section class="module-list">
			<h2>Existing Modules</h2>
			<div class="table-wrapper">
				<table class="admin-table">
					<thead>
						<tr>
							<th>Order</th>
							<th>Title</th>
							<th>Sections</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.modules as module (module.id)}
							<tr>
								<td>{module.order}</td>
								<td><strong>{module.title}</strong></td>
								<td>{module.sections.length}</td>
								<td class="actions-cell">
									<a href="/teacher/modules/{module.id}" class="edit-link">Edit Content</a>
									<form method="POST" action="?/delete" use:enhance>
										<input type="hidden" name="id" value={module.id} />
										<button type="submit" class="delete-btn" onclick={(e) => { if (!confirm('Are you sure you want to delete this module and all its sections?')) e.preventDefault(); }}>Delete</button>
									</form>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	</main>
</div>

<style>
	.teacher-container {
		max-width: 1000px;
		margin: 0 auto;
		padding: var(--gap-2);
	}

	.create-form {
		display: grid;
		gap: var(--gap-1);
		margin-top: var(--gap-1);
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

	input, textarea {
		padding: 0.75rem;
		background: var(--surface-1);
		border: 1px solid var(--surface-3);
		color: var(--fg);
		border-radius: 4px;
	}

	textarea {
		min-height: 100px;
		resize: vertical;
	}

	.action-btn {
		background-color: var(--brand-primary);
		color: var(--bg);
		border: none;
		padding: 0.75rem;
		font-weight: bold;
		text-transform: uppercase;
		cursor: pointer;
		margin-top: 0.5rem;
	}

	.admin-table {
		width: 100%;
		border-collapse: collapse;
		margin-top: var(--gap-1);
	}

	.admin-table th, .admin-table td {
		padding: 1rem;
		text-align: left;
		border-bottom: 1px solid var(--surface-3);
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
	}

	.mb-4 {
		margin-bottom: 2rem;
	}
</style>
