<script lang="ts">
	import { thickMargins } from '@autonomy/actions'
	import { Route, ShipWheel, Star } from '@lucide/svelte'
</script>

<section class="angled-bottom-box">
	<h1>Own Your Future. Master the Protocol.</h1>
	<p>
		High school isn't just about academics; it's about building the foundation for
		the rest of your life. Step into a system designed to teach you real-world life
		management, self-governance, and absolute accountability.
	</p>

	<a class="cta" href="/assignments">
		<Star size={32} /> Begin the Protocol <ArrowBigRight size={32} />
	</a>
	<a class="cta" href="/homework">
		<Route size={32} /> View the Roadmap <ArrowBigRight size={32} />
	</a>
</section>

<section class="angled-top-bottom-box">
	<h2 class="reveal-header">
		Built for Where You Are. Designed for Where You're Going.
	</h2>
	<p><strong>Freahman</strong></p>
	<p>
		Start your high school career with a blueprint. Don't wait until graduation to
		figure out how to manage your time, navigate challenges, or set boundaries. Build
		the habits now that will put you in the driver's seat for the next four years.
	</p>
</section>

<section class="angled-top-bottom-box" style="--color: var(--brand-tertiary);">
	<p><strong>Seniors</strong></p>
	<p>
		The final stretch. Before you step out on your own, solidify your self-reliance.
		Master the real-world accountability and life management skills required to
		transition from student to an independent adult.
	</p>
</section>

<section
	class="angled-top-bottom-box"
	use:thickMargins
	style="--color: var(--brand-primary);"
>
	<h2 class="reveal-header">The Autonomy Framework</h2>
	<ul>
		<li>
			<strong>Self-Governance:</strong> You are the architect of your own life. Learn how
			to filter out the noise, make decisions that align with your actual goals, and take
			control of your daily trajectory.
		</li>
		<li>
			<strong>Life Management:</strong> Turn chaos into order. Gain practical, no-nonsense
			tools to handle your schedule, manage stress, and balance your responsibilities without
			burning out.
		</li>
		<li>
			<strong>Accountability:</strong> No excuses. Own your victories and learn from your
			losses. We help you build a track record of reliability that you—and the people around
			you—can trust.
		</li>
	</ul>
</section>

<section
	class="angled-top-box no-bottom-margin"
	style="--color: var(--brand-secondary);"
>
	<h3 class="reveal-header">Ready to take the wheel?</h3>
	<p>The tools are here. The choice to use them is yours.</p>

	<a class="cta" href="/assignments">
		<ShipWheel size={32} /> Start Your First Module <ArrowBigRight size={32} />
	</a>
</section>

<style>
	.cta,
	.link {
		display: inline-flex !important;
		align-items: center;
		gap: var(--gap-1);
		font-weight: bold;
		color: var(--brand-secondary);
		text-decoration: none;
		margin-top: var(--gap-1);
	}
	.link {
		margin-top: 0;
		font-size: 1.5rem;
	}
</style>
