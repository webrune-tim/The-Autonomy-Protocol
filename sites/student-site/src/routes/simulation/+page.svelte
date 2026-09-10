<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { PUBLIC_WEBMCP_ORIGIN_TRIAL_TOKEN } from '$app/env/public';
	import {
		webMcpClient,
		simulationEngine,
		WebMcpStatusBanner,
		StateMachineVisualizer,
		StudentWorkbenchControls,
		EvaluatorAgentHarness,
		AgentTelemetryConsole,
		SocraticSimulator
	} from '#lib';
	import { Shield, BookOpen, Layers, Sparkles, MessageSquareQuote } from '@lucide/svelte';

	let activeLab = $state<'accountability' | 'socratic'>('accountability');

	onMount(async () => {
		// Set Origin Trial token from environment if available
		if (PUBLIC_WEBMCP_ORIGIN_TRIAL_TOKEN) {
			webMcpClient.injectOriginTrial(PUBLIC_WEBMCP_ORIGIN_TRIAL_TOKEN);
		}

		// Register the 9 Autonomy Protocol WebMCP tools
		await simulationEngine.registerWebMcpTools();
	});

	onDestroy(() => {
		// Clean up tool registrations via AbortController
		webMcpClient.unregisterAll();
	});
</script>

<svelte:head>
	<title>WebMCP Practicum | Agentic Evaluation & Epistemic Autonomy Simulation</title>
	<meta
		name="description"
		content="Interactive agent-driven simulation for collegiate executive functioning, psychological literacy, and Socratic epistemic autonomy via Google WebMCP."
	/>
</svelte:head>

<div class="practicum-container">
	<!-- Top Navigation Breadcrumb / Hero Header -->
	<header class="practicum-header">
		<div class="header-badge">
			<Layers size={14} />
			<span>CTE Capstone Practicum 03 & 04 • WebMCP Experimental Lab</span>
		</div>
		<h1 class="header-title">Agentic Evaluation & Epistemic Autonomy Lab</h1>
		<p class="header-abstract">
			Transitioning high school students from external behavioral policing to internal self-governance through dynamic, agent-actuated simulation. Using the standard <strong>WebMCP (Web Model Context Protocol)</strong>, autonomous evaluator agents audit student cognitive refactoring, verify restorative restitution protocols, and evaluate dialectical rigor in Socratic inquiry.
		</p>
	</header>

	<!-- WebMCP Status & Origin Trial Banner -->
	<WebMcpStatusBanner />

	<!-- Lab Switcher Navigation -->
	<nav class="lab-nav" aria-label="WebMCP Simulation Labs">
		<button
			type="button"
			class="lab-tab-btn"
			class:active={activeLab === 'accountability'}
			onclick={() => (activeLab = 'accountability')}
		>
			<Shield size={16} />
			<div class="tab-text">
				<span class="tab-title">Accountability Cycle Lab</span>
				<span class="tab-desc">Internal Regulation & Restorative Practice</span>
			</div>
		</button>

		<button
			type="button"
			class="lab-tab-btn"
			class:active={activeLab === 'socratic'}
			onclick={() => (activeLab = 'socratic')}
		>
			<MessageSquareQuote size={16} />
			<div class="tab-text">
				<span class="tab-title">Epistemic Autonomy Lab</span>
				<span class="tab-desc">Socratic Inquiry & Primary-Source Forensics</span>
			</div>
		</button>
	</nav>

	{#if activeLab === 'accountability'}
		<!-- State Machine Visualizer (Accountability Cycle) -->
		<StateMachineVisualizer />
	{/if}

	<!-- Desktop Two-Column Operational Grid -->
	<div class="simulation-grid">
		<div class="grid-column left-deck">
			{#if activeLab === 'accountability'}
				<StudentWorkbenchControls />
			{:else}
				<SocraticSimulator />
			{/if}
		</div>
		<div class="grid-column right-deck">
			<EvaluatorAgentHarness />
			<AgentTelemetryConsole />
		</div>
	</div>
</div>

<style>
	.practicum-container {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: var(--gap-1, 1rem) 0 var(--gap-4, 3rem) 0;
		display: flex;
		flex-direction: column;
		gap: var(--gap-2, 1.5rem);
	}

	.practicum-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.header-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: monospace;
		font-size: 0.78rem;
		color: #818cf8;
		background: rgba(99, 102, 241, 0.12);
		border: 1px solid rgba(99, 102, 241, 0.3);
		padding: 0.25rem 0.65rem;
		border-radius: 9999px;
		width: fit-content;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.header-title {
		margin: 0;
		font-size: clamp(1.6rem, 3vw, 2.25rem);
		font-weight: 800;
		color: var(--fg, #f8fafc);
		letter-spacing: -0.02em;
		line-height: 1.2;
	}

	.header-abstract {
		margin: 0;
		font-size: 0.98rem;
		line-height: 1.6;
		color: var(--text-muted, #94a3b8);
		max-width: 1050px;
	}

	.header-abstract strong {
		color: #e2e8f0;
	}

	.lab-nav {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		margin: 0.25rem 0;
	}

	@media (min-width: 640px) {
		.lab-nav {
			grid-template-columns: 1fr 1fr;
		}
	}

	.lab-tab-btn {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		background: var(--bg-surface, #1e293b);
		border: 1px solid var(--border, #334155);
		border-radius: 8px;
		padding: 0.85rem 1.15rem;
		cursor: pointer;
		text-align: left;
		color: var(--text-muted, #94a3b8);
		transition: all 0.2s ease;
	}

	.lab-tab-btn:hover {
		border-color: #6366f1;
		color: var(--fg, #f8fafc);
	}

	.lab-tab-btn.active {
		background: rgba(99, 102, 241, 0.12);
		border-color: #818cf8;
		color: #f8fafc;
		box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.4);
	}

	.tab-text {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.tab-title {
		font-size: 0.95rem;
		font-weight: 700;
		color: inherit;
	}

	.tab-desc {
		font-size: 0.78rem;
		color: var(--text-muted, #94a3b8);
	}

	.simulation-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--gap-2, 1.5rem);
		align-items: start;
	}

	.grid-column {
		display: flex;
		flex-direction: column;
		gap: var(--gap-2, 1.5rem);
	}

	@media (min-width: 1024px) {
		.simulation-grid {
			grid-template-columns: 1.15fr 1fr;
		}
	}
</style>
