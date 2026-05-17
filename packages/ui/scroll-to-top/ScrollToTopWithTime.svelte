<script lang="ts">
	let {
		threshold = 20,
		buttonBg = '#111111',
		textColor = '#ffffff',
		ringColor = '#3b82f6',
		ringWidth = 3,
		wordsPerMinute = 225,
		targetSelector = 'main' // Target the main content area for accurate word count
	} = $props();

	let visible = $state(false);
	let scrollPercent = $state(0);
	let totalMinutes = $state(0);

	// Calculate total reading time on mount
	$effect(() => {
		const target = document.querySelector(targetSelector) || document.body;
		const text = target.innerText || '';
		// Fast, rough word count approximation
		const wordCount = text.trim().split(/\s+/).length;
		totalMinutes = wordCount / wordsPerMinute;
	});

	// Track scroll percentage for both visibility and remaining time
	$effect(() => {
		const handleScroll = () => {
			const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
			if (scrollHeight <= 0) return;
			
			scrollPercent = (window.scrollY / scrollHeight) * 100;
			visible = scrollPercent >= threshold;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		// Initial check in case they refresh halfway down the page
		handleScroll(); 
		
		return () => window.removeEventListener('scroll', handleScroll);
	});

	// Derive the remaining time based on total time and scroll progress
	let minutesLeft = $derived(
		Math.max(1, Math.ceil(totalMinutes * (1 - scrollPercent / 100)))
	);

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
		
		<div class="content-swap">
			<span class="time-text">{minutesLeft}m</span>
			<svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
		transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
		padding: 0;
		overflow: hidden;
	}

	.scroll-to-top:hover {
		transform: translateY(-2px);
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
	}

	.scroll-to-top:active {
		transform: translateY(1px) scale(0.95);
	}

	/* CSS Hover Swap Magic */
	.content-swap {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.time-text, .icon-arrow {
		position: absolute;
		transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.time-text {
		font-family: ui-sans-serif, system-ui, sans-serif;
		font-weight: 600;
		font-size: 0.875rem;
		opacity: 1;
		transform: translateY(0);
	}

	.icon-arrow {
		opacity: 0;
		transform: translateY(15px);
	}

	.scroll-to-top:hover .time-text {
		opacity: 0;
		transform: translateY(-15px);
	}

	.scroll-to-top:hover .icon-arrow {
		opacity: 1;
		transform: translateY(0);
	}

	/* Scroll-Driven Progress Ring */
	.progress-ring {
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
	}

	circle {
		fill: none;
		stroke-width: var(--ring-width);
	}

	.ring-track {
		stroke: rgba(255, 255, 255, 0.05);
	}

	.ring-progress {
		stroke: var(--ring-color);
		stroke-linecap: round;
		stroke-dasharray: 283;
		stroke-dashoffset: 283;
		animation: progress linear;
		animation-timeline: scroll();
	}

	@keyframes progress {
		from { stroke-dashoffset: 283; }
		to { stroke-dashoffset: 0; }
	}
</style>
