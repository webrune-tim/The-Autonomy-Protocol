<script lang="ts">
	import { thickMargins } from '@autonomy/actions'
	import { BookOpen, Compass, Milestone } from '@lucide/svelte'
</script>

<section
	class="angled-bottom-box"
	style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast);"
>
	<h1>Empowering Student Agency. Transforming Campus Culture</h1>
	<p>
		A scalable socio-emotional curriculum designed to build intrinsic accountability
		and self-governance in high school students based on the transformative power of
		the 12-Step Reconstructive Process and the Five Agreements.
	</p>
	<a class="cta" href="/mission">
		<Compass /> Explore the Framework
	</a>
	<a class="cta" href="/curriculum">
		<BookOpen /> View Curriculum
	</a>
</section>

<section
	class="angled-top-bottom-box"
	use:thickMargins
	style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast);"
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

	<a class="cta" href="/road-map">
		<Milestone /> See the Roadmap
	</a>
</section>

<section
	class="angled-top-box"
	style="--color: var(--brand-tertiary); --text_color: var(--brand-tertiary-contrast);"
	use:thickMargins
>
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

	<a class="cta" href="/road-map">
		<Milestone /> See the Roadmap
	</a>
</section>

<section>
	<div class="grid">
		<section
			class="bold-border-box"
			style="--border-color: var(--brand-primary); --title-color: var(--text-primary-print); --text_color: var(--brand-primary-contrast);"
		>
			<div class="title-grid">
				<div class="flex-column">
					<h3>The Accountability Cycle</h3>
					<span class="tier-label">(Tier 1: Restoration)</span>
				</div>
			</div>
			<ol class="colored-list">
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

		<section
			class="bold-border-box"
			style="--border-color: var(--brand-secondary); --title-color: var(--text-secondary-print);"
		>
			<div class="title-grid">
				<div class="flex-column">
					<h3>The Integrity Shield</h3>
					<span class="tier-label">(Tier 2: Prevention)</span>
				</div>
			</div>

			<ol class="colored-list" style="--list-accent: var(--text-secondary-print);">
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
	</div>
</section>

<style>
	.cta,
	.link {
		display: inline-flex !important;
		align-items: center;
		font-weight: bold;
		text-decoration: none;
	}

	.link {
		margin-top: 0;
		font-size: 1.5rem;
		gap: var(--gap-1);
		color: var(--text-link);
		transition: color 0.2s ease;
	}

	.link:hover {
		color: var(--text-link-hover);
	}

	h3 {
		color: var(--title-color, var(--fg));
		margin: 0;
	}

	.tier-label {
		color: var(--fg);
		opacity: 0.85;
		font-size: 0.95rem;
	}

	.colored-list {
		color: var(--fg);

		li {
			margin-bottom: 0.5rem;

			strong {
				color: var(--list-accent, var(--text-primary-print));
			}
		}
	}
</style>
