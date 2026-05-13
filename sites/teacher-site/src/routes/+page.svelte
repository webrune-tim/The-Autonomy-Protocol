<script lang="ts">
	import { thickMargins } from '@autonomy/actions'
	import { ArrowBigRight, Map, Route, ShieldCog } from '@lucide/svelte'
</script>

<section class="angled-bottom-box" style="--color: var(--brand-blue)">
	<h1>Empowering Student Agency. Transforming Campus Culture</h1>
	<p>
		A scalable socio-emotional curriculum designed to build intrinsic accountability
		and self-governance in high school students based on the transformative power of
		the 12-Step Reconstructive Process and the Five Agreements.
	</p>
	<a class="cta" href="/curriculum">
		<Route size={32} /> Access Curriculum <ArrowBigRight size={32} />
	</a>
</section>

<section
	class="angled-top-bottom-box thick-margins"
	style="--color: var(--brand-orange)"
>
	<div class="title-grid">
		<h2>The Problem:</h2>
	</div>
	<ol>
		<li>
			<strong>Resource Drain:</strong> Traditional discipline relies on external regulation
			that exhausts staff energy.
		</li>
		<li>
			<strong>Educator Burnout:</strong> Top-down enforcement fuels burnout and prevents
			proactive teaching.
		</li>
		<li>
			<strong>Student Dependency:</strong> Current systems often leave students dependent
			on adults to solve conflicts.
		</li>
	</ol>
</section>

<section class="angled-top-box" style="--color: var(--brand-teal)" use:thickMargins>
	<div class="title-grid">
		<h2>The Opportunity:</h2>
	</div>
	<ol>
		<li>
			<strong>Student-Led Accountability:</strong> Shift the burden of responsibility back
			to the student.
		</li>
		<li>
			<strong>Actionable Regulation:</strong> Equip staff with structured tools for emotional
			and social navigation.
		</li>
		<li>
			<strong>Proactive Climate:</strong> Move toward a campus culture of mutual respect
			and restorative growth.
		</li>
	</ol>
</section>

<section>
	<div class="grid">
		<section class="bold-border-box" style="--border-color: var(--brand-orange)">
			<div class="title-grid">
				<div class="flex-column">
					<h3>The Integrity Shield</h3>
					<span>(Tier 1: Prevention)</span>
				</div>
			</div>

			<ol>
				<li>
					<strong>Communicate Clearly:</strong> Replace rumors with honesty.
				</li>
				<li>
					<strong>Set Boundaries:</strong> Build resilience against negativity.
				</li>
				<li>
					<strong>Seek Clarity:</strong> Challenge narratives with facts.
				</li>
				<li>
					<strong>Balance Effort:</strong> Sustain growth through high stress.
				</li>
				<li>
					<strong>Practice Presence:</strong> Evaluate impulses, find truth.
				</li>
			</ol>
		</section>

		<section class="bold-border-box">
			<div class="title-grid">
				<div class="flex-column">
					<h3>The Accountability Cycle</h3>
					<span>(Tier 2: Restoration)</span>
				</div>
			</div>
			<ol>
				<li>
					<strong>Acknowledge Patterns:</strong> Identify the problem.
				</li>
				<li>
					<strong>Self-Assess:</strong> Conduct an objective inventory.
				</li>
				<li>
					<strong>Repair Harm:</strong> Take direct action to fix relationships.
				</li>
				<li>
					<strong>Mentor Others:</strong> Reflect and support peers.
				</li>
				<li>
					<strong>Stay Present:</strong> Maintain discernment in action.
				</li>
			</ol>
		</section>
	</div>
</section>

<section
	class="bold-border-box margin-top flex-around"
	style="--border-color: var(--fg)"
>
	<a class="link" href="/join-us">
		<Route size={32} /> Join Our Team <ArrowBigRight size={24} />
	</a>
	<a class="link" href="/mission">
		<ShieldCog size={32} /> Our Mission <ArrowBigRight size={24} />
	</a>
	<a class="link" href="/road-map">
		<Map size={32} /> Road Map <ArrowBigRight size={24} />
	</a>
</section>

<style>
	.cta,
	.link {
		display: inline-flex !important;
		align-items: center;
		gap: var(--gap-1);
		font-weight: bold;
		color: var(--brand-orange);
		text-decoration: none;
		margin-top: var(--gap-1);
	}
	.link {
		margin-top: 0;
		font-size: 1.5rem;
	}
</style>
