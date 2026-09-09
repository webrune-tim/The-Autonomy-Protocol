<script lang="ts">
	import { simulationEngine } from '#lib/webmcp/simulationEngine.svelte';
	import { Compass, Search, Wrench, Shield, Check, Send, RotateCcw } from '@lucide/svelte';

	let standardSelection = $state('Universal Principles of Engineering Integrity');
	let refactoringInputs = $state<Record<string, string>>({
		'liab-1': 'The sprint delivery schedule slipped because telemetry was not surfaced to the client early. As lead developer, I will implement an automated milestone health dashboard to provide transparency.',
		'liab-2': 'A single staging database timeout is an isolated infrastructure threshold event, not an SLA breach. We will examine connection pooling logs objectively.',
		'liab-3': 'I will execute an inquiry-based debrief with the lead architect to understand deployment prerequisites without assuming malice.'
	});
	let restorativeInput = $state(
		'Execute a non-defensive technical debrief with Client Operations, deploy automated milestone health checks within 24 hours, and restore real-time deployment status channels.'
	);

	function handleCompleteOrientation() {
		simulationEngine.completeOrientation(standardSelection);
	}

	function handleSaveRefactoring(liabilityId: string) {
		const text = refactoringInputs[liabilityId] || '';
		simulationEngine.submitLiabilityRefactoring(liabilityId, text);
	}

	function handleSubmitAmends() {
		simulationEngine.submitAmendsProposal(restorativeInput);
	}

	function handleResolveFriction(eventId: string) {
		simulationEngine.resolveFrictionEvent(eventId, 'Maintained emotional neutrality, verified system logs, and responded with factual metric intervals.');
	}
</script>

