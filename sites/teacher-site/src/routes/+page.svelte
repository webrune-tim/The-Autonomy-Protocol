<script lang="ts">
	import { foresight, thickMargins } from '@autonomy/actions'
	import {
		BookOpen,
		CalendarClock,
		CheckCircle2,
		Code2,
		Compass,
		FileText,
		GraduationCap,
		Milestone,
		Send,
		ShieldCheck,
		Sparkles,
		Users
	} from '@lucide/svelte'
	import { Pill } from '@autonomy/pill'
	import { SEO } from '@autonomy/seo'

	let notificationEmail = $state('')
	let notificationSubmitted = $state(false)

	function handleNotify(e: SubmitEvent) {
		e.preventDefault()
		if (notificationEmail.trim()) {
			notificationSubmitted = true
		}
	}
</script>

<SEO
	title="Educator & Admin Operating Center | The Autonomy Protocol"
	description="Engineering pedagogical infrastructure for CTE educators, counselors, and advisory directors. Transition secondary students from external policing to internal self-governance."
	keywords="executive functioning curriculum, secondary education, student self-governance, CTE advisory, psychological literacy, accountability cycle"
/>


<!-- HERO SECTION -->
<section
	class="angled-bottom-box teacher-hero"
	style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast);"
>
	<div class="pill-wrapper">
		<Pill>Alpha Preview</Pill>
		<span class="status-indicator">
			<CalendarClock size={16} /> Target Release: Fall Academic Cycle
		</span>
	</div>

	<h1 class="hero-title">Educator & Administrative Operating Center</h1>
	<p class="hero-desc">
		We are engineering a pedagogical infrastructure for CTE educators, counselors,
		and advisory directors. Transition high school students from external
		behavioral policing to measurable internal self-governance.
	</p>

	<div class="cta-row">
		<a class="cta primary-cta" href="#notify" use:foresight>
			<Send size={18} /> Request Institutional Access
		</a>
		<a class="cta" href="/mission" use:foresight>
			<Compass size={18} /> Review Pedagogical Abstract
		</a>
		<a class="cta" href="/curriculum" use:foresight>
			<BookOpen size={18} /> Browse Public Curriculum
		</a>
	</div>
</section>

<!-- DEVELOPER REMINDER / TODO CALLOUT -->
<section
	class="bold-border-box dev-todo-box"
	style="--border-color: var(--brand-secondary);"
>
	<div class="todo-badge">
		<Code2 size={18} /> DEVELOPER REMINDER & WORKFLOW
	</div>
	<h3 class="section-subheading">Active Teacher Site Roadmap</h3>
	<p class="section-text">
		The teacher site core architecture is staged. Review pending tasks in
		<code class="code-tag">sites/teacher-site/TODO.md</code> to continue development:
	</p>
	<ul class="todo-list">
		<li>
			<strong>Authentication:</strong> Google OAuth whitelisting for institutional
			district domains (`@*.k12.ca.us`).
		</li>
		<li>
			<strong>Ingestion Engine:</strong> PDF-to-Markdown parser for legacy syllabus
			documents (`/pdf-to-md`).
		</li>
		<li>
			<strong>Lesson Authoring:</strong> MDSveX editor with live collegiate lexicon
			linting (`/modules/[id]`).
		</li>
		<li>
			<strong>Student Telemetry:</strong> Cohort-level executive functioning and
			Autonomy Score analytics.
		</li>
	</ul>
	<div class="todo-footer">
		<span class="todo-file-link">
			📄 See <a href="/TODO.md">TODO.md</a> for detailed task specifications.
		</span>
	</div>
</section>

<!-- UPCOMING CAPABILITIES GRID -->
<section
	class="angled-top-bottom-box capabilities-section"
	use:thickMargins
	style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast);"
