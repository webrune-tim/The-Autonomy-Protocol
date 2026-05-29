<script lang="ts">
	import {
		CircleAlert,
		DollarSign,
		Layers,
		Milestone,
		ShieldCheck,
		X
	} from '@lucide/svelte'
	import { enhance } from '$app/forms'

	// 1. Props & State
	let { form } = $props()
	let custom_amount = $state('')
	let dismissed = $state(false)

	// 2. Reactive text logic
	let dynamicText = $derived.by(() => {
		const val = Number(custom_amount)
		if (!custom_amount || val <= 0) return 'Build the Future'
		if (val < 25) return 'Scale your impact to $25?'
		if (val > 500) return 'Our server just high-fived itself.'
		return `Invest $${val} in the Protocol`
	})

	// 3. Reset error visibility on new form results
	$effect(() => {
		if (form) dismissed = false
	})
</script>

<h2>Choose your Impact</h2>

<form method="POST" action="?/donate" use:enhance class="donations-list">
	<button type="submit" name="amount" value="25" class="cta-donate">
		<Layers /> $25 - The Individual Inventory
	</button>

	<button type="submit" name="amount" value="100" class="cta-donate">
		<ShieldCheck /> $100 - The Integrity Shield
	</button>

	<button type="submit" name="amount" value="500" class="cta-donate">
		<Milestone /> $500 - The Foundation Pillar
	</button>

	<div class="cta-donate custom-container">
		<DollarSign />
		<input
			type="number"
			inputmode="numeric"
			class="custom-amount"
			bind:value={custom_amount}
			placeholder="1"
			min="1"
			onkeydown={(e) => {
				// Allow natural submission on Enter key
				if (e.key === 'Enter' && (!custom_amount || Number(custom_amount) <= 0)) {
					e.preventDefault()
				}
			}}
		/>

		<button type="submit" name="amount" value={custom_amount} class="submit-trigger">
			-&nbsp;<span class="dynamic-text">{dynamicText}</span>
		</button>
	</div>

	{#if form?.error && !dismissed}
		<div class="system-error">
			<CircleAlert size={18} />
			<span>{form.message}</span>
			<button
				type="button"
				class="close-error"
				onclick={() => (dismissed = true)}
				aria-label="Dismiss alert"
			>
				<X size={16} />
			</button>
		</div>
	{/if}
</form>

<style>
	.donations-list {
		display: flex;
		flex-direction: column;
		gap: var(--gap-1, 1rem);
	}

	/* Inherit existing cta-donate styles */
	.cta-donate {
		display: inline-flex;
		align-items: center;
		max-width: fit-content;
		gap: 0.5rem;
		padding: var(--gap-1);
		margin-right: var(--gap-1);
		font-size: var(--font-size-4);
		border-radius: 100px;
		border: clamp(2px, 4svw, 4px) solid var(--brand-secondary);
		background-color: var(--brand-secondary);
		color: var(--brand-secondary-contrast) !important;
		font-weight: 700;
		box-shadow: 0 4px 0px oklch(from var(--brand-secondary) calc(l - 0.25) c h);
		transition:
			transform 100ms ease,
			box-shadow 100ms ease;
		cursor: pointer;

		@media (max-width: 600px) {
			margin-bottom: var(--gap-1);
			width: 100%;
			justify-content: center;
		}

		&:hover,
		&:focus-within {
			background-color: oklch(from var(--brand-secondary) calc(l + 0.3) c h);
			border-color: oklch(from var(--brand-secondary) calc(l + 0.3) c h);
			transform: translateY(-2px);
			box-shadow: 0 6px 0px oklch(from var(--brand-secondary) calc(l - 0.3) c h);
		}

		&:active {
			transform: translateY(2px);
			box-shadow: 0 2px 0px oklch(from var(--brand-secondary) calc(l - 0.2) c h);
		}
	}

	/* Specific fixes for the div-based custom button */
	.custom-container {
		cursor: default; /* Arrow cursor for the container, pointer for the submit part */
	}

	.submit-trigger {
		background: transparent;
		border: none;
		color: inherit;
		font: inherit;
		padding: 0;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
	}

	.custom-amount {
		width: 8ch;
		background: rgb(from var(--bg) r g b / 0.5);
		color: var(--fg);
		border: 2px solid var(--bg);
		border-radius: 4px;
		padding: 0.1rem 0.4rem;
		font-weight: bold;
		outline: none;

		&::placeholder {
			color: var(--fg);
			opacity: 0.6;
		}
	}

	.dynamic-text {
		display: inline-block;
		max-width: 35ch;
		font-size: var(--font-size-4);
		color: inherit;
		margin: 0;
	}

	.system-error {
		display: flex;
		align-items: center;
		gap: var(--gap-1);
		margin-top: var(--gap-1);
		padding: 0.75rem 1rem;
		background: var(--error-bg);
		color: var(--error-fg);
		border: 2px solid var(--error-border);
		border-radius: var(--border-radius, 8px);
		font-weight: 600;
		font-size: var(--font-size-3);
		max-width: fit-content;
		animation: reveal 0.2s ease-out;
		position: relative;

		span {
			color: inherit;
		}
	}

	.close-error {
		background: transparent;
		border: none;
		color: inherit;
		cursor: pointer;
		display: flex;
		padding: 4px;
		margin-left: 0.5rem;
		border-radius: 4px;
		opacity: 0.7;
		transition:
			opacity 0.2s,
			background-color 0.2s;
	}

	.close-error:hover {
		opacity: 1;
		background-color: rgba(255, 255, 255, 0.1);
	}

	@keyframes reveal {
		from {
			opacity: 0;
			transform: translateY(-5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
