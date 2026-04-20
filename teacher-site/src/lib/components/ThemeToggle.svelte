<script lang="ts">
	import { themeState } from '$stores/theme.svelte.ts'
	import Pill from './Pill.svelte';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Monitor from '@lucide/svelte/icons/monitor';

	const options = [
		{ id: 'light', icon: Sun, label: 'Light' },
		{ id: 'system', icon: Monitor, label: 'System' },
		{ id: 'dark', icon: Moon, label: 'Dark' }
	] as const;
</script>

<Pill>
	<div class="toggle-container">
		{#each options as { id, icon: Icon, label }}
			<button
				class="icon-button"
				class:active={themeState.value === id}
				onclick={() => (themeState.value = id)}
				aria-label="Set theme to {label}"
			>
				<Icon size={14} strokeWidth={2.5} />
			</button>
		{/each}
	</div>
</Pill>

<style>
	.toggle-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.icon-button {
		display: grid;
		place-content: center;
		background: none;
		border: none;
		padding: 0.25rem;
		cursor: pointer;
		color: var(--brand-blue);
		opacity: 0.65;
		transition: all 0.2s ease;
		border-radius: 50%;
	}

	.icon-button:hover {
		opacity: 0.8;
		background-color: rgb(from var(--brand-orange) r g b / 0.1);
	}

	.icon-button.active {
		opacity: 1;
		color: var(--brand-orange);
		background-color: rgb(from var(--brand-orange) r g b / 0.15);
	}
</style>