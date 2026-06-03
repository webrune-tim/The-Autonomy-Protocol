<script lang="ts">
	// 1. Import the enhanced image asset from your source directory
	const { alt, src } = $props() // Update this path to your actual asset

	// 2. Svelte Action for the fold-detection logic
	function initRevealingImage(node: HTMLElement): void {
		requestAnimationFrame(() => {
			const rect = node.getBoundingClientRect()
			const viewportHeight = window.innerHeight

			const isAboveOrOnFold = rect.top < viewportHeight

			if (isAboveOrOnFold) {
				node.classList.remove('revealing-image')
			}
		})
	}
</script>

<enhanced:img
	use:initRevealingImage
	class="revealing-image margin-bottom"
	{src}
	{alt}
/>

<style>
	.revealing-image {
		view-timeline-name: --revealing-image;
		view-timeline-axis: block;
		animation: linear img-reveal both;
		animation-timeline: --revealing-image;
		animation-range: entry 25% cover 50%;
	}

	@keyframes img-reveal {
		from {
			opacity: 0;
			clip-path: inset(45% 20% 45% 20%);
		}
		to {
			opacity: 1;
			clip-path: inset(0% 0% 0% 0%);
		}
	}
</style>
