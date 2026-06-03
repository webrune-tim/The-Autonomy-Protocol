<script lang="ts">
	const { alt, src }: { alt: string; src: string } = $props()

	function initRevealingImage(node: HTMLElement): void {
		const observer = new IntersectionObserver(([entry]) => {
			// If the image is NOT intersecting the viewport after the layout settles,
			// it is genuinely below the fold. Safe to apply the animation class.
			if (!entry.isIntersecting) {
				node.classList.add('revealing-image')
			}

			// Fire once and kill the observer. CSS handles the rest.
			observer.disconnect()
		})

		// 200ms deferral allows Vite's enhanced:img to swap out placeholders,
		// fonts to load, and SvelteKit route transitions to fully resolve.
		setTimeout(() => {
			if (node) observer.observe(node)
		}, 200)
	}
</script>

<enhanced:img use:initRevealingImage class="margin-bottom" {src} {alt} />
