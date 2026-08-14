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
    <button class="dismiss-button" onclick={dismissBanner} aria-label="Dismiss banner">
      <X size={20} />
      <span class="sr-only">Dismiss banner</span>
    </button>
    <div class="banner-body">
      {@render children()}
    </div>
  </div>
{/if}

<style>
  .banner {
    position: relative;
    background-color: var(--brand-secondary);
    color: var(--brand-secondary-contrast);
    border-radius: var(--border-radius);
    padding: var(--gap-2);
    padding-inline-end: calc(var(--gap-2) * 2.2);
    margin-block-end: var(--gap-2);
    font-size: clamp(0.95rem, 1.4vw, 1.15rem);
    line-height: 1.5;
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.15);
  }

  .banner-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .banner-body :global(p) {
    margin: 0;
    color: var(--brand-secondary-contrast);
  }

  .dismiss-button {
    all: unset;
    position: absolute;
    top: var(--gap-1);
    right: var(--gap-1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--brand-secondary-contrast);
    cursor: pointer;
    padding: 0.35rem;
    border-radius: var(--border-radius-sm);
    opacity: 0.85;
    transition: opacity 0.2s ease, background-color 0.2s ease;
  }

  .dismiss-button:hover {
    opacity: 1;
    background-color: oklch(from var(--brand-secondary-contrast) l c h / 0.15);
  }

  :global(.banner a) {
    color: var(--brand-secondary-contrast) !important;
    text-decoration: underline;
    font-weight: 700;
  }

  :global(.banner a:hover) {
    opacity: 0.85;
  }
</style>
