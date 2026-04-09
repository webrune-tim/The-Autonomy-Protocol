<script lang="ts">
    import HeroImage from '$images/img-1.jpg?enhanced&w=400;800;1600;2400';
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
		<h1>Contact Us</h1>
		<p>
			Have questions or want to learn more about the Autonomy Protocol? Reach out to us! We're here to help you take charge of your own life and start governing yourself. Whether you're a student, a parent, or a teacher, we'd love to hear from you.
		</p>
	</div>
</section>