<script lang="ts">
  import { getModuleStats } from '$stores/moduleStore.svelte';

  interface Props {
    moduleName?: string;
    totalSteps?: number;
    completedSteps?: number;
    moduleId?: string | null;
    description?: string;
    showProgressBar?: boolean;
    href?: string;
    onclick?: () => void;
  }

  let {
    moduleName = "System Override",
    totalSteps: manualTotalSteps = 12,
    completedSteps: manualCompletedSteps = 0,
    moduleId = null,
    description = "Initiate the sequence to synchronize network nodes. Ensure all biometric safety parameters are engaged before proceeding with the core data transfer.",
    showProgressBar = true,
    href = "#",
    onclick = undefined
  }: Props = $props();

  // Reactive Stats from store if moduleId is provided
  const stats = $derived(moduleId ? getModuleStats(moduleId) : null);

  // Total steps should preferably come from the store if the module has been initialized
  const effectiveTotalSteps = $derived(stats && stats.total > 0 ? stats.total : manualTotalSteps);

  // Completed steps comes from the store, or defaults to the prop (usually 0)
  const effectiveCompletedSteps = $derived(stats && stats.total > 0 ? stats.completed : manualCompletedSteps);

  // Reactive State for animations
  let displayCount = $state(0);
  let progressWidth = $state(0);

  // Client-side effect for the initialization animation
  $effect(() => {
    if (!showProgressBar) return;

    const total = effectiveTotalSteps || 1;
    const targetPercentage = (effectiveCompletedSteps / total) * 100;

    const timeout = setTimeout(() => {
      progressWidth = targetPercentage;

      if (displayCount === effectiveCompletedSteps) return;

      let count = 0;
      const duration = 1000;
      const intervalTime = Math.max(duration / (effectiveCompletedSteps || 1), 20);

      const counter = setInterval(() => {
        if (count >= effectiveCompletedSteps) {
          clearInterval(counter);
          displayCount = effectiveCompletedSteps;
        } else {
          count++;
          displayCount = count;
        }
      }, intervalTime);

      return () => clearInterval(counter);
    }, 400);

    return () => clearTimeout(timeout);
  });
</script>

<article class="card">
  <header class="card-header">
    <div class="header-glare"></div>
    <p class="subtitle">Module {moduleId}</p>
    <h1>{moduleName}</h1>
  </header>

  <div class="content-area">
    {#if showProgressBar}
      <section class="progress">
        <div class="progress-labels">
          <span class="progress-title">Protocol Status</span>
          <span class="progress-numbers"><span>{displayCount}</span> / {effectiveTotalSteps}</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: {progressWidth}%"></div>
        </div>
      </section>
    {/if}

    {#if description}
      <section class="description">
        <p>{description}</p>
      </section>
    {/if}

    <footer>
      {#if href && href !== '#'}
        <a {href} class="action-btn-link">
          <button class="action-btn" type="button">Initialize Sequence</button>
        </a>
      {:else}
        <button class="action-btn" {onclick}>Initialize Sequence</button>
      {/if}
    </footer>
  </div>
</article>

<style>
  /* ---------------------------------------------------- */
  /* Nth-Child Pattern Injecting Brand Tokens             */
  /* ---------------------------------------------------- */

  /* Pattern 1: Brand Primary */
  :global(.card:nth-child(3n + 1)) {
    --card-color: var(--brand-primary);
  }

  /* Pattern 2: Brand Secondary */
  :global(.card:nth-child(3n + 2)) {
    --card-color: var(--brand-secondary);
  }

  /* Pattern 3: Brand Tertiary */
  :global(.card:nth-child(3n)) {
    --card-color: var(--brand-tertiary);
  }

  /* ---------------------------------------------------- */

  .card {
    --opacity: 65%;

    font-family: var(--font-sans-2);

    border-radius: var(--border-radius);
    background-color: hsl(from var(--surface-2) h s calc(l - 20));
    border: 1px solid var(--surface-3);

    --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.05);
    --ease-out: cubic-bezier(0.25, 1, 0.5, 1);

    --shadow-color-hsl: 220 20% 10%;

    --shadow-base:
      1px 1px 1.1px hsl(var(--shadow-color-hsl) / 1),
      1.9px 1.9px 2px -1.7px hsl(var(--shadow-color-hsl) / 0.82);

    box-shadow: var(--shadow-base), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    min-height: 480px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.4s var(--ease-spring), box-shadow 0.4s var(--ease-out), border-color 0.4s ease;
  }

  .card:hover {
    --opacity: 85%;

    transform: translateY(-6px) scale(1.02);

    background-color: hsl(from var(--surface-2) h s calc(l - 15));

    box-shadow:
      var(--shadow-base),
      0 20px 40px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    border-color: var(--ui-border);
  }

  /* Header Styling */
  .card-header {
    background: linear-gradient(135deg, var(--card-color) 0%, var(--surface-1) 100%);
    position: relative;
    height: 180px;
    padding: var(--gap-2);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-bottom: 2px solid var(--card-color);
  }

  .header-glare {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%);
    pointer-events: none;
  }

  .card-header .subtitle {
    font-family: monospace;
    font-size: 1.25rem;
    color: color-mix(in oklch, var(--card-color), oklch(0.96 0.01 290) var(--opacity));
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0 0 0.5rem 0;
    z-index: 1;
    transition: color 1s ease;
  }

  .card-header h1 {
    margin: 0;
    font-family: var(--font-thick);
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 400;
    z-index: 1;
  }

  /* Content Area */
  .content-area {
    flex-grow: 1;
    padding: var(--gap-2);
    display: flex;
    flex-direction: column;
    gap: var(--gap-1);
  }

  /* Progress Section */
  .progress {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .progress-labels {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .progress-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--fg);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .progress-numbers {
    font-family: monospace;
    font-size: 1rem;
    color: var(--card-color);
    font-weight: bold;
  }

  .progress-track {
    width: 100%;
    height: 6px;
    background-color: var(--bg-surface);
    border-radius: 4px;
    overflow: hidden;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--card-color));
    border-radius: 4px;
    transition: width 1.2s var(--ease-out);
    box-shadow: 0 0 10px var(--card-color-dark);
  }

  /* Description */
  .description {
    font-size: clamp(0.9rem, 1.5vw, 1rem);
    line-height: 1.5;
    color: var(--fg-surface);
  }

  .description p {
    margin: 0;
    text-wrap: pretty;
  }

  /* Footer & Button */
  footer {
    margin-top: auto;
  }

  .action-btn-link {
    text-decoration: none;
    display: block;
    width: 100%;
  }

  .action-btn {
    width: 100%;
    padding: var(--gap-1);
    background-color: var(--bg-surface);
    border: 1px solid var(--card-color);
    color: var(--card-color);
    border-radius: calc(var(--border-radius) / 2);
    font-family: monospace;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s var(--ease-out);
  }

  .action-btn:hover {
    background-color: var(--card-color);
    color: var(--card-color-contrast, #fff);
    box-shadow: 0 4px 15px hsl(from var(--card-color) h s calc(l - 5) / 75%);
    transform: translateY(-2px);
  }
</style>
