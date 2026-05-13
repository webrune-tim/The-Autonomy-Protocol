<script lang="ts">
	import { enhance } from '$app/forms'
	import type { PageServerData } from './$types'

	let { data }: { data: PageServerData } = $props()
</script>

<h1>Hi, {data.user.name}!</h1>
<p>Your user ID is {data.user.id}.</p>
<p>Current Role: <strong>{data.user.role}</strong></p>

<div class="flex">
	<a href="/settings" class="box trans-blue">Settings</a>

	<form method="post" action="?/signOut" use:enhance>
		<button
			class="box trans-orange"
			style="width: 100%; text-align: left; cursor: pointer;"
		>
			Sign out
		</button>
	</form>
</div>

{#if data.isAdmin}
	<section class="box trans-teal margin-top">
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
							<td>{member.name}</td>
							<td>{member.email}</td>
							<td><code>{member.role}</code></td>
							<td>
								<form method="post" action="?/updateRole" use:enhance>
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
									<button type="submit" class="update-button">Update</button>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
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
		border-radius: var(--border-radius);
	}

	.search-button {
		padding: 0.75rem 1.5rem;
		background: var(--brand-teal);
		color: var(--bg);
		border: none;
		border-radius: var(--border-radius);
		font-weight: bold;
		cursor: pointer;
	}

	.admin-table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
		font-size: 0.9rem;
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
		border-radius: 4px;
	}

	.update-button {
		padding: 0.4rem 0.8rem;
		background: transparent;
		color: var(--brand-teal);
		border: 1px solid var(--brand-teal);
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.8rem;
		transition: all 0.2s ease;
	}

	.update-button:hover {
		background: var(--brand-teal);
		color: var(--bg);
	}

	.no-results {
		opacity: 0.6;
		font-style: italic;
	}
</style>
