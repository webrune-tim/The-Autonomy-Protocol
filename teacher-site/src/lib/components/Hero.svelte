<script lang="ts">
	let { children, HeroImage } = $props()
</script>

<section class="hero">
	<div class="hero-bg">
		<enhanced:img
			src={HeroImage}
			sizes="(min-width: 800px) 800px, 100vw"
			alt=""
			aria-hidden="true"
		/>
	</div>
	<div class="hero-content">
		{@render children()}
	</div>
</section>

<style>
	.hero {
		display: grid;
		grid-template-areas: "stack";
		min-height: 40svh;
		overflow: hidden;
		border: 2px solid var(--brand-orange);
		border-radius: var(--border-radius);
		/* Padding removed from here so background spans edge-to-edge */
	}

	.hero-bg,
	.hero-content {
		grid-area: stack;
	}

	.hero-bg {
		z-index: 1;
		width: 100%;
		height: 100%;
		filter: opacity(0.3);
	}

	/* Targets generated picture/img tags bypassing Svelte's strict scoping */
	.hero-bg :global(img),
	.hero-bg :global(picture) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.hero-content {
		z-index: 2;
		place-self: center; /* Centers the content block within the grid cell */
		max-width: 600px;
		text-align: center;
		padding: var(--gap-1); /* Padding migrated here */
	}
</style>
