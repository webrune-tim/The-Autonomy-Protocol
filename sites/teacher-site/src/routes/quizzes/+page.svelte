<script lang="ts">
	// In a real app, this would come from a database via a +page.server.ts loader
	let availableQuizzes = $state([
		{ slug: 'integrity-protocol', title: 'The Integrity Protocol', questions: 11 }
	])
</script>

<section class="repository">
	<h1>Curriculum Repository</h1>
	<div class="grid">
		{#each availableQuizzes as quiz (quiz.slug)}
			<a href="/quizzes/{quiz.slug}" class="quiz-card">
				<h3>{quiz.title}</h3>
				<p>{quiz.questions} Modules</p>
			</a>
		{/each}
	</div>
</section>

<style>
	.repository {
		padding: var(--gap-4);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}
	.quiz-card {
		border: 1px solid var(--brand-orange);
		padding: 1.5rem;
		background: var(--surface-1);
		text-decoration: none;
		color: inherit;
		transition: transform 0.2s ease;
	}
	.quiz-card:hover {
		transform: translateY(-4px);
		background: var(--surface-2);
	}
</style>
