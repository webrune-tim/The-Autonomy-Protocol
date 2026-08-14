<script lang="ts">
	import { Compass } from '@lucide/svelte'
</script>

<div class="logo">
	<div class="logo-mark">
		<Compass size={28} strokeWidth={2.4} />
	</div>
	<div class="logo-text">
		<span class="logo-title">TAP</span>
		<span class="logo-subtitle">The Autonomy Protocol</span>
	</div>
</div>

<style>
	.logo {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		text-decoration: none;
		user-select: none;
	}

	.logo-mark {
		display: grid;
		place-content: center;
		color: var(--brand-secondary);
		transition: transform 0.25s ease;
	}

	.logo:hover .logo-mark {
		transform: rotate(45deg);
	}

	.logo-text {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
	}

	.logo-title {
		font-family: var(--font-display, sans-serif);
		font-weight: 800;
		font-size: 1.35rem;
		letter-spacing: -0.02em;
		color: var(--brand-primary);
	}

	.logo-subtitle {
		font-family: var(--font-body, sans-serif);
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--text-secondary);
		white-space: nowrap;
	}

	@media (max-width: 480px) {
		.logo-subtitle {
			display: none;
		}
	}
</style>
