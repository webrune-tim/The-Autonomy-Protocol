<script lang="ts">
	import { foresight, thickMargins } from '@autonomy/actions'
	import { Milestone, PlayCircle, Route, ShipWheel, Star } from '@lucide/svelte'
	import { getCategoryById } from '#lib/constants/categories.js'

	let { data } = $props()
</script>

<section
	class="angled-bottom-box"
	style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast);"
>
	<h1>Own Your Future. Master the Protocol.</h1>
	<p>
		High school isn't just about academics; it's about building the foundation for
		the rest of your life. Step into a system designed to teach you real-world life
		management, self-governance, and absolute accountability.
	</p>

	<a class="cta" href="/modules" use:foresight>
		<Star /> Begin the Protocol
	</a>
	<a class="cta" href="/road-map" use:foresight>
		<Route /> View the Roadmap
	</a>
</section>

{#if data.user}
	<section
		class="angled-top-bottom-box"
		style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast);"
		use:thickMargins
	>
		<h2 class="reveal-header">Your Progress</h2>

		{#if data.startedModules.length > 0}
			<h3>Continue Learning</h3>
			<div class="progress-container">
				{#each data.startedModules as module (module.id)}
					<a href="/modules/{module.slug}" class="progress-card" use:foresight>
						<div class="card-left">
							<div class="card-icon">
								<PlayCircle size={24} />
							</div>
							<div class="card-text">
								<div class="card-meta">
									<span class="card-category">{getCategoryById(module.category || 'step').label}</span>
								</div>
								<span class="card-title">{module.title}</span>
								<div class="card-track">
									<div class="card-bar" style="width: {module.progress}%;"></div>
								</div>
							</div>
						</div>
						<div class="card-badge">
							<span>{module.progress}% Complete</span>
						</div>
					</a>
				{/each}
			</div>
		{/if}

		{#if data.availableModules.length > 0}
			<h3 class:margin-top={data.startedModules.length > 0}>Available Modules</h3>
			<div class="progress-container">
				{#each data.availableModules as module (module.id)}
					<a href="/modules/{module.slug}" class="progress-card" use:foresight>
						<div class="card-left">
							<div class="card-icon">
								<Star size={24} />
							</div>
							<div class="card-text">
								<div class="card-meta">
									<span class="card-category">{getCategoryById(module.category || 'step').label}</span>
								</div>
								<span class="card-title">{module.title}</span>
							</div>
						</div>
						<div class="card-badge start-badge">
							<span>Start Module</span>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>
{/if}

<section
	class="angled-top-bottom-box"
	style="--color: var(--brand-tertiary); --text_color: var(--brand-tertiary-contrast);"
>
	<h2 class="reveal-header">
		Built for Where You Are. Designed for Where You're Going.
	</h2>
	<ol>
		<li>
			<strong>Freshmen (The Blueprint):</strong> Start your high school career with a foundation. Don't wait until graduation to figure out how to manage your time, navigate challenges, or set boundaries. Build the habits now that put you in control of the next four years.
		</li>
		<li>
			<strong>Seniors (The Transition):</strong> The final stretch. Before you step out on your own, solidify your self-reliance. Master real-world accountability and executive functioning required to transition into adulthood.
		</li>
	</ol>
</section>

<section
	class="angled-top-bottom-box"
	use:thickMargins
	style="--color: var(--brand-primary); --text_color: var(--brand-primary-contrast);"
>
	<h2 class="reveal-header">The Autonomy Framework</h2>
	<ol>
		<li>
			<strong>Self-Governance:</strong> You are the architect of your own life. Learn how to filter out the noise, make decisions that align with your actual goals, and take control of your daily trajectory.
		</li>
		<li>
			<strong>Life Management:</strong> Turn chaos into order. Gain practical, no-nonsense tools to handle your schedule, manage stress, and balance your responsibilities without burning out.
		</li>
		<li>
			<strong>Accountability:</strong> No excuses. Own your victories and learn from your losses. Build a track record of reliability that you—and the people around you—can trust.
		</li>
	</ol>

	<a class="cta" href="/road-map" use:foresight>
		<Milestone /> View the Roadmap
	</a>
</section>

<section
	class="angled-top-box no-bottom-margin"
	style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast);"
	use:thickMargins
>
	<h2 class="reveal-header">Ready to take the wheel?</h2>
	<p>The tools are here. The choice to use them is yours.</p>

	<a class="cta" href="/modules" use:foresight>
		<ShipWheel /> Start Your First Module
	</a>
</section>

<style>
	.progress-container {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: var(--gap-1) 0;
	}

	.progress-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 1.25rem;
		background-color: rgb(from var(--bg) r g b / 0.18);
		border: 2px solid var(--local-text);
		border-radius: var(--border-radius);
		color: var(--local-text) !important;
		text-decoration: none;
		transition: background-color 0.2s ease, transform 0.15s ease, border-color 0.2s ease;

		&:hover {
			background-color: rgb(from var(--bg) r g b / 0.32);
			text-decoration: none;
			transform: translateY(-2px);
		}

		&:active {
			transform: scale(0.99);
		}
	}

	.card-left {
		display: flex;
		align-items: center;
		gap: 1rem;
		min-width: 0;
		flex: 1;
	}

	.card-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		flex-shrink: 0;
		color: var(--local-text);

		:global(svg) {
			width: 24px;
			height: 24px;
			flex-shrink: 0;
			stroke-width: 2.2px;
		}
	}

	.card-text {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-width: 0;
		flex: 1;
	}

	.card-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.card-category {
		font-family: monospace;
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.15rem 0.45rem;
		border-radius: 4px;
		background: rgba(0, 0, 0, 0.35);
		border: 1px solid rgb(from var(--local-text) r g b / 0.3);
		color: var(--local-text);
		width: fit-content;
	}

	.card-title {
		font-size: clamp(1.05rem, 1.6vw, 1.35rem);
		font-weight: 800;
		line-height: 1.25;
		color: var(--local-text);
		margin: 0;
		text-wrap: pretty;
	}

	.card-track {
		width: 100%;
		max-width: 260px;
		height: 6px;
		background: rgba(0, 0, 0, 0.25);
		border-radius: 4px;
		overflow: hidden;
	}

	.card-bar {
		height: 100%;
		background: var(--local-text);
		border-radius: 4px;
		transition: width 0.4s ease;
	}

	.card-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		padding: 0.4rem 0.85rem;
		border-radius: 6px;
		background: rgba(0, 0, 0, 0.28);
		border: 1px solid rgb(from var(--local-text) r g b / 0.3);
		white-space: nowrap;
		font-family: monospace;
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--local-text);
		letter-spacing: 0.02em;

		&.start-badge {
			background: rgb(from var(--local-text) r g b / 0.18);
		}
	}
</style>

