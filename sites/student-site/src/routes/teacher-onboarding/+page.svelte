<script lang="ts">
	import { foresight, thickMargins } from '@autonomy/actions'
	import {
		Building2,
		CheckCircle2,
		GraduationCap,
		Lock,
		Send,
		ShieldCheck,
		Sparkles,
		UserCheck
	} from '@lucide/svelte'
	import { SEO } from '@autonomy/seo'

	let educatorEmail = $state('')
	let districtName = $state('')
	let roleTitle = $state('')
	let submitted = $state(false)

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault()
		if (educatorEmail.trim() && districtName.trim()) {
			submitted = true
		}
	}
</script>

<SEO
	title="Educator Onboarding & Institutional Verification | The Autonomy Protocol"
	description="Institutional verification and onboarding portal for high school educators, counselors, and CTE pathway administrators."
	keywords="educator onboarding, teacher verification, high school advisory, CTE administrator"
/>


<section
	class="angled-bottom-box"
	style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast);"
>
	<div class="badge-row">
		<span class="auth-pill">
			<Lock size={14} /> Protected Institutional Pathway
		</span>
	</div>

	<h1>Educator Onboarding & Institutional Verification</h1>
	<p>
		Access to educator lesson plans, grading rubrics, student progress telemetry,
		and administrative controls is restricted to verified educational personnel.
	</p>
</section>

<section
	class="angled-top-bottom-box"
	use:thickMargins
	style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast);"
>
	<h2 class="reveal-header">Verification Process</h2>
	<div class="steps-grid">
		<div class="step-card">
			<div class="step-num">01</div>
			<h3>Institutional Email Domain</h3>
			<p>
				Educator accounts must originate from an accredited public school, charter,
				or district domain (`.k12.us` or `.edu`).
			</p>
		</div>

		<div class="step-card">
			<div class="step-num">02</div>
			<h3>Role Provisioning</h3>
			<p>
				Department heads or CTE leads assign granular permissions (Instructor,
				Pathway Lead, or District Administrator).
			</p>
		</div>

		<div class="step-card">
			<div class="step-num">03</div>
			<h3>Operating Center Access</h3>
			<p>
				Verified educators receive dedicated access to the Teacher Site document
				hub, PDF conversion pipeline, and student cohorts.
			</p>
		</div>
	</div>
</section>

<section
	class="bold-border-box margin-top"
	style="--border-color: var(--brand-primary);"
>
	<h2 class="reveal-header">Submit Educator Verification Request</h2>
	<p>
		Complete the intake below to initiate institutional credential review.
	</p>

	{#if submitted}
		<div class="success-banner">
			<CheckCircle2 size={32} />
			<div>
				<h3>Verification Request Logged</h3>
				<p>
					We have received your credential submission for <strong>{educatorEmail}</strong>
					at <strong>{districtName}</strong>. Our administrative intake team will
					confirm your institutional standing within 1-2 school days.
				</p>
			</div>
		</div>
	{:else}
		<form onsubmit={handleSubmit} class="verification-form">
			<div class="form-grid">
				<div class="form-group">
					<label for="district">School District / Institution</label>
					<div class="input-wrapper">
						<Building2 size={18} class="input-icon" />
						<input
							id="district"
							type="text"
							bind:value={districtName}
							placeholder="e.g. Oakland Unified School District"
							required
							class="text-input"
						/>
					</div>
				</div>

				<div class="form-group">
					<label for="role">Role / Instructional Capacity</label>
					<div class="input-wrapper">
						<GraduationCap size={18} class="input-icon" />
						<input
							id="role"
							type="text"
							bind:value={roleTitle}
							placeholder="e.g. CTE Pathway Lead / Advisory Coordinator"
							required
							class="text-input"
						/>
					</div>
				</div>

				<div class="form-group full-width">
					<label for="edu-email">District / Institutional Email</label>
					<div class="input-wrapper">
						<UserCheck size={18} class="input-icon" />
						<input
							id="edu-email"
							type="email"
							bind:value={educatorEmail}
							placeholder="educator@district.k12.ca.us"
							required
							class="text-input"
						/>
					</div>
				</div>
			</div>

			<div class="form-actions">
				<button type="submit" class="submit-btn">
					<Send size={18} /> Submit for Institutional Verification
				</button>
				<a href="/" class="return-link" use:foresight>
					← Return to Student Portal
				</a>
			</div>
		</form>
	{/if}
</section>

<style>
	.badge-row {
		margin-bottom: var(--gap-1);
	}

	.auth-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-mono, monospace);
		font-size: 0.8rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: var(--local-text);
		color: var(--color);
		padding: 0.3rem 0.75rem;
		border-radius: 4px;
	}

	.steps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 1.25rem;
		margin-top: var(--gap-2);
	}

	.step-card {
		padding: 1.25rem;
		background: oklch(from var(--color) calc(l + 0.05) c h / 0.35);
		border: 1px solid var(--local-text);
		border-radius: var(--border-radius);
	}

	.step-num {
		font-family: var(--font-mono, monospace);
		font-size: 1.5rem;
		font-weight: 900;
		opacity: 0.6;
		margin-bottom: 0.5rem;
	}

	.step-card h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.15rem;
		font-weight: 800;
	}

	.step-card p {
		margin: 0;
		font-size: 0.92rem;
		line-height: 1.5;
	}

	.verification-form {
		margin-top: var(--gap-2);
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}

	.full-width {
		grid-column: 1 / -1;
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
		letter-spacing: 0.05em;
		color: var(--fg);
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	:global(.input-icon) {
		position: absolute;
		left: 1rem;
		color: var(--text-muted);
		pointer-events: none;
	}

	.text-input {
		width: 100%;
		padding: 0.8rem 1rem 0.8rem 2.8rem;
		background: var(--surface-2);
		border: 1px solid var(--ui-border);
		border-radius: var(--border-radius-sm);
		color: var(--fg);
		font-size: 0.95rem;
		outline: none;
		transition: border-color 0.2s;
	}

	.text-input:focus {
		border-color: var(--brand-primary);
	}

	.form-actions {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-top: 1.5rem;
		flex-wrap: wrap;
	}

	.submit-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--brand-primary);
		color: var(--bg);
		border: none;
		padding: 0.85rem 1.75rem;
		border-radius: var(--border-radius-sm);
		font-weight: 800;
		font-size: 0.95rem;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		transition: transform 0.15s ease, opacity 0.2s ease;
	}

	.submit-btn:hover {
		opacity: 0.92;
		transform: translateY(-1px);
	}

	.return-link {
		color: var(--text-muted);
		text-decoration: none;
		font-weight: 600;
		font-size: 0.9rem;
	}

	.return-link:hover {
		color: var(--fg);
		text-decoration: underline;
	}

	.success-banner {
		display: flex;
		gap: 1.25rem;
		align-items: flex-start;
		background: oklch(from var(--brand-primary) calc(l - 0.25) c h / 0.3);
		border: 2px solid var(--brand-primary);
		padding: 1.5rem;
		border-radius: var(--border-radius);
		margin-top: 1rem;
		color: var(--fg);
	}

	.success-banner h3 {
		margin: 0 0 0.5rem 0;
		color: var(--brand-primary);
	}

	.success-banner p {
		margin: 0;
		line-height: 1.5;
	}

	@media (max-width: 640px) {
		.form-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
