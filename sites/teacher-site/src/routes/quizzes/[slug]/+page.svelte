<script lang="ts">
	import { Quiz } from '@autonomy/quiz'
	import type { PageData } from './$types'

	// Svelte 5: The 'data' prop is automatically passed from the server loader
	let { data }: { data: PageData } = $props()
</script>

{#if data.quiz}
	<Quiz quizData={data.quiz} />
{:else}
	<p>Loading pedagogical modules...</p>
{/if}
