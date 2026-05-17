<script lang="ts">
	let {
		threshold = 20, // percentage of page scrolled
		buttonBg = '#111111',
		textColor = '#ffffff',
		ringColor = '#3b82f6',
		ringWidth = 3
	} = $props();

	let visible = $state(false);

	// Reactive check for visibility threshold
	$effect(() => {
		const handleScroll = () => {
			const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrolled = (window.scrollY / scrollHeight) * 100;
			visible = scrolled >= threshold;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
</script>

{#if visible}
	<button
		class="scroll-to-top"
		onclick={scrollToTop}
		aria-label="Scroll to top"
		style:--btn-bg={buttonBg}
		style:--text-color={textColor}
		style:--ring-color={ringColor}
		style:--ring-width="{ringWidth}px"
	>
		<svg class="progress-ring" viewBox="0 0 100 100">
			<circle class="ring-track" cx="50" cy="50" r="45" />
			<circle class="ring-progress" cx="50" cy="50" r="45" />
		</svg>
		
		<div class="icon-wrapper">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<path d="m18 15-6-6-6 6"/>
			</svg>
		</div>
	</button>
{/if}

<style>
	.scroll-to-top {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		border: none;
		background: var(--btn-bg);
		color: var(--text-color);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
		z-index: 999;
		transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
		padding: 0;
	}

	.scroll-to-top:hover {
		transform: scale(1.1);
	}

	.scroll-to-top:active {
		transform: scale(0.95);
	}

	.icon-wrapper {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.progress-ring {
		width: 100%;
		height: 100%;
		transform: rotate(-90deg); /* Start at the top */
	}

	circle {
		fill: none;
		stroke-width: var(--ring-width);
	}

	.ring-track {
		stroke: rgba(255, 255, 255, 0.05); /* Subtle track */
	}

	.ring-progress {
		stroke: var(--ring-color);
		stroke-linecap: round;
		stroke-dasharray: 283; /* 2 * PI * R (R=45) */
		stroke-dashoffset: 283;
		
		/* Modern Scroll-Driven Animation */
		animation: progress linear;
		animation-timeline: scroll();
	}

	@keyframes progress {
		from { stroke-dashoffset: 283; }
		to { stroke-dashoffset: 0; }
	}

	/* Fallback for browsers without SDA (using JS-based progress if needed) */
	@supports not (animation-timeline: scroll()) {
		/* You could add a simple CSS hover state or JS-based style injection here */
	}
</style>
