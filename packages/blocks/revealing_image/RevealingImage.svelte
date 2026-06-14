<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements'

	// Extract the strict typings natively mapped for enhanced images
	// type EnhancedImgProps = SvelteHTMLElements['enhanced:img']

	// Accept the complete src object structure along with alt and any fallback classes
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
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) {
				node.classList.add('revealing-image')
			}
			observer.disconnect()
		})

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
