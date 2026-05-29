<script lang="ts">
	import { page } from '$app/state'
	import confetti from 'canvas-confetti' // Standard confetti.js wrapper

	// Get amount from URL: /donate/thank-you?amount=100
	let amount = $derived(page.url.searchParams.get('amount') || '0')

	// Trigger confetti when the component mounts
	$effect(() => {
		confetti({
			particleCount: 150,
			spread: 70,
			origin: { y: 0.6 },
			colors: ['#00ffcc', '#2d2d2d', '#ffffff'] // Matches your dark aesthetic
		})
	})
</script>

<section
	class="unangled-box"
	style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast); height: 100vh; display: grid; place-content: center; text-align: center;"
>
	<h1>Sovereignty Scaled</h1>
	<p class="larger-text">
		The protocol thanks you for your investment of <strong>${amount}</strong>.
	</p>
	<p>Your contribution has been logged in the social infrastructure library.</p>

	<a href="/" class="cta-donate" style="margin-top: 2rem; border-radius: 100px;">
		Return to Protocol
	</a>
</section>
