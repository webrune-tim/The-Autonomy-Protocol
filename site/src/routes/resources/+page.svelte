<script lang="ts">
	import HeroImage from '$images/pic-6.jpg?enhanced&w=400;800;1600;2400'
	import { Banner } from '$components/Banner.svelte'
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
		<h1>Other Resources</h1>
		<p>
			Here are some additional resources to help you get started with the Autonomy
			Protocol. Whether you're a student, a parent, or a teacher, these materials
			will give you the tools you need to take charge of your own life and start
			governing yourself.
		</p>
	</div>
</section>

<Banner>
	Content coming soon! In the meantime, check out our <a href="/curriculum">teacher curriculum</a> for a detailed breakdown of how to implement the Autonomy Protocol in the classroom.
</Banner>
