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

    --contrast-lightness: oklch(from var(--color) calc((l - 0.54) * -1000) 0 0);
    --dynamic-text: var(--contrast-lightness);

    position: relative;
    color: var(--dynamic-text);
    padding: var(--gap-2);
    padding-right: calc(var(--gap-2) * 2.5);
    margin-bottom: var(--gap-2);
    height: fit-content;
    font-size: clamp(1rem, 2svw, 1.5rem);

    button {
      position: absolute;
      top: var(--gap-1);
      right: var(--gap-1);
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
