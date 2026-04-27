<script lang="ts">
  import type { Quiz } from "@autonomy/assignment-parser";

  let { quizData }: { quizData: Quiz } = $props();

  // State management
  let answers = $state<Record<number, string>>({});
  let showResults = $state(false);

  // Derived state for progress
  let progress = $derived(
    quizData.questions.length > 0
      ? (Object.keys(answers).length / quizData.questions.length) * 100
      : 0,
  );
</script>

{#snippet QuestionBlock(q)}
  <div class="q-block" class:active={answers[q.id]}>
    <div class="q-meta">
      <span class="q-index">{q.id + 1}</span>
      {#if q.type === "multiple-choice"}
        <span class="q-badge">Selection</span>
      {:else}
        <span class="q-badge reflection">Reflection</span>
      {/if}
    </div>

    <h3 class="q-text">{q.text}</h3>

    <div class="q-input-area">
      {#if q.type === "multiple-choice"}
        <div class="options-grid">
          {#each q.options as option}
            <label
              class="option-card"
              class:selected={answers[q.id] === option}
            >
              <input
                type="radio"
                name="question-{q.id}"
                value={option}
                bind:group={answers[q.id]}
              />
              <span class="option-text">{option}</span>
            </label>
          {/each}
        </div>
      {:else}
        <textarea
          bind:value={answers[q.id]}
          placeholder="Enter your analysis..."
          class="reflection-input"
        ></textarea>
      {/if}
    </div>

    {#if showResults && q.goal}
      <div class="goal-reveal">
        <strong>Objective:</strong>
        {q.goal}
      </div>
    {/if}
  </div>
{/snippet}

<div class="quiz-wrapper">
  <header class="sticky-header">
    <div class="header-content">
      <h1>{quizData.title}</h1>
      <div class="stats">
        {Object.keys(answers).length} / {quizData.questions.length} Protocols Met
      </div>
    </div>
    <div class="progress-container">
      <div class="progress-bar" style="width: {progress}%"></div>
    </div>
  </header>

  <main class="quiz-feed">
    {#each quizData.questions as q (q.id)}
      {@render QuestionBlock(q)}
    {/each}
  </main>

  <footer class="controls">
    <button
      class="submit-action"
      onclick={() => (showResults = true)}
      disabled={Object.keys(answers).length < quizData.questions.length}
    >
      Finalize Protocol
    </button>
  </footer>
</div>

<style>
  .quiz-wrapper {
    --bg: #0f0f0f;
    --surface: #1a1a1a;
    --accent: #ff9661; /* Brand Orange */
    --accent-dim: #4da6ff; /* Brand Blue */
    --text: #ffffff;

    max-width: 720px;
    margin: 0 auto;
    color: var(--text);
    padding-bottom: 5rem;
  }

  .sticky-header {
    position: sticky;
    top: 0;
    background: var(--bg);
    padding: 2rem 0 1rem;
    z-index: 10;
    border-bottom: 1px solid #333;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1rem;
  }

  .progress-container {
    height: 2px;
    background: #333;
    width: 100%;
  }

  .progress-bar {
    height: 100%;
    background: var(--accent);
    transition: width 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .quiz-feed {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    margin-top: 3rem;
  }

  .q-block {
    transition: opacity 0.3s ease;
  }
  .q-block:not(.active) {
    opacity: 0.8;
  }

  .q-meta {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }
  .q-index {
    color: var(--accent);
    font-weight: 800;
    font-family: monospace;
  }
  .q-badge {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.5;
  }

  .q-text {
    font-size: 1.5rem;
    line-height: 1.3;
    font-weight: 500;
    margin: 0 0 2rem;
  }

  .options-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .option-card {
    padding: 1.25rem;
    background: var(--surface);
    border: 1px solid #333;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.2s ease;
  }

  .option-card:hover {
    border-color: var(--accent);
  }
  .option-card.selected {
    border-color: var(--accent-dim);
    background: #222;
  }

  input[type="radio"] {
    accent-color: var(--accent);
  }

  .reflection-input {
    width: 100%;
    min-height: 200px;
    background: var(--surface);
    border: 1px solid #333;
    color: white;
    padding: 1.5rem;
    font-family: inherit;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .goal-reveal {
    margin-top: 2rem;
    padding: 1rem;
    background: rgba(77, 166, 255, 0.1);
    border-left: 2px solid var(--accent-dim);
    font-size: 0.9rem;
  }

  .controls {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 720px;
  }

  .submit-action {
    width: 100%;
    padding: 1.25rem;
    background: var(--accent);
    color: black;
    border: none;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
  }

  .submit-action:disabled {
    filter: grayscale(1);
    opacity: 0.3;
    cursor: not-allowed;
  }
</style>