>
	<h2 class="section-title">Operating Center Capabilities in Active Development</h2>
	<p class="section-intro">
		Designed specifically to minimize educator burnout and shift behavioral
		accountability directly to the student.
	</p>

	<div class="features-grid">
		<div class="feature-card">
			<div class="feature-icon">
				<FileText size={28} />
			</div>
			<div class="feature-content">
				<h3>Automated PDF Ingestion</h3>
				<p>
					Transform legacy district lesson plans and PDFs into structured,
					accessible Markdown compliant with the Autonomy collegiate lexicon.
				</p>
			</div>
		</div>

		<div class="feature-card">
			<div class="feature-icon">
				<GraduationCap size={28} />
			</div>
			<div class="feature-content">
				<h3>CTE Capstone Management</h3>
				<p>
					Deploy track-specific practicums tailored for Computer Science,
					Healthcare, and Skilled Trades pathways.
				</p>
			</div>
		</div>

		<div class="feature-card">
			<div class="feature-icon">
				<ShieldCheck size={28} />
			</div>
			<div class="feature-content">
				<h3>Restorative Action Rubrics</h3>
				<p>
					Observable behavioral shift criteria replacing punitive detention with
					the structured <em>Amends Protocol</em>.
				</p>
			</div>
		</div>

		<div class="feature-card">
			<div class="feature-icon">
				<Users size={28} />
			</div>
			<div class="feature-content">
				<h3>Multi-Educator Resource Hub</h3>
				<p>
					Collaboratively author, share, and export curriculum modules across
					district departments with granular role permissions.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- INSTITUTIONAL NOTIFICATION FORM -->
<section
	id="notify"
	class="angled-top-box notify-section"
	style="--color: var(--brand-tertiary); --text_color: var(--brand-tertiary-contrast);"
	use:thickMargins
