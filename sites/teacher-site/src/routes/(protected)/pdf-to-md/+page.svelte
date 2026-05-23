<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	// Local reactive state for UI transitions
	let isSubmitting = $state(false);
	let shareTargetEmail = $state('');

	function handleEnhance() {
		isSubmitting = true;
		return async ({ update }) => {
			await update();
			isSubmitting = false;
		};
	}
</script>

<div class="app-container">
	<header class="page-header">
		<h1>Document Ingestion & Conversion</h1>
		<p class="subtitle">Transitioning legacy PDF curriculum to structured Markdown for the Autonomy Protocol.</p>
	</header>

	<section class="ingestion-section">
		<form method="POST" action="/pdf-to-md?/uploadAndConvert" enctype="multipart/form-data" use:enhance={handleEnhance}>
			<div class="upload-zone">
				<h3>New Pipeline Track</h3>
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
				<h3>Conversion Preview:</h3>
				<pre class="markdown-preview"><code>{form.markdown}</code></pre>
			</div>
		{/if}
	</section>

	<div class="dashboard-grid">
		<section class="data-section">
			<h2>Active & Historical Pipelines</h2>
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
								<td colspan="3" class="empty-state">No ingestion tracks recorded.</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>

		<section class="data-section">
			<h2>My Curriculum Assets</h2>
			<div class="document-list">
				{#each data.myDocuments as doc (doc.id)}
					<div class="document-card">
						<div class="doc-info">
							<h4>{doc.title}</h4>
							<p class="doc-meta">Last Updated: {new Date(doc.updatedAt).toLocaleDateString()}</p>
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
			<h2>Administrative Control: User Directory</h2>
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
												<option value="user" selected={user.role === 'user'}>User</option>
												<option value="student" selected={user.role === 'student'}>Student</option>
												<option value="teacher" selected={user.role === 'teacher'}>Teacher</option>
												<option value="admin" selected={user.role === 'admin'}>Admin</option>
												<option value="superadmin" selected={user.role === 'superadmin'}>Superadmin</option>
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
	:global(body) {
		background-color: #0f0f0f;
		color: #e0e0e0;
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		line-height: 1.6;
	}

	.app-container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 40px 20px;
	}

	.page-header {
		margin-bottom: 40px;
		border-bottom: 1px solid #222;
		padding-bottom: 20px;
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 8px;
	}

	.subtitle {
		color: #888;
		font-size: 1.1rem;
	}

	h2 {
		font-size: 1.25rem;
		color: #ffffff;
		margin-bottom: 20px;
		border-left: 4px solid #4a90e2;
		padding-left: 12px;
	}

	h3 {
		font-size: 1.1rem;
		margin-bottom: 16px;
	}

	section {
		margin-bottom: 60px;
	}

	.upload-zone {
		background: #1a1a1a;
		border: 1px solid #333;
		padding: 30px;
		border-radius: 12px;
		text-align: center;
	}

	.file-label {
		display: block;
		margin-bottom: 12px;
		color: #aaa;
		font-weight: 500;
	}

	.file-input {
		display: block;
		margin: 0 auto 20px auto;
		background: #222;
		border: 1px solid #444;
		padding: 8px;
		border-radius: 4px;
	}

	.primary-btn {
		background: #4a90e2;
		color: white;
		border: none;
		padding: 10px 24px;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

	.primary-btn:hover:not(:disabled) {
		background: #357abd;
	}

	.secondary-btn {
		background: #333;
		color: #ccc;
		border: 1px solid #444;
		padding: 6px 12px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.secondary-btn:hover {
		background: #444;
		color: white;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.status.error {
		margin-top: 20px;
		padding: 16px;
		background: #2d1616;
		border-left: 4px solid #d0021b;
		color: #ff8888;
		border-radius: 4px;
	}

	.output-container {
		margin-top: 30px;
	}

	.markdown-preview {
		background: #0a0a0a;
		padding: 24px;
		border: 1px solid #333;
		border-radius: 8px;
		overflow-x: auto;
		color: #a9dc76;
		font-family: 'Fira Code', monospace;
		font-size: 0.9rem;
	}

	.dashboard-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px;
	}

	.table-wrapper {
		background: #161616;
		border: 1px solid #222;
		border-radius: 8px;
		overflow: hidden;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
	}

	th, td {
		padding: 14px;
		border-bottom: 1px solid #222;
	}

	th {
		background: #1e1e1e;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #666;
	}

	.badge {
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.badge.completed { background: #1b3a1b; color: #81c784; }
	.badge.processing { background: #3a3a1b; color: #fff176; }
	.badge.failed { background: #3a1b1b; color: #e57373; }
	.badge.pending { background: #222; color: #888; }

	.document-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.document-card {
		background: #1a1a1a;
		border: 1px solid #333;
		padding: 20px;
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.doc-info h4 {
		margin: 0 0 4px 0;
		color: #fff;
	}

	.doc-meta {
		font-size: 0.8rem;
		color: #666;
		margin: 0;
	}

	.share-group {
		display: flex;
		gap: 8px;
	}

	.inline-input {
		background: #0f0f0f;
		border: 1px solid #333;
		color: white;
		padding: 6px 10px;
		border-radius: 4px;
		font-size: 0.9rem;
	}

	.empty-state {
		text-align: center;
		padding: 40px;
		color: #555;
		font-style: italic;
	}

	.admin-section {
		background: #121212;
		padding: 30px;
		border: 1px solid #d0021b44;
		border-radius: 12px;
	}

	.search-form {
		display: flex;
		gap: 12px;
		margin-bottom: 24px;
	}

	.search-input {
		flex: 1;
		background: #1a1a1a;
		border: 1px solid #333;
		color: white;
		padding: 10px 16px;
		border-radius: 6px;
	}

	.role-select {
		background: #1a1a1a;
		border: 1px solid #333;
		color: white;
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