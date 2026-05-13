<script lang="ts">
  import type { Snippet } from "svelte";

  // Define the prop type
  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<footer class="auto-contrast">
  {@render children()}
</footer>

<style>
  footer {
    --color: var(--brand-blue);
    height: fit-content;
    display: grid;
    place-items: center;
    /*color: --contrast-color(var(--color));*/
    color: var(--fg);
    background: var(--brand-blue-dark);
    padding: var(--gap-2);
    margin-top: var(--gap-2);
    font-size: var(--font-size-3);
  }
</style>
