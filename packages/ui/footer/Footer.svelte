<script lang="ts">
  import type { Snippet } from "svelte";

  // Define the prop type
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
    --color: var(--brand-blue);
    --contrast-lightness: oklch(from var(--color) calc((l - 0.54) * -1000) 0 0);
    --dynamic-text: var(--contrast-lightness);

    display: grid;
    place-items: center;
    color: var(--dynamic-text);
    background: var(--color);
    padding: var(--gap-2);
    margin-top: var(--gap-2);
    font-size: var(--font-size-3);
  }
</style>
