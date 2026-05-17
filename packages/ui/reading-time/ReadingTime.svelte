<script lang="ts">
	import { Clock } from '@lucide/svelte'

	let {
		targetSelector = 'main',
		wordsPerMinute = 225,
		dynamic = false,
		suffix = 'min read',
		dynamicSuffix = 'min left',
		textColor = '#a3a3a3', // Muted text for dark interfaces
		iconColor = '#4b5563', // Slightly lighter icon
		fontSize = 'var(--font-size-4)'
	} = $props();

	let totalMinutes = $state(0);
	let scrollPercent = $state(0);

	// Calculate base reading time
	$effect(() => {
		const target = document.querySelector(targetSelector) || document.body;
		const text = target.innerText || '';
		const wordCount = text.trim().split(/\s+/).length;
		totalMinutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
	});

	// Track scroll if dynamic mode is enabled
	$effect(() => {
		if (!dynamic) return;

		const handleScroll = () => {
			const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
			if (scrollHeight <= 0) return;
			
			// Clamp between 0 and 100 to prevent negative values on rubber-band scrolling
			scrollPercent = Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); 
		
		return () => window.removeEventListener('scroll', handleScroll);
	});

	// Derive the current value to display
	let displayValue = $derived(
		dynamic 
			? Math.max(1, Math.ceil(totalMinutes * (1 - scrollPercent / 100)))
			: totalMinutes
	);

	let currentSuffix = $derived(dynamic ? dynamicSuffix : suffix);
</script>

<div 
	class="reading-time" 
	style:--text-color={textColor}
	style:--icon-color={iconColor}
	style:--font-size={fontSize}
>
	<Clock size={32} color={iconColor} />
	<span class="rt-text">
		<span class="rt-number">{displayValue}</span> {currentSuffix}
	</span>
</div>

<style>
	span {
		margin: 0;
	}

	.reading-time {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		color: var(--text-color);
		font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
		font-size: var(--font-size);
		font-weight: 500;
		user-select: none;
		margin-bottom: var(--gap-1);
	}

	.rt-icon {
		color: var(--icon-color);
		flex-shrink: 0;
	}

	.rt-number {
		font-variant-numeric: tabular-nums;
		font-weight: 600;
		color: var(--text-color); /* Pops the number slightly */
	}
</style>
