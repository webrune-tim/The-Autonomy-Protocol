<script lang="ts">
	import { foresight } from '@autonomy/actions';

	interface ResourceLink {
		name: string;
		url: string;
	}

	interface ResourceCategory {
		title: string;
		links: ResourceLink[];
	}

	const categories: ResourceCategory[] = [
		{
			title: '12-Step & Family Support Networks',
			links: [
				{ name: 'Alcoholics Anonymous', url: 'https://aa.org' },
				{ name: 'Narcotics Anonymous', url: 'https://na.org' },
				{ name: 'Co-Dependents Anonymous (CoDA)', url: 'https://coda.org' },
				{ name: 'Adult Children of Alcoholics & Dysfunctional Families (ACA)', url: 'https://adultchildren.org' },
				{ name: 'Al-Anon Family Groups', url: 'https://al-anon.org' }
			]
		},
		{
			title: 'Self-Reliance & Cognitive Recovery',
			links: [
				{ name: 'SMART Recovery', url: 'https://smartrecovery.org' },
				{ name: 'LifeRing Secular Recovery', url: 'https://lifering.org' },
				{ name: 'Celebrate Recovery', url: 'https://celebraterecovery.com' }
			]
		},
		{
			title: 'Behavioral & Process Independence',
			links: [
				{ name: 'Sex and Love Addicts Anonymous (SLAA)', url: 'https://slaafws.org' },
				{ name: 'Debtors Anonymous', url: 'https://debtorsanonymous.org' },
				{ name: 'Gamblers Anonymous', url: 'https://gamblersanonymous.org' },
				{ name: 'Overeaters Anonymous', url: 'https://oa.org' }
			]
		},
		{
			title: 'Crisis, Veteran & Mental Health Support',
			links: [
				{ name: '988 Suicide & Crisis Lifeline', url: 'https://988lifeline.org' },
				{ name: 'Veterans Crisis Line', url: 'https://veteranscrisisline.net' },
				{ name: 'SAMHSA National Helpline', url: 'https://samhsa.gov/find-help/national-helpline' }
			]
		}
	];
</script>

<section
	class="bold-border-box margin-top-2"
	style="--border-color: var(--brand-secondary); --title-color: var(--text-secondary-print);"
>
	<h3>External Resources</h3>

	<p class="resource-note">
		While the Autonomy Protocol operates independently and is not directly associated with these programs, we recognize the vital role they play in community healing and personal growth. We offer these links as a helpful directory should you or a loved one ever need to explore their services.
	</p>

	<div class="resource-grid">
		{#each categories as category}
			<div class="resource-category">
				<h4>{category.title}</h4>
				<ul class="resource-list">
					{#each category.links as link}
						<li>
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								use:foresight
							>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<style>
	.resource-note {
		margin-block-end: var(--gap-2);
		line-height: 1.6;
		color: var(--text-secondary);
		font-size: var(--font-size-base, 1rem);
	}

	.resource-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--gap-2);
	}

	@media (max-width: 768px) {
		.resource-grid {
			grid-template-columns: 1fr;
		}
	}

	.resource-category {
		background: var(--surface-2, rgba(255, 255, 255, 0.03));
		border: 1px solid var(--ui-border-subtle, rgba(255, 255, 255, 0.08));
		border-radius: var(--border-radius-sm);
		padding: var(--gap-2);
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	h4 {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--brand-secondary);
		border-bottom: 1px solid var(--ui-border-subtle, rgba(255, 255, 255, 0.1));
		padding-bottom: 0.4rem;
		letter-spacing: 0.01em;
	}

	.resource-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;

		li {
			margin: 0;
		}

		a {
			display: inline-flex;
			align-items: baseline;
			width: fit-content;
			padding: 2px 0;
			text-decoration: underline;
			text-underline-offset: 3px;
			color: var(--text-secondary);
			font-size: 0.95rem;
			line-height: 1.45;
			font-weight: 500;
			transition: color 0.15s ease, font-weight 0.15s ease;

			&::after {
				content: '⧉';
				display: inline-block;
				margin-left: 5px;
				font-size: 0.8em;
				opacity: 0.7;
				text-decoration: none;
			}

			&:hover {
				color: var(--fg);
				font-weight: 600;

				&::after {
					opacity: 1;
				}
			}
		}
	}
</style>