>
	<h2 class="section-title">Request Pilot Access for Your School or District</h2>
	<p class="section-intro">
		We are selecting high school CTE departments and freshman advisory programs
		for early pilot deployments.
	</p>

	{#if notificationSubmitted}
		<div class="submission-success">
			<CheckCircle2 size={28} />
			<div>
				<h4>Pilot Interest Logged</h4>
				<p>
					Thank you. Institutional onboarding credentials and documentation will be
					dispatched to <strong>{notificationEmail}</strong> prior to portal launch.
				</p>
			</div>
		</div>
	{:else}
		<form onsubmit={handleNotify} class="notify-form">
			<div class="input-group">
				<label for="district-email" class="form-label">
					Educator / Institutional Email
				</label>
				<input
					id="district-email"
					type="email"
					bind:value={notificationEmail}
					placeholder="instructor@district.k12.ca.us"
					required
					class="text-input"
				/>
			</div>
			<button type="submit" class="cta submit-btn">
				<Sparkles size={18} /> Join Institutional Waitlist
			</button>
		</form>
	{/if}

	<div class="roadmap-link-row">
		<a class="cta" href="/road-map" use:foresight>
			<Milestone size={18} /> View Implementation Roadmap
		</a>
	</div>
</section>

<style>
	.teacher-hero {
		padding-block-start: var(--gap-3);
		padding-block-end: calc(var(--angle-height) + var(--gap-3));
		padding-inline: var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.pill-wrapper {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: var(--gap-1);
		flex-wrap: wrap;
	}

	.status-indicator {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-mono, monospace);
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.9;
	}

	.hero-title {
		font-size: clamp(2rem, 4.5vw, 3.25rem);
		font-weight: 900;
		line-height: 1.15;
		margin: 0.5rem 0 1rem 0;
	}

	.hero-desc {
		font-size: clamp(1.05rem, 1.8vw, 1.25rem);
		line-height: 1.6;
		max-width: 800px;
		margin-bottom: var(--gap-2);
		opacity: 0.95;
	}

	.cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: var(--gap-1);
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		border-radius: var(--border-radius-sm);
		font-weight: 700;
		text-decoration: none;
		transition: transform 0.15s ease, background-color 0.2s ease;
	}

	.primary-cta {
		background-color: var(--local-text);
		color: var(--color) !important;
	}

	/* DEVELOPER TODO CALLOUT BOX */
	.dev-todo-box {
		background: var(--surface-1);
		padding: var(--gap-2) var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.todo-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono, monospace);
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		background: var(--brand-secondary);
		color: var(--bg);
		padding: 0.25rem 0.6rem;
		border-radius: 4px;
		margin-bottom: 0.75rem;
	}

	.section-subheading {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
		font-weight: 800;
	}

	.section-text {
		margin: 0 0 0.75rem 0;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.code-tag {
		font-family: var(--font-mono, monospace);
		background: var(--surface-3);
		color: var(--brand-primary);
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
		font-size: 0.9em;
	}

	.todo-list {
		margin: 0.5rem 0 1rem 1.5rem;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		color: var(--fg);
	}

	.todo-list li strong {
		color: var(--brand-primary);
	}

	.todo-footer {
		margin-top: 1rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--ui-border-subtle);
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.todo-footer a {
		color: var(--brand-secondary);
		font-weight: 700;
	}

	/* CAPABILITIES SECTION */
	.capabilities-section {
		padding-block-start: calc(var(--angle-height) + var(--gap-3));
		padding-block-end: calc(var(--angle-height) + var(--gap-3));
		padding-inline: var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.section-title {
		font-size: clamp(1.4rem, 2.5vw, 2rem);
		font-weight: 900;
		margin: 0 0 0.4rem 0;
		line-height: 1.2;
	}

	.section-intro {
		font-size: clamp(0.95rem, 1.5vw, 1.15rem);
		line-height: 1.5;
		margin: 0 0 1.25rem 0;
		opacity: 0.92;
		max-width: 800px;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.25rem;
		margin-top: var(--gap-2);
	}

	.feature-card {
		display: flex;
		gap: 1rem;
		padding: 1.25rem;
		background: oklch(from var(--color) calc(l + 0.05) c h / 0.35);
		border: 1px solid var(--local-text);
		border-radius: var(--border-radius);
	}

	.feature-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		flex-shrink: 0;
		color: var(--local-text);
	}

	.feature-content h3 {
		margin: 0 0 0.4rem 0;
		font-size: 1.15rem;
		font-weight: 800;
	}

	.feature-content p {
		margin: 0;
		font-size: 0.92rem;
		line-height: 1.5;
		opacity: 0.9;
	}

	/* NOTIFICATION FORM */
	.notify-section {
		padding-block-start: calc(var(--angle-height) + var(--gap-3));
		padding-block-end: var(--gap-3);
		padding-inline: var(--gap-3);
		margin-block-end: var(--gap-3);
	}

	.notify-form {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		align-items: flex-end;
		max-width: 600px;
		margin: var(--gap-2) 0;
	}

	.input-group {
		flex: 1;
		min-width: 260px;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.form-label {
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.text-input {
		padding: 0.75rem 1rem;
		border-radius: var(--border-radius-sm);
		border: 2px solid var(--local-text);
		background: var(--bg);
		color: var(--fg);
		font-size: 1rem;
		outline: none;
	}

	.text-input:focus {
		border-color: var(--brand-primary);
	}

	.submit-btn {
		background: var(--local-text);
		color: var(--color) !important;
		border: 2px solid var(--local-text);
		cursor: pointer;
		font-size: 0.95rem;
	}

	.submission-success {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 1.25rem;
		background: oklch(from var(--color) calc(l + 0.1) c h / 0.4);
		border: 2px solid var(--local-text);
		border-radius: var(--border-radius);
		margin: var(--gap-2) 0;
	}

	.submission-success h4 {
		margin: 0 0 0.25rem 0;
		font-size: 1.1rem;
	}

	.submission-success p {
		margin: 0;
		font-size: 0.95rem;
	}

	.roadmap-link-row {
		margin-top: var(--gap-2);
	}
</style>
