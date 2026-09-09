<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Banner } from "@autonomy/banner";

  const { Story } = defineMeta({
    title: "Blocks/Banner",
    component: Banner,
    tags: ["autodocs"],
  });
</script>

<Story name="System Advisory">
  <Banner bannerName="advisory-notice">
    {#snippet children()}
      <p>
        <strong>Curriculum Notice:</strong> Fall Term 1 begins next Monday.
        Ensure all advisor assessments and baseline cognitive inventories are submitted.
      </p>
    {/snippet}
  </Banner>
</Story>

<Story name="With Action Link">
  <Banner bannerName="restorative-notice">
    {#snippet children()}
      <p>
        Restorative Action protocol updated for 2026 CTE standards.
        <a href="#view-protocol">Review the compliance documentation</a>.
      </p>
    {/snippet}
  </Banner>
</Story>
