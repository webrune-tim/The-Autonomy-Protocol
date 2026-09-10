<script lang="ts">
	import { DialogueSession } from './dialogue.svelte';
	import { SCENARIOS } from './scenarios';
	import type { Scenario, DialogueOption } from './types';
	import {
		HelpCircle,
		CheckCircle2,
		AlertTriangle,
		RefreshCw,
		Scale,
		BookOpen,
		MessageSquareQuote,
		ShieldCheck,
		ArrowRight
	} from '@lucide/svelte';

	let activeScenarioIndex = $state<number>(0);
	const session = new DialogueSession(SCENARIOS[0], 'start');
	let selectedOptionId = $state<string | null>(null);

	function handleScenarioChange(index: number) {
		activeScenarioIndex = index;
		session.loadScenario(SCENARIOS[index], 'start');
		selectedOptionId = null;
	}

	function handleCommit() {
		if (!selectedOptionId || !session.currentStep) return;
		const option = session.currentStep.options.find((o) => o.id === selectedOptionId);
		if (option) {
			session.selectOption(option);
			selectedOptionId = null;
		}
	}
</script>

<div class="socratic-simulator">
	<!-- Scenario Selector Tabs -->
	<div class="scenario-nav">
		{#each SCENARIOS as sc, idx (sc.id)}
			<button
				type="button"
				class="scenario-tab"
				class:active={activeScenarioIndex === idx}
				onclick={() => handleScenarioChange(idx)}
			>
				<BookOpen size={14} />
				<span>{sc.title}</span>
			</button>
		{/each}
	</div>

	<!-- Header with Live Telemetry Dashboard -->
	<header class="simulator-header">
		<div class="meta-block">
			<div class="header-badges">
				<span class="protocol-badge">The Integrity Protocol</span>
				<span class="tenet-badge">Inquiry-Based Reality</span>
			</div>
			<h2 class="scenario-title">{session.scenario.title}</h2>
			<p class="scenario-topic">{session.scenario.topic}</p>
			<div class="standard-focus">
				<Scale size={13} />
				<span>{session.scenario.standardFocus}</span>
			</div>
		</div>

		<!-- Live 4-Dimension Epistemic Telemetry -->
		<div class="telemetry-grid">
			<div class="metric-card">
				<span class="metric-label">Curiosity Posture</span>
				<span class="metric-val" class:high={session.cumulativeScores.posture >= 80} class:mid={session.cumulativeScores.posture >= 50 && session.cumulativeScores.posture < 80} class:low={session.cumulativeScores.posture > 0 && session.cumulativeScores.posture < 50}>
					{session.cumulativeScores.posture}%
				</span>
				<span class="metric-sub">Tone & Neutrality</span>
			</div>
			<div class="metric-card">
				<span class="metric-label">Assumption Probing</span>
				<span class="metric-val" class:high={session.cumulativeScores.probing >= 80} class:mid={session.cumulativeScores.probing >= 50 && session.cumulativeScores.probing < 80} class:low={session.cumulativeScores.probing > 0 && session.cumulativeScores.probing < 50}>
					{session.cumulativeScores.probing}%
				</span>
				<span class="metric-sub">Premise Breakdown</span>
			</div>
			<div class="metric-card">
				<span class="metric-label">Source Grounding</span>
				<span class="metric-val" class:high={session.cumulativeScores.grounding >= 80} class:mid={session.cumulativeScores.grounding >= 50 && session.cumulativeScores.grounding < 80} class:low={session.cumulativeScores.grounding > 0 && session.cumulativeScores.grounding < 50}>
					{session.cumulativeScores.grounding}%
				</span>
				<span class="metric-sub">Primary Documents</span>
			</div>
			<div class="metric-card">
				<span class="metric-label">Dialectical Efficacy</span>
				<span class="metric-val" class:high={session.cumulativeScores.efficacy >= 80} class:mid={session.cumulativeScores.efficacy >= 50 && session.cumulativeScores.efficacy < 80} class:low={session.cumulativeScores.efficacy > 0 && session.cumulativeScores.efficacy < 50}>
					{session.cumulativeScores.efficacy}%
				</span>
				<span class="metric-sub">Premise Defense</span>
			</div>
		</div>
	</header>

	<!-- Transcript Stream -->
	<section class="transcript-stream" aria-label="Dialogue Transcript Stream">
		<div class="stream-label">
			<MessageSquareQuote size={14} />
			<span>Observable Dialectical Exchange Stream</span>
		</div>

		{#if session.history.length === 0}
			<div class="empty-stream-state">
				<HelpCircle size={20} />
				<p>Awaiting initial inquiry selection. Review the instructor assertion below and choose an evidence-grounded questioning posture.</p>
			</div>
		{/if}

		{#each session.history as exchange, i (i)}
			<div class="exchange-unit">
				<div class="bubble instructor-bubble">
					<div class="speaker-tag instructor-tag">
						<span>Instructor Premise</span>
					</div>
					<p class="claim-text">{exchange.speakerText}</p>
				</div>

				<div class="bubble student-bubble">
					<div class="speaker-tag student-tag">
						<span>Student Inquiry Strategy</span>
						<span class="cat-pill cat-{exchange.studentOption.category}">
							{exchange.studentOption.category}
						</span>
					</div>
					<p class="quote-text">“{exchange.studentOption.text}”</p>

					<!-- Pedagogical Feedback Card -->
					<div class="feedback-card" class:aligned={exchange.studentOption.scores.posture >= 70} class:misaligned={exchange.studentOption.scores.posture < 70}>
						<div class="feedback-header">
							{#if exchange.studentOption.scores.posture >= 70}
								<CheckCircle2 size={14} class="text-success" />
								<span class="feedback-status status-success">Epistemic Alignment</span>
							{:else}
								<AlertTriangle size={14} class="text-warning" />
								<span class="feedback-status status-warning">Combative Misalignment</span>
							{/if}
						</div>
						<p class="feedback-body">{exchange.studentOption.feedback}</p>
					</div>
				</div>

				<div class="bubble teacher-response-bubble">
					<div class="speaker-tag teacher-response-tag">
						<span>Instructor Dialectical Concession / Response</span>
					</div>
					<p class="response-text">{exchange.studentOption.teacherResponse}</p>
				</div>
			</div>
		{/each}
	</section>

	<!-- Active Turn Turn Input / Selection -->
	{#if !session.isComplete && session.currentStep}
		<section class="active-inquiry-box">
			<div class="prompt-header">
				<div class="claim-badge">Target Claim to Deconstruct</div>
				<blockquote class="current-claim">
					"{session.currentStep.speakerStatement}"
				</blockquote>
				{#if session.currentStep.contextNote}
					<p class="context-note">
						<strong>Forensic Context:</strong> {session.currentStep.contextNote}
					</p>
				{/if}
			</div>

			<div class="options-selector">
				<span class="options-heading">Select Inquiring Strategy:</span>
				<div class="options-list">
					{#each session.currentStep.options as option (option.id)}
						<label class="option-row" class:selected={selectedOptionId === option.id}>
							<input
								type="radio"
								name="dialogue-option"
								value={option.id}
								bind:group={selectedOptionId}
								class="option-radio"
							/>
							<div class="option-details">
								<div class="option-tags">
									<span class="cat-badge cat-{option.category}">
										{option.category.replace('-', ' ')}
									</span>
								</div>
								<p class="option-quote">"{option.text}"</p>
							</div>
						</label>
					{/each}
				</div>

				<div class="action-bar">
					<button
						type="button"
						class="commit-turn-btn"
						disabled={!selectedOptionId}
						onclick={handleCommit}
					>
						<span>Deliver Inquiring Question</span>
						<ArrowRight size={15} />
					</button>
				</div>
			</div>
		</section>
	{:else if session.isComplete}
		<!-- Dialogue Debrief & Verification -->
		<section class="completion-debrief-card">
			<div class="debrief-header">
				<ShieldCheck size={32} class="debrief-icon" />
				<div>
					<h3 class="debrief-title">Socratic Engagement Concluded</h3>
					<p class="debrief-sub">Autonomous Evaluation & Proof of Competency Verification</p>
				</div>
			</div>

			<div class="verdict-banner">
				<span class="verdict-badge">Evaluator Verdict</span>
				<h4 class="verdict-grade">{session.overallGrade}</h4>
			</div>

			<div class="final-score-matrix">
				<div class="matrix-item">
					<span class="matrix-label">Curiosity Posture:</span>
					<strong class="matrix-val">{session.cumulativeScores.posture}%</strong>
				</div>
				<div class="matrix-item">
					<span class="matrix-label">Premise Deconstruction:</span>
					<strong class="matrix-val">{session.cumulativeScores.probing}%</strong>
				</div>
				<div class="matrix-item">
					<span class="matrix-label">Primary Source Forensics:</span>
					<strong class="matrix-val">{session.cumulativeScores.grounding}%</strong>
				</div>
				<div class="matrix-item">
					<span class="matrix-label">Dialectical Efficacy:</span>
					<strong class="matrix-val">{session.cumulativeScores.efficacy}%</strong>
				</div>
			</div>

			<div class="debrief-actions">
				<button
					type="button"
					class="restart-btn"
					onclick={() => session.reset('start')}
				>
					<RefreshCw size={14} />
					<span>Re-Attempt Scenario</span>
				</button>

				{#if activeScenarioIndex < SCENARIOS.length - 1}
					<button
						type="button"
						class="next-scenario-btn"
						onclick={() => handleScenarioChange(activeScenarioIndex + 1)}
					>
						<span>Next Scenario: {SCENARIOS[activeScenarioIndex + 1].title}</span>
						<ArrowRight size={14} />
					</button>
				{/if}
			</div>
		</section>
	{/if}
</div>

<style>
	.socratic-simulator {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		color: var(--fg, #f8fafc);
		background: var(--bg-surface, #1e293b);
		border: 1px solid var(--border, #334155);
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
	}

	.scenario-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--border, #334155);
	}

	.scenario-tab {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: inherit;
		font-size: 0.82rem;
		font-weight: 600;
		padding: 0.4rem 0.85rem;
		border-radius: 6px;
		border: 1px solid var(--border, #334155);
		background: var(--bg-base, #0f172a);
		color: var(--text-muted, #94a3b8);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.scenario-tab:hover {
		color: var(--fg, #f8fafc);
		border-color: #6366f1;
	}

	.scenario-tab.active {
		background: rgba(99, 102, 241, 0.15);
		border-color: #818cf8;
		color: #e0e7ff;
	}

	.simulator-header {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	@media (min-width: 900px) {
		.simulator-header {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
		}
	}

	.meta-block {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		max-width: 600px;
	}

	.header-badges {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.protocol-badge {
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #818cf8;
		background: rgba(99, 102, 241, 0.12);
		border: 1px solid rgba(99, 102, 241, 0.3);
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
	}

	.tenet-badge {
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #38bdf8;
		background: rgba(56, 189, 248, 0.12);
		border: 1px solid rgba(56, 189, 248, 0.3);
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
	}

	.scenario-title {
		margin: 0.25rem 0 0;
		font-size: 1.35rem;
		font-weight: 800;
		color: var(--fg, #f8fafc);
	}

	.scenario-topic {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-muted, #94a3b8);
	}

	.standard-focus {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 0.25rem;
		font-size: 0.78rem;
		color: #94a3b8;
		font-style: italic;
	}

	.telemetry-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.6rem;
		min-width: 320px;
	}

	@media (min-width: 600px) {
		.telemetry-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.metric-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		background: var(--bg-base, #0f172a);
		border: 1px solid var(--border, #334155);
		border-radius: 8px;
		padding: 0.65rem 0.5rem;
	}

	.metric-label {
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--text-muted, #94a3b8);
	}

	.metric-val {
		font-size: 1.25rem;
		font-weight: 800;
		margin: 0.15rem 0;
		color: #94a3b8;
	}

	.metric-val.high {
		color: #34d399;
	}

	.metric-val.mid {
		color: #fbbf24;
	}

	.metric-val.low {
		color: #f87171;
	}

	.metric-sub {
		font-size: 0.65rem;
		color: #64748b;
	}

	.transcript-stream {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		border-top: 1px solid var(--border, #334155);
		padding-top: 1.25rem;
	}

	.stream-label {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #818cf8;
	}

	.empty-stream-state {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: var(--bg-base, #0f172a);
		border: 1px dashed var(--border, #334155);
		border-radius: 8px;
		padding: 1rem 1.25rem;
		color: var(--text-muted, #94a3b8);
		font-size: 0.88rem;
	}

	.empty-stream-state p {
		margin: 0;
		line-height: 1.5;
	}

	.exchange-unit {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		background: var(--bg-base, #0f172a);
		border: 1px solid var(--border, #334155);
		border-radius: 10px;
		padding: 1.25rem;
	}

	.bubble {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.speaker-tag {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.instructor-tag {
		color: #f87171;
	}

	.student-tag {
		color: #818cf8;
	}

	.teacher-response-tag {
		color: #38bdf8;
	}

	.claim-text {
		margin: 0;
		font-size: 0.95rem;
		color: #f1f5f9;
		line-height: 1.5;
		font-weight: 500;
	}

	.student-bubble {
		margin-left: 1.25rem;
		padding-left: 1rem;
		border-left: 3px solid #818cf8;
	}

	.quote-text {
		margin: 0;
		font-size: 0.98rem;
		font-style: italic;
		color: #e0e7ff;
		line-height: 1.5;
	}

	.cat-pill {
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		padding: 0.1rem 0.4rem;
		border-radius: 3px;
	}

	.cat-clarification {
		background: rgba(56, 189, 248, 0.2);
		color: #38bdf8;
	}

	.cat-probing-assumptions {
		background: rgba(245, 158, 11, 0.2);
		color: #fbbf24;
	}

	.cat-probing-evidence {
		background: rgba(52, 211, 153, 0.2);
		color: #34d399;
	}

	.cat-counter-perspectives {
		background: rgba(168, 85, 247, 0.2);
		color: #c084fc;
	}

	.cat-implications {
		background: rgba(236, 72, 153, 0.2);
		color: #f472b6;
	}

	.feedback-card {
		margin-top: 0.5rem;
		padding: 0.65rem 0.85rem;
		border-radius: 6px;
		font-size: 0.82rem;
		line-height: 1.45;
	}

	.feedback-card.aligned {
		background: rgba(16, 185, 129, 0.08);
		border: 1px solid rgba(16, 185, 129, 0.25);
		color: #d1fae5;
	}

	.feedback-card.misaligned {
		background: rgba(239, 68, 68, 0.08);
		border: 1px solid rgba(239, 68, 68, 0.25);
		color: #fee2e2;
	}

	.feedback-header {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-weight: 700;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin-bottom: 0.25rem;
	}

	.feedback-body {
		margin: 0;
	}

	.teacher-response-bubble {
		background: rgba(15, 23, 42, 0.6);
		border: 1px solid rgba(56, 189, 248, 0.2);
		border-radius: 6px;
		padding: 0.75rem 1rem;
		margin-top: 0.25rem;
	}

	.response-text {
		margin: 0;
		font-size: 0.92rem;
		color: #bae6fd;
		line-height: 1.5;
	}

	.active-inquiry-box {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		background: var(--bg-base, #0f172a);
		border: 1px solid var(--border, #334155);
		border-radius: 10px;
		padding: 1.25rem;
	}

	.claim-badge {
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #f87171;
		margin-bottom: 0.35rem;
	}

	.current-claim {
		margin: 0;
		font-size: 1.15rem;
		font-weight: 600;
		color: #f8fafc;
		line-height: 1.45;
	}

	.context-note {
		margin: 0.5rem 0 0;
		font-size: 0.82rem;
		color: var(--text-muted, #94a3b8);
	}

	.context-note strong {
		color: #e2e8f0;
	}

	.options-selector {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.options-heading {
		font-size: 0.82rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted, #94a3b8);
	}

	.options-list {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.option-row {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
		background: var(--bg-surface, #1e293b);
		border: 1px solid var(--border, #334155);
		border-radius: 8px;
		padding: 0.85rem 1rem;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.option-row:hover {
		border-color: #6366f1;
		background: rgba(99, 102, 241, 0.05);
	}

	.option-row.selected {
		border-color: #818cf8;
		background: rgba(99, 102, 241, 0.12);
		box-shadow: 0 0 0 1px #818cf8;
	}

	.option-radio {
		margin-top: 0.35rem;
		accent-color: #6366f1;
	}

	.option-details {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		width: 100%;
	}

	.cat-badge {
		display: inline-block;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.15rem 0.45rem;
		border-radius: 4px;
	}

	.option-quote {
		margin: 0;
		font-size: 0.94rem;
		color: #f8fafc;
		line-height: 1.45;
	}

	.action-bar {
		display: flex;
		justify-content: flex-end;
		margin-top: 0.5rem;
	}

	.commit-turn-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: #4f46e5;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.7rem 1.4rem;
		font-size: 0.9rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.commit-turn-btn:hover:not(:disabled) {
		background: #6366f1;
		box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
	}

	.commit-turn-btn:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.completion-debrief-card {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		background: var(--bg-base, #0f172a);
		border: 1px solid #34d399;
		border-radius: 10px;
		padding: 1.5rem;
		text-align: center;
	}

	.debrief-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	@media (min-width: 600px) {
		.debrief-header {
			flex-direction: row;
			justify-content: center;
			text-align: left;
			gap: 1rem;
		}
	}

	:global(.debrief-icon) {
		color: #34d399;
	}

	.debrief-title {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 800;
		color: #f8fafc;
	}

	.debrief-sub {
		margin: 0.2rem 0 0;
		font-size: 0.85rem;
		color: var(--text-muted, #94a3b8);
	}

	.verdict-banner {
		background: rgba(52, 211, 153, 0.1);
		border: 1px solid rgba(52, 211, 153, 0.3);
		border-radius: 8px;
		padding: 1rem;
	}

	.verdict-badge {
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #34d399;
	}

	.verdict-grade {
		margin: 0.25rem 0 0;
		font-size: 1.35rem;
		font-weight: 800;
		color: #6ee7b7;
	}

	.final-score-matrix {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
		max-width: 600px;
		margin: 0 auto;
		width: 100%;
		text-align: left;
	}

	.matrix-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--bg-surface, #1e293b);
		border: 1px solid var(--border, #334155);
		border-radius: 6px;
		padding: 0.6rem 0.85rem;
		font-size: 0.85rem;
	}

	.matrix-label {
		color: var(--text-muted, #94a3b8);
	}

	.matrix-val {
		color: #34d399;
		font-size: 1rem;
	}

	.debrief-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.restart-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: var(--bg-surface, #1e293b);
		border: 1px solid var(--border, #334155);
		color: var(--fg, #f8fafc);
		padding: 0.6rem 1.25rem;
		border-radius: 6px;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.restart-btn:hover {
		border-color: #6366f1;
		color: #818cf8;
	}

	.next-scenario-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: #4f46e5;
		color: white;
		border: none;
		padding: 0.6rem 1.25rem;
		border-radius: 6px;
		font-size: 0.85rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.next-scenario-btn:hover {
		background: #6366f1;
	}
</style>
