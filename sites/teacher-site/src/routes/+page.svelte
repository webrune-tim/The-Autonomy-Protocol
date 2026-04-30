<script lang="ts">
	// Import the shared packages
	import { FourAgreements } from '@autonomy/four-agreements'
	import { HorizontalScroll } from '@autonomy/horizontal-scroll'
	import { TwelveSteps } from '@autonomy/twelve-steps'
	import { Hero } from '@autonomy/hero'

	import HeroImage from '$images/pic-1.avif'

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

	const four_agreements = [
		`<div class="step-grid">
        <span>1</span>
        <p>
          <strong>Be impecable with your word:</strong> Do what you say, and say what
          you do. When we go against out own word or lie, we are only harming and
          going against ourselves. Being impecable with our word, having integraty,
          is not easy, but it the most important agreement we can make with ourselves.
        </p>
      </div>`,
		`<div class="step-grid">
        <span>2</span>
        <p>
          <strong>Don't take anything/anyone personaly:</strong>
          Humans, especialy in our formitive years, like to think that eveything is
          about them. "Someone does not like me. It must be because I am unlikable."
          "Someone is mean to me. It must be because of something I did to them."
          No matter what anyone does to us, it is not about us, it is about them.
          Hurt people hurt people. We can not take it personaly. We can only have
          compassion for those that hurt us. We are the only ones responsible for
          our feelings.
        </p>
      </div>`,
		`<div class="step-grid">
        <span>3</span>
        <p>
          <strong>Don't make any assumptions:</strong> Whether you are a freshman
          navigating an intimidating new campus culture or a senior bracing for the
          ambiguous post-graduation leap, refusing to make assumptions is your strongest
          defense against unnecessary drama. Instead of inventing anxious narratives
          about what your peers think or what your teachers expect, you must courageously
          ask direct questions to find the truth. This proactive communication cuts
          through the noise of high school rumors and clears up academic confusion
          before it spirals. Ultimately, by seeking clarity rather than relying on
          guesswork, you actively protect your peace of mind and build genuine, reality-based
          relationships.
        </p>
      </div>`,
		`<div class="step-grid">
        <span>4</span>
        <p>
          <strong>Always do your best:</strong> Concurrently, agreeing to always do
          your best demands the mature realization that your actual capacity will
          change from day to day. Your highest level of performance on a well-rested
          morning will look vastly different from your best when you are battling
          burnout, daily academic stress, or low physical energy. The key is extending
          yourself grace on the days you operate at a deficit while remaining fiercely
          committed to your personal and academic growth. By dropping the pursuit
          of flawless perfection and focusing simply on consistent effort, you will
          cultivate the emotional resilience necessary to thrive through high school
          and beyond.
        </p>
      </div>`
	]

	const twelve_steps = [
		`<div class="grid">
      <div class="step-grid">
        <span>1</span>
        <p>
          <strong>Honesty:</strong> Acknowledge that the current situation is out
          of control and that current methods of managing it are no longer working.
        </p>
      </div>`,
      `<div class="step-grid">
        <span>2</span>
        <p>
          <strong>Possibility:</strong> Accept that a solution exists outside of one's
          own current limited perspective or ego.
        </p>
      </div>`,
      `<div class="step-grid">
        <span>3</span>
        <p>
          <strong>Commitment:</strong> Decide to trust a higher principle, a structured
          process, or a collective wisdom rather than relying solely on self-will.
        </p>
      </div>`,
      `<div class="step-grid">
        <span>4</span>
        <p>
          <strong>Inventory:</strong> Conduct a rigorous, objective assessment of
          one's own character, behaviors, and past actions.
        </p>
      </div>`,
      `<div class="step-grid">
        <span>5</span>
        <p>
          <strong>Confession:</strong> Verbally acknowledge these findings to oneself
          and at least one other trusted person or mentor to break the cycle of secrecy.
        </p>
      </div>`,
      `<div class="step-grid">
        <span>6</span>
        <p>
          <strong>Readiness:</strong> Become mentally and emotionally prepared to
          let go of old patterns and defensive traits.
        </p>
      </div>`,
      `<div class="step-grid">
        <span>7</span>
        <p>
          <strong>Request:</strong> Actively seek the strength or discipline required
          to change these deep-seated flaws.
        </p>
      </div>`,
      `<div class="step-grid">
        <span>8</span>
        <p>
          <strong>Responsibility:</strong> Identify every individual who has been
          negatively impacted by your past actions and commit to fixing those relationships.
        </p>
      </div>`,
      `<div class="step-grid">
        <span>9</span>
        <p>
          <strong>Amends:</strong> Take direct action to repair the harm caused, prioritizing
          the safety and well-being of the other party above your own comfort.
        </p>
      </div>`,
      `<div class="step-grid">
        <span>10</span>
        <p>
          <strong>Vigilance:</strong> Maintain a habit of continuous self-reflection,
          quickly identifying and correcting new mistakes as they occur.
        </p>
      </div>`,
      `<div class="step-grid">
        <span>11</span>
        <p>
          <strong>Attunement:</strong> Use regular practice—such as meditation, study,
          or reflection—to stay aligned with your core values and purpose.
        </p>
      </div>`,
      `<div class="step-grid">
        <span>12</span>
        <p>
          <strong>Service:</strong> Internalize these principles so deeply that they
          influence every area of life, and offer support to others seeking a similar
          path of change.
        </p>
      </div>`
	]
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

<HorizontalScroll title="Twelve Steps" cards_content={twelve_steps} />
<HorizontalScroll title="Four Agreements" cards_content={four_agreements} />

<section class="content">
	<div class="grid">
		<section>
			<div class="title-grid">
				<HandFist size={32} />
				<div class="flex-column">
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
			<div class="title-grid">
				<LoaderPinwheel size={32} />
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

<section class="content flex no-bottom-margin">
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
