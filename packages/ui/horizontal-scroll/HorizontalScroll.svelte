<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    cards_content: HTMLAttributes[];
    title: string;
  }

  let { cards_content, title }: Props = $props();

  /** * DYNAMIC HEIGHT CALCULATION
   * 4 cards = 240vh total scroll distance
   * 12 cards = 720vh total scroll distance
   * This ensures the "speed" per card remains identical.
   */
  const dynamicHeight = $derived(cards_content.length * 60); 
</script>

{#snippet card(content: string, index: number)}
  <div class="box {index % 2 === 0 ? 'trans-blue' : 'trans-orange'}">
    {@html content}
  </div>
{/snippet}

<section id="sectionPin" style="height: {dynamicHeight}vh;">
  <h2>{title}</h2>
  <div class="pin-wrap-sticky">
    <div class="pin-wrap">
      {#each cards_content as content, i}
        {@render card(content, i)}
      {/each}
    </div>
  </div>
</section>

<style>
  /* 1. KEYFRAME MATH
     -100% moves the cards entirely to the left.
     + var(--window-width) pulls the "end" of the strip back into the visible window.
  */
  @keyframes move {
    to {
      transform: translateX(calc(-100% + var(--window-width)));
    }
  }

  #sectionPin {
    margin-top: var(--gap-2);
    width: 100%;
    overflow: visible; /* Required for sticky child to work */
    view-timeline-name: --section-pin-tl;
    view-timeline-axis: block;
  }

  .pin-wrap-sticky {
    /* Set the visible window width to match your Hero/Grid */
    --window-width: min(1000px, 100svw);
    
    position: sticky;
    top: 0;
    width: 100%;
    max-width: var(--window-width);
    height: 100svh;
    margin: 0 auto; /* Centers the window */
    
    display: flex;
    align-items: center;
    overflow: hidden; /* Clips the cards that are "waiting" to scroll in */
  }

  .pin-wrap {
    display: flex;
    flex-wrap: nowrap;
    width: max-content; /* Container expands to fit all card widths */
    
    will-change: transform;
    animation: linear move forwards;
    animation-timeline: --section-pin-tl;
    animation-range: contain 0% contain 100%;
  }

  .box {
    /* Rigidity is critical: don't let flexbox squish the cards */
    flex: 0 0 400px; 
    width: 400px;
    margin-right: var(--gap-2); /* Space between cards */
    white-space: normal;
    padding: var(--gap-1);
    border-radius: 8px; /* Optional: matches your site style */
    
    /* Ensure cards don't have a margin-right on the very last item 
       to keep the 'end' alignment clean */
    &:last-of-type {
      margin-right: 0;
    }
  }

  /* Shared classes for alternating colors */
  :global(.trans-blue) {
    background-color: rgba(0, 100, 255, 0.1);
    border: 1px solid var(--brand-blue);
  }

  :global(.trans-orange) {
    background-color: rgba(255, 100, 0, 0.1);
    border: 1px solid var(--brand-orange);
  }
</style>