<script lang="ts">
	import { simulationEngine } from '#lib/webmcp/simulationEngine.svelte';
	import type { AccountabilityCyclePhase } from '#lib/webmcp/types';
	import { Compass, Search, Wrench, Shield, CheckCircle2, ArrowRight } from '@lucide/svelte';

	const phases: { id: AccountabilityCyclePhase; title: string; stepRange: string; icon: any; description: string }[] = [
		{
			id: 'ORIENTATION',
			title: 'Orientation',
			stepRange: 'Steps 1–3',
			icon: Compass,
			description: 'Limits of Control, Objective Standard Committal'
		},
		{
			id: 'INTERNAL_AUDIT',
			title: 'Internal Audit',
			stepRange: 'Steps 4–7',
			icon: Search,
			description: 'Cognitive Liabilities & Distortions Inventory'
		},
		{
			id: 'RESTORATIVE_PRACTICE',
			title: 'Restorative Practice',
			stepRange: 'Steps 8–9',
			icon: Wrench,
			description: 'Action-Based Amends Protocol Execution'
		},
		{
			id: 'MAINTENANCE_LEADERSHIP',
			title: 'Maintenance & Leadership',
			stepRange: 'Steps 10–12',
			icon: Shield,
			description: 'Daily Cognitive Inventory & Real-Time De-escalation'
		}
	];

	function isPhasePast(phaseId: AccountabilityCyclePhase): boolean {
		const order: AccountabilityCyclePhase[] = ['ORIENTATION', 'INTERNAL_AUDIT', 'RESTORATIVE_PRACTICE', 'MAINTENANCE_LEADERSHIP'];
		const currentIndex = order.indexOf(simulationEngine.currentPhase);
		const phaseIndex = order.indexOf(phaseId);
		return phaseIndex < currentIndex;
	}

	function isPhaseActive(phaseId: AccountabilityCyclePhase): boolean {
		return simulationEngine.currentPhase === phaseId;
	}
</script>

<div class="state-visualizer-card">
	<div class="card-header">
		<div class="header-titles">
			<h3 class="card-title">The Accountability Cycle</h3>
			<span class="sub-label">Observable State Machine (Internal Regulation)</span>
		</div>
		<div class="active-pill">
			<span>Active Node:</span>
			<strong>{simulationEngine.currentPhase}</strong>
		</div>
	</div>

	<div class="pipeline-track">
		{#each phases as phase, idx (phase.id)}
			{@const active = isPhaseActive(phase.id)}
			{@const completed = isPhasePast(phase.id)}
			{@const Icon = phase.icon}

			<div class="phase-node" class:active class:completed>
				<div class="node-icon-wrapper">
					{#if completed}
						<CheckCircle2 size={20} class="completed-icon" />
					{:else}
						<Icon size={20} />
					{/if}
				</div>
				<div class="node-content">
					<div class="node-step-tag">{phase.stepRange}</div>
					<h4 class="node-title">{phase.title}</h4>
					<p class="node-desc">{phase.description}</p>
				</div>

				{#if active}
					<div class="active-badge">AGENT PROCTOR TARGET</div>
				{/if}
			</div>

			{#if idx < phases.length - 1}
				<div class="track-connector" class:filled={completed}>
					<ArrowRight size={16} />
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.state-visualizer-card {
		background: var(--surface-1, #12141a);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: var(--border-radius, 8px);
		padding: var(--gap-2, 1.5rem);
		margin-bottom: var(--gap-2, 1.5rem);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.card-title {
		margin: 0;
		font-size: 1.15rem;
		font-family: monospace;
		font-weight: 700;
		color: var(--fg, #f8fafc);
	}

	.sub-label {
		font-size: 0.8rem;
		color: var(--text-muted, #94a3b8);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.active-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid #6366f1;
		color: #a5b4fc;
		padding: 0.35rem 0.85rem;
		border-radius: 9999px;
		font-size: 0.82rem;
		font-family: monospace;
	}

	.active-pill strong {
		color: #ffffff;
	}

	.pipeline-track {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
		gap: 1rem;
		align-items: stretch;
	}

	.phase-node {
		position: relative;
		background: var(--surface-2, #181c26);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: 8px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		transition: all 0.25s ease;
	}

	.phase-node.active {
		border-color: #6366f1;
		background: rgba(99, 102, 241, 0.08);
		box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
	}

	.phase-node.completed {
		border-color: #10b981;
		background: rgba(16, 185, 129, 0.05);
	}

	.node-icon-wrapper {
		width: 36px;
		height: 36px;
		border-radius: 6px;
		background: var(--surface-3, #222736);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-muted, #94a3b8);
	}

	.phase-node.active .node-icon-wrapper {
		background: #6366f1;
		color: #ffffff;
	}

	.phase-node.completed .node-icon-wrapper {
		background: #10b981;
		color: #ffffff;
	}

	.node-step-tag {
		font-family: monospace;
		font-size: 0.72rem;
		color: var(--text-muted, #94a3b8);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.node-title {
		margin: 0.2rem 0;
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--fg, #f8fafc);
	}

	.node-desc {
		margin: 0;
		font-size: 0.78rem;
		color: var(--text-muted, #94a3b8);
		line-height: 1.4;
	}

	.active-badge {
		margin-top: auto;
		font-family: monospace;
		font-size: 0.68rem;
		color: #a5b4fc;
		background: rgba(99, 102, 241, 0.2);
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		text-align: center;
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.track-connector {
		display: none;
	}

	@media (min-width: 1024px) {
		.pipeline-track {
			display: flex;
			align-items: stretch;
		}

		.phase-node {
			flex: 1;
		}

		.track-connector {
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--ui-border, #2a2e3d);
			padding: 0 0.25rem;
		}

		.track-connector.filled {
			color: #10b981;
		}
	}
</style>
