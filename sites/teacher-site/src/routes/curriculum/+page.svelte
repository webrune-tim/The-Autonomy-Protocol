<script>
	import { thickMargins, foresight } from '@autonomy/actions'
	import { RevealingImage } from '@autonomy/revealing_image'
	import { Download, ShieldQuestionMark, Scale, FileText, MessageSquareQuote, CheckCircle2 } from '@lucide/svelte'
	import { SEO } from '@autonomy/seo'

	import CurriculumImage from '#lib/assets/images/curriculum.webp'

	const curriculumJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Course',
		name: 'The Autonomy Protocol Curriculum',
		description:
			'Dual-intervention executive functioning and psychological literacy curriculum for secondary students, spanning Freshman Foundation and Senior Capstone.',
		provider: {
			'@type': 'EducationalOrganization',
			name: 'The Autonomy Protocol',
			sameAs: 'https://the-autonomy-protocol.vercel.app'
		}
	}
</script>

<SEO
	title="Curriculum Framework: From Survival to Sovereignty | The Autonomy Protocol"
	description="A dual-intervention educational framework designed to bookend secondary education. Replace external behavioral policing with proactive self-governance and accountability."
	keywords="autonomy protocol curriculum, secondary executive functioning, high school behavioral framework, freshman advisory, senior capstone"
	jsonLd={curriculumJsonLd}
/>


<section
	class="angled-bottom-box"
	style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast)"
>
	<h1>Curriculum Overview</h1>

	<span>From Survival to Sovereignty</span>
	<p>
		Our curriculum is a dual-intervention strategy designed to bookend the high
		school experience. We replace reactive "behavior management" with proactive
		self-governance, providing students with a mental operating system that functions
		under pressure.
	</p>

	<RevealingImage src={CurriculumImage} alt="Our Curriculum" />

	<div class="cta-center">
		<a class="cta" href="/resources" use:foresight>
			<Download /> Download Lesson Guides
		</a>
	</div>
</section>

<section class="angled-top-bottom-box" use:thickMargins>
	<h2 class="reveal-header">Freshman Year | Phase 1: The Foundation</h2>

	<span>
		The Objective: Establishing an internal locus of control during the transition
		into high school.
	</span>

	<h3 class="reveal-header">Quarter 1: The Integrity Shield (Defense)</h3>

	<ul>
		<li>
			<strong>The Armor of Non-Personalization:</strong> Students learn the biology of
			the teenage brain to understand that a peer's "meanness" is a reflection of their
			own stress, not the student's value.
		</li>
		<li>
			<strong>The Clarification Protocol:</strong> Moving from "guessing and failing"
			to "The Courageous Question"—eliminating assumptions in rubrics and social cues.
		</li>
		<li>
			<strong>Variable Capacity Workshop:</strong> Mapping out how to maintain a GPA even
			when emotional or physical energy is at a seasonal low.
		</li>
	</ul>

	<h3 class="reveal-header">
		Quarter 2: The Accountability Cycle — Internal (Insight)
	</h3>

	<ul>
		<li>
			<strong>The Reality Check:</strong> Identifying "Middle School mindsets" (externalizing
			blame) that fail in a high-stakes environment.
		</li>
		<li>
			<strong>The Private Inventory:</strong> A clinical, non-judgmental mapping of personal
			defensive traits (ghosting, social aggression, or avoidance).
		</li>
	</ul>

	<h3 class="reveal-header">
		Quarter 3: The Accountability Cycle — External (Restitution)
	</h3>

	<ul>
		<li>
			<strong>Impact Auditing:</strong> Mapping how personal choices ripple through the
			classroom and family ecosystem.
		</li>
		<li>
			<strong>The Amends Protocol:</strong> Practical training in restorative repair—fixing
			a group project dynamic or delivering a professional apology to a teacher or administrator.
		</li>
	</ul>

	<h3 class="reveal-header">Quarter 4: Maintenance & Mentorship (Integration)</h3>

	<ul>
		<li>
			<strong>The Daily 5:</strong> Implementing a nightly "vigilance habit" to identify
			and course-correct mistakes before they escalate into "drama."
		</li>
		<li>
			<strong>The Service Phase:</strong> Freshmen create the "What I Wish I Knew" digital
			guide for incoming 8th graders, transitioning from student to guide.
		</li>
	</ul>
