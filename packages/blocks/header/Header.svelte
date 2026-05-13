<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    logo,
    actions,
    nav,
  }: {
    logo?: Snippet;
    actions?: Snippet;
    nav?: Snippet;
  } = $props();
</script>

<header>
  <div class="brand">
    {#if logo}{@render logo()}{/if}
  </div>

  <div class="actions">
    {#if actions}{@render actions()}{/if}
    {#if nav}{@render nav()}{/if}
  </div>
</header>

<style>
  header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom: var(--gap-2);
    justify-content: space-between;
    background-color: var(--color-background);
    border-bottom: 1px solid var(--color-border);
  }

  :global(.actions) {
    display: flex;
    gap: var(--gap-1);
  }

  :global(.navigation) {
    width: 100%;
  }
</style>
