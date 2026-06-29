<script lang="ts">
	import { page } from '$app/state'
	import { RevealingImage } from '@autonomy/revealing_image'
	import { foresight } from '@autonomy/actions'

	import ErrorImage from '$images/error.png'
</script>

<RevealingImage src={ErrorImage} alt="Malfunctioning robot holding a plug" />

<section
	class="unangled-box center"
	style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast);"
>
	<h1>There was an ERROR!!!</h1>
	<h2>{page.status}: {page.error?.message}</h2>

	<a class="cta" href="/" use:foresight>Home</a>
</section>

<style>
	.center {
		text-align: center;
	}
</style>
