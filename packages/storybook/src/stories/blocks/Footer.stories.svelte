<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Footer } from "@autonomy/footer";
  import { Logo } from "@autonomy/logo";

  const { Story } = defineMeta({
    title: "Blocks/Footer",
    component: Footer,
    tags: ["autodocs"],
  });
</script>

<Story name="Standard Footer">
  <Footer>
    {#snippet children()}
      <Logo />
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
        &copy; 2026 The Autonomy Protocol. Dedicated to self-governance and psychological literacy.
      </p>
    {/snippet}
  </Footer>
</Story>
