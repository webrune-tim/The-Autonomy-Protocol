<script lang="ts">
	import Logo from './Logo.svelte'
	import { Nav } from '@autonomy/nav'
	import Pill from './Pill.svelte'
	import ThemeToggle from './ThemeToggle.svelte'
	import { page } from '$app/stores';

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/curriculum', label: 'Curriculum' },
        { href: '/resources', label: 'Resources' },
        { href: '/road-map', label: 'Road Map' },
        { href: '/contribute', label: 'Contribute' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' }
    ];
</script>

<header>
	<Logo />
	<div class="flex">
		<Pill>&#945; Alpha</Pill>
		<ThemeToggle />
	</div>
	<Nav links={navLinks} currentPath={$page.url.pathname} />
</header>

<style>
	.flex {
		display: flex;
		gap: var(--gap-1);
	}

	header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		background-color: var(--color-background);
		border-bottom: 1px solid var(--color-border);
	}

	@media (max-width: 600px) {
		header {
			justify-content: center;
			gap: 0 var(--gap-2);
		}
	}
</style>
