<script lang="ts">
  import { onMount } from "svelte";
  import X from "@lucide/svelte/icons/x";

  let { bannerName, children } = $props();

  let showBanner = $state(false);

  onMount(() => {
    if (localStorage.getItem(bannerName) !== "dismissed") {
      showBanner = true;
    }
  });

  function dismissBanner() {
    showBanner = false;
    localStorage.setItem(bannerName, "dismissed");
  }
</script>

{#if showBanner}
  <div class="banner">
    <button onclick={dismissBanner}>
      <X />
      <span class="sr-only">Dismiss banner</span>
    </button>
    {@render children()}
  </div>
{/if}

<style>
  :global(.banner) {
    --color: var(--brand-orange);
    background: var(--color);

    /* AAA Logic:
       If background L > 0.54, result is Black (Light background, Dark Mode).
       If background L < 0.54, result is White (Dark background, Light Mode). */
    --contrast-lightness: oklch(from var(--color) calc((l - 0.54) * -1000) 0 0);
    --dynamic-text: var(--contrast-lightness);

    position: relative;
    color: var(--dynamic-text);
    border-radius: var(--border-radius);
    padding: 10px var(--gap-2);
    margin-bottom: var(--gap-2);
    height: fit-content;
    font-size: clamp(1rem, 2svw, 1.5rem);

    button {
      position: absolute;
      top: 5px;
      right: 5px;
      background: none;
      border: none;
      color: var(--dynamic-text);
      font-size: 1.25rem;
      cursor: pointer;
    }
  }

  :global(.banner a) {
    color: var(--dynamic-text);
    text-decoration: underline;
    font-weight: bold;
  }
</style>
