<script lang="ts">
  import { Quiz } from '@autonomy/quiz'
  import type { PageData } from './$types'

  // Svelte 5: Destructuring props with types
  let { data }: { data: PageData } = $props()
</script>

{#if data.quiz}
  <header class="quiz-header">
    <h1>{data.quiz.title}</h1>
    <p class="meta">Module Slug: <code>{data.quiz.slug}</code></p>
  </header>

  <Quiz quizData={data.quiz} />
{:else}
  <div class="loading-state">
    <p class="pulse">Retrieving pedagogical modules from the Protocol...</p>
  </div>
{/if}

<style>
  .quiz-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--surface-3);
  }
  
  .meta {
    font-size: 0.8rem;
    opacity: 0.7;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
</style>