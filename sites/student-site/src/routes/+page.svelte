<script lang="ts">
	import { thickMargins } from '@autonomy/actions'
	import { ArrowBigRight, Route, ShipWheel, Star, PlayCircle } from '@lucide/svelte'

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

	<a class="cta" href="/modules">
		<Star size={32} /> Begin the Protocol <ArrowBigRight size={32} />
	</a>
	<a class="cta" href="/homework">
		<Route size={32} /> View the Roadmap <ArrowBigRight size={32} />
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
			<div class="module-grid">
				<div class="cards">
					{#each data.startedModules as module (module.id)}
						<a
							href="/modules/{module.slug}"
							class="module-card"
							style="--color: {module.cardColor}"
						>
							<PlayCircle size={24} />
							<div>
								<strong>{module.title}</strong>
								<p>{module.progress}% complete</p>
							</div>
							<ArrowBigRight size={24} />
						</a>
					{/each}
				</div>
			</div>
		{/if}

		{#if data.availableModules.length > 0}
			<h3>Available Modules</h3>
			<div class="module-grid" class:mt-4={data.startedModules.length > 0}>
				<div class="cards">
					{#each data.availableModules as module (module.id)}
						<a
							href="/modules/{module.slug}"
							class="module-card"
							style="--color: {module.cardColor}"
						>
							<Star size={24} />
							<div>
								<strong>{module.title}</strong>
								<!-- <p>{module.description}</p> -->
							</div>
							<ArrowBigRight size={24} />
						</a>
					{/each}
				</div>
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
	<h3>Freahman</h3>
	<p>
		Start your high school career with a blueprint. Don't wait until graduation to
		figure out how to manage your time, navigate challenges, or set boundaries. Build
		the habits now that will put you in the driver's seat for the next four years.
	</p>

	<h3>Seniors</h3>
	<p>
		The final stretch. Before you step out on your own, solidify your self-reliance.
		Master the real-world accountability and life management skills required to
		transition from student to an independent adult.
	</p>
</section>

<section
	class="angled-top-bottom-box"
	use:thickMargins
	style="--color: var(--brand-primary);"
>
	<h2 class="reveal-header">The Autonomy Framework</h2>
	<ul>
		<li>
			<strong>Self-Governance:</strong> You are the architect of your own life. Learn
			how to filter out the noise, make decisions that align with your actual goals, and
			take control of your daily trajectory.
		</li>
		<li>
			<strong>Life Management:</strong> Turn chaos into order. Gain practical, no-nonsense
			tools to handle your schedule, manage stress, and balance your responsibilities
			without burning out.
		</li>
		<li>
			<strong>Accountability:</strong> No excuses. Own your victories and learn from your
			losses. We help you build a track record of reliability that you—and the people
			around you—can trust.
		</li>
	</ul>
</section>

<section
	class="angled-top-box no-bottom-margin"
	style="--color: var(--brand-secondary); --text_color: var(--brand-secondary-contrast);"
	use:thickMargins
>
	<h3 class="reveal-header">Ready to take the wheel?</h3>
	<p>The tools are here. The choice to use them is yours.</p>

	<a class="cta" href="/modules">
		<ShipWheel size={32} /> Start Your First Module <ArrowBigRight size={32} />
	</a>
</section>

<style>
	/* .cards, */
	.module-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gap-1);

		.module-card {
			display: flex;
			align-items: center;
			/* justify-content: space-between; */
			gap: var(--gap-1);
			padding: var(--gap-1);

			background-color: rgb(from var(--bg) R G B / 0.8);
			color: var(--fg);
			border-radius: var(--border-radius);
			margin: var(--gap-1);
			border: 1px solid var(--fg);

			a,
			p,
			strong {
				color: var(--fg);
			}

			p {
				margin: 0;
			}
		}
	}
</style>