</section>

<section
	class="angled-top-box"
	use:thickMargins
	style="--color: var(--brand-tertiary); --text_color: var(--brand-tertiary-contrast)"
>
	<h2 class="reveal-header">Senior Year | Phase 2: The Transition</h2>

	<span>
		The Objective: Transitioning the protocol from an academic framework into a
		non-negotiable professional standard.
	</span>

	<h3 class="reveal-header">Quarter 1: The Integrity Shield (Professionalism)</h3>
	<ul>
		<li>
			<strong>Radical Integrity:</strong> Applying "impeccability with your word" to college
			applications and job contracts. The weight of a signature.
		</li>
		<li>
			<strong>Compassion in Conflict:</strong> Preparing for the high stakes of the real
			world. Handling "No" from a university or boss without losing momentum.
		</li>
		<li>
			<strong>Eliminating Ambiguity:</strong> Professional email etiquette and moving
			from "I think they're hiring" to "I asked if they are hiring."
		</li>
	</ul>

	<h3 class="reveal-header">
		Quarter 2: The Accountability Cycle — Internal (Preparation)
	</h3>
	<ul>
		<li>
			<strong>Ego Surrender:</strong> Acknowledging the fear of leaving home and accepting
			the reality of "Adulting" without having all the answers.
		</li>
		<li>
			<strong>The 4-Year Inventory:</strong> A rigorous review of their high school career.
			Identifying toxic patterns that must stay in high school and not follow them to
			college or the workforce.
		</li>
	</ul>

	<h3 class="reveal-header">
		Quarter 3: The Accountability Cycle — External (Legacy)
	</h3>
	<ul>
		<li>
			<strong>The Bridge-Building Phase:</strong> Identifying every mentor, teacher, or
			peer who assisted their journey and offering formal gratitude.
		</li>
		<li>
			<strong>The "Clean Slate" Project:</strong> Taking direct action to resolve long-standing
			feuds or family tensions before the "Ambiguous Leap" into adulthood.
		</li>
	</ul>

	<h3 class="reveal-header">Quarter 4: Maintenance & Service (The Launch)</h3>
	<ul>
		<li>
			<strong>The Autonomy Routine:</strong> Designing a personal system of meditation,
			reflection, and "attunement" that survives outside the school bell system.
		</li>
		<li>
			<strong>The Protocol Capstone:</strong> Seniors act as "Protocol Consultants" for
			Freshmen, presenting their Personal Operating System (POS) to a panel of mentors
			as a final graduation requirement.
		</li>
	</ul>
	<a class="cta" href="/contact" use:foresight>
		<ShieldQuestionMark /> Ready to Implement?
	</a>
</section>

<section
	class="angled-top-bottom-box"
	use:thickMargins
	style="--color: var(--brand-secondary, #3b4252); --text_color: var(--brand-secondary-contrast, #eceff4)"
