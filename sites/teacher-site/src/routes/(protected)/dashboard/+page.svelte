<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import type { PageServerData } from './$types'

	let { data }: { data: PageServerData } = $props()
</script>

<h1>Hi, {data.user.name}!</h1>
<p>Your user ID is {data.user.id}.</p>
<p>Current Role: <strong>{data.user.role}</strong></p>

<div class="flex">
	<button type="button" class="link-button" onclick={() => goto('/settings')} style="--color: var(--brand-blue);">
		Settings
	</button>

	<form method="post" action="/logout">
		<button class="link-button" style="--color: var(--brand-orange);">
			Sign out
		</button>
	</form>
</div>

{#if data.isAdmin}
	<section class=".bold-border-box margin-top" style="--border-color: var(--brand-orange);">
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
								<form method="post" action="?/updateRole" use:enhance class="action-form">
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

<style>
	.flex {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.search-form {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.search-input {
		flex: 1;
		padding: 0.75rem;
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid var(--brand-teal);
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
		color: var(--brand-teal);
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
	}

	.role-select {
		padding: 0.4rem;
		background: var(--bg);
		color: var(--fg);
		border: 1px solid var(--brand-teal);
	}

	.no-results {
		opacity: 0.6;
		font-style: italic;
	}

	@media (max-width: 640px) {
		.search-form {
			flex-direction: column;
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
			color: var(--brand-teal);
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
