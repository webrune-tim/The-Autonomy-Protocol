<script lang="ts">
	const {
		src,
		alt,
		class: className = '',
		width,
		height,
		loading = 'lazy',
		decoding = 'async'
	}: {
		src: string;
		alt: string;
		class?: string;
		width?: number | string;
		height?: number | string;
		loading?: 'lazy' | 'eager';
		decoding?: 'async' | 'sync' | 'auto';
	} = $props()

	function initRevealingImage(node: HTMLElement): void {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				node.classList.add('revealing-image')
				observer.disconnect()
			}
		}, { rootMargin: '150px' })

		observer.observe(node)
	}
</script>

<img
	use:initRevealingImage
	class="margin-bottom {className}"
	{src}
	{alt}
	{width}
	{height}
	{loading}
	{decoding}
/>

<style>
	img {
		max-width: 100%;
		height: auto;
		display: block;
	}
</style>