>
	<h2 class="reveal-header">Advanced Practicum Track: Epistemic Autonomy & Socratic Inquiry</h2>

	<span>
		The Objective: Transitioning students from passive acceptance of institutional orthodoxy to rigorous, polite, evidence-grounded self-governance.
	</span>

	<p>
		Framing Socratic questioning around <strong>epistemic independence</strong>—rather than partisan conflict—protects the curriculum's universal credibility while equipping students with the exact cognitive tools needed to respectfully challenge unexamined assumptions, unverified consensus, and ideological assertions in the classroom.
	</p>

	<h3 class="reveal-header">Module 1: The Anatomy of Socratic Questioning</h3>
	<p>
		Students deconstruct authoritative statements into constituent assumptions, implicit definitions, and logical leaps without adopting combative postures:
	</p>
	<ul>
		<li>
			<strong>Clarification Protocol:</strong> Establishing explicit definitions before engaging assertions: <em>"What precise definition of this operational term are we operating under?"</em>
		</li>
		<li>
			<strong>Probing Assumptions:</strong> Uncovering unstated premises: <em>"What unstated axiom must hold true for this causal claim to remain valid?"</em>
		</li>
		<li>
			<strong>Evidence & Reason Auditing:</strong> Isolating empirical record from correlation: <em>"What primary documentation establishes direct causality versus concurrent correlation?"</em>
		</li>
		<li>
			<strong>Exploring Counter-Perspectives:</strong> Evaluating alternative hypotheses: <em>"What is the strongest opposing case to this conclusion, and on what empirical grounds was it rejected?"</em>
		</li>
		<li>
			<strong>Downstream Consequence Mapping:</strong> Projecting systemic outcomes: <em>"If this principle is universally enacted, what are the downstream institutional effects?"</em>
		</li>
		<li>
			<strong>The Rule of Falsifiability:</strong> Teaching students to evaluate assertions with: <em>"What specific empirical evidence would prove this claim wrong?"</em> Arguments that cannot be falsified represent dogma rather than empirical analysis.
		</li>
	</ul>

	<h3 class="reveal-header">Module 2: Historical Rigor & Primary Source Forensics</h3>
	<p>
		When standard textbook narratives substitute modern normative frameworks for historical reality, this module shifts the burden of truth back to contemporaneous empirical records:
	</p>
	<ul>
		<li>
			<strong>The Hierarchy of Evidence:</strong> Prioritizing contemporaneous primary records (letters, legal codes, ledgers, legislative debates, foundational charters) over tertiary textbook summaries.
		</li>
		<li>
			<strong>Identifying Presentism:</strong> Distinguishing historical legal and philosophical reality from retrospective judgments rendered exclusively through modern political sensibilities.
		</li>
		<li>
			<strong>Comparative Historiography:</strong> Pairing standard classroom claims with original documentation (e.g., examining the actual text of Federalist No. 51, the 1215 Magna Carta, or municipal trade ledgers alongside academic interpretations).
		</li>
		<li>
			<strong>Incentive & Property Analysis:</strong> Investigating economic structures, property protections, and individual liberties as consistent historical drivers often obscured by collective-action narratives.
		</li>
	</ul>

	<h3 class="reveal-header">Module 3: Tactics for Respectful Classroom Pushback & Dialectical Composure</h3>
	<p>
		Challenging an authority figure effectively requires disciplined emotional neutrality. Combative refutations allow instructors to dismiss student inquiries as disruptive. Disciplined Socratic questioning compels authority figures to defend their premises:
	</p>
	<ul>
		<li>
			<strong>The "Curious Inquirer" Posture:</strong> Replacing confrontational refutations (<em>"That is biased"</em>) with targeted inquiry that redirects the burden of proof: <em>"In reviewing the 1787 convention records, the delegates explicitly articulated X. How does that reconcile with the thesis that Y was their primary motivation?"</em>
		</li>
		<li>
			<strong>The Steelman Protocol:</strong> Requiring students to accurately articulate an instructor's argument with greater precision than the instructor before asking their question, eliminating bad-faith dismissals.
		</li>
		<li>
			<strong>Separating Fact from Value Judgments:</strong> Training students to identify the precise pivot when an instructor transitions from teaching what occurred (empirical historical record) to prescribing how students should feel or vote (normative value judgments).
		</li>
	</ul>

	<div class="cta-center" style="margin-top: 1.5rem;">
		<a class="cta" href="/resources" use:foresight>
			<FileText /> Access Socratic Syllabi & Practicum Materials
		</a>
	</div>
</section>

<section class="bold-border-box margin-top" style="--border-color: var(--fg)">
	<h2 class="reveal-header">Summary of Delivery Differences</h2>
	<p>
		<strong>Freshman Delivery:</strong> High-frequency, small-stakes exercises. Visual-heavy
		and focused on immediate social survival.
	</p>
	<p>
		<strong>Senior Delivery:</strong> Seminar-style discussions. High-stakes, real-world
		applications focused on the permanence of an adult reputation.
	</p>
</section>
