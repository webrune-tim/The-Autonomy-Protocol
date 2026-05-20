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
  <div class="banner auto-contrast" style="--color: var(--brand-secondary)">
    <button onclick={dismissBanner}>
      <X />
      <span class="sr-only">Dismiss banner</span>
    </button>
    {@render children()}
  </div>
{/if}

<style>
  .banner {
    --color: var(--brand-secondary);
    background: var(--color);

    position: relative;
    /*color: --contrast-color(var(--color));*/
    padding: var(--gap-2);
    padding-right: calc(var(--gap-2) * 2.5);
    /* margin-bottom: var(--gap-2); */
    height: fit-content;
    font-size: clamp(1rem, 2svw, 1.25rem);

    button {
      position: absolute;
      top: var(--gap-1);
      right: var(--gap-1);
      background: none;
      border: none;
      color: --contrast-color(var(--color));
      font-size: 1.25rem;
      cursor: pointer;
    }
  }

  :global(.banner a) {
    color: --contrast-color(var(--color));
    text-decoration: underline;
    font-weight: bold;
  }
</style>
