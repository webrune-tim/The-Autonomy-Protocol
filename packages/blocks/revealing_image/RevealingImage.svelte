<script lang="ts">
	const {
		src,
		alt,
		class: className = ''
	}: {
		src: string;
		alt: string;
		class?: string
	} = $props()

	function initRevealingImage(node: HTMLElement): void {
		// Correct way to pass options to IntersectionObserver
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) {
				node.classList.add('revealing-image')
			}
			observer.disconnect()
		}, { rootMargin: `150px`}) // Pass options as the second argument

		setTimeout(() => {
			if (node) observer.observe(node)
		}, 200)
	}
</script>

<img
	use:initRevealingImage
	class="margin-bottom {className}"
	{src}
	{alt}
/>
