<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageServerData, ActionData } from './$types';

	// Svelte 5 structure matching your exact data wrapper
	let { data, form }: { data: PageServerData; form: ActionData } = $props();

	// Local UI Runes for Tracking, Previews, and Modals
	// Explicitly defining the type structure matching the DB schema properties
	type DocumentItem = { id: string; title: string; content: string; owner_id: string };
	
	let shareTargetEmail = $state('');
	let activeShareDocId = $state<string | null>(null);
	let isSubmittingUpload = $state(false);
	let isDragging = $state(false);
	let fileInput = $state<HTMLInputElement | null>(null);

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		
		if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
			const file = e.dataTransfer.files[0];
			if (file.type === 'application/pdf') {
				if (fileInput) {
					const dataTransfer = new DataTransfer();
					dataTransfer.items.add(file);
					fileInput.files = dataTransfer.files;
				}
			}
		}
	}

	function downloadAsMarkdown(doc: DocumentItem) {
		const blob = new Blob([doc.content], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${doc.title}.md`;
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<div class="header-section">
	<div class="user-info">
		<h1>Hi, {data.user.name}!</h1>
		<p class="role-badge">Role: <strong>{data.user.role}</strong></p>
	</div>

	<div class="header-actions">
		<button
			type="button"
			class="action-btn settings-btn"
			onclick={() => goto('/settings')}
		>
			SETTINGS
		</button>

		<form method="post" action="/logout">
			<button class="action-btn signout-btn">
				SIGN OUT
			</button>
		</form>
	</div>
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
		<div 
			class="upload-zone" 
			class:dragging={isDragging}
			ondragover={handleDragOver}
			ondragleave={handleDragLeave}
			ondrop={handleDrop}
			role="presentation"
		>
			<div class="file-input-wrapper">
				<label for="pdf-upload" class="custom-file-label">
					<span class="upload-icon">📂</span>
					<span class="upload-text">
						{fileInput?.files?.[0]?.name || 'Drag & Drop PDF or Click to Browse'}
					</span>
				</label>
				<input 
					id="pdf-upload"
					type="file" 
					name="pdf-file" 
					accept="application/pdf" 
					disabled={isSubmittingUpload}
					bind:this={fileInput}
					required 
					class="file-input-hidden"
				/>
			</div>
			
			<button type="submit" disabled={isSubmittingUpload} class="upload-submit-btn">
				{isSubmittingUpload ? 'CONVERTING...' : 'START CONVERSION'}
			</button>

			{#if isDragging}
				<div class="drag-overlay">
					<span>Drop PDF here</span>
				</div>
			{/if}
		</div>
	</form>

	{#if form?.success && form?.message}
		<p class="status success">System Notification: {form.message}</p>
	{/if}

	{#if form?.error}
		<p class="status error">System Notification: {form.error}</p>
	{/if}

	<!-- Live Workspace Management Area -->
	<div class="asset-workspace margin-top">
		<h3>Your Available Assets</h3>
		{#if data.myDocuments && data.myDocuments.length > 0}
			<div class="asset-grid">
				{#each data.myDocuments as doc}
					<div class="asset-card">
						<div class="asset-info">
							<span class="asset-icon">📄</span>
							<span class="asset-title">{doc.title}</span>
						</div>
						
						<div class="asset-actions">
							<button type="button" class="icon-btn" onclick={() => downloadAsMarkdown(doc)} title="Download .md">
								Download .md 📥
							</button>
							<button type="button" class="share-btn" onclick={() => activeShareDocId = doc.id}>
								Share Access 👤
							</button>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="no-results">No converted resources stored. Drop an old PDF above to begin.</p>
		{/if}
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
		position: relative;
		transition: border-color 0.2s, background 0.2s;
	}

	.upload-zone.dragging {
		border: 1px solid var(--brand-primary);
		background: rgba(255, 255, 255, 0.05);
	}

	.drag-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.85);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		pointer-events: none;
		border: 2px dashed var(--brand-primary);
	}

	.drag-overlay span {
		color: var(--brand-primary);
		font-weight: bold;
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.file-input-wrapper {
		flex: 1;
		min-width: 200px;
	}

	.file-input-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.custom-file-label {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 0.75rem 1rem;
		cursor: pointer;
		transition: background 0.2s;
		border-radius: 4px;
	}

	.custom-file-label:hover {
		background: rgba(255, 255, 255, 0.08);
	}

	.upload-icon {
		font-size: 1.2rem;
		opacity: 0.7;
	}

	.upload-text {
		font-size: 0.85rem;
		color: #aaa;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 250px;
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

	.status.error, .status.success {
		margin-top: 1rem;
		padding: 0.75rem;
		font-size: 0.9rem;
		border-radius: 4px;
	}

	.status.error {
		background: rgba(255, 107, 107, 0.1);
		border-left: 3px solid #ff6b6b;
		color: #ff6b6b;
	}

	.status.success {
		background: rgba(129, 199, 132, 0.1);
		border-left: 3px solid #81c784;
		color: #81c784;
	}

	/* Asset Workspace Layout */
	.asset-workspace h3 {
		font-size: 0.85rem;
		color: var(--brand-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 1.5rem;
		opacity: 0.8;
	}

	.asset-grid {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.asset-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: rgba(255, 255, 255, 0.03);
		padding: 1rem 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 4px;
		transition: border-color 0.2s, background 0.2s;
	}

	.asset-card:hover {
		border-color: rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.05);
	}

	.asset-info {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;
		min-width: 0;
	}

	.asset-icon {
		font-size: 1.2rem;
		opacity: 0.7;
	}

	.asset-title {
		font-size: 1rem;
		font-weight: 500;
		color: var(--fg);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.asset-actions {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.share-btn {
		background: transparent;
		border: 1px solid var(--brand-tertiary);
		color: var(--fg);
		font-size: 0.8rem;
		padding: 0.4rem 0.8rem;
		cursor: pointer;
		font-weight: 600;
		transition: background 0.2s;
	}

	.share-btn:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.icon-btn {
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: var(--fg);
		cursor: pointer;
		padding: 0.4rem 0.8rem;
		border-radius: 4px;
		font-size: 0.8rem;
		transition: background 0.2s;
	}

	.icon-btn:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.no-results {
		opacity: 0.5;
		font-style: italic;
		text-align: center;
		padding: 3rem;
		background: rgba(0, 0, 0, 0.1);
		border: 1px dashed rgba(255, 255, 255, 0.1);
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
		.header-section {
			flex-direction: column !important;
			align-items: stretch !important;
			gap: 1rem !important;
		}

		.header-actions {
			display: grid !important;
			grid-template-columns: 1fr 1fr !important;
			gap: 0.5rem !important;
		}

		.action-btn {
			width: 100% !important;
			justify-content: center !important;
			padding: 0.6rem !important;
			font-size: 0.75rem !important;
		}

		/* CRITICAL: FORCE CONTAINER WIDTH */
		:global(.bold-border-box) {
			padding: 0.75rem !important;
			margin-left: -0.5rem !important;
			margin-right: -0.5rem !important;
			width: calc(100% + 1rem) !important;
			border-width: 2px !important;
		}

		.hub-header {
			flex-direction: column !important;
			gap: 0.5rem !important;
		}

		.hub-header h2 {
			font-size: 1.1rem !important;
			text-align: center !important;
		}

		.stat-badge {
			font-size: 0.7rem !important;
			padding: 0.4rem !important;
		}

		.upload-zone {
			flex-direction: column !important;
			align-items: stretch !important;
			padding: 0.75rem !important;
			gap: 0.75rem !important;
		}

		.file-input-wrapper {
			min-width: 0 !important;
			width: 100% !important;
		}

		.custom-file-label {
			padding: 0.6rem !important;
			gap: 0.5rem !important;
		}

		.upload-text {
			font-size: 0.75rem !important;
			max-width: 180px !important;
		}

		.upload-submit-btn {
			width: 100% !important;
			padding: 0.8rem !important;
			font-size: 0.8rem !important;
		}

		.asset-card {
			flex-direction: column !important;
			align-items: stretch !important;
			padding: 0.75rem !important;
			gap: 0.75rem !important;
		}

		.asset-info {
			width: 100% !important;
			justify-content: flex-start !important;
		}

		.asset-title {
			font-size: 0.85rem !important;
			white-space: normal !important;
			word-break: break-all !important;
		}

		.asset-actions {
			display: flex !important;
			flex-direction: column !important;
			gap: 0.4rem !important;
			width: 100% !important;
		}

		.asset-actions button {
			width: 100% !important;
			justify-content: center !important;
			padding: 0.5rem !important;
			font-size: 0.75rem !important;
		}

		.admin-table td {
			padding: 0.5rem !important;
			font-size: 0.8rem !important;
		}
	}

	/* Enhanced Styles */
	.header-section {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 2rem;
		gap: 1rem;
	}

	.role-badge {
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-top: 0.25rem;
		color: var(--brand-secondary);
	}

	.header-actions {
		display: flex;
		gap: 0.75rem;
	}

	.action-btn {
		display: flex;
		align-items: center;
		padding: 0.6rem 1.2rem;
		font-weight: 800;
		font-size: 0.8rem;
		letter-spacing: 0.05em;
		cursor: pointer;
		border: none;
		transition: opacity 0.2s;
	}

	.settings-btn {
		background: #357abd;
		color: white;
	}

	.signout-btn {
		background: #d35400;
		color: white;
	}

	.action-btn:hover {
		opacity: 0.9;
	}
</style>