<script lang="ts">
	import Logo from './Logo.svelte'
	import Nav from './Nav.svelte'
	import Pill from './Pill.svelte'
	import ThemeToggle from './ThemeToggle.svelte'
</script>

<header>
	<Logo />
	<div class="flex">
		<Pill>&#945; Alpha</Pill>
		<ThemeToggle />
	</div>
	<Nav />
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
