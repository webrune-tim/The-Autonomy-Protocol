<script lang="ts">
	let { children, HeroImage } = $props()
</script>

<section class="hero">
	<enhanced:img
		src={HeroImage}
		sizes="(min-width: 800px) 800px, 100vw"
		alt=""
		aria-hidden="true"
		class="hero-image"
	/>
	<div>
		{@render children()}
	</div>
</section>

<style>
	.hero {
		display: grid;
		place-content: center;
		min-height: 40svh;
		position: relative;
		overflow: hidden;
		padding: var(--gap-1);
		border: 2px solid var(--brand-orange);
		border-radius: var(--border-radius);

		div {
			max-width: 600px;
			text-align: center;
			z-index: 2;
		}
	}

	.hero-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
		filter: opacity(0.3);
	}
</style>
