<script lang="ts">
	import { enhance } from '$app/forms'

	let { data, form } = $props()

	// Local reactive state for UI transitions
	let isSubmitting = $state(false)
	let shareTargetEmail = $state('')

	function handleEnhance() {
		isSubmitting = true
		return async ({ update }) => {
			await update()
			isSubmitting = false
		}
	}
</script>

<div class="app-container">
	<header class="page-header">
		<h1>Document Ingestion & Conversion</h1>
		<p class="subtitle">
			Transitioning legacy PDF curriculum to structured Markdown for the Autonomy
			Protocol.
		</p>
	</header>

	<section class="ingestion-section">
		<form
			method="POST"
			action="/pdf-to-md?/uploadAndConvert"
			enctype="multipart/form-data"
			use:enhance={handleEnhance}
		>
			<div class="upload-zone">
				<h3 class="reveal-header">New Pipeline Track</h3>
				<label for="pdf-file" class="file-label">
					{isSubmitting ? 'Processing Document...' : 'Select PDF Asset'}
				</label>
				<input
					id="pdf-file"
					name="pdf-file"
					type="file"
					accept="application/pdf"
					disabled={isSubmitting}
					class="file-input"
				/>
				<button type="submit" disabled={isSubmitting} class="primary-btn">
					{isSubmitting ? 'Initializing Conversion...' : 'Start Conversion'}
				</button>
			</div>
		</form>

		{#if form?.error}
			<p class="status error"><strong>Fault Detected:</strong> {form.error}</p>
		{/if}

		{#if form?.success && form?.markdown}
			<div class="output-container">
				<h3 class="reveal-header">Conversion Preview:</h3>
				<pre class="markdown-preview"><code>{form.markdown}</code></pre>
			</div>
		{/if}
	</section>

	<div class="dashboard-grid">
		<section class="data-section">
			<h2 class="reveal-header">Active & Historical Pipelines</h2>
			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>File Name</th>
							<th>Status</th>
							<th>Initiated</th>
						</tr>
					</thead>
					<tbody>
						{#each data.pipelines as task (task.id)}
							<tr>
								<td>{task.originalFileName}</td>
								<td>
									<span class="badge {task.status}">{task.status}</span>
								</td>
								<td>{new Date(task.createdAt).toLocaleDateString()}</td>
							</tr>
						{:else}
							<tr>
								<td colspan="3" class="empty-state">No ingestion tracks recorded.</td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>

		<section class="data-section">
			<h2 class="reveal-header">My Curriculum Assets</h2>
			<div class="document-list">
				{#each data.myDocuments as doc (doc.id)}
					<div class="document-card">
						<div class="doc-info">
							<h4>{doc.title}</h4>
							<p class="doc-meta">
								Last Updated: {new Date(doc.updatedAt).toLocaleDateString()}
							</p>
						</div>
						<div class="doc-actions">
							<form method="POST" action="/pdf-to-md?/shareDocument" use:enhance>
								<input type="hidden" name="documentId" value={doc.id} />
								<div class="share-group">
									<input
										type="email"
										name="teacherEmail"
										placeholder="Colleague Email"
										required
										class="inline-input"
									/>
									<button type="submit" class="secondary-btn">Share</button>
								</div>
							</form>
						</div>
					</div>
				{:else}
					<p class="empty-state">No documents available in your repository.</p>
				{/each}
			</div>
		</section>
	</div>

	{#if data.isAdmin}
		<section class="admin-section">
			<h2 class="reveal-header">Administrative Control: User Directory</h2>
			<form method="GET" class="search-form">
				<input
					type="text"
					name="q"
					placeholder="Search by Name or Email..."
					class="search-input"
				/>
				<button type="submit" class="primary-btn">Search</button>
			</form>

			{#if data.searchResults.length > 0}
				<div class="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>User</th>
								<th>Email</th>
								<th>Current Role</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{#each data.searchResults as user (user.id)}
								<tr>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.role}</td>
									<td>
										<form method="POST" action="/pdf-to-md?/updateRole" use:enhance>
											<input type="hidden" name="userId" value={user.id} />
											<select name="role" class="role-select">
												<option value="user" selected={user.role === 'user'}
													>User</option
												>
												<option value="student" selected={user.role === 'student'}
													>Student</option
												>
												<option value="teacher" selected={user.role === 'teacher'}
													>Teacher</option
												>
												<option value="admin" selected={user.role === 'admin'}
													>Admin</option
												>
												<option
													value="superadmin"
													selected={user.role === 'superadmin'}>Superadmin</option
												>
											</select>
											<button type="submit" class="secondary-btn">Update</button>
										</form>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</section>
	{/if}
</div>

<style>
	.app-container {
		max-width: 1100px;
		margin: 0 auto;
		padding: var(--gap-2) var(--gap-1);
	}

	.page-header {
		margin-bottom: var(--gap-2);
		border-bottom: 1px solid var(--ui-border);
		padding-bottom: var(--gap-1);
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--fg);
		margin-bottom: var(--gap-05);
	}

	.subtitle {
		color: var(--black-20);
		font-size: 1.1rem;
	}

	h2 {
		font-size: 1.25rem;
		color: var(--fg);
		margin-bottom: var(--gap-1);
		border-left: 4px solid var(--brand-primary);
		padding-left: var(--gap-1);
	}

	h3 {
		font-size: 1.1rem;
		margin-bottom: var(--gap-1);
	}

	section {
		margin-bottom: 60px; /* Keeping large section margin but could be 3 * var(--gap-2) */
	}

	.upload-zone {
		background: var(--surface-2);
		border: 1px solid var(--ui-border);
		padding: var(--gap-2);
		border-radius: var(--border-radius);
		text-align: center;
	}

	.file-label {
		display: block;
		margin-bottom: var(--gap-05);
		color: var(--black-20);
		font-weight: 500;
	}

	.file-input {
		display: block;
		margin: 0 auto var(--gap-1) auto;
		background: var(--bg);
		border: 1px solid var(--ui-border);
		padding: var(--gap-05);
		border-radius: calc(var(--border-radius) / 2);
	}

	.primary-btn {
		background: var(--brand-primary);
		color: var(--white);
		border: none;
		padding: 10px 24px;
		border-radius: calc(var(--border-radius) / 2);
		font-weight: 600;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.primary-btn:hover:not(:disabled) {
		opacity: 0.9;
	}

	.secondary-btn {
		background: var(--surface-3);
		color: var(--fg);
		border: 1px solid var(--ui-border);
		padding: 6px 12px;
		border-radius: calc(var(--border-radius) / 2);
		cursor: pointer;
		font-size: 0.9rem;
	}

	.secondary-btn:hover {
		background: var(--black-40);
		color: var(--white);
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.status.error {
		margin-top: var(--gap-1);
		padding: var(--gap-1);
		background: rgb(from var(--error) r g b / 0.1);
		border-left: 4px solid var(--error);
		color: var(--error);
		border-radius: calc(var(--border-radius) / 2);
	}

	.output-container {
		margin-top: var(--gap-2);
	}

	.markdown-preview {
		background: var(--surface-1);
		padding: var(--gap-2);
		border: 1px solid var(--ui-border);
		border-radius: var(--border-radius);
		overflow-x: auto;
		color: var(--success);
		font-family: var(
			--font-header-sans-2
		); /* Fallback for monospaced need if no code font */
		font-size: 0.9rem;
	}

	.dashboard-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gap-2);
	}

	.table-wrapper {
		background: var(--surface-2);
		border: 1px solid var(--ui-border);
		border-radius: var(--border-radius);
		overflow: hidden;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
	}

	th,
	td {
		padding: 14px;
		border-bottom: 1px solid var(--ui-border);
	}

	th {
		background: var(--surface-3);
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--black-20);
	}

	.badge {
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.badge.completed {
		background: rgb(from var(--success) r g b / 0.2);
		color: var(--success);
	}
	.badge.processing {
		background: rgb(from var(--warning) r g b / 0.2);
		color: var(--warning);
	}
	.badge.failed {
		background: rgb(from var(--error) r g b / 0.2);
		color: var(--error);
	}
	.badge.pending {
		background: var(--surface-3);
		color: var(--black-20);
	}

	.document-list {
		display: flex;
		flex-direction: column;
		gap: var(--gap-1);
	}

	.document-card {
		background: var(--surface-2);
		border: 1px solid var(--ui-border);
		padding: var(--gap-1);
		border-radius: var(--border-radius);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.doc-info h4 {
		margin: 0 0 4px 0;
		color: var(--fg);
	}

	.doc-meta {
		font-size: 0.8rem;
		color: var(--black-20);
		margin: 0;
	}

	.share-group {
		display: flex;
		gap: 8px;
	}

	.inline-input {
		background: var(--bg);
		border: 1px solid var(--ui-border);
		color: var(--fg);
		padding: 6px 10px;
		border-radius: 4px;
		font-size: 0.9rem;
	}

	.empty-state {
		text-align: center;
		padding: var(--gap-2);
		color: var(--black-20);
		font-style: italic;
	}

	.admin-section {
		background: var(--surface-2);
		padding: var(--gap-2);
		border: 1px solid var(--error);
		border-radius: var(--border-radius);
	}

	.search-form {
		display: flex;
		gap: 12px;
		margin-bottom: 24px;
	}

	.search-input {
		flex: 1;
		background: var(--bg);
		border: 1px solid var(--ui-border);
		color: var(--fg);
		padding: 10px 16px;
		border-radius: calc(var(--border-radius) / 2);
	}

	.role-select {
		background: var(--bg);
		border: 1px solid var(--ui-border);
		color: var(--fg);
		padding: 6px;
		border-radius: 4px;
		margin-right: 8px;
	}

	@media (max-width: 900px) {
		.dashboard-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
