<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    cards_content: string[];
  }

  let { cards_content }: Props = $props();

  /** * DYNAMIC HEIGHT
   * Controls the "scroll duration." 
   * 60vh per card provides a smooth, readable pace.
   */
  const dynamicHeight = $derived(cards_content.length * 60); 
</script>

{#snippet card(content: string, index: number)}
  <div class="box {index % 2 === 0 ? 'trans-blue' : 'trans-orange'}">
    {@html content}
  </div>
{/snippet}

<section id="sectionPin" style="--dynamic-height: {dynamicHeight}vh;">
  <div class="pin-wrap-sticky">
    <div class="pin-wrap">
      {#each cards_content as content, i}
        {@render card(content, i)}
      {/each}
    </div>
  </div>
</section>

<style>
  #sectionPin {
    /* The "Window Width" variable ensures the scroll area matches your 
       site's layout. On mobile, we use 90% to keep a margin on the sides.
    */
    --window-width: min(1000px, 90vw);
    
    width: 100%;
    height: var(--dynamic-height);
    margin-top: var(--gap-2);
    
    /* Required for sticky behavior to trigger */
    overflow: visible; 
    view-timeline-name: --section-pin-tl;
    view-timeline-axis: block;
  }

  @keyframes move {
    to {
      /* Moves the wide strip left, but stops so the last card's right edge 
         aligns with the right edge of the window. */
      transform: translateX(calc(-100% + var(--window-width)));
    }
  }

  .pin-wrap-sticky {
    position: sticky;
    top: 0;
    
    /* CRITICAL: This container must NOT be 100vw or it blows out the layout.
       It should be the "window" through which we see the cards. */
    width: var(--window-width);
    max-width: var(--window-width);
    margin: 0 auto; /* Centers the scroll window on the page */
    
    height: 100svh;
    display: flex;
    align-items: center;
    
    /* CRITICAL: This hides the cards that are waiting to slide in. */
    overflow: hidden; 
  }

  .pin-wrap {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    padding: 0;

    will-change: transform;
    animation: linear move forwards;
    animation-timeline: --section-pin-tl;
    animation-range: contain 0% contain 100%;
  }

  .box {
    /* On mobile, cards are just slightly narrower than the window 
       so the user can see the next card "peeking" in. */
    --card-width: calc(var(--window-width) - 2rem);
    
    flex: 0 0 var(--card-width);
    width: var(--card-width);
    margin-right: var(--gap-1);
    white-space: normal;
    padding: var(--gap-1);
    border-radius: 12px;
    
    /* Transition card width for desktop */
    @media (min-width: 768px) {
      flex: 0 0 400px;
      width: 400px;
      margin-right: var(--gap-2);
    }

    &:last-of-type {
      margin-right: 0;
    }
  }

  /* Internal Card Styling */
  .box :global(p) {
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 480px) {
    .box :global(p) {
      font-size: 0.85rem;
    }
  }

  /* Shared classes for alternating colors */
  :global(.trans-blue) {
    background-color: rgba(0, 100, 255, 0.05);
    border: 1px solid var(--brand-blue);
  }

  :global(.trans-orange) {
    background-color: rgba(255, 100, 0, 0.05);
    border: 1px solid var(--brand-orange);
  }
</style>