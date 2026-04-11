<script lang="ts">
	let { children } = $props()
</script>

<div class="pill">
	{@render children()}
</div>

<style>
	.pill {
		border-radius: 100px;
		color: var(--accent-1);
		background-color: rgb(from var(--accent-2) r g b / 0.25);
		border: 1px solid var(--accent-2);
		padding: 0.25rem 0.75rem;
		font-size: 10px;
		font-family: 'Poppins', sans-serif;
	}
</style>
