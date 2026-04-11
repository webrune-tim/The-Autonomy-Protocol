<script lang="ts">
	import HeroImage from '$images/img-3.jpg?enhanced&w=400;800;1600;2400'
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
		<h1>Teacher Curriculum</h1>
		<p>
			Our curriculum is designed to be flexible and adaptable to fit the unique needs
			of each classroom. We provide a comprehensive guide that includes lesson plans,
			activities, and resources to help teachers implement the Autonomy Protocol
			effectively.
		</p>
	</div>
</section>
