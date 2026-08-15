<script lang="ts">
    import { page } from '$app/state'

	interface NavLink {
		href: string
		label: string
	}

	let {
		links = [],
		currentPath = '/'
	}: {
		links: NavLink[]
		currentPath?: string
	} = $props()
</script>

<nav>
	<ul>
		{#each links as link}
			<li>
				<a
					href={link.href}
					class:active={currentPath === link.href}
					aria-current={currentPath === link.href ? 'page' : undefined}
				>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		width: 100%;
	}

	ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--gap-1) var(--gap-3);
		padding: 0;
		margin: 0;
	}

	li {
		display: flex;
		place-items: center;
		flex: none;
	}

	a {
		background: inherit;
		text-decoration: none;
		white-space: nowrap;
		color: var(--text-secondary);
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.25rem 0.5rem;
		border-radius: var(--border-radius-sm);
		transition: opacity 0.2s ease, color 0.2s ease, background-color 0.2s ease;

		&:hover {
			color: var(--brand-primary);
			text-decoration: none;
			background: oklch(from var(--brand-primary) l c h / 0.1);
		}

		&.active {
			font-weight: 700;
			color: var(--brand-primary);
			border-bottom: 2px solid var(--brand-primary);
		}
	}
</style>
