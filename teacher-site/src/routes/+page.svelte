<script lang="ts">
	import { Hero } from '$components'
	import HeroImage from '$images/pic-1.jpg?enhanced&w=400;1000;1600;2400'

	import ArrowBigRight from '@lucide/svelte/icons/arrow-big-right'
	import Bug from '@lucide/svelte/icons/bug'
	import LoaderPinwheel from '@lucide/svelte/icons/loader-pinwheel'
	import HandFist from '@lucide/svelte/icons/hand-fist'
	import ShieldPlus from '@lucide/svelte/icons/shield-plus'
	import Road from '@lucide/svelte/icons/road'
	import Toolbox from '@lucide/svelte/icons/toolbox'
</script>

<Hero {HeroImage}>
	<h1>Empowering Student Agency. Transforming Campus Culture.</h1>
	<p>
		Move beyond reactive discipline. The Autonomy Protocol is a scalable
		socio-emotional framework designed to build intrinsic accountability, emotional
		resilience, and authentic self-governance in high school students.
	</p>
</Hero>

<section class="content">
	<div class="grid">
		<div class="trans-blue box">
			<h2><Bug /> The Problem: The Limits of External Compliance</h2>
			<p>
				Traditional disciplinary models rely heavily on external regulation.
				Administrators and teachers expend massive amounts of energy intervening in
				conflicts, enforcing baseline rules, and mediating peer disputes. This
				top-down approach exhausts administrative resources, accelerates educator
				burnout, and leaves students dependent on adults to navigate their emotional
				challenges. When behavioral issues are simply "handled" by the system,
				students fail to develop the internal mechanisms required for lifelong
				responsibility.
			</p>
		</div>

		<div class="trans-orange box">
			<h2>
				<ShieldPlus /> The Solution: A Comprehensive Framework for Student Behavior
			</h2>
			<p>
				The Autonomy Protocol equips your staff with a structured, scalable program
				that shifts the burden of responsibility back to the student. By providing
				clear, actionable tools for emotional regulation and restorative
				accountability, the protocol helps schools cultivate a climate of mutual
				respect and proactive problem-solving. We break this transition into two
				operational models: <strong>The Accountability Cycle</strong>, and
				<strong>The Integrity Shield</strong>.
			</p>
		</div>
	</div>
</section>
<section class="content">
	<div class="grid">
		<section>
			<h4><HandFist size={32} /> The Integrity Shield (Tier 1 & Climate Defense)</h4>
			<p>
				Four core agreements serving as Tier 1 preventative tools, providing staff
				and students with a shared vocabulary to de-escalate conflicts proactively.
			</p>

			<ol>
				<li>
					<strong>Impeccable Communication:</strong> Cultivating honesty to reduce rumors
					and social fracturing.
				</li>
				<li>
					<strong>Depersonalization:</strong> Maintaining emotional boundaries to build
					resilience against peer negativity.
				</li>
				<li>
					<strong>Eliminating Assumptions:</strong> Training students to seek clarity over
					narrative, preventing academic confusion and anxiety.
				</li>
				<li>
					<strong>Calibrating Effort:</strong> Sustaining consistent growth by extending
					grace during high stress while remaining committed to academic goals.
				</li>
			</ol>
		</section>

		<section>
			<h3>
				<LoaderPinwheel size={32} /> The Accountability Cycle (Tier 2 & Restorative Intervention)
			</h3>
			<ol>
				<li>
					<strong>Honesty & Possibility:</strong> Recognizing disruptive patterns and accepting
					that constructive solutions exist.
				</li>
				<li>
					<strong>Inventory & Confession:</strong> Conducting rigorous, objective self-assessments
					and verbalizing them to a trusted educator.
				</li>
				<li>
					<strong>Responsibility & Amends:</strong> Identifying impacted peers or staff
					and taking direct, restorative action to repair harmed relationships.
				</li>
				<li>
					<strong>Vigilance & Service:</strong> Maintaining continuous self-reflection
					and ultimately mentoring struggling peers.
				</li>
			</ol>
		</section>
	</div>
</section>

<section class="content">
	<a class="link" href="/road-map"
		><Road size={32} /> Explore the Curriculum Map <ArrowBigRight size={32} /></a
	>
	<a class="link" href="/resources"
		><Toolbox size={32} /> Review the Implementation Guide <ArrowBigRight
			size={32}
		/></a
	>
</section>

<style>
	.link {
		display: inline-flex;
		align-items: center;
		gap: var(--gap-1);
		font-weight: bold;
		color: var(--brand-orange);
		text-decoration: none;
		font-size: 1.5rem;
		margin-top: var(--gap-2);
	}
</style>
