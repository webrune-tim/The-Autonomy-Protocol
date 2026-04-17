<script lang="ts">
	import { Hero } from '$components'
	import HeroImage from '$images/pic-1.jpg?enhanced&w=400;1000;1600;2400'

	import Bug from '@lucide/svelte/icons/bug'
	import LoaderPinwheel from '@lucide/svelte/icons/loader-pinwheel'
	import HandFist from '@lucide/svelte/icons/hand-fist'
	import ShieldPlus from '@lucide/svelte/icons/shield-plus'
</script>

<Hero {HeroImage}>
	<h1>The Autonomy Protocol</h1>
	<p>
		Stop letting drama and stress run the show. Learn the "Life Skills" you actually
		need to be your own boss.
	</p>
</Hero>

<section class="content">
	<div class="grid">
		<div class="trans-blue box">
			<h2><Bug /> The Problem: Being "Handled"</h2>
			<p>
				Most of the time, school feels like people telling you what to do, where to go,
				and how to act. When things go wrong—like a bad grade or a fight with a
				friend—it's easy to feel like you have no control. That's when the "system"
				(parents, teachers, principals) steps in to handle things for you.
			</p>
		</div>

		<div class="trans-orange box">
			<h2><ShieldPlus /> The Solution: The Autonomy Protocol</h2>
			<p>
				The Autonomy Protocol is your personal game plan for life. It's a set of tools
				that helps you handle your own business so nobody else has to. We break it down
				into two main parts:
			</p>
		</div>
	</div>

	<section class="content">
		<div class="accountability-cycle">
			<h4><LoaderPinwheel size={32} /> The Accountability Cycle</h4>
			<div class="grid">
				<div class="step-grid">
					<span>1</span>
					<p><strong>Honesty:</strong> Acknowledge that the current situation is out of control
						and that current methods of managing it are no longer working.</p>
				</div>
				<div class="step-grid">
					<span>2</span>
					<p><strong>Possibility:</strong> Accept that a solution exists outside of one's
						own current limited perspective or ego.</p>
				</div>
				<div class="step-grid">
					<span>3</span>
					<p><strong>Commitment:</strong> Decide to trust a higher principle, a structured
						process, or a collective wisdom rather than relying solely on self-will.</p>
				</div>
				<div class="step-grid">
					<span>4</span>
					<p><strong>Inventory:</strong> Conduct a rigorous, objective assessment of one's
						own character, behaviors, and past actions.</p>
				</div>
				<div class="step-grid">
					<span>5</span>
					<p><strong>Confession:</strong> Verbally acknowledge these findings to oneself and
						at least one other trusted person or mentor to break the cycle of secrecy.</p>
				</div>
				<div class="step-grid">
					<span>6</span>
					<p><strong>Readiness:</strong> Become mentally and emotionally prepared to let go
						of old patterns and defensive traits.</p>
				</div>
				<div class="step-grid">
					<span>7</span>
					<p><strong>Request:</strong> Actively seek the strength or discipline required to
						change these deep-seated flaws.</p>
				</div>
				<div class="step-grid">
					<span>8</span>
					<p><strong>Responsibility:</strong> Identify every individual who has been negatively
						impacted by your past actions and commit to fixing those relationships.</p>
				</div>
				<div class="step-grid">
					<span>9</span>
					<p><strong>Amends:</strong> Take direct action to repair the harm caused, prioritizing
						the safety and well-being of the other party above your own comfort.</p>
				</div>
				<div class="step-grid">
					<span>10</span>
					<p><strong>Vigilance:</strong> Maintain a habit of continuous self-reflection, quickly
						identifying and correcting new mistakes as they occur.</p>
				</div>
				<div class="step-grid">
					<span>11</span>
					<p><strong>Attunement:</strong> Use regular practice—such as meditation, study,
						or reflection—to stay aligned with your core values and purpose.</p>
				</div>
				<div class="step-grid">
					<span>12</span>
					<p><strong>Service:</strong> Internalize these principles so deeply that they influence
						every area of life, and offer support to others seeking a similar path of change.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="content">
		<div class="accountability-cycle">
			<h4><HandFist size={32} /> The Integrity Shield</h4>
			<p>
				<strong>How You Handle Others:</strong> 4 simple agreements to stop drama before
				it starts and build a reputation people respect.
			</p>
			<p><strong>Block the noise and stay focused.</strong></p>
			<div class="grid">
				<div class="step-grid">
					<span>1</span>
					<p><strong>Be impecable with your word:</strong> Do what you say, and say what you
					do. When we go against out own word or lie, we are only harming and going against
					ourselves. Being impecable with our word, having integraty, is not easy, but
					it the most important agreement we can make with ourselves.</p>
				</div>
				<div class="step-grid">
					<span>2</span>
					<p><strong>Don't take anything/anyone personaly:</strong> Humans, especialy in our
					formitive years, like to think that eveything is about them. "Someone does not
					like me. It must be because I am unlikable." "Someone is mean to me. It me be
					because of something I did to them." No matter what anyone does to us, it is
					not about us, it is about them. Hurt people hurt people. We can not take it personaly.
					We can only have compassion for those that hurt us. We are the only ones responsible
					for our feelings.</p>
				</div>
				<div class="step-grid">
					<span>3</span>
					<p><strong>Don't make any assumptions:</strong> Whether you are a freshman navigating
					an intimidating new campus culture or a senior bracing for the ambiguous post-graduation
					leap, refusing to make assumptions is your strongest defense against unnecessary
					drama. Instead of inventing anxious narratives about what your peers think or
					what your teachers expect, you must courageously ask direct questions to find
					the truth. This proactive communication cuts through the noise of high school
					rumors and clears up academic confusion before it spirals. Ultimately, by seeking
					clarity rather than relying on guesswork, you actively protect your peace of
					mind and build genuine, reality-based relationships.</p>
				</div>
				<div class="step-grid">
					<span>4</span>
					<p><strong>Always do your best:</strong> Concurrently, agreeing to always do your
					best demands the mature realization that your actual capacity will change from
					day to day. Your highest level of performance on a well-rested morning will look
					vastly different from your best when you are battling burnout, daily academic
					stress, or low physical energy. The key is extending yourself grace on the days
					you operate at a deficit while remaining fiercely committed to your personal
					and academic growth. By dropping the pursuit of flawless perfection and focusing
					simply on consistent effort, you will cultivate the emotional resilience necessary
					to thrive through high school and beyond.</p>
				</div>
			</div>
		</div>
	</section>
</section>

<section class="content">
	<h2>The High School Roadmap</h2>

	<ol>
		<li>
			<strong>Freshman (The Setup):</strong> Learning what you can actually control (hint:
			it's not other people) and how to be honest with yourself.
		</li>
		<li>
			<strong>Sophomore/Junior (The Practice):</strong> Using these tools in class, in
			sports, and with your friends.
		</li>
		<li>
			<strong>Senior (The Pro Level):</strong> Taking these skills into the "real world"—whether
			you're headed to college, a tech job, a hospital, or a job site.
		</li>
	</ol>
</section>

<style>
	.accountability-cycle,
	.integrity-cycle {
		h4 {
            font-weight: bolder
			font-size: 2rem;
            text-align: center;
			margin: 0;
		}

		.step-grid {
			display: grid;
			align-items: center;
			gap: var(--gap-2);
			grid-template-columns: auto 1fr;

			span {
				color: var(--brand-blue);
				font-size: 3rem;
			}
		}
	}

	
	.grid {
		display: grid;
		gap: var(--gap-2);
		grid-template-columns: 1fr 1fr;
	}

	@media (max-width: 600px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
