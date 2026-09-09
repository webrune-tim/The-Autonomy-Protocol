<script lang="ts">
	import { webMcpClient } from '#lib/webmcp/client';
	import { simulationEngine } from '#lib/webmcp/simulationEngine.svelte';
	import { Bot, Play, Zap, CheckCircle2, AlertTriangle, Award, FileCheck } from '@lucide/svelte';

	let isRunningEval = $state(false);
	let evalLog = $state<string[]>([]);
	let selectedFrictionScenario = $state('Stakeholder demands immediate emergency patch without following code review protocol.');
	let selectedTenet = $state<'PRECISION_OF_SPEECH' | 'EMOTIONAL_NEUTRALITY' | 'INQUIRY_BASED_REALITY' | 'BASELINE_FLUCTUATION'>('EMOTIONAL_NEUTRALITY');

	async function runAutonomousEvaluation() {
		isRunningEval = true;
		evalLog = ['[Evaluator Agent] Initializing WebMCP inspection session...'];

		try {
			// Step 1: Query student competency profile
			evalLog.push('[Evaluator Agent] Calling tool <get_student_competency_profile>...');
			const profile = await webMcpClient.executeTool('get_student_competency_profile', {
				moduleId: simulationEngine.moduleId
			});
			evalLog.push(`[Evaluator Agent] Retrieved profile: Phase=${profile.currentPhase}, Remediated=${profile.remediatedLiabilitiesCount}/${profile.totalLiabilitiesCount}`);

			await new Promise((r) => setTimeout(r, 600));

			// Step 2: Inspect state machine
			evalLog.push('[Evaluator Agent] Calling tool <inspect_state_machine>...');
			const machine = await webMcpClient.executeTool('inspect_state_machine', {});
			evalLog.push(`[Evaluator Agent] Inspected machine: Orientation committed=${machine.orientation.cognitiveAlignmentCommitted}`);

			await new Promise((r) => setTimeout(r, 600));

			// Step 3: Audit cognitive liabilities
			for (const liability of simulationEngine.liabilities) {
				const hasRefactoring = Boolean(liability.studentRefactoring && liability.studentRefactoring.trim().length > 10);
				const verdict = hasRefactoring ? 'ALIGNED' : 'MISALIGNED';
				const feedbackNotes = hasRefactoring
					? 'Refactoring accurately decouples subjective emotional reasoning from objective mechanical realities.'
					: 'Insufficient behavioral refactoring. Student response retains externalized liability.';

				evalLog.push(`[Evaluator Agent] Auditing liability "${liability.id}" via <audit_cognitive_alignment> -> ${verdict}`);
				await webMcpClient.executeTool('audit_cognitive_alignment', {
					liabilityId: liability.id,
					verdict,
					feedbackNotes
				});
				await new Promise((r) => setTimeout(r, 400));
			}

			// Step 4: Verify Amends Protocol if present
			if (simulationEngine.amendsPlan.restorativeAction.trim().length > 10) {
				evalLog.push('[Evaluator Agent] Calling tool <verify_amends_protocol>...');
				await webMcpClient.executeTool('verify_amends_protocol', {
					isActionBased: true,
					repairScopeVerified: true,
					evaluatorNotes: 'Actionable protocol confirmed. Restores technical telemetry without subjective defensiveness.'
				});
			} else {
				evalLog.push('[Evaluator Agent] Restorative plan pending student submission.');
			}

			await new Promise((r) => setTimeout(r, 600));

			// Step 5: Issue Proof of Competency
			const allLiabilitiesRemediated = simulationEngine.liabilities.every((l) => l.remediated);
			const integrityScore = allLiabilitiesRemediated ? 94 : 65;
			const behaviorScore = simulationEngine.currentPhase === 'MAINTENANCE_LEADERSHIP' ? 96 : (simulationEngine.currentPhase === 'RESTORATIVE_PRACTICE' ? 82 : 60);

			evalLog.push('[Evaluator Agent] Recording evaluation via <record_proof_of_competency>...');
			const result = await webMcpClient.executeTool('record_proof_of_competency', {
				integrityCalibrationScore: integrityScore,
				observableBehaviorScore: behaviorScore,
				evaluatorSignature: 'Google-WebMCP-Autonomous-Proctor-v1',
				notes: allLiabilitiesRemediated
					? 'Student demonstrates collegiate-level psychological literacy and executive functioning under professional crisis conditions.'
					: 'Student has partially mapped liabilities. Further cognitive refactoring required for full competency certification.'
			});

			evalLog.push(`[Evaluator Agent] Evaluation concluded. Verdict: ${result.record.verdict}`);
		} catch (err: any) {
			evalLog.push(`[Evaluator Agent] Execution error: ${err?.message || err}`);
		} finally {
			isRunningEval = false;
		}
	}

	async function injectFriction() {
		if (!selectedFrictionScenario.trim()) return;
		await webMcpClient.executeTool('inject_environmental_friction', {
			scenario: selectedFrictionScenario.trim(),
			requiredTenet: selectedTenet
		});
	}
