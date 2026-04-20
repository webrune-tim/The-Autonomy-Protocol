<script lang="ts">
	import { FourAgreements, Hero, TwelveSteps } from '$components'
	import HeroImage from '$images/pic-1.jpg?enhanced&w=400;1000;1600;2400'

	import ArrowBigRight from '@lucide/svelte/icons/arrow-big-right'
	import Bug from '@lucide/svelte/icons/bug'
	import LoaderPinwheel from '@lucide/svelte/icons/loader-pinwheel'
	import HandFist from '@lucide/svelte/icons/hand-fist'
	import Map from '@lucide/svelte/icons/map'
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

<section class="margin-top">
	<div class="grid">
		<div class="trans-blue box">
			<div class="title-grid" style="--color: var(--brand-orange)">
				<Bug size={45} />
				<div class="flex-column">
					<h2>The Problem:</h2>
					<span>The Limits of External Compliance</span>
				</div>
			</div>
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
			<div class="title-grid" style="--color: var(--brand-blue)">
				<ShieldPlus size={45} />
				<div class="flex-column">
					<h2>The Opportunity:</h2>
					<span>Building a Culture of Autonomy and Accountability</span>
				</div>
			</div>
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
			<div class='title-grid'>
                <HandFist size={32} />
                <div class='flex-column'>
                    <h3>The Integrity Shield</h3>
                    <span>(Tier 1 & Climate Defense)</span>
                </div>
            </div>
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
			<details>
				<summary
					><strong>Additional information about the Integrity Shield.</strong
					></summary
				>
				<FourAgreements />
			</details>
		</section>

		<section>
			<div class='title-grid'>
                <LoaderPinwheel size={32} />
                <div class='flex-column'>
                    <h3>The Accountability Cycle</h3>
                    <span>(Tier 2 & Restorative Intervention)</span>
                </div>
            </div>
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
			<details>
				<summary
					><strong>Additional information about the Accountability Cycle.</strong
					></summary
				>
				<TwelveSteps />
			</details>
		</section>
	</div>
</section>

<section class="content flex">
	<a class="link" href="/curriculum">
		<Road size={32} /> Curriculum Map <ArrowBigRight size={24} />
	</a>
	<a class="link" href="/resources">
		<Toolbox size={32} /> Other Resources <ArrowBigRight size={24} />
	</a>
	<a class="link" href="/road-map">
		<Map size={32} /> Road Map <ArrowBigRight size={24} />
	</a>
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
		margin-top: var(--gap-1);
	}
</style>
