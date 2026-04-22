<script lang="ts">
  let { children } = $props();
</script>

<footer>
  {@render children()}
</footer>

<style>
  footer {
    display: grid;
    place-items: center;
    background: rgb(from var(--brand-blue) r g b / 0.25);
    padding: var(--gap-1);
    border: 2px solid var(--brand-orange);
  }
</style>