<div class="workbench-card">
	<div class="card-header">
		<div>
			<h3 class="card-title">Student Interactive Control Deck</h3>
			<span class="sub-label">Practical Simulation & Behavioral State Controls</span>
		</div>
		<button type="button" class="reset-btn" onclick={() => simulationEngine.resetSimulation()} title="Reset Simulation State">
			<RotateCcw size={14} />
			<span>Reset Simulation</span>
		</button>
	</div>

	<!-- Section based on Active State Machine Node -->
	{#if simulationEngine.currentPhase === 'ORIENTATION'}
		<div class="phase-container">
			<div class="phase-header">
				<Compass size={18} class="accent-icon" />
				<div>
					<h4>Stage 1: Orientation Protocol (Steps 1–3)</h4>
					<p class="phase-hint">Acknowledge limits of control, source an objective standard, and commit to cognitive alignment.</p>
				</div>
			</div>

			<div class="control-grid">
				<div class="input-group">
					<label for="objective-standard-select">1. Source Objective Behavioral Standard:</label>
					<select id="objective-standard-select" bind:value={standardSelection} class="styled-select">
						<option value="Universal Principles of Engineering Integrity">Universal Principles of Engineering Integrity</option>
						<option value="Objective Architectural Decoupling & Reliability">Objective Architectural Decoupling & Reliability</option>
						<option value="Collective Wisdom of Systems Accountability">Collective Wisdom of Systems Accountability</option>
					</select>
				</div>

				<div class="acknowledgement-box">
					<div class="checkbox-line">
						<input type="checkbox" id="limits-chk" bind:checked={simulationEngine.limitsOfControlAcknowledged} />
						<label for="limits-chk">Step 1: Acknowledge that external team reactions and client pressures are outside direct individual control.</label>
					</div>
					<div class="checkbox-line">
						<input type="checkbox" id="align-chk" bind:checked={simulationEngine.cognitiveAlignmentCommitted} />
						<label for="align-chk">Step 3: Commit to aligning internal actions with the chosen objective standard regardless of emotional friction.</label>
					</div>
				</div>

				<button
					type="button"
					class="action-btn"
					disabled={!simulationEngine.limitsOfControlAcknowledged || !simulationEngine.cognitiveAlignmentCommitted}
					onclick={handleCompleteOrientation}
				>
					<Check size={16} />
					<span>Commit Orientation & Advance to Internal Audit</span>
				</button>
			</div>
		</div>
	{:else if simulationEngine.currentPhase === 'INTERNAL_AUDIT'}
		<div class="phase-container">
			<div class="phase-header">
				<Search size={18} class="accent-icon" />
				<div>
					<h4>Stage 2: The Internal Audit (Steps 4–7)</h4>
					<p class="phase-hint">Identify cognitive liabilities, decouple emotional distortions, and submit behavioral refactorings for WebMCP agent audit.</p>
				</div>
			</div>

			<div class="liabilities-list">
				{#each simulationEngine.liabilities as liability (liability.id)}
					<div class="liability-item" class:remediated={liability.remediated}>
						<div class="liability-meta">
							<div class="distortion-badge">{liability.distortionType}</div>
							<span class="liability-label">{liability.label}</span>
							<span class="status-pill" class:pill-done={liability.remediated}>
								{liability.remediated ? 'Remediated & Verified' : 'Pending Refactoring'}
							</span>
						</div>

						<div class="refactor-input-group">
							<label for="refactor-{liability.id}" class="input-label">Student Behavioral Refactoring:</label>
							<textarea
								id="refactor-{liability.id}"
								rows="2"
								class="refactor-textarea"
								bind:value={refactoringInputs[liability.id]}
								placeholder="Refactor subjective defense into objective behavioral mechanics..."
							></textarea>
							<button
								type="button"
								class="submit-refactor-btn"
								onclick={() => handleSaveRefactoring(liability.id)}
							>
								<Send size={13} />
								<span>Submit for Agent Audit</span>
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else if simulationEngine.currentPhase === 'RESTORATIVE_PRACTICE'}
		<div class="phase-container">
			<div class="phase-header">
				<Wrench size={18} class="accent-icon" />
				<div>
					<h4>Stage 3: Restorative Practice (Steps 8–9)</h4>
					<p class="phase-hint">Map interpersonal impact and execute the action-based Amends Protocol. The agent validates behavioral restitution over emotional apologies.</p>
				</div>
			</div>

			<div class="amends-form">
				<div class="stakeholder-summary">
					<span>Impacted Stakeholder: <strong>{simulationEngine.amendsPlan.impactedStakeholder}</strong></span>
					<span>Identified Harm: <strong>{simulationEngine.amendsPlan.identifiedHarm}</strong></span>
				</div>

				<div class="input-group">
					<label for="amends-input">Actionable Restorative Proposal (Amends Protocol):</label>
					<textarea
						id="amends-input"
						rows="3"
						class="refactor-textarea"
						bind:value={restorativeInput}
						placeholder="Specify the exact, concrete steps taken to repair trust and restore technical functionality..."
					></textarea>
				</div>

				<div class="amends-action-row">
					<button type="button" class="action-btn" onclick={handleSubmitAmends}>
						<Send size={15} />
						<span>Submit Restorative Action to Agent</span>
					</button>
					<span class="protocol-status-badge status-{simulationEngine.amendsPlan.protocolStatus.toLowerCase()}">
						Status: {simulationEngine.amendsPlan.protocolStatus}
					</span>
				</div>
			</div>
		</div>
	{:else}
		<div class="phase-container">
			<div class="phase-header">
				<Shield size={18} class="accent-icon" />
				<div>
					<h4>Stage 4: Maintenance & Leadership (Steps 10–12)</h4>
					<p class="phase-hint">Daily cognitive inventory and real-time conflict de-escalation under environmental friction.</p>
				</div>
			</div>

			<div class="friction-queue">
				<h5 class="queue-title">Active Environmental Friction Events:</h5>
				{#each simulationEngine.frictionEvents as event (event.id)}
					<div class="friction-card" class:resolved={event.resolved}>
						<div class="friction-meta">
							<span class="friction-source">[{event.source}]</span>
							<span class="friction-tenet">Required Tenet: <strong>{event.requiredTenet}</strong></span>
						</div>
						<p class="friction-scenario">{event.scenario}</p>
						{#if !event.resolved}
							<button type="button" class="resolve-btn" onclick={() => handleResolveFriction(event.id)}>
								Apply Emotional Neutrality & De-escalate
							</button>
						{:else}
							<div class="resolved-tag">✓ Friction De-escalated via Integrity Protocol</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.workbench-card {
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
		border-bottom: 1px solid var(--ui-border, #2a2e3d);
		padding-bottom: 0.85rem;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.card-title {
		margin: 0;
		font-family: monospace;
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--fg, #f8fafc);
	}

	.sub-label {
		font-size: 0.8rem;
		color: var(--text-muted, #94a3b8);
	}

	.reset-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: transparent;
		border: 1px solid #374151;
		color: #94a3b8;
		padding: 0.35rem 0.75rem;
		border-radius: 6px;
		font-size: 0.8rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.reset-btn:hover {
		border-color: #ef4444;
		color: #f87171;
		background: rgba(239, 68, 68, 0.1);
	}

	.phase-container {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.phase-header {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.phase-header h4 {
		margin: 0;
		font-size: 1rem;
		color: #f8fafc;
	}

	.phase-hint {
		margin: 0.25rem 0 0 0;
		font-size: 0.82rem;
		color: var(--text-muted, #94a3b8);
	}

	.accent-icon {
		color: #6366f1;
		margin-top: 3px;
	}

	.control-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background: var(--surface-2, #181c26);
		padding: 1.25rem;
		border-radius: 8px;
		border: 1px solid var(--ui-border, #2a2e3d);
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.input-group label {
		font-size: 0.85rem;
		font-weight: 600;
		color: #cbd5e1;
	}

	.styled-select {
		background: var(--surface-3, #222736);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: 6px;
		padding: 0.55rem 0.85rem;
		color: var(--fg, #f8fafc);
		font-size: 0.9rem;
	}

	.acknowledgement-box {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 0.75rem 0;
	}

	.checkbox-line {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
	}

	.checkbox-line input {
		margin-top: 3px;
		cursor: pointer;
	}

	.checkbox-line label {
		font-size: 0.85rem;
		color: var(--fg, #e2e8f0);
		line-height: 1.4;
		cursor: pointer;
	}

	.action-btn {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: #6366f1;
		color: #ffffff;
		border: none;
		border-radius: 6px;
		padding: 0.55rem 1.1rem;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.action-btn:hover:not(:disabled) {
		background: #4f46e5;
	}

	.action-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.liabilities-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.liability-item {
		background: var(--surface-2, #181c26);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: 8px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.liability-item.remediated {
		border-color: #10b981;
		background: rgba(16, 185, 129, 0.04);
	}

	.liability-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.distortion-badge {
		font-family: monospace;
		font-size: 0.72rem;
		background: rgba(239, 68, 68, 0.15);
		color: #f87171;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		font-weight: 600;
	}

	.liability-label {
		font-size: 0.88rem;
		color: var(--fg, #f1f5f9);
		font-weight: 500;
		flex: 1;
	}

	.status-pill {
		font-size: 0.72rem;
		font-family: monospace;
		padding: 0.2rem 0.5rem;
		border-radius: 9999px;
		background: #374151;
		color: #9ca3af;
	}

	.status-pill.pill-done {
		background: rgba(16, 185, 129, 0.2);
		color: #34d399;
	}

	.refactor-input-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.input-label {
		font-size: 0.8rem;
		color: #94a3b8;
	}

	.refactor-textarea {
		background: var(--surface-3, #222736);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: 6px;
		padding: 0.6rem;
		color: var(--fg, #f8fafc);
		font-family: inherit;
		font-size: 0.88rem;
		line-height: 1.4;
		resize: vertical;
	}

	.submit-refactor-btn {
		align-self: flex-end;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: #1f2937;
		border: 1px solid #374151;
		color: #e5e7eb;
		border-radius: 4px;
		padding: 0.35rem 0.75rem;
		font-size: 0.78rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.submit-refactor-btn:hover {
		background: #374151;
		border-color: #4b5563;
	}

	.amends-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background: var(--surface-2, #181c26);
		padding: 1.25rem;
		border-radius: 8px;
		border: 1px solid var(--ui-border, #2a2e3d);
	}

	.stakeholder-summary {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		font-size: 0.85rem;
		color: #cbd5e1;
		background: rgba(0, 0, 0, 0.2);
		padding: 0.75rem;
		border-radius: 6px;
	}

	.amends-action-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.protocol-status-badge {
		font-family: monospace;
		font-size: 0.8rem;
		padding: 0.3rem 0.75rem;
		border-radius: 6px;
	}

	.status-pending_submission {
		background: #374151;
		color: #d1d5db;
	}

	.status-submitted {
		background: rgba(59, 130, 246, 0.2);
		color: #60a5fa;
	}

	.status-verified_by_agent {
		background: rgba(16, 185, 129, 0.2);
		color: #34d399;
	}

	.friction-queue {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.queue-title {
		margin: 0;
		font-size: 0.85rem;
		color: #94a3b8;
	}

	.friction-card {
		background: var(--surface-2, #181c26);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: 6px;
		padding: 0.9rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.friction-card.resolved {
		border-color: #10b981;
		background: rgba(16, 185, 129, 0.04);
	}

	.friction-meta {
		display: flex;
		justify-content: space-between;
		font-size: 0.78rem;
	}

	.friction-source {
		color: #f59e0b;
		font-family: monospace;
	}

	.friction-tenet {
		color: #a5b4fc;
	}

	.friction-scenario {
		margin: 0;
		font-size: 0.88rem;
		color: var(--fg, #f1f5f9);
	}

	.resolve-btn {
		align-self: flex-start;
		background: #2563eb;
		color: #ffffff;
		border: none;
		border-radius: 4px;
		padding: 0.4rem 0.85rem;
		font-size: 0.78rem;
		font-weight: 500;
		cursor: pointer;
	}

	.resolve-btn:hover {
		background: #1d4ed8;
	}

	.resolved-tag {
		font-family: monospace;
		font-size: 0.78rem;
		color: #10b981;
		font-weight: 600;
	}
</style>
