<script lang="ts">
  import { getModuleStats } from '#lib/stores/moduleStore.svelte';
  import { getCategoryById } from '#lib/constants/categories.js';

  interface Props {
    moduleName?: string;
    totalSteps?: number;
    completedSteps?: number;
    moduleId?: string | number | null;
    category?: string;
    description?: string;
    showProgressBar?: boolean;
    cardColor?: string;
    href?: string;
    onclick?: () => void;
  }

  let {
    moduleName = "System Override",
    totalSteps: manualTotalSteps = 12,
    completedSteps: manualCompletedSteps = 0,
    moduleId = null,
    category = undefined,
    description = "Initiate the sequence to synchronize network nodes. Ensure all biometric safety parameters are engaged before proceeding with the core data transfer.",
    showProgressBar = true,
    cardColor = undefined,
    href = "#",
    onclick = undefined
  }: Props = $props();

  const categoryMeta = $derived(category ? getCategoryById(category) : null);

  // Reactive Stats from store if moduleId is provided
  const stats = $derived(moduleId ? getModuleStats(String(moduleId)) : null);

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
  <header
    class="card-header"
    style={cardColor ? `--card-color: var(--brand-${cardColor}, ${cardColor});` : undefined}
  >
    <div class="header-topline">
      {#if categoryMeta}
        <span class="category-badge">{categoryMeta.label}</span>
      {/if}
      <p class="subtitle">Module {moduleId}</p>
    </div>
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
  /* Nth-Child Pattern Injecting Brand Tokens */
  :global(.card:nth-child(3n + 1)) {
    --card-color: var(--brand-primary);
  }

  :global(.card:nth-child(3n + 2)) {
    --card-color: var(--brand-secondary);
  }

  :global(.card:nth-child(3n)) {
    --card-color: var(--brand-tertiary);
  }

  .card {
    font-family: var(--font-body, sans-serif);
    border-radius: var(--border-radius);
    background-color: var(--surface-1);
    border: 1px solid var(--ui-border);
    box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.15);
    min-height: 440px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px -4px rgba(0, 0, 0, 0.25);
    border-color: var(--card-color);
  }

  /* Header Styling */
  .card-header {
    background: linear-gradient(135deg, var(--card-color) 0%, oklch(from var(--card-color) calc(l - 0.2) c h) 100%);
    position: relative;
    padding: var(--gap-2);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 140px;
    border-bottom: 2px solid var(--card-color);
    color: #ffffff;
  }

  .header-topline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-block-end: 0.5rem;
    flex-wrap: wrap;
  }

  .card-header .subtitle {
    font-family: var(--font-mono, monospace);
    font-size: 0.85rem;
    color: #ffffff;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    margin: 0;
  }

  .category-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.55rem;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.3);
    font-family: var(--font-mono, monospace);
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #ffffff;
  }

  .card-header h1 {
    margin: 0;
    font-family: var(--font-display, sans-serif);
    font-size: clamp(1.35rem, 2.2vw, 1.75rem);
    text-transform: uppercase;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.15;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }

  /* Content Area */
  .content-area {
    flex-grow: 1;
    padding: var(--gap-2);
    display: flex;
    flex-direction: column;
    gap: var(--gap-1);
    background: var(--surface-1);
  }

  /* Progress Section */
  .progress {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .progress-labels {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .progress-title {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--fg);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .progress-numbers {
    font-family: var(--font-mono, monospace);
    font-size: 0.95rem;
    color: var(--card-color);
    font-weight: 700;
  }

  .progress-track {
    width: 100%;
    height: 8px;
    background-color: var(--surface-3);
    border-radius: 9999px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--card-color);
    border-radius: 9999px;
    transition: width 0.8s ease;
  }

  /* Description */
  .description {
    font-size: clamp(0.9rem, 1.4vw, 1rem);
    line-height: 1.55;
    color: var(--text-secondary);
  }

  .description p {
    margin: 0;
  }

  /* Footer & Button */
  footer {
    margin-top: auto;
    padding-top: var(--gap-1);
  }

  .action-btn-link {
    text-decoration: none;
    display: block;
    width: 100%;
  }

  .action-btn {
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: var(--surface-2);
    border: 1.5px solid var(--card-color);
    color: var(--card-color);
    border-radius: var(--border-radius-sm);
    font-family: var(--font-ui, sans-serif);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-btn:hover {
    background-color: var(--card-color);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px oklch(from var(--card-color) l c h / 0.35);
  }
</style>
