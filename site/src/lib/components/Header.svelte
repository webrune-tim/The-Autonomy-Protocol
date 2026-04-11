<script lang="ts">
	import Logo from './Logo.svelte'
	import Nav from './Nav.svelte'
	import Pill from './Pill.svelte'
</script>

<header>
	<Logo />
	<Pill>&#945; Alpha</Pill>
	<Nav />
</header>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--gap-1);
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
