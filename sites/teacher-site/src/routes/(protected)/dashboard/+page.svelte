<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageServerData, ActionData } from './$types';

	// Svelte 5 structure matching your exact data wrapper
	let { data, form }: { data: PageServerData; form: ActionData } = $props();

	// Local UI Runes for Tracking, Previews, and Modals
	// Explicitly defining the type structure matching the DB schema properties
	type DocumentItem = { id: string; title: string; content: string; owner_id: string };
	
	let selectedDoc = $state<DocumentItem | null>(null);
	let shareTargetEmail = $state('');
	let activeShareDocId = $state<string | null>(null);
	let isSubmittingUpload = $state(false);
</script>

<h1>Hi, {data.user.name}!</h1>
<p>Your user ID is {data.user.id}.</p>
<p>Current Role: <strong>{data.user.role}</strong></p>

<div class="flex">
	<button
		type="button"
		class="link-button"
		onclick={() => goto('/settings')}
		style="--color: var(--brand-primary);"
	>
		Settings
	</button>

	<form method="post" action="/logout">
		<button class="link-button" style="--color: var(--brand-secondary);">
			Sign out
		</button>
	</form>
</div>

<!-- ========================================== -->
<!-- NEW: DOCUMENT PIPELINE & COLLABORATION HUB -->
<!-- ========================================== -->
<section class="bold-border-box margin-top" style="--border-color: var(--brand-primary);">
	<header class="hub-header">
		<h2>Resource Pipeline & Document Hub</h2>
		<div class="stat-badge">Total Resources Available: {data.myDocuments?.length ?? 0}</div>
	</header>
	
	<p>Upload legacy PDFs to convert them immediately to structured Markdown resources.</p>

	<!-- Conversion Upload Form Trigger -->
	<form 
		method="POST" 
		action="?/uploadAndConvert" 
		enctype="multipart/form-data" 
		use:enhance={() => {
			isSubmittingUpload = true;
			return async ({ update }) => {
				await update();
				isSubmittingUpload = false;
			};
		}}
		class="upload-form"
	>
		<div class="upload-zone">
			<input 
				type="file" 
				name="pdf-file" 
				accept="application/pdf" 
				disabled={isSubmittingUpload}
				required 
				class="file-input"
			/>
			<button type="submit" disabled={isSubmittingUpload} class="upload-submit-btn">
				{isSubmittingUpload ? 'Converting Legacy Layout...' : 'Upload & Convert to Native MD'}
			</button>
		</div>
	</form>

	{#if form?.error}
		<p class="status error">System Notification: {form.error}</p>
	{/if}

	<!-- Live Workspace Management Area -->
	<div class="layout-grid margin-top">
		<!-- Left Workspace Column: Resource List -->
		<div class="doc-list">
			<h3>Your Available Assets</h3>
			{#if data.myDocuments && data.myDocuments.length > 0}
				<ul>
					{#each data.myDocuments as doc}
						<li class:active={selectedDoc?.id === doc.id}>
							<button type="button" class="title-btn" onclick={() => selectedDoc = doc}>
								📄 {doc.title}
							</button>
							
							<button type="button" class="share-btn" onclick={() => activeShareDocId = doc.id}>
								Share Access 👤
							</button>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="no-results">No converted resources stored. Drop an old PDF above to begin.</p>
			{/if}
		</div>

		<!-- Right Workspace Column: Text Preview Engine -->
		<div class="preview-panel">
			<h3>Live Document Preview</h3>
			{#if selectedDoc}
				<div class="preview-box">
					<h4>{selectedDoc.title}</h4>
					<hr class="preview-divider" />
					<pre class="preview-output"><code>{selectedDoc.content}</code></pre>
				</div>
			{:else}
				<p class="empty-state">Select any document from the registry list to open the live text preview.</p>
			{/if}
		</div>
	</div>
</section>

<!-- ========================================== -->
<!-- EXISTING: ADMINISTRATIVE CONTROLS ZONE     -->
<!-- ========================================== -->
{#if data.isAdmin}
	<section
		class="bold-border-box margin-top"
		style="--border-color: var(--brand-secondary);"
	>
		<h2>Administrative Control</h2>
		<p>Lookup users to adjust authorization levels.</p>

		<form method="get" class="search-form">
			<input
				type="text"
				name="q"
				placeholder="Search by name or email..."
				class="search-input"
			/>
			<button type="submit" class="search-button">Search</button>
		</form>

		{#if data.searchResults.length > 0}
			<div class="table-wrapper">
				<table class="admin-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Current Role</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.searchResults as member}
							<tr>
								<td data-label="Name">{member.name}</td>
								<td data-label="Email">{member.email}</td>
								<td data-label="Current Role"><code>{member.role}</code></td>
								<td data-label="Actions">
									<form
										method="post"
										action="?/updateRole"
										use:enhance
										class="action-form"
									>
										<input type="hidden" name="userId" value={member.id} />
										<select name="role" class="role-select">
											<option value="user" selected={member.role === 'user'}
												>User</option
											>
											<option value="teacher" selected={member.role === 'teacher'}
												>Teacher</option
											>
											<option value="admin" selected={member.role === 'admin'}
												>Admin</option
											>
											{#if data.user.role === 'superadmin'}
												<option
													value="superadmin"
													selected={member.role === 'superadmin'}>Superadmin</option
												>
											{/if}
										</select>
										<button type="submit">Update</button>
									</form>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else if data.searchResults.length === 0 && data.user.role !== undefined}
			<p class="no-results">No members found matching your search.</p>
		{/if}
	</section>
{/if}

<!-- Shared Permissions Access Modal Overlay -->
{#if activeShareDocId}
	<div class="modal-overlay">
		<div class="modal">
			<h3>Share Ownership Rights</h3>
			<p class="modal-desc">This gives another teacher full access rights to see and work with this asset.</p>
			<form method="POST" action="?/shareDocument" use:enhance={() => {
				return async ({ update }) => {
					await update();
					activeShareDocId = null;
					shareTargetEmail = '';
				};
			}}>
				<input type="hidden" name="documentId" value={activeShareDocId} />
				<input 
					type="email" 
					name="teacherEmail" 
					bind:value={shareTargetEmail} 
					placeholder="colleague@school.edu" 
					required 
					class="search-input"
				/>
				<div class="modal-actions">
					<button type="button" class="link-button" onclick={() => activeShareDocId = null}>Cancel</button>
					<button type="submit" class="confirm-btn">Delegate Access</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	/* Integration design matching your existing design ecosystem variables */
	.flex {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.margin-top {
		margin-top: 2rem;
	}

	.hub-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.stat-badge {
		background: rgba(255, 255, 255, 0.07);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		border: 1px solid var(--brand-tertiary);
		font-weight: bold;
		font-size: 0.85rem;
	}

	.upload-form {
		margin-top: 1rem;
		background: rgba(0, 0, 0, 0.15);
		border: 1px dashed var(--brand-tertiary);
		padding: 1.5rem;
		border-radius: 4px;
	}

	.upload-zone {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.file-input {
		color: var(--fg);
		font-size: 0.9rem;
	}

	.upload-submit-btn {
		background: transparent;
		border: 1px solid var(--brand-primary);
		color: var(--fg);
		padding: 0.6rem 1.2rem;
		cursor: pointer;
		font-weight: 600;
		transition: background 0.2s;
	}

	.upload-submit-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.05);
	}

	.upload-submit-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.status.error {
		margin-top: 1rem;
		padding: 0.75rem;
		background: rgba(255, 107, 107, 0.1);
		border-left: 3px solid #ff6b6b;
		color: #ff6b6b;
		font-size: 0.9rem;
	}

	/* Document Portal Grid layout split */
	.layout-grid {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 1.5rem;
	}

	.doc-list h3, .preview-panel h3 {
		font-size: 1rem;
		color: var(--brand-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
	}

	.doc-list ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.doc-list li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: rgba(0, 0, 0, 0.1);
		margin-bottom: 0.5rem;
		padding: 0.5rem 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.05);
		gap: 0.5rem;
	}

	.doc-list li.active {
		border-color: var(--brand-primary);
		background: rgba(0, 0, 0, 0.25);
	}

	.title-btn {
		background: none;
		border: none;
		color: var(--fg);
		cursor: pointer;
		text-align: left;
		flex: 1;
		font-size: 0.95rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.share-btn {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--brand-tertiary);
		color: var(--fg);
		font-size: 0.75rem;
		padding: 0.3rem 0.6rem;
		cursor: pointer;
	}

	.share-btn:hover {
		background: rgba(255, 255, 255, 0.12);
	}

	.preview-panel {
		background: rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.05);
		padding: 1.25rem;
		min-height: 300px;
	}

	.preview-box h4 {
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
	}

	.preview-divider {
		border: 0;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		margin-bottom: 1rem;
	}

	.preview-output {
		background: rgba(0, 0, 0, 0.3);
		padding: 1rem;
		max-height: 400px;
		overflow-y: auto;
		white-space: pre-wrap;
		border: 1px solid rgba(255, 255, 255, 0.05);
		margin: 0;
	}

	.preview-output code {
		font-family: monospace;
		font-size: 0.9rem;
		line-height: 1.4;
	}

	.empty-state {
		opacity: 0.5;
		font-style: italic;
		text-align: center;
		margin-top: 5rem;
		font-size: 0.9rem;
	}

	/* Modal Design Layer */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.75);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}

	.modal {
		background: #1a1a1a;
		border: 2px solid var(--brand-tertiary);
		padding: 2rem;
		width: 90%;
		max-width: 450px;
	}

	.modal h3 {
		margin-top: 0;
		font-size: 1.25rem;
	}

	.modal-desc {
		font-size: 0.85rem;
		opacity: 0.7;
		margin-bottom: 1rem;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.confirm-btn {
		background: transparent;
		border: 1px solid var(--brand-primary);
		color: var(--fg);
		padding: 0.5rem 1rem;
		font-weight: bold;
		cursor: pointer;
	}

	.confirm-btn:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	/* Existing Administrative Table Elements */
	.search-form {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.search-input {
		flex: 1;
		padding: 0.75rem;
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid var(--brand-tertiary);
		color: var(--fg);
	}

	.table-wrapper {
		width: 100%;
		overflow-x: auto;
		margin-top: 1rem;
	}

	.admin-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	.action-form {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}

	.admin-table th,
	.admin-table td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.admin-table th {
		color: var(--brand-tertiary);
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
	}

	.role-select {
		padding: 0.4rem;
		background: var(--bg);
		color: var(--fg);
		border: 1px solid var(--brand-tertiary);
	}

	.no-results {
		opacity: 0.6;
		font-style: italic;
	}

	/* Responsive break points collapsing workspace grid */
	@media (max-width: 768px) {
		.layout-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.search-form, .upload-zone {
			flex-direction: column;
			align-items: stretch;
		}

		.admin-table thead {
			position: absolute;
			left: -9999px;
			width: 1px;
			height: 1px;
			overflow: hidden;
		}

		.admin-table,
		.admin-table tbody,
		.admin-table tr,
		.admin-table td {
			display: block;
			width: 100%;
		}

		.admin-table tr {
			border: 1px solid rgba(255, 255, 255, 0.15);
			padding: 0.5rem;
			margin-bottom: 0.75rem;
		}

		.admin-table td {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
			border-bottom: 1px solid rgba(255, 255, 255, 0.08);
			padding: 0.6rem 0.5rem;
			text-align: right;
			word-break: break-word;
		}

		.admin-table td:last-child {
			border-bottom: none;
		}

		.admin-table td::before {
			content: attr(data-label);
			flex: 0 0 auto;
			color: var(--brand-tertiary);
			text-transform: uppercase;
			font-size: 0.7rem;
			letter-spacing: 0.05em;
			font-weight: bold;
		}

		.role-select {
			flex: 1;
			min-width: 0;
		}
	}
</style>