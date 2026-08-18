<script lang="ts">
	import { enhance } from '$app/forms'
	import { foresight, thickMargins } from '@autonomy/actions'
	import {
		Award,
		CheckCircle2,
		ChevronRight,
		Flame,
		GraduationCap,
		Lock,
		Play,
		PlayCircle,
		Route,
		Send,
		ShieldCheck,
		Sparkles,
		Star,
		Trophy,
		UserCheck,
		Zap
	} from '@lucide/svelte'
	import { getCategoryById } from '#lib/constants/categories.js'
	import { SEO } from '@autonomy/seo'
	import type { PageData, ActionData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	// State determination: default to user presence, with interactive preview toggle
	let previewState = $state<'welcome' | 'in-progress' | 'auto'>('auto')

	const activeState = $derived(
		previewState === 'auto'
			? data.user && data.startedModules.length > 0
				? 'in-progress'
				: data.user
					? 'in-progress'
					: 'welcome'
			: previewState
	)

	// Local state for Daily Check-In Widget
	let dailyMood = $state<number | null>(null)
	let dailyCheckedIn = $state(false)
	let emotionalNeutralityScore = $state(4)
	let dailyFocusArea = $state('precision-of-speech')

	function submitDailyCheckIn() {
		dailyCheckedIn = true
	}

	const pageTitle = $derived(
		activeState === 'welcome'
			? 'Student Self-Governance & Life Skills Portal | The Autonomy Protocol'
			: 'Student Portal & Gamified Dashboard | The Autonomy Protocol'
	)
</script>

<SEO
	title={pageTitle}
	description="Stop letting drama and stress run the show. Learn actionable executive functioning, self-governance, and psychological literacy tools to master high school and beyond."
	keywords="student life skills, self-governance for students, high school executive functioning, teen accountability, emotional regulation"
/>

<!-- STATE TOGGLE CONTROLLER (DEVELOPMENT & PREVIEW) -->
<div class="state-switcher-container">
	<div class="state-switcher">
		<span class="switcher-label">Portal State:</span>
		<button
			type="button"
			class="switcher-btn"
			class:active={activeState === 'welcome'}
			onclick={() => (previewState = 'welcome')}
		>
			<Sparkles size={14} /> Welcome (Onboarding)
		</button>
		<button
			type="button"
			class="switcher-btn"
			class:active={activeState === 'in-progress'}
			onclick={() => (previewState = 'in-progress')}
		>
			<Trophy size={14} /> In Progress (Gamified Portal)
		</button>
	</div>
</div>

<!-- =========================================================================
     STATE A: "WELCOME" (NEW STUDENT ONBOARDING)
     ========================================================================= -->
{#if activeState === 'welcome'}
	<div class="welcome-view">
		<!-- HERO SECTION -->
		<section
			class="angled-bottom-box welcome-hero"
			style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast);"
		>
			<div class="hero-tag">
				<span class="tag-pill">Executive Functioning & Self-Governance</span>
			</div>

			<h1 class="hero-title">Own Your Future. Master the Protocol.</h1>
			<p class="hero-subtitle">
				High school is not just about academic compliance—it is about constructing
				the internal operating system for your adult life. Transition from external
				behavioral policing to measurable self-governance, psychological literacy,
				and professional resilience.
			</p>

			<div class="cta-row">
				<a class="cta primary-cta" href="#onboarding-form" use:foresight>
					<Sparkles size={18} /> Request Student Onboarding
				</a>
				<a class="cta" href="/login" use:foresight>
					<UserCheck size={18} /> Student Sign In
				</a>
				<a class="cta" href="/road-map" use:foresight>
					<Route size={18} /> View Curriculum Roadmap
				</a>
			</div>
		</section>

		<!-- DUAL PEDAGOGICAL FRAMEWORK OVERVIEW -->
		<section
			class="angled-top-bottom-box framework-section"
			use:thickMargins
			style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast);"
		>
			<h2 class="section-heading">The Two Core Frameworks</h2>
			<p class="section-lead">
				The curriculum is anchored in collegiate-level behavioral psychology,
				translating proven self-regulation models into practical high school
				infrastructure.
			</p>

			<div class="framework-grid">
				<!-- Framework 1: The Accountability Cycle -->
				<div class="framework-card">
					<div class="framework-header">
						<span class="framework-tier">Cycle 01</span>
						<h3>The Accountability Cycle</h3>
						<span class="framework-sub">Internal Self-Regulation</span>
					</div>
					<ol class="framework-steps">
						<li>
							<strong>Orientation:</strong> Acknowledge limits of external control,
							commit to an objective behavioral standard, and realign cognitive focus.
						</li>
						<li>
							<strong>The Internal Audit:</strong> Conduct objective self-assessments
							to identify behavioral liabilities without defensiveness.
						</li>
						<li>
							<strong>Restorative Practice:</strong> Map interpersonal impact and execute
							the action-based <em>Amends Protocol</em> to rebuild trust.
						</li>
						<li>
							<strong>Maintenance & Leadership:</strong> Daily cognitive inventory,
							real-time conflict de-escalation, and peer mentorship.
						</li>
					</ol>
				</div>

				<!-- Framework 2: The Integrity Protocol -->
				<div class="framework-card">
					<div class="framework-header">
						<span class="framework-tier">Cycle 02</span>
						<h3>The Integrity Protocol</h3>
						<span class="framework-sub">Interpersonal Dynamics</span>
					</div>
					<ol class="framework-steps">
						<li>
							<strong>Precision of Speech:</strong> Speak with objective accuracy;
							eliminate gossip and destructive narratives.
						</li>
						<li>
							<strong>Emotional Neutrality:</strong> Decouple self-worth from external
							reactions; navigate criticism with professional detachment.
						</li>
						<li>
							<strong>Inquiry-Based Reality:</strong> Replace subjective assumptions
							with rigorous, question-driven inquiry.
						</li>
						<li>
							<strong>Baseline Fluctuation:</strong> Calibrate continuous effort
							relative to changing daily capacity without excuses.
						</li>
					</ol>
				</div>
			</div>
		</section>

		<!-- STUDENT ONBOARDING SIGNUP REQUEST FORM -->
		<section
			id="onboarding-form"
			class="bold-border-box form-section"
			style="--border-color: var(--brand-primary);"
		>
			<div class="form-header">
				<span class="section-badge"><GraduationCap size={16} /> Student Intake</span>
				<h2 class="section-heading">Request Student Onboarding & Orientation</h2>
				<p class="section-lead">
					Enroll in your school's advisory cohort or Career Technical Education (CTE)
					pathway to unlock your personal progress tracker.
				</p>
			</div>

			{#if form?.success}
				<div class="form-success-banner">
					<CheckCircle2 size={36} />
					<div class="success-text">
						<h3>Onboarding Request Registered!</h3>
						<p>
							Welcome, <strong>{form.name}</strong>. Your orientation packet has been
							staged for <strong>{form.school}</strong>.
						</p>
						<p class="success-sub">
							{form.message} Use the Student Sign In button above with your institutional
							Google account to access your active portal.
						</p>
					</div>
				</div>
			{:else}
				<form method="POST" action="?/signupRequest" use:enhance class="onboarding-form">
					{#if form?.error}
						<div class="form-error-banner">
							<p>{form.error}</p>
						</div>
					{/if}

					<div class="form-grid">
						<div class="form-group">
							<label for="fullName">Full Legal or Preferred Name *</label>
							<input
								id="fullName"
								name="fullName"
								type="text"
								placeholder="e.g. Maya Lin"
								required
								class="form-input"
							/>
						</div>

						<div class="form-group">
							<label for="email">Institutional / Student Email *</label>
							<input
								id="email"
								name="email"
								type="email"
								placeholder="student@school.k12.ca.us"
								required
								class="form-input"
							/>
						</div>

						<div class="form-group">
							<label for="school">High School or Educational District *</label>
							<input
								id="school"
								name="school"
								type="text"
								placeholder="e.g. Skyline High School (OUSD)"
								required
								class="form-input"
							/>
						</div>

						<div class="form-group">
							<label for="gradeLevel">Grade Cohort & Track</label>
							<select id="gradeLevel" name="gradeLevel" class="form-select">
								<option value="freshman">Freshman Advisory (The Blueprint Track)</option>
								<option value="sophomore">Sophomore Development (Skill Calibration)</option>
								<option value="junior">Junior Specialization (Applied Focus)</option>
								<option value="senior">Senior Industry Capstone (The Transition Track)</option>
							</select>
						</div>

						<div class="form-group">
							<label for="pathway">Target CTE Pathway / Specialization</label>
							<select id="pathway" name="pathway" class="form-select">
								<option value="cs">Computer Science & Software Development</option>
								<option value="health">Healthcare & Clinical Sciences</option>
								<option value="trades">Skilled Trades & Applied Engineering</option>
								<option value="general">General Executive Functioning & Leadership</option>
							</select>
						</div>

						<div class="form-group">
							<label for="focusArea">Primary Self-Governance Objective</label>
							<select id="focusArea" name="focusArea" class="form-select">
								<option value="regulation">Internal Regulation & Time Mastery</option>
								<option value="conflict">Interpersonal Conflict Resolution</option>
								<option value="resilience">Academic & Professional Resilience</option>
								<option value="repair">Restorative Action & Accountability</option>
							</select>
						</div>
					</div>

					<div class="form-footer">
						<button type="submit" class="submit-button">
							<Send size={18} /> Submit Student Intake Request
						</button>
						<span class="privacy-note">
							Protected under standard institutional student privacy guidelines.
						</span>
					</div>
				</form>
			{/if}
		</section>

		<!-- PROTECTED EDUCATOR ONBOARDING PATH STUB -->
		<section
			class="bold-border-box educator-card"
			style="--border-color: var(--brand-secondary);"
		>
			<div class="educator-grid">
				<div class="educator-icon">
					<ShieldCheck size={36} />
				</div>
				<div class="educator-text">
					<span class="educator-label">Educator & Administrator Portal</span>
					<h3>Are You a High School Instructor or Advisory Director?</h3>
					<p>
						Educator onboarding, lesson plan templates, grading rubrics, and student
						progress telemetry are located in the protected educator operating pathway.
					</p>
				</div>
				<div class="educator-cta">
					<a href="/teacher-onboarding" class="cta-teacher" use:foresight>
						<Lock size={16} /> Educator Verification Pathway
					</a>
				</div>
			</div>
		</section>
	</div>
{/if}

<!-- =========================================================================
     STATE B: "IN PROGRESS" (GAMIFIED LEARNING PORTAL)
     ========================================================================= -->
{#if activeState === 'in-progress'}
	<div class="in-progress-view">
		<!-- GAMIFIED STUDENT STATUS BANNER -->
		<section
			class="angled-bottom-box student-masthead"
			style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast);"
		>
			<div class="masthead-top">
				<div class="student-identity">
					<div class="avatar-badge">
						<Sparkles size={24} />
					</div>
					<div>
						<span class="portal-tag">Active Practitioner Dashboard</span>
						<h1 class="student-name">
							Hi, {data.user?.name || 'Autonomous Practitioner'}!
						</h1>
					</div>
				</div>

				<div class="status-pills">
					<div class="rank-pill">
						<Trophy size={16} />
						<span>{data.metrics?.masteryRank || 'Level 2: Internal Regulation Practitioner'}</span>
					</div>
					<div class="streak-pill">
						<Flame size={16} />
						<span>{data.metrics?.streakDays || 3} Day Alignment Streak</span>
					</div>
				</div>
			</div>

			<!-- AUTONOMY SCORE & MASTERY METERS -->
			<div class="metrics-grid">
				<div class="metric-card">
					<span class="metric-label">Autonomy Score</span>
					<div class="metric-value">
						{data.metrics?.autonomyScore || 420} <span class="metric-unit">pts</span>
					</div>
					<div class="score-bar-track">
						<div
							class="score-bar-fill"
							style="width: {Math.min(
								100,
								Math.round(((data.metrics?.autonomyScore || 420) / (data.metrics?.nextLevelScore || 700)) * 100)
							)}%;"
						></div>
					</div>
					<span class="metric-sub">
						Next Tier at {data.metrics?.nextLevelScore || 700} pts
					</span>
				</div>

				<div class="metric-card">
					<span class="metric-label">Practicums Completed</span>
					<div class="metric-value">
						{data.metrics?.completedSections || 3} / {data.metrics?.totalSections || 18}
					</div>
					<span class="metric-sub">
						{data.metrics?.completedModulesCount || 0} Modules Mastered
					</span>
				</div>

				<div class="metric-card">
					<span class="metric-label">Active Alignment Streak</span>
					<div class="metric-value streak-highlight">
						🔥 {data.metrics?.streakDays || 3} Days
					</div>
					<span class="metric-sub">Continuous daily reflection logged</span>
				</div>
			</div>
		</section>

		<!-- QUICK RESUME / NEXT ACTIVE STEP HERO CARD -->
		{#if data.nextResumeSection || data.startedModules.length > 0}
			{@const activeMod = data.startedModules[0] || {
				slug: 'module-1-cognitive-alignment',
				title: 'Module 1: Cognitive Alignment',
				progress: 40,
				category: 'step'
			}}
			<section
				class="bold-border-box resume-card"
				style="--border-color: var(--brand-secondary);"
			>
				<div class="resume-grid">
					<div class="resume-info">
						<span class="resume-tag">
							<Zap size={14} /> Resume In-Progress Module
						</span>
						<h2 class="resume-title">{activeMod.title}</h2>
						<p class="resume-desc">
							Continue your self-governance practicum where you left off. Every
							completed section advances your Autonomy Score.
						</p>

						<div class="progress-bar-container">
							<div class="progress-bar-track">
								<div class="progress-bar-fill" style="width: {activeMod.progress}%;"></div>
							</div>
							<span class="progress-bar-text">{activeMod.progress}% Complete</span>
						</div>
					</div>

					<div class="resume-action">
						<a href="/modules/{activeMod.slug}" class="resume-btn" use:foresight>
							<Play size={20} /> Resume Next Practicum
						</a>
					</div>
				</div>
			</section>
		{/if}

		<!-- ACTIVE MODULES PROGRESS GRID -->
		<section
			class="angled-top-bottom-box coursework-section"
			use:thickMargins
			style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast);"
		>
			<div class="section-header-row">
				<div>
					<h2 class="section-heading">Your Active Coursework</h2>
					<p class="section-lead">Modules currently in your executive functioning queue.</p>
				</div>
				<a href="/modules" class="cta-text-link" use:foresight>
					Browse All Modules <ChevronRight size={18} />
				</a>
			</div>

			<div class="progress-container">
				{#each data.startedModules.length > 0 ? data.startedModules : [ { id: 'demo-1', title: 'Step 1: Cognitive Alignment & Objective Standard', slug: 'step-1-cognitive-alignment', category: 'step', progress: 50 }, { id: 'demo-2', title: 'Agreement 1: Precision of Speech in Professional Contexts', slug: 'agreement-1-precision-of-speech', category: 'agreement', progress: 25 } ] as module (module.id)}
					<a href="/modules/{module.slug}" class="progress-card" use:foresight>
						<div class="card-left">
							<div class="card-icon">
								<PlayCircle size={28} />
							</div>
							<div class="card-text">
								<div class="card-meta">
									<span class="card-category">
										{getCategoryById(module.category || 'step').label}
									</span>
								</div>
								<span class="card-title">{module.title}</span>
								<div class="card-track">
									<div class="card-bar" style="width: {module.progress}%;"></div>
								</div>
							</div>
						</div>
						<div class="card-badge">
							<span>{module.progress}% Complete</span>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- GAMIFIED ACHIEVEMENTS & MILESTONES SHOWCASE -->
		<section
			class="bold-border-box badges-section"
			style="--border-color: var(--brand-tertiary);"
		>
			<div class="badges-header">
				<div class="badge-title-wrapper">
					<Award size={28} class="badge-icon-primary" />
					<div>
						<h2 class="section-heading">Pedagogical Mastery Badges</h2>
						<p class="section-lead">
							Unlock milestone achievements as you submit objective practicums and
							demonstrate observable self-governance.
						</p>
					</div>
				</div>
			</div>

			<div class="badges-grid">
				{#each data.badges.length > 0 ? data.badges : [ { id: 'b1', title: 'Cognitive Alignment', category: 'The Accountability Cycle', description: 'Completed baseline orientation & recognized limits of control.', unlocked: true, progressText: 'Unlocked' }, { id: 'b2', title: 'Precision of Speech', category: 'The Integrity Protocol', description: 'Maintained impeccable verbal clarity and objective framing.', unlocked: true, progressText: 'Unlocked' }, { id: 'b3', title: 'The Internal Audit', category: 'The Accountability Cycle', description: 'Submitted an objective behavioral inventory without distortions.', unlocked: false, progressText: '1/4 Sections Complete' }, { id: 'b4', title: 'Amends Protocol Certified', category: 'Restorative Action', description: 'Constructed an actionable interpersonal repair protocol.', unlocked: false, progressText: '0/1 Modules Mastered' }, { id: 'b5', title: 'Inquiry Over Assumption', category: 'The Integrity Protocol', description: 'Mastered question-driven clarity in interpersonal conflict.', unlocked: false, progressText: '2/6 Sections Complete' }, { id: 'b6', title: 'CTE Capstone Readiness', category: 'Professional Resilience', description: 'Applied self-governance frameworks to vocational workflows.', unlocked: false, progressText: '0/8 Sections Complete' } ] as badge (badge.id)}
					<div class="badge-item" class:unlocked={badge.unlocked}>
						<div class="badge-icon-container">
							{#if badge.unlocked}
								<ShieldCheck size={28} class="badge-glyph-unlocked" />
							{:else}
								<Lock size={24} class="badge-glyph-locked" />
							{/if}
						</div>
						<div class="badge-info">
							<span class="badge-category">{badge.category}</span>
							<h4 class="badge-title">{badge.title}</h4>
							<p class="badge-desc">{badge.description}</p>
							<span class="badge-status" class:status-unlocked={badge.unlocked}>
								{badge.progressText}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- DAILY EXECUTIVE FUNCTIONING CHECK-IN WIDGET -->
		<section
			class="angled-top-bottom-box daily-checkin-section"
			use:thickMargins
			style="--color: var(--brand-tertiary); --text_color: var(--brand-tertiary-contrast);"
		>
			<h2 class="section-heading">Daily Executive Functioning Check-In</h2>
			<p class="section-lead">
				Maintain your daily alignment streak by completing a 30-second cognitive
				calibration.
			</p>

			{#if dailyCheckedIn}
				<div class="checkin-success">
					<CheckCircle2 size={32} />
					<div>
						<h3>Alignment Logged! (+25 Autonomy XP Awarded)</h3>
						<p>
							Your active alignment streak is now safe. Continuous self-awareness builds
							unbreakable self-governance.
						</p>
					</div>
				</div>
			{:else}
				<div class="checkin-card">
					<div class="checkin-form-group">
						<label for="neutrality-slider" class="checkin-label">
							Rate your Emotional Neutrality today (1 = High Reactivity, 5 = Complete
							Composure):
						</label>
						<div class="slider-row">
							<span class="slider-val">Level {emotionalNeutralityScore} / 5</span>
							<input
								id="neutrality-slider"
								type="range"
								min="1"
								max="5"
								bind:value={emotionalNeutralityScore}
								class="neutrality-slider"
							/>
						</div>
					</div>

					<div class="checkin-form-group">
						<label for="dailyFocus" class="checkin-label">
							Today's Behavioral Focus Area:
						</label>
						<select
							id="dailyFocus"
							bind:value={dailyFocusArea}
							class="checkin-select"
						>
							<option value="precision-of-speech">Precision of Speech (Zero gossip / blame)</option>
							<option value="emotional-neutrality">Emotional Neutrality (No taking things personally)</option>
							<option value="inquiry-reality">Inquiry-Based Reality (Check assumptions)</option>
							<option value="baseline-effort">Baseline Fluctuation (Max effort given current capacity)</option>
						</select>
					</div>

					<button type="button" onclick={submitDailyCheckIn} class="checkin-btn">
						<Sparkles size={18} /> Log Today's Calibration (+25 XP)
					</button>
				</div>
			{/if}
		</section>

		<!-- NEXT RECOMMENDED MILESTONES -->
		<section
			class="bold-border-box available-section"
			style="--border-color: var(--brand-primary);"
		>
			<div class="section-header-row">
				<div>
					<h2 class="section-heading">Recommended Next Milestones</h2>
					<p class="section-lead">Expand your self-governance capabilities with available curriculum tracks.</p>
				</div>
			</div>

			<div class="available-grid">
				{#each data.availableModules.length > 0 ? data.availableModules : [ { id: 'm-3', title: 'The Internal Audit: Friction Mapping', slug: 'internal-audit-friction-mapping', category: 'step', description: 'Systematically isolate behavioral liabilities and cognitive distortions.' }, { id: 'm-4', title: 'The Amends Protocol: Interpersonal Restorative Action', slug: 'amends-protocol-restorative-action', category: 'step', description: 'Direct action steps to repair interpersonal friction.' } ] as mod (mod.id)}
					<div class="available-card">
						<div class="available-card-body">
							<span class="card-category">
								{getCategoryById(mod.category || 'step').label}
							</span>
							<h3>{mod.title}</h3>
							<p>{mod.description || 'Master executive functioning through structured practicums.'}</p>
						</div>
						<a href="/modules/{mod.slug}" class="start-module-btn" use:foresight>
							<Star size={16} /> Start Practicum
						</a>
					</div>
				{/each}
			</div>
		</section>
	</div>
{/if}

<style>
	/* PREVIEW STATE SWITCHER */
	.state-switcher-container {
		display: flex;
		justify-content: flex-end;
		margin-bottom: var(--gap-1);
	}

	.state-switcher {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--surface-2);
		border: 1px solid var(--ui-border);
		padding: 0.25rem 0.5rem;
		border-radius: 30px;
	}

	.switcher-label {
		font-family: var(--font-mono, monospace);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--text-muted);
		padding-left: 0.5rem;
	}

	.switcher-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: transparent;
		color: var(--fg);
		border: none;
		padding: 0.35rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 700;
		cursor: pointer;
		transition: background-color 0.2s ease, color 0.2s ease;
	}

	.switcher-btn.active {
		background: var(--brand-primary);
		color: var(--bg);
	}

	/* GENERAL SECTION HEADINGS & LEADS */
	.section-heading {
		font-size: clamp(1.4rem, 2.5vw, 2rem);
		font-weight: 900;
		margin: 0 0 0.4rem 0;
		line-height: 1.2;
		color: inherit;
	}

	.section-lead {
		font-size: clamp(0.95rem, 1.5vw, 1.15rem);
		line-height: 1.5;
		margin: 0 0 1.25rem 0;
		opacity: 0.92;
		max-width: 800px;
	}

	/* WELCOME VIEW STYLES */
	.welcome-hero {
		padding-block-start: var(--gap-3);
		padding-block-end: calc(var(--angle-height) + var(--gap-3));
		padding-inline: var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.hero-tag {
		margin-bottom: 0.75rem;
	}

	.tag-pill {
		display: inline-block;
		font-family: var(--font-mono, monospace);
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		background: var(--local-text);
		color: var(--color);
		padding: 0.25rem 0.6rem;
		border-radius: 4px;
	}

	.hero-title {
		font-size: clamp(2rem, 4.5vw, 3.25rem);
		font-weight: 900;
		line-height: 1.15;
		margin: 0.5rem 0 1rem 0;
	}

	.hero-subtitle {
		font-size: clamp(1.05rem, 1.8vw, 1.25rem);
		line-height: 1.6;
		max-width: 860px;
		margin-bottom: var(--gap-2);
		opacity: 0.95;
	}

	.cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: var(--gap-1);
	}

	.primary-cta {
		background-color: var(--local-text);
		color: var(--color) !important;
	}

	.framework-section {
		padding-block-start: calc(var(--angle-height) + var(--gap-3));
		padding-block-end: calc(var(--angle-height) + var(--gap-3));
		padding-inline: var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.framework-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.5rem;
		margin-top: var(--gap-1);
	}

	.framework-card {
		padding: 1.5rem;
		background: oklch(from var(--color) calc(l + 0.05) c h / 0.35);
		border: 2px solid var(--local-text);
		border-radius: var(--border-radius);
	}

	.framework-header {
		margin-bottom: 1rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--local-text);
	}

	.framework-tier {
		font-family: var(--font-mono, monospace);
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.75;
	}

	.framework-card h3 {
		margin: 0.25rem 0;
		font-size: 1.35rem;
		font-weight: 900;
	}

	.framework-sub {
		font-size: 0.88rem;
		opacity: 0.85;
		font-weight: 600;
	}

	.framework-steps {
		margin: 0 0 0 1.25rem;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.framework-steps li {
		font-size: 0.92rem;
		line-height: 1.5;
	}

	.framework-steps li strong {
		color: var(--local-text);
	}

	/* ONBOARDING FORM */
	.form-section {
		background: var(--surface-1);
		padding: var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.form-header {
		margin-bottom: 1.5rem;
	}

	.section-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-mono, monospace);
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		color: var(--brand-primary);
		letter-spacing: 0.06em;
		margin-bottom: 0.5rem;
	}

	.onboarding-form {
		margin-top: 1rem;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.25rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.form-group label {
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--fg);
	}

	.form-input,
	.form-select {
		padding: 0.8rem 1rem;
		background: var(--surface-2);
		border: 1px solid var(--ui-border);
		border-radius: var(--border-radius-sm);
		color: var(--fg);
		font-size: 0.95rem;
		outline: none;
		transition: border-color 0.2s;
	}

	.form-input:focus,
	.form-select:focus {
		border-color: var(--brand-primary);
	}

	.form-footer {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-top: 1.75rem;
		flex-wrap: wrap;
	}

	.submit-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--brand-primary);
		color: var(--bg);
		border: none;
		padding: 0.9rem 1.75rem;
		border-radius: var(--border-radius-sm);
		font-weight: 800;
		font-size: 1rem;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		transition: transform 0.15s ease, opacity 0.2s ease;
	}

	.submit-button:hover {
		opacity: 0.92;
		transform: translateY(-2px);
	}

	.privacy-note {
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.form-success-banner {
		display: flex;
		gap: 1.25rem;
		align-items: flex-start;
		background: oklch(from var(--brand-primary) calc(l - 0.25) c h / 0.35);
		border: 2px solid var(--brand-primary);
		padding: 1.5rem;
		border-radius: var(--border-radius);
		color: var(--fg);
	}

	.form-success-banner h3 {
		margin: 0 0 0.5rem 0;
		color: var(--brand-primary);
	}

	.success-sub {
		margin-top: 0.5rem;
		font-size: 0.9rem;
		opacity: 0.85;
	}

	.form-error-banner {
		padding: 1rem;
		background: var(--error-bg);
		border: 1px solid var(--error-border);
		color: var(--error-fg);
		border-radius: var(--border-radius-sm);
		margin-bottom: 1.25rem;
	}

	/* EDUCATOR STUB CARD */
	.educator-card {
		background: var(--surface-1);
		padding: var(--gap-2) var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.educator-grid {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.educator-icon {
		color: var(--brand-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.educator-text {
		flex: 1;
		min-width: 260px;
	}

	.educator-label {
		font-family: var(--font-mono, monospace);
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		color: var(--brand-secondary);
		letter-spacing: 0.05em;
	}

	.educator-text h3 {
		margin: 0.25rem 0 0.4rem 0;
		font-size: 1.2rem;
		font-weight: 800;
	}

	.educator-text p {
		margin: 0;
		font-size: 0.92rem;
		color: var(--text-secondary);
	}

	.cta-teacher {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: transparent;
		border: 2px solid var(--brand-secondary);
		color: var(--brand-secondary);
		padding: 0.75rem 1.25rem;
		border-radius: var(--border-radius-sm);
		font-weight: 700;
		text-decoration: none;
		transition: background-color 0.2s, color 0.2s;
	}

	.cta-teacher:hover {
		background: var(--brand-secondary);
		color: var(--bg);
	}

	/* IN-PROGRESS VIEW STYLES */
	.student-masthead {
		padding-block-start: var(--gap-3);
		padding-block-end: calc(var(--angle-height) + var(--gap-3));
		padding-inline: var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.masthead-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.student-identity {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.avatar-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		background: var(--local-text);
		color: var(--color);
		border-radius: 50%;
		flex-shrink: 0;
	}

	.portal-tag {
		font-family: var(--font-mono, monospace);
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		opacity: 0.85;
	}

	.student-name {
		font-size: clamp(1.6rem, 3.5vw, 2.5rem);
		font-weight: 900;
		margin: 0.2rem 0 0 0;
	}

	.status-pills {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.rank-pill,
	.streak-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-mono, monospace);
		font-size: 0.82rem;
		font-weight: 800;
		background: var(--local-text);
		color: var(--color);
		padding: 0.4rem 0.85rem;
		border-radius: 6px;
	}

	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.25rem;
		margin-top: var(--gap-2);
		margin-bottom: 0.5rem;
	}

	.metric-card {
		background: oklch(from var(--color) calc(l + 0.08) c h / 0.45);
		border: 1.5px solid var(--local-text);
		border-radius: var(--border-radius-sm);
		padding: 1.15rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.metric-label {
		font-family: var(--font-mono, monospace);
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.85;
	}

	.metric-value {
		font-size: 1.6rem;
		font-weight: 900;
		line-height: 1.1;
	}

	.metric-unit {
		font-size: 0.9rem;
		font-weight: 700;
	}

	.score-bar-track {
		width: 100%;
		height: 6px;
		background: oklch(from var(--local-text) l c h / 0.25);
		border-radius: 3px;
		overflow: hidden;
		margin-top: 0.25rem;
	}

	.score-bar-fill {
		height: 100%;
		background: var(--local-text);
		border-radius: 3px;
	}

	.metric-sub {
		font-size: 0.75rem;
		opacity: 0.8;
	}

	.streak-highlight {
		color: var(--local-text);
	}

	/* RESUME HERO CARD */
	.resume-card {
		background: var(--surface-1);
		padding: var(--gap-2) var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.resume-grid {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.resume-info {
		flex: 1;
		min-width: 280px;
	}

	.resume-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-family: var(--font-mono, monospace);
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		color: var(--brand-secondary);
		letter-spacing: 0.05em;
	}

	.resume-title {
		margin: 0.35rem 0 0.5rem 0;
		font-size: clamp(1.2rem, 2vw, 1.55rem);
		font-weight: 900;
		color: var(--fg);
	}

	.resume-desc {
		margin: 0 0 1rem 0;
		color: var(--text-secondary);
		font-size: 0.95rem;
	}

	.progress-bar-container {
		display: flex;
		align-items: center;
		gap: 1rem;
		max-width: 380px;
	}

	.progress-bar-track {
		flex: 1;
		height: 10px;
		background: var(--surface-3);
		border-radius: 5px;
		overflow: hidden;
	}

	.progress-bar-fill {
		height: 100%;
		background: var(--brand-secondary);
		border-radius: 5px;
		transition: width 0.4s ease;
	}

	.progress-bar-text {
		font-family: var(--font-mono, monospace);
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--brand-secondary);
	}

	.resume-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		background: var(--brand-secondary);
		color: var(--bg);
		padding: 0.9rem 1.75rem;
		border-radius: var(--border-radius-sm);
		font-weight: 800;
		font-size: 1rem;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		transition: transform 0.15s ease, opacity 0.2s ease;
	}

	.resume-btn:hover {
		opacity: 0.92;
		transform: translateY(-2px);
	}

	/* ACTIVE MODULES TRACK */
	.coursework-section {
		padding-block-start: calc(var(--angle-height) + var(--gap-3));
		padding-block-end: calc(var(--angle-height) + var(--gap-3));
		padding-inline: var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.section-header-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: var(--gap-1);
	}

	.cta-text-link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-weight: 700;
		color: var(--local-text);
		text-decoration: none;
		font-size: 0.95rem;
	}

	.cta-text-link:hover {
		text-decoration: underline;
	}

	.progress-container {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: var(--gap-1);
	}

	.progress-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 1.25rem;
		background: oklch(from var(--color) calc(l + 0.05) c h / 0.35);
		border: 2px solid var(--local-text);
		border-radius: var(--border-radius);
		color: var(--local-text) !important;
		text-decoration: none;
		transition: background-color 0.2s ease, transform 0.15s ease;
	}

	.progress-card:hover {
		background-color: oklch(from var(--color) calc(l + 0.1) c h / 0.55);
		transform: translateY(-2px);
	}

	.card-left {
		display: flex;
		align-items: center;
		gap: 1rem;
		min-width: 0;
		flex: 1;
	}

	.card-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--local-text);
		flex-shrink: 0;
	}

	.card-text {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-width: 0;
		flex: 1;
	}

	.card-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.card-category {
		font-family: var(--font-mono, monospace);
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		background: var(--local-text);
		color: var(--color);
		width: fit-content;
	}

	.card-title {
		font-size: clamp(1.05rem, 1.6vw, 1.35rem);
		font-weight: 800;
		line-height: 1.25;
		color: var(--local-text);
	}

	.card-track {
		width: 100%;
		max-width: 260px;
		height: 8px;
		background: oklch(from var(--local-text) l c h / 0.2);
		border: 1px solid oklch(from var(--local-text) l c h / 0.4);
		border-radius: 4px;
		overflow: hidden;
	}

	.card-bar {
		height: 100%;
		background: var(--local-text);
		border-radius: 4px;
	}

	.card-badge {
		padding: 0.45rem 0.9rem;
		border-radius: 6px;
		background: var(--local-text);
		color: var(--color);
		font-family: var(--font-mono, monospace);
		font-size: 0.875rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	/* ACHIEVEMENTS / BADGES GRID */
	.badges-section {
		background: var(--surface-1);
		padding: var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.badge-title-wrapper {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	:global(.badge-icon-primary) {
		color: var(--brand-tertiary);
		margin-top: 0.15rem;
		flex-shrink: 0;
	}

	.badges-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.25rem;
		margin-top: 1.5rem;
	}

	.badge-item {
		display: flex;
		gap: 1rem;
		padding: 1.25rem;
		background: var(--surface-2);
		border: 1px solid var(--ui-border);
		border-radius: var(--border-radius);
		opacity: 0.65;
		transition: opacity 0.2s, border-color 0.2s;
	}

	.badge-item.unlocked {
		opacity: 1;
		border-color: var(--brand-tertiary);
		background: oklch(from var(--brand-tertiary) calc(l - 0.3) c h / 0.2);
	}

	.badge-icon-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--surface-3);
		flex-shrink: 0;
	}

	:global(.badge-glyph-unlocked) {
		color: var(--brand-tertiary);
	}

	:global(.badge-glyph-locked) {
		color: var(--text-muted);
	}

	.badge-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.badge-category {
		font-family: var(--font-mono, monospace);
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.badge-title {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 800;
		color: var(--fg);
	}

	.badge-desc {
		margin: 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.4;
	}

	.badge-status {
		margin-top: 0.35rem;
		font-family: var(--font-mono, monospace);
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--text-muted);
	}

	.status-unlocked {
		color: var(--brand-tertiary);
	}

	/* DAILY CHECK-IN WIDGET */
	.daily-checkin-section {
		padding-block-start: calc(var(--angle-height) + var(--gap-3));
		padding-block-end: calc(var(--angle-height) + var(--gap-3));
		padding-inline: var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.checkin-card {
		background: oklch(from var(--color) calc(l + 0.05) c h / 0.35);
		border: 2px solid var(--local-text);
		border-radius: var(--border-radius);
		padding: 1.5rem;
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.checkin-form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.checkin-label {
		font-size: 0.95rem;
		font-weight: 700;
	}

	.slider-row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.slider-val {
		font-family: var(--font-mono, monospace);
		font-weight: 800;
		font-size: 0.9rem;
		min-width: 100px;
	}

	.neutrality-slider {
		flex: 1;
		accent-color: var(--local-text);
		cursor: pointer;
	}

	.checkin-select {
		padding: 0.75rem;
		background: var(--bg);
		color: var(--fg);
		border: 1px solid var(--local-text);
		border-radius: var(--border-radius-sm);
		font-size: 0.95rem;
	}

	.checkin-btn {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--local-text);
		color: var(--color);
		border: none;
		padding: 0.8rem 1.5rem;
		border-radius: var(--border-radius-sm);
		font-weight: 800;
		cursor: pointer;
		font-size: 0.95rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.checkin-success {
		display: flex;
		gap: 1.25rem;
		align-items: center;
		background: oklch(from var(--color) calc(l + 0.1) c h / 0.4);
		border: 2px solid var(--local-text);
		border-radius: var(--border-radius);
		padding: 1.25rem;
		margin-top: 1rem;
	}

	.checkin-success h3 {
		margin: 0 0 0.25rem 0;
	}

	.checkin-success p {
		margin: 0;
		font-size: 0.92rem;
	}

	/* AVAILABLE MODULES GRID */
	.available-section {
		background: var(--surface-1);
		padding: var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.available-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.25rem;
		margin-top: 1.25rem;
	}

	.available-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: var(--surface-2);
		border: 1px solid var(--ui-border);
		border-radius: var(--border-radius);
		padding: 1.25rem;
		gap: 1rem;
	}

	.available-card-body h3 {
		margin: 0.5rem 0 0.35rem 0;
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--fg);
	}

	.available-card-body p {
		margin: 0;
		font-size: 0.88rem;
		color: var(--text-secondary);
		line-height: 1.45;
	}

	.start-module-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		background: transparent;
		border: 1px solid var(--brand-primary);
		color: var(--brand-primary);
		padding: 0.65rem 1rem;
		border-radius: var(--border-radius-sm);
		font-weight: 700;
		font-size: 0.9rem;
		text-decoration: none;
		transition: background-color 0.2s, color 0.2s;
	}

	.start-module-btn:hover {
		background: var(--brand-primary);
		color: var(--bg);
	}

	@media (max-width: 640px) {
		.masthead-top {
			flex-direction: column;
		}

		.resume-grid {
			flex-direction: column;
			align-items: stretch;
		}

		.resume-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
