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
  <div class="header-inner">
    <div class="brand">
      {#if logo}{@render logo()}{/if}
    </div>

    <div class="actions">
      {#if actions}{@render actions()}{/if}
      {#if nav}{@render nav()}{/if}
    </div>
  </div>
</header>

<style>
  header {
    width: 100%;
    background-color: oklch(from var(--bg) l c h / 80%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--ui-border);
    position: sticky;
    top: 0;
    z-index: 50;
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }

  .header-inner {
    width: 100%;
    max-width: var(--max-content-width, 1400px);
    margin-inline: auto;
    padding-inline: clamp(1rem, 3vw, 2.5rem);
    padding-block: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--gap-2);
  }

  .brand {
    display: flex;
    align-items: center;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: var(--gap-1);
  }
</style>
