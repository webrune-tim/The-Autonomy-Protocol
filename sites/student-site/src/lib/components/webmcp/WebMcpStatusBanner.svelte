<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_WEBMCP_ORIGIN_TRIAL_TOKEN } from '$app/env/public';
	import { webMcpClient } from '#lib/webmcp/client';
	import { simulationEngine } from '#lib/webmcp/simulationEngine.svelte';
	import { ShieldCheck, Cpu, Key, AlertCircle, RefreshCw, Terminal } from '@lucide/svelte';

	let isNative = $state(false);
	let tokenInput = $state(PUBLIC_WEBMCP_ORIGIN_TRIAL_TOKEN || '');
	let tokenInjected = $state(false);
	let showTokenModal = $state(false);

	onMount(() => {
		isNative = webMcpClient.isNativeSupported();
		if (tokenInput) {
			webMcpClient.injectOriginTrial(tokenInput);
			tokenInjected = true;
		}
	});

	function applyToken() {
		if (tokenInput.trim()) {
			webMcpClient.injectOriginTrial(tokenInput.trim());
			tokenInjected = true;
			isNative = webMcpClient.isNativeSupported();
		}
	}
</script>

<div class="webmcp-banner">
	<div class="banner-main">
		<div class="status-indicator">
			<div class="pulse-dot" class:native-active={isNative} class:emulated-active={!isNative}></div>
			<div class="status-meta">
				<div class="status-title">
					<Cpu size={18} />
					<span>WebMCP Runtime: {isNative ? 'Native Chrome (document.modelContext)' : 'Proctor Mode (Managed Early Preview)'}</span>
				</div>
				<p class="status-subtitle">
					{#if isNative}
						Directly integrated with Chromium Model Context Protocol. AI agents can actuate via native tool discovery.
					{:else}
						Running progressive enhancement harness. To enable native browser binding, activate <code>chrome://flags/#enable-webmcp-testing</code>.
					{/if}
				</p>
			</div>
		</div>

		<div class="banner-actions">
			<div class="metrics-chip">
				<Terminal size={14} />
				<span><strong>{simulationEngine.registeredToolsCount}</strong> WebMCP Tools Active</span>
			</div>

			<button
				type="button"
				class="token-btn"
				class:token-active={tokenInjected}
				onclick={() => (showTokenModal = !showTokenModal)}
			>
				<Key size={14} />
				<span>Origin Trial Token: {tokenInjected ? 'Configured' : 'Set Token'}</span>
			</button>
		</div>
	</div>

	{#if showTokenModal}
		<div class="token-config-box">
			<div class="token-header">
				<ShieldCheck size={16} />
				<h4>Origin Trial Token Configuration</h4>
			</div>
			<p class="token-desc">
				WebMCP is participating in Chrome Origin Trials (Chrome 146+). Set your origin-signed trial token for <code>{typeof window !== 'undefined' ? window.location.hostname : 'the-autonomy-protocol-student.vercel.app'}</code> below:
			</p>
			<div class="token-input-row">
				<input
					type="text"
					class="token-input"
					bind:value={tokenInput}
					placeholder="Paste Origin Trial Base64 Token or Domain identifier..."
				/>
				<button type="button" class="apply-token-btn" onclick={applyToken}>
					<RefreshCw size={14} />
					Apply Token
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.webmcp-banner {
		background: var(--surface-1, #12141a);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: var(--border-radius, 8px);
		padding: var(--gap-1, 1rem) var(--gap-2, 1.5rem);
		margin-bottom: var(--gap-2, 1.5rem);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
	}

	.banner-main {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--gap-2, 1.5rem);
		flex-wrap: wrap;
	}

	.status-indicator {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
	}

	.pulse-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		margin-top: 4px;
		flex-shrink: 0;
	}

	.pulse-dot.native-active {
		background: #10b981;
		box-shadow: 0 0 10px #10b981;
	}

	.pulse-dot.emulated-active {
		background: #6366f1;
		box-shadow: 0 0 10px #6366f1;
	}

	.status-meta {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.status-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: monospace;
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--fg, #f1f5f9);
	}

	.status-subtitle {
		margin: 0;
		font-size: 0.82rem;
		color: var(--text-muted, #94a3b8);
	}

	.status-subtitle code {
		background: var(--surface-2, #1e2230);
		padding: 0.15rem 0.4rem;
		border-radius: 4px;
		color: #38bdf8;
		font-size: 0.8em;
	}

	.banner-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.metrics-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: var(--surface-2, #1e2230);
		border: 1px solid var(--ui-border, #2a2e3d);
		padding: 0.35rem 0.75rem;
		border-radius: 6px;
		font-family: monospace;
		font-size: 0.82rem;
		color: var(--fg, #f1f5f9);
	}

	.metrics-chip strong {
		color: #38bdf8;
	}

	.token-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: transparent;
		border: 1px solid var(--ui-border, #2a2e3d);
		color: var(--text-muted, #94a3b8);
		padding: 0.35rem 0.75rem;
		border-radius: 6px;
		font-size: 0.82rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.token-btn:hover,
	.token-btn.token-active {
		border-color: #6366f1;
		color: #a5b4fc;
		background: rgba(99, 102, 241, 0.1);
	}

	.token-config-box {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--ui-border, #2a2e3d);
	}

	.token-header {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		color: #a5b4fc;
		margin-bottom: 0.3rem;
	}

	.token-header h4 {
		margin: 0;
		font-size: 0.9rem;
	}

	.token-desc {
		margin: 0 0 0.75rem 0;
		font-size: 0.8rem;
		color: var(--text-muted, #94a3b8);
	}

	.token-input-row {
		display: flex;
		gap: 0.5rem;
	}

	.token-input {
		flex: 1;
		background: var(--surface-2, #1e2230);
		border: 1px solid var(--ui-border, #2a2e3d);
		border-radius: 6px;
		padding: 0.45rem 0.75rem;
		color: var(--fg, #f1f5f9);
		font-family: monospace;
		font-size: 0.85rem;
	}

	.token-input:focus {
		outline: none;
		border-color: #6366f1;
	}

	.apply-token-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: #6366f1;
		color: #ffffff;
		border: none;
		border-radius: 6px;
		padding: 0.45rem 0.9rem;
		font-size: 0.82rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.apply-token-btn:hover {
		background: #4f46e5;
	}
</style>
