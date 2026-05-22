<script lang="ts">
	import { themeState } from './theme.svelte'
	import { Sun, Moon } from '@lucide/svelte'
	import { Pill } from '@autonomy/pill'

	const options = [
		{ id: 'light', icon: Sun, label: 'Light' },
		{ id: 'dark', icon: Moon, label: 'Dark' }
	] as const

	// 1. Initialize a reactive state variable for the view mode
	let isMobile = $state(false);

	// 2. Set up the effect to handle the media query listener safely on the client
	$effect(() => {
		const mediaQuery = window.matchMedia('(max-width: 699px)');
		
		// Set the initial value correctly on mount
		isMobile = mediaQuery.matches;

		// Listener function to catch updates on resize/orientation change
		const handler = (event: MediaQueryListEvent) => {
			isMobile = event.matches;
		};

		mediaQuery.addEventListener('change', handler);

		// Return a cleanup function to prevent memory leaks if the component unmounts
		return () => {
			mediaQuery.removeEventListener('change', handler);
		};
	});
</script>

<Pill>
	<div class="toggle-container">
		{#each options as { id, icon: Icon, label } (id)}
			<button
				class="icon-button"
				class:active={themeState.value === id}
				onclick={() => themeState.setTheme(id)}
				aria-label="Set theme to {label}"
			>
				<!-- 3. Reactively swap the icon size based on the state -->
				<Icon size={isMobile ? 20 : 14} strokeWidth={2.5} />
			</button>
		{/each}
	</div>
</Pill>

<style>
	.toggle-container {
		display: flex;
		align-items: center;
		gap: var(--gap-1);
	}

	.icon-button {
		display: grid;
		place-content: center;
		background: none;
		border: none;
		padding: 0.25rem;
		cursor: pointer;
		color: var(--brand-primary-light);
		opacity: 0.65;
		transition: all 0.2s ease;
		border-radius: 50%;
	}

	/* 4. Optional: Increase target padding on mobile for an even better touch target */
	@media (max-width: 699px) {
		.icon-button {
			padding: 0.5rem; 
		}
	}

	.icon-button:hover {
		opacity: 0.8;
		background-color: rgb(from var(--brand-secondary) r g b / 0.1);
	}

	.icon-button.active {
		opacity: 1;
		color: var(--brand-secondary);
		background-color: rgb(from var(--brand-secondary) r g b / 0.15);
	}
</style>
