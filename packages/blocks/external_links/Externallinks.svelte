<script lang="ts">
  import { foresight } from '@autonomy/actions';
</script>

<section
	class="bold-border-box margin-top-2"
	style="--border-color: var(--brand-secondary); --title-color: var(--text-secondary-print);"
>
	<h3>External Resourses</h3>

	<p class="resource-note">
		While the Autonomy Protocol operates independently and is not directly associated with these programs, we recognize the vital role they play in community healing and personal growth. We offer these links as a helpful directory should you or a loved one ever need to explore their services.
  </p>

	<ul>
		<li>
			<a href="https://www.aa.org/" target="_blank" use:foresight>Alcoholics Anonymous</a>
		</li>
		<li>
			<a href="https://www.na.org/" target="_blank" use:foresight>Narcotics Anonymous</a>
		</li>
		<li>
			<a href="https://coda.org/" target="_blank" use:foresight>Co-Dependents Anonymous</a>
		</li>
		<li>
		  <a href="https://adultchildren.org/" target="_blank" use:foresight>Adult Children of Alcoholics & Dysfunctional Families</a>
		</li>
		<li>
			<a href="https://al-anon.org/" target="_blank" use:foresight>Al-Anon Family Groups</a>
		</li>
	</ul>
</section>

<style>
  ul {
		list-style: none;
		padding: 0;

		a {
			display: block;
			width: fit-content;
			position: relative; /* 💡 Establishes the boundary context for ::after */
			padding: 12px 16px;
			text-decoration: underline;
			color: var(--text-secondary);

			&::after {
				content: '⧉';
				height: 1.5rem;
				width: 1.5rem;
				opacity: 0.8;
				position: absolute;
				right: -10px;
				top: 50%;
				transform: translateY(-50%);
			}

			&:hover {
				font-weight: bold;
			}
		}
	}
</style>
