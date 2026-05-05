<script lang="ts">
	// Import the shared packages
	import { FourAgreements } from '@autonomy/four-agreements'
	// import { HorizontalScroll } from '@autonomy/horizontal-scroll'
	import { TwelveSteps } from '@autonomy/twelve-steps'
	// import { twelve_steps, four_agreements } from '$lib/assets/steps-agreements'

	import {
		ArrowBigRight,
		Bug,
		LoaderPinwheel,
		HandFist,
		Map,
		ShieldPlus,
		Road,
		Toolbox
	} from '@lucide/svelte'
</script>

<div class="angled-bottom-box" style="--color: var(--brand-blue)">
	<h1>Empowering Student Agency. Transforming Campus Culture.</h1>
	<p>
		Traditional discipline often drains school resources by relying on external
		regulation. When administrators and teachers spend their energy constantly
		"handling" conflicts, it leads to burnout and prevents students from developing
		their own problem-solving skills.
	</p>
	<p>
		To foster lifelong responsibility, we must move away from top-down enforcement
		and toward models that help students build their own internal mechanisms for
		navigating emotional and social challenges.
	</p>
</div>

<div class="angled-top-bottom-box" style="--color: var(--brand-orange)">
	<div class="title-grid">
		<h2>The Problem:</h2>
	</div>
	<p>
		Traditional discipline relies on <strong>external regulation</strong>, where
		staff exhaust resources managing conflicts and enforcing rules. This top-down
		approach fuels educator burnout and leaves students dependent on adults. By
		simply "handling" behavior, the system prevents students from developing the
		internal <strong>mechanisms</strong> necessary for lifelong responsibility.
	</p>
</div>

<div class="angled-top-box" style="--color: var(--brand-teal)">
	<div class="title-grid">
		<h2>The Opportunity:</h2>
	</div>
	<p>
		The Autonomy Protocol equips your staff with a structured, scalable program that
		shifts the burden of responsibility back to the student. By providing clear,
		actionable tools for emotional regulation and restorative accountability, the
		protocol helps schools cultivate a climate of mutual respect and proactive
		problem-solving. We break this transition into two operational models: <strong
			>The Accountability Cycle</strong
		>, and
		<strong>The Integrity Shield</strong>.
	</p>
</div>

<!-- <HorizontalScroll title="Twelve Steps" cards_content={twelve_steps} />
<HorizontalScroll title="Four Agreements" cards_content={four_agreements} /> -->

<section>
	<div class="grid">
		<section class="bold-border-box" style="--border-color: var(--brand-orange)">
			<div class="title-grid">
				<!-- <HandFist size={32} /> -->
				<div class="flex-column">
					<h3>The Integrity Shield</h3>
					<span>(Tier 1 & Climate Defense)</span>
				</div>
			</div>
			<!-- <p>
				Four core agreements serving as Tier 1 preventative tools, providing staff
				and students with a shared vocabulary to de-escalate conflicts proactively.
			</p> -->

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

		<section class="bold-border-box">
			<div class="title-grid">
				<!-- <LoaderPinwheel size={32} /> -->
				<div class="flex-column">
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
				<li>
					<strong>Discernment & Presence:</strong> Practicing healthy skepticism of one's
					own immediate impulses while remaining open to the perspective of others to find
					the ultimate truth.
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

<section class="bold-border-box margin-top" style="--border-color: var(--fg)">
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