</script>

<div class="evaluator-card">
	<div class="card-header">
		<div class="title-wrap">
			<Bot size={20} class="agent-icon" />
			<div>
				<h3 class="card-title">Autonomous Evaluator Agent</h3>
				<span class="sub-label">WebMCP Proctoring & Proof of Competency Engine</span>
			</div>
		</div>

		<button
			type="button"
			class="run-eval-btn"
			disabled={isRunningEval}
			onclick={runAutonomousEvaluation}
		>
			<Play size={15} />
			<span>{isRunningEval ? 'Evaluating via WebMCP...' : 'Run Agentic Assessment'}</span>
		</button>
	</div>

	<!-- Verification Certificate Badge if Verified -->
	{#if simulationEngine.verificationRecord}
		<div class="verification-badge" class:verified={simulationEngine.verificationRecord.verdict === 'COMPETENCY_VERIFIED'}>
			<div class="badge-icon">
				{#if simulationEngine.verificationRecord.verdict === 'COMPETENCY_VERIFIED'}
					<Award size={32} />
				{:else}
					<AlertTriangle size={32} />
				{/if}
			</div>
			<div class="badge-content">
				<div class="badge-title">
					Proof of Competency: {simulationEngine.verificationRecord.verdict === 'COMPETENCY_VERIFIED' ? 'VERIFIED' : 'ALIGNMENT REQUIRED'}
				</div>
				<p class="badge-notes">{simulationEngine.verificationRecord.notes}</p>
				<div class="badge-meta">
					<span>Integrity Calibration: <strong>{simulationEngine.verificationRecord.integrityCalibrationScore}%</strong></span>
					<span>Behavioral Score: <strong>{simulationEngine.verificationRecord.observableBehaviorScore}%</strong></span>
					<span>Signature: <code>{simulationEngine.verificationRecord.evaluatorSignature}</code></span>
				</div>
			</div>
		</div>
	{/if}

	<!-- Manual Injection Deck for Testers -->
	<div class="injection-section">
		<h4 class="section-title">
			<Zap size={15} />
			Simulate Proctor Intervention (WebMCP Tool: <code>inject_environmental_friction</code>)
		</h4>
		<div class="injection-row">
			<input
				type="text"
				class="friction-input"
				bind:value={selectedFrictionScenario}
				placeholder="Enter scenario to inject into student state machine..."
			/>
			<select class="tenet-select" bind:value={selectedTenet}>
				<option value="EMOTIONAL_NEUTRALITY">Emotional Neutrality</option>
				<option value="PRECISION_OF_SPEECH">Precision of Speech</option>
				<option value="INQUIRY_BASED_REALITY">Inquiry-Based Reality</option>
				<option value="BASELINE_FLUCTUATION">Baseline Fluctuation</option>
			</select>
			<button type="button" class="inject-btn" onclick={injectFriction}>
				Inject Friction
			</button>
		</div>
	</div>

	{#if evalLog.length > 0}
		<div class="eval-log-box">
			<div class="eval-log-title">
				<FileCheck size={14} />
				<span>Proctor Session Trace</span>
			</div>
			<div class="log-lines">
				{#each evalLog as line}
					<div class="line">{line}</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.evaluator-card {
		background: var(--surface-1, #12141a);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: var(--border-radius, 8px);
		padding: var(--gap-2, 1.5rem);
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.title-wrap {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.card-title {
		margin: 0;
		font-family: monospace;
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--fg, #f8fafc);
	}

	.sub-label {
		font-size: 0.78rem;
		color: var(--text-muted, #94a3b8);
	}

	.run-eval-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: #6366f1;
		color: #ffffff;
		border: none;
		border-radius: 6px;
		padding: 0.55rem 1.1rem;
		font-weight: 600;
		font-size: 0.85rem;
		cursor: pointer;
		transition: background 0.2s ease, transform 0.1s ease;
	}

	.run-eval-btn:hover:not(:disabled) {
		background: #4f46e5;
	}

	.run-eval-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.verification-badge {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		background: rgba(16, 185, 129, 0.08);
		border: 1px solid #10b981;
		border-radius: 8px;
		padding: 1rem;
	}

	.verification-badge:not(.verified) {
		background: rgba(245, 158, 11, 0.08);
		border-color: #f59e0b;
	}

	.badge-icon {
		color: #10b981;
	}

	.verification-badge:not(.verified) .badge-icon {
		color: #f59e0b;
	}

	.badge-title {
		font-family: monospace;
		font-weight: 700;
		font-size: 0.95rem;
		color: #10b981;
	}

	.verification-badge:not(.verified) .badge-title {
		color: #f59e0b;
	}

	.badge-notes {
		margin: 0.3rem 0 0.6rem 0;
		font-size: 0.85rem;
		color: var(--fg, #f1f5f9);
		line-height: 1.4;
	}

	.badge-meta {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		font-size: 0.78rem;
		color: var(--text-muted, #94a3b8);
	}

	.badge-meta code {
		color: #38bdf8;
		background: rgba(0, 0, 0, 0.2);
		padding: 0.1rem 0.3rem;
		border-radius: 3px;
	}

	.injection-section {
		background: var(--surface-2, #181c26);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: 6px;
		padding: 0.9rem;
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		margin: 0 0 0.6rem 0;
		font-size: 0.82rem;
		color: #e2e8f0;
	}

	.section-title code {
		color: #a5b4fc;
		background: rgba(99, 102, 241, 0.15);
		padding: 0.1rem 0.3rem;
		border-radius: 3px;
	}

	.injection-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.friction-input {
		flex: 2;
		min-width: 240px;
		background: var(--surface-3, #222736);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: 6px;
		padding: 0.45rem 0.75rem;
		color: var(--fg, #f1f5f9);
		font-size: 0.85rem;
	}

	.tenet-select {
		flex: 1;
		min-width: 180px;
		background: var(--surface-3, #222736);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: 6px;
		padding: 0.45rem 0.75rem;
		color: var(--fg, #f1f5f9);
		font-size: 0.82rem;
	}

	.inject-btn {
		background: #374151;
		color: #ffffff;
		border: none;
		border-radius: 6px;
		padding: 0.45rem 0.9rem;
		font-size: 0.82rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.inject-btn:hover {
		background: #4b5563;
	}

	.eval-log-box {
		background: #090c12;
		border: 1px solid #1e2433;
		border-radius: 6px;
		padding: 0.75rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
	}

	.eval-log-title {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		color: #38bdf8;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.log-lines {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		color: #cbd5e1;
		max-height: 180px;
		overflow-y: auto;
	}
</style>
