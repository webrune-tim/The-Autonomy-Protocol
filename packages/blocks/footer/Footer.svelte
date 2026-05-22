<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<footer>
  {@render children()}
</footer>

<style>
  footer {
    max-height: fit-content;
    --color: var(--brand-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--fg);
    background: var(--brand-primary-dark);
    /* Add slightly more padding to the top and bottom to let the footer breathe */
    padding: var(--gap-2) var(--gap-1);
    font-size: var(--font-size-3);
    width: 100%;
  }
</style>