<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Pill } from "@autonomy/pill";

  const { Story } = defineMeta({
    title: "UI/Pill",
    component: Pill,
    tags: ["autodocs"],
  });
</script>

<Story name="Default">
  <Pill>
    {#snippet children()}
      <span>Executive Functioning</span>
    {/snippet}
  </Pill>
</Story>

<Story name="Psychological Literacy">
  <Pill>
    {#snippet children()}
      <span>Psychological Literacy</span>
    {/snippet}
  </Pill>
</Story>

<Story name="Restorative Action">
  <Pill>
    {#snippet children()}
      <span>Restorative Action</span>
    {/snippet}
  </Pill>
</Story>
