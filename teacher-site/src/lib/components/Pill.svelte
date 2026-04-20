<script lang="ts">
	let { children } = $props()
</script>

<div class="pill">
	{@render children()}
</div>

<style>
	.pill {
		display: grid;
		place-content: center;
		max-width: fit-content;
		border-radius: 100px;
		color: var(--fg);
		background-color: rgb(from var(--brand-orange) r g b / 0.15);
		border: 1px solid var(--brand-orange);
		padding: 0.25rem 0.75rem;
		font-size: 10px;
		font-family: 'Poppins', sans-serif;
	}
</style>
