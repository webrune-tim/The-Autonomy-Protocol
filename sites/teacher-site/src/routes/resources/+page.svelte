<script lang="ts">
  const steps = import.meta.glob('$docs/steps/*.md', { eager: true });

  const step_links = Object.entries(steps)
    .map(([path, file]) => {
      return {
        slug: path.split('/').at(-1)?.replace('.md', ''),
        metadata: file.metadata,
      };
    })
    // Add this sort block:
    .sort((a, b) => {
      const orderA = a.metadata.order ?? 99;
      const orderB = b.metadata.order ?? 99;
      return orderA - orderB;
    });
</script>



<section class="angled-bottom-box" style="--color: var(--brand-blue)">
	<h1>Additional Resources</h1>
	<p>
		Here are some additional resources to help you get started with the Autonomy
		Protocol. Whether you're a student, a parent, or a teacher, these materials will
		give you the tools you need to take charge of your own life and start governing
		yourself.
	</p>
</section>



<section class="angled-top-bottom-box" style="--color: var(--brand-teal)">
	<h2>Twelve Steps</h2>
	<p>
		The Steps are a series of practical guides that walk you through the process of
		taking control of your life and starting to govern yourself. Each Step is designed
		to be actionable and easy to follow, so you can start making progress right away.
	</p>

	{#if step_links.length > 0}
		<ul class="step-container">
			{#each step_links as { slug, metadata }}
				<li>
					<a href="/resources/steps/{slug}">
						{metadata.title ?? 'Untitled Resource'}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No resources found.</p>
	{/if}
  </section>

  <section class="angled-top-box no-bottom-margin" style="--color: var(--brand-orange)">
	<h2>Five Aggrements</h2>
	<p>
		The Aggrements are a collection of agreements that you can use to govern yourself and
		your relationships with others. These agreements are designed to be flexible and
		customizable, so you can adapt them to fit your own needs and circumstances.
	</p>

	<!-- {#if step_links.length > 0}
		<ul >
			{#each step_links as { slug, metadata }}
				<li>
					<a href="/resources/steps/{slug}">
						{metadata.title ?? 'Untitled Resource'}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No resources found.</p>
	{/if} -->
</section>


<style>
  a {
	color: var(--bg);
    text-decoration: underline !important;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .step-container {
  display: grid;
  /* Creates two equal columns */
  grid-template-columns: repeat(2, 1fr);
  /* Forces the items to fill the first column before moving to the next */
  grid-auto-flow: column;
  /* Calculates the rows based on your 12 steps (6 rows total) */
  grid-template-rows: repeat(6, auto);
  /* Adjusts the space between rows and columns */
  gap: 0.75rem 2rem;
  
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.step-container li a {
  color: var(--bg);
  text-decoration: underline;
  font-weight: 500;
}

/* To match the all-caps look in your reference image */
h2 {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

</style>
