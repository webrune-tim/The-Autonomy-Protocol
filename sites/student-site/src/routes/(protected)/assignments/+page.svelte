<script lang="ts">
	import type { PageProps } from './$types';
	import { Bot, ArrowRight, CheckCircle2, Terminal, Shield, Zap } from '@lucide/svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Assignments & Applied Practicums | The Autonomy Protocol</title>
</svelte:head>

<div class="assignments-container">
	<header class="page-header">
		<div class="badge">
			<Bot size={14} />
			<span>Dynamic Assessment Framework</span>
		</div>
		<h1 class="page-title">Assignments & Proof of Competency</h1>
		<p class="page-subtitle">
			Collegiate practicums replace rote memorization with observable behavioral simulations. Complete state machine audits evaluated in real time by autonomous WebMCP agents.
		</p>
	</header>

	<!-- Featured WebMCP Practicum Card -->
	<section class="featured-practicum-card">
		<div class="practicum-content">
			<div class="featured-tag">
				<Zap size={14} />
				<span>Google WebMCP Experimental Practicum</span>
			</div>
			<h2 class="practicum-title">Agentic Evaluation & Self-Paced Proof of Competency</h2>
			<p class="practicum-desc">
				Engage with the interactive <strong>Accountability Cycle</strong> state machine. Resolve environmental friction, submit cognitive liability refactorings, formulate action-based Amends Protocols, and receive automated proctor verification via standard WebMCP tools.
			</p>

			<div class="practicum-meta">
				<span>Pathway: <strong>CTE Computer Science & Engineering</strong></span>
				<span>Standard: <strong>Chromium WebMCP / document.modelContext</strong></span>
				<span>Status: <strong>Interactive Lab Ready</strong></span>
			</div>

			<div class="card-actions">
				<a href="/simulation" class="launch-btn">
					<span>Launch WebMCP Simulation Lab</span>
					<ArrowRight size={16} />
				</a>
			</div>
		</div>

		<div class="practicum-preview">
			<div class="terminal-mock">
				<div class="mock-header">
					<span class="dot red"></span>
					<span class="dot yellow"></span>
					<span class="dot green"></span>
					<span class="mock-title">webmcp-agent.log</span>
				</div>
				<pre class="mock-code"><code>&gt; navigator.modelContext.getTools()
[
  "get_student_competency_profile",
  "inspect_state_machine",
  "audit_cognitive_alignment",
  "verify_amends_protocol",
  "record_proof_of_competency"
]
&gt; tools/call: inspect_state_machine
[STATE]: INTERNAL_AUDIT
[LIABILITIES]: 3 detected
&gt; Autonomous Proctor: VERIFIED</code></pre>
			</div>
		</div>
	</section>
</div>

<style>
	.assignments-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--gap-2, 1.5rem) 0;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.page-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: monospace;
		font-size: 0.75rem;
		color: #818cf8;
		background: rgba(99, 102, 241, 0.12);
		border: 1px solid rgba(99, 102, 241, 0.3);
		padding: 0.25rem 0.65rem;
		border-radius: 9999px;
		width: fit-content;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.page-title {
		margin: 0;
		font-size: clamp(1.6rem, 3vw, 2.2rem);
		font-weight: 800;
		color: var(--fg, #f8fafc);
	}

	.page-subtitle {
		margin: 0;
		font-size: 0.95rem;
		color: var(--text-muted, #94a3b8);
		max-width: 800px;
		line-height: 1.6;
	}

	.featured-practicum-card {
		background: var(--surface-1, #12141a);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: 12px;
		padding: 2rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		box-shadow: 0 4px 25px rgba(0, 0, 0, 0.3);
	}

	@media (min-width: 900px) {
		.featured-practicum-card {
			grid-template-columns: 1.2fr 1fr;
			align-items: center;
		}
	}

	.practicum-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.featured-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: monospace;
		font-size: 0.75rem;
		color: #38bdf8;
		background: rgba(56, 189, 248, 0.1);
		border: 1px solid rgba(56, 189, 248, 0.25);
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		width: fit-content;
	}

	.practicum-title {
		margin: 0;
		font-size: 1.35rem;
		font-weight: 700;
		color: var(--fg, #f8fafc);
		line-height: 1.3;
	}

	.practicum-desc {
		margin: 0;
		font-size: 0.92rem;
		color: var(--text-muted, #94a3b8);
		line-height: 1.6;
	}

	.practicum-meta {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		font-size: 0.82rem;
		color: #94a3b8;
		padding: 0.75rem 0;
	}

	.practicum-meta strong {
		color: #e2e8f0;
	}

	.launch-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: #6366f1;
		color: #ffffff;
		padding: 0.65rem 1.25rem;
		border-radius: 6px;
		font-weight: 600;
		font-size: 0.88rem;
		text-decoration: none;
		transition: background 0.2s ease, transform 0.1s ease;
	}

	.launch-btn:hover {
		background: #4f46e5;
		text-decoration: none;
		transform: translateY(-1px);
	}

	.practicum-preview {
		display: flex;
		justify-content: center;
	}

	.terminal-mock {
		background: #090c12;
		border: 1px solid #1e2433;
		border-radius: 8px;
		width: 100%;
		max-width: 440px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
		overflow: hidden;
	}

	.mock-header {
		background: #121622;
		padding: 0.5rem 0.85rem;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		border-bottom: 1px solid #1e2433;
	}

	.dot {
		width: 9px;
		height: 9px;
		border-radius: 50%;
	}

	.dot.red { background: #ef4444; }
	.dot.yellow { background: #f59e0b; }
	.dot.green { background: #10b981; }

	.mock-title {
		font-family: monospace;
		font-size: 0.72rem;
		color: #64748b;
		margin-left: 0.5rem;
	}

	.mock-code {
		margin: 0;
		padding: 1rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.78rem;
		color: #38bdf8;
		line-height: 1.5;
	}
</style>