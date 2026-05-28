<script>
	import { ArrowBigRight, Route } from '@lucide/svelte'
	import { thickMargins } from '@autonomy/actions'
</script>

<div
	class="angled-bottom-box"
	style="--color: var(--brand-tertiary); --text_color: var(--brand-tertiary-contrast)"
>
	<h1>Building the Foundation for Self-Governed Futures</h1>
	<p>Why Pedagogical Autonomy Matters</p>
</div>

<section
	class="angled-top-bottom-box"
	use:thickMargins
	style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast)"
>
	<h2>Our Mission</h2>
	<p>
		<strong>Our objective is definitive:</strong> to ensure every student graduates with
		the executive functioning skills required to navigate adult complexities independently.
		By internalizing self-governance, we reduce the friction of external regulation—returning
		hundreds of hours of instructional time to teachers and staff.
	</p>

	<a class="cta" href="/join-us">
		<Route /> Join Us <ArrowBigRight />
	</a>
</section>

<section
	class="angled-top-box"
	use:thickMargins
	style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast)"
>
	<h2>The Shift: From Punitive to Proactive</h2>
	<p>
		Most institutional environments operate on a binary reward-and-punishment system,
		incentivizing students to simply avoid getting caught. The Autonomy Protocol
		disrupts this model. We treat personal development as a continuous assessment
		process. By teaching students to identify and correct their own behavioral
		liabilities, we shift their motivation from fear of administrative discipline to
		the intrinsic pursuit of personal and academic excellence.
	</p>

	<a class="cta" href="/road-map">
		<Route /> View the Strategy <ArrowBigRight />
	</a>
</section>

<section>
	<div class="flex">
		<div class="bold-border-box" style="--border-color: var(--brand-primary)">
			<h2>Methodology: Cognitive & Behavioral Frameworks</h2>
			<h3 class="margin-top margin-bottom">
				The Accountability Cycle (Internal Regulation)
			</h3>
			<p>
				Utilizing established cognitive behavioral principles, this 12-step recursive
				process equips students with the tools to perform "self-audits" on their
				behavioral choices and academic performance.
			</p>

			<ul class="margin-top">
				<li>
					<strong>Locus of Control:</strong> Helping students differentiate between external
					circumstances and internal responses.
				</li>
				<li>
					<strong>The Character Inventory:</strong> Developing the radical honesty required
					to identify personal behavioral liabilities and growth areas.
				</li>
				<li>
					<strong>Restorative Repair:</strong> Moving beyond performative apologies to
					the "Amends Protocol"—a structured process for repairing social trust and campus
					relationships.
				</li>
				<li>
					<strong>Iterative Reflection:</strong> Establishing a daily habit of self-monitoring
					to ensure students remain aligned with classroom and personal goals.
				</li>
			</ul>
		</div>
		<div class="bold-border-box" style="--border-color: var(--brand-tertiary)">
			<h2>Methodology: Interpersonal Agreements</h2>
			<h3 class="margin-top margin-bottom">
				The Integrity Shield (Tier 1 Interpersonal Tools)
			</h3>
			<p>
				These five foundational agreements serve as a proactive behavioral defense
				system, designed to de-escalate interpersonal conflict and reduce
				administrative disciplinary referrals.
			</p>

			<ul class="margin-top">
				<li>
					<strong>Reliable Communication:</strong> Emphasizing integrity and follow-through
					as the foundation of a student's academic reputation.
				</li>
				<li>
					<strong>Emotional Neutrality:</strong> Teaching students to depersonalize peer
					conflict, thereby increasing resilience and decreasing reactive behaviors.
				</li>
				<li>
					<strong>Clarifying Inquiry:</strong> Encouraging direct communication over social
					assumptions to mitigate campus rumors and interpersonal drama.
				</li>
				<li>
					<strong>Consistent Effort:</strong> Shifting the focus from unattainable perfection
					to "variable capacity," allowing students to maintain growth even during high-stress
					periods.
				</li>
				<li>
					<strong>Be Skeptical, But Listen:</strong> Teaching students to question information
					sources while remaining open to constructive feedback.
				</li>
			</ul>

			<a class="cta" href="/curriculum">
				<Route /> Explore the Curriculum <ArrowBigRight />
			</a>
		</div>
		<div
			class="bold-border-box"
			use:thickMargins
			style="--border-color: var(--brand-secondary)"
		>
			<h2>Cross-Curricular Application & Post-Secondary Outcomes</h2>
			<p>
				The Autonomy Protocol is not a theoretical exercise; it is a workforce
				readiness initiative. We demonstrate how these self-governance skills
				translate directly into high-stakes professional environments:
			</p>

			<ul>
				<li>
					<strong>STEM & Professional Services:</strong> How rigorous personal honesty
					and objective peer review result in higher quality project outcomes.
				</li>
				<li>
					<strong>Healthcare & Human Services:</strong> How emotional neutrality prevents
					burnout and ensures high-quality care in high-pressure situations.
				</li>
				<li>
					<strong>Skilled Trades & Industry:</strong> Why personal reliability and structural
					integrity are the most valuable tools for professional advancement.
				</li>
			</ul>
		</div>
	</div>
</section>

<section
	class="bold-border-box margin-top-2 flex-around"
	style="--border-color: var(--fg)"
>
	<h2>The Architect</h2>
	<p>
		<strong>The Autonomy Protocol</strong> was developed by
		<a href="https://www.tim-smith-solutions.tech/" target="_blank">Tim Smith</a>.
		The framework is built upon the structural logic of high-stakes behavioral
		models, secularized and reconstructed for the secondary education environment.
		Smith's development of the protocol was driven by a fundamental realization: the
		cognitive tools required for profound personal transformation are the exact same
		mechanisms needed for student empowerment and executive functioning.
	</p>
	<p>
		By stripping these principles of their traditional jargon and adapting them for
		the modern classroom, Smith created a methodology rooted in <strong
			>internal mastery</strong
		>
		rather than external compliance. This approach—born from the necessity of navigating
		complex personal recovery—has been refined into a battle-tested protocol. It equips
		students to manage academic and social complexities with the resilience required for
		long-term professional success.
	</p>
</section>

<style>
	.cta {
		display: inline-flex;
		align-items: center;
		gap: var(--gap-1);
		font-weight: bold;
		color: var(--brand-secondary);
		text-decoration: none;
		margin-top: var(--gap-1);
	}
</style>
