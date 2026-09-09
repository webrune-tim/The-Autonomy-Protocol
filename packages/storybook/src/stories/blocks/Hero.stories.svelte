<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Hero } from "@autonomy/hero";

  const { Story } = defineMeta({
    title: "Blocks/Hero",
    component: Hero,
    tags: ["autodocs"],
  });
</script>

<Story name="Curriculum Hero">
  <Hero HeroImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80">
    {#snippet children()}
      <h1 style="font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--fg, #eceff4);">The Autonomy Protocol</h1>
      <p style="font-size: 1.1rem; line-height: 1.5; color: var(--text-secondary, #d8dee9);">
        Transitioning high school students from external policing to internal self-governance.
      </p>
    {/snippet}
  </Hero>
</Story>
