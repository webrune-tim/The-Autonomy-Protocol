<script>
	import { foresight, thickMargins } from '@autonomy/actions'
	import { BookImage, Send } from '@lucide/svelte'
	import { RevealingImage } from '@autonomy/revealing_image'

	import JoinUsImage from '$images/join-us.png'
</script>

<section
	class="angled-bottom-box"
	style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast)"
>
	<h1>Shape the Future of Student Sovereignty: Join Our Team</h1>
	<p>
		<strong>The Autonomy Protocol</strong> is more than just a curriculum; it is a
		framework for life. We are adapting the proven, transformative power of the
		<strong>12-Step Reconstructive Process</strong>
		and the <strong>Five Agreements</strong> specifically for the modern high school environment.
	</p>

	<p>
		We are looking for educators and mental health experts to help us translate these
		profound principles into actionable, secular, and high-impact curriculum modules.
	</p>

	<RevealingImage src={JoinUsImage} alt="Join Us!" />

	<a class="cta" href="#how-you-can-help">
		<BookImage /> Browse Opportunities
	</a>
</section>

<section
	class="angled-top-bottom-box"
	style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast)"
>
	<h2 class="reveal-header">Our Core Framework</h2>

	<p>
		To reach students effectively, we focus our contributions around two pillars:
	</p>

	<ul>
		<li>
			<strong>The 12 Steps (Reconstructed):</strong> A secular roadmap for accountability,
			self-correction, and interpersonal repair.
		</li>
		<li>
			<strong>The Five Agreements (Reconstructed):</strong> A behavioral code of conduct
			that fosters internal self-governance and cognitive clarity.
		</li>
	</ul>
</section>

<section
	class="angled-top-bottom-box"
	use:thickMargins
	style="--color: var(--brand-tertiary); --text_color: var(--brand-tertiary-contrast)"
>
	<h2 class="reveal-header">Why Your Expertise is Critical</h2>

	<p>
		We need professionals who can bridge the gap between deep psychological work and
		practical classroom execution.
	</p>

	<ul>
		<li>
			<strong>Educators & Degree Candidates:</strong> Help us ensure these principles
			meet academic standards and are "digestible" for a high school freshman.
		</li>
		<li>
			<strong>Mental Health Professionals:</strong> Help us maintain the integrity of
			the 12-step logic while ensuring the "Secular Rigor" required for public school
			implementation.
		</li>
	</ul>
</section>

<section
	class="angled-top-box"
	use:thickMargins
	style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast)"
>
	<h2 id="how-you-can-help" class="reveal-header">How You Can Help</h2>

	<p>Instead of technical tasks, we invite you to own a piece of the philosophy:</p>

	<ol>
		<li>
			<strong>Draft a "Practicum":</strong> Create a concrete classroom exercise that
			brings one of the 12 Steps to life without using religious or therapeutic jargon.
		</li>
		<li>
			<strong>Peer Review for Neutrality:</strong> Use your professional eye to ensure
			our modules remain free of partisan or sectarian language.
		</li>
		<li>
			<strong>Vocational Pathing:</strong> Help us apply the Five Agreements to specific
			career paths (like Law, Arts, or Agriculture) so students see the real-world utility.
		</li>
	</ol>
	<a class="cta" href="/contact" use:foresight>
		<Send /> Submit Your Interest
	</a>
</section>

<section class="bold-border-box margin-top" style="--border-color: var(--fg)">
	<h2 class="reveal-header">Ready to Build a Self-Governed Future?</h2>

	<p>
		We operate under the <strong>Integrity Protocol:</strong> we are impeccable with our
		word, we don't take feedback personally, and we always do our best. If those values
		resonate with you, we would love to have your voice in the project.
	</p>
</section>
