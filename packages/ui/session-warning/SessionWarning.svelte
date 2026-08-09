<script lang="ts">
	import { ShieldAlert, Clock, LogOut, RefreshCw } from '@lucide/svelte';

	interface Props {
		user?: any;
		idleThresholdMinutes?: number;
		warningCountdownSeconds?: number;
		logoutEndpoint?: string;
	}

	let {
		user,
		idleThresholdMinutes = 14,
		warningCountdownSeconds = 60,
		logoutEndpoint = '/logout'
	}: Props = $props();

	let showModal = $state(false);
	let secondsRemaining = $state(0);

	let idleTimer: ReturnType<typeof setTimeout> | null = null;
	let countdownInterval: ReturnType<typeof setInterval> | null = null;
	let lastActivityTime = Date.now();
	let extendButtonEl = $state<HTMLButtonElement | null>(null);

	const idleMs = $derived(idleThresholdMinutes * 60 * 1000);

	function resetIdleTimer() {
		if (!user || showModal) return;

		lastActivityTime = Date.now();

		if (idleTimer) clearTimeout(idleTimer);
		idleTimer = setTimeout(() => {
			triggerWarning();
		}, idleMs);
	}

	function handleActivity() {
		// Throttle resets to max once per 2 seconds
		if (Date.now() - lastActivityTime > 2000) {
			resetIdleTimer();
		}
	}

	function triggerWarning() {
		showModal = true;
		secondsRemaining = warningCountdownSeconds;

		if (countdownInterval) clearInterval(countdownInterval);

		countdownInterval = setInterval(() => {
			secondsRemaining -= 1;
			if (secondsRemaining <= 0) {
				executeLogout();
			}
		}, 1000);
	}

	function extendSession() {
		if (countdownInterval) clearInterval(countdownInterval);
		showModal = false;
		secondsRemaining = warningCountdownSeconds;
		resetIdleTimer();
	}

	function executeLogout() {
		if (countdownInterval) clearInterval(countdownInterval);
		if (idleTimer) clearTimeout(idleTimer);
		showModal = false;

		// Perform form POST submit to trigger SvelteKit /logout server action cleanly
		const form = document.createElement('form');
		form.method = 'POST';
		form.action = logoutEndpoint;
		document.body.appendChild(form);
		form.submit();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!showModal) return;
		if (event.key === 'Escape' || event.key === 'Enter') {
			event.preventDefault();
			extendSession();
		}
	}

	$effect(() => {
		if (!user) {
			if (idleTimer) clearTimeout(idleTimer);
			if (countdownInterval) clearInterval(countdownInterval);
			showModal = false;
			return;
		}

		resetIdleTimer();

		const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
		events.forEach((evt) => window.addEventListener(evt, handleActivity, { passive: true }));
		window.addEventListener('keydown', handleKeydown);

		return () => {
			if (idleTimer) clearTimeout(idleTimer);
			if (countdownInterval) clearInterval(countdownInterval);
			events.forEach((evt) => window.removeEventListener(evt, handleActivity));
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	$effect(() => {
		if (showModal && extendButtonEl) {
			extendButtonEl.focus();
		}
	});

	const progressPercentage = $derived(
		Math.max(0, Math.min(100, (secondsRemaining / warningCountdownSeconds) * 100))
	);
</script>

{#if showModal}
	<div class="session-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="session-modal-title">
		<div class="session-modal-card">
			<div class="modal-header">
				<div class="icon-wrapper">
					<ShieldAlert class="warning-icon" size={28} />
				</div>
				<div>
					<h2 id="session-modal-title">Executive Functioning Notice</h2>
					<p class="subtitle">Session Activity Verification</p>
				</div>
			</div>

			<div class="modal-body">
				<p>
					Inactivity detected. To preserve your learning state and maintain cognitive security,
					your active session will automatically terminate unless confirmed.
				</p>

				<div class="timer-container">
					<div class="timer-circle">
						<svg class="progress-ring" width="80" height="80">
							<circle class="progress-ring-bg" cx="40" cy="40" r="34" />
							<circle
								class="progress-ring-fill"
								cx="40"
								cy="40"
								r="34"
								style="stroke-dashoffset: {213 - (213 * progressPercentage) / 100}"
							/>
						</svg>
						<div class="timer-text">
							<Clock size={16} />
							<span class="seconds">{secondsRemaining}s</span>
						</div>
					</div>
					<div class="countdown-description">
						<p class="countdown-label">Time Remaining</p>
						<p class="countdown-sub">Requires explicit interaction to maintain session</p>
					</div>
				</div>
			</div>

			<div class="modal-actions">
				<button
					bind:this={extendButtonEl}
					class="btn-primary"
					onclick={extendSession}
					type="button"
				>
					<RefreshCw size={18} />
					<span>Extend Session / I'm Still Here</span>
				</button>
				<button class="btn-secondary" onclick={executeLogout} type="button">
					<LogOut size={18} />
					<span>Log Out Now</span>
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.session-modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--gap-2, 1.5rem);
		background: rgba(10, 12, 16, 0.82);
		backdrop-filter: blur(8px);
		animation: fadeIn 200ms ease-out;
	}

	.session-modal-card {
		width: 100%;
		max-width: 480px;
		background: var(--surface-1, #1e222a);
		border: 1px solid var(--nord11, #bf616a);
		border-radius: var(--border-radius, 1rem);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
		padding: var(--gap-2, 1.5rem);
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		animation: slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1);
		color: var(--white, #eceff4);
	}

	.modal-header {
		display: flex;
		align-items: center;
		gap: 1rem;

		h2 {
			font-size: 1.15rem;
			font-weight: 700;
			margin: 0;
			color: var(--white, #eceff4);
			letter-spacing: -0.01em;
		}

		.subtitle {
			font-size: 0.825rem;
			color: var(--nord13, #ebcb8b);
			margin: 0.15rem 0 0 0;
			text-transform: uppercase;
			letter-spacing: 0.08em;
			font-weight: 600;
		}
	}

	.icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: rgba(191, 97, 106, 0.18);
		color: var(--nord11, #bf616a);
		flex-shrink: 0;
		border: 1px solid rgba(191, 97, 106, 0.35);
	}

	.modal-body {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		p {
			font-size: 0.925rem;
			line-height: 1.5;
			color: var(--nord4, #d8dee9);
			margin: 0;
		}
	}

	.timer-container {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		background: rgba(0, 0, 0, 0.25);
		border-radius: 0.75rem;
		padding: 0.85rem 1rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.timer-circle {
		position: relative;
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.progress-ring {
		transform: rotate(-90deg);

		circle {
			fill: transparent;
			stroke-width: 6;
		}

		.progress-ring-bg {
			stroke: rgba(255, 255, 255, 0.1);
		}

		.progress-ring-fill {
			stroke: var(--nord11, #bf616a);
			stroke-dasharray: 213;
			stroke-linecap: round;
			transition: stroke-dashoffset 1s linear;
		}
	}

	.timer-text {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: var(--white, #eceff4);

		.seconds {
			font-size: 1.1rem;
			font-weight: 800;
			font-variant-numeric: tabular-nums;
		}
	}

	.countdown-description {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;

		.countdown-label {
			font-size: 0.95rem;
			font-weight: 700;
			color: var(--white, #eceff4);
		}

		.countdown-sub {
			font-size: 0.8rem;
			color: var(--nord4, #d8dee9);
			opacity: 0.8;
		}
	}

	.modal-actions {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		margin-top: 0.25rem;
	}

	.btn-primary {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		width: 100%;
		padding: 0.85rem 1.25rem;
		background: var(--accent-1, var(--nord11, #bf616a));
		color: var(--white, #ffffff);
		border: none;
		border-radius: 0.5rem;
		font-size: 0.95rem;
		font-weight: 700;
		cursor: pointer;
		transition: background 150ms ease, transform 100ms ease;

		&:hover,
		&:focus-visible {
			background: oklch(from var(--accent-1, var(--nord11, #bf616a)) calc(l + 0.08) c h);
			outline: 2px solid var(--nord13, #ebcb8b);
			outline-offset: 2px;
		}

		&:active {
			transform: scale(0.98);
		}
	}

	.btn-secondary {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		width: 100%;
		padding: 0.75rem 1.25rem;
		background: transparent;
		color: var(--nord4, #d8dee9);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 150ms ease, border-color 150ms ease;

		&:hover,
		&:focus-visible {
			background: rgba(255, 255, 255, 0.06);
			border-color: var(--nord4, #d8dee9);
			outline: none;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(12px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
