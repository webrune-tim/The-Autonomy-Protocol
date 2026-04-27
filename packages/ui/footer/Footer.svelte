<script lang="ts">
  import type { Snippet } from 'svelte';

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
    display: grid;
    place-items: center;
    background: rgb(from var(--brand-blue) r g b / 0.25);
    padding: var(--gap-2);
    margin-top: var(--gap-1);
    border: 2px solid var(--brand-orange);
    border-radius: var(--border-radius);
  }
</style>
