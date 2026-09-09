<script lang="ts">
	import { simulationEngine } from '#lib/webmcp/simulationEngine.svelte';
	import { Terminal, Copy, Trash2 } from '@lucide/svelte';

	let copied = $state(false);

	function clearLogs() {
		simulationEngine.telemetryLogs = [];
	}

	function copyJsonLogs() {
		const json = JSON.stringify(simulationEngine.telemetryLogs, null, 2);
		navigator.clipboard.writeText(json).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 2000);
		});
	}
</script>

<div class="telemetry-card">
	<div class="telemetry-header">
		<div class="title-cluster">
			<Terminal size={18} class="term-icon" />
			<h3 class="telemetry-title">Agent Telemetry & WebMCP Call Stream</h3>
		</div>
		<div class="telemetry-controls">
			<button type="button" class="ctrl-btn" onclick={copyJsonLogs} title="Copy Raw JSON Log">
				<Copy size={14} />
				<span>{copied ? 'Copied!' : 'Export JSON'}</span>
			</button>
			<button type="button" class="ctrl-btn" onclick={clearLogs} title="Clear Stream">
				<Trash2 size={14} />
				<span>Clear</span>
			</button>
		</div>
	</div>

	<div class="log-stream">
		{#if simulationEngine.telemetryLogs.length === 0}
			<div class="empty-state">
				Awaiting WebMCP tool execution signals...
			</div>
		{:else}
			{#each simulationEngine.telemetryLogs as log (log.id)}
				<div class="log-entry" class:status-success={log.status === 'SUCCESS'} class:status-warning={log.status === 'WARNING'} class:status-error={log.status === 'ERROR'}>
					<span class="log-time">[{log.timestamp}]</span>
					<span class="log-caller caller-{log.caller.toLowerCase()}">[{log.caller}]</span>
					{#if log.toolName}
						<span class="log-tool">&lt;{log.toolName}&gt;</span>
					{/if}
					<span class="log-action">{log.action}</span>
					{#if log.payload && Object.keys(log.payload).length > 0}
						<pre class="log-json">{JSON.stringify(log.payload)}</pre>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.telemetry-card {
		background: #0d1017;
		border: 1px solid #242938;
		border-radius: var(--border-radius, 8px);
		padding: var(--gap-1, 1rem) var(--gap-2, 1.5rem);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
	}

	.telemetry-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #1e2433;
		padding-bottom: 0.6rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.title-cluster {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.telemetry-title {
		margin: 0;
		font-family: monospace;
		font-size: 0.92rem;
		font-weight: 600;
		color: #e2e8f0;
	}

	.telemetry-controls {
		display: flex;
		gap: 0.5rem;
	}

	.ctrl-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: #181d2a;
		border: 1px solid #2e364a;
		color: #94a3b8;
		padding: 0.25rem 0.6rem;
		border-radius: 4px;
		font-family: monospace;
		font-size: 0.75rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.ctrl-btn:hover {
		background: #242b3d;
		color: #f1f5f9;
		border-color: #4b5563;
	}

	.log-stream {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.78rem;
		max-height: 280px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding-right: 0.25rem;
	}

	.empty-state {
		color: #64748b;
		padding: 1.5rem;
		text-align: center;
		font-style: italic;
	}

	.log-entry {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding: 0.3rem 0.4rem;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.02);
		line-height: 1.4;
		word-break: break-word;
		flex-wrap: wrap;
	}

	.log-time {
		color: #64748b;
		font-size: 0.72rem;
	}

	.log-caller {
		font-weight: 700;
		font-size: 0.72rem;
	}

	.caller-evaluator_agent {
		color: #38bdf8;
	}

	.caller-student_workbench {
		color: #a855f7;
	}

	.caller-system {
		color: #eab308;
	}

	.log-tool {
		color: #10b981;
		font-weight: 600;
	}

	.log-action {
		color: #f1f5f9;
	}

	.log-json {
		margin: 0;
		padding: 0.2rem 0.4rem;
		background: #090c12;
		border-radius: 3px;
		color: #cbd5e1;
		font-size: 0.72rem;
		width: 100%;
	}

	.status-success {
		border-left: 3px solid #10b981;
	}

	.status-warning {
		border-left: 3px solid #f59e0b;
	}

	.status-error {
		border-left: 3px solid #ef4444;
	}
</style>
