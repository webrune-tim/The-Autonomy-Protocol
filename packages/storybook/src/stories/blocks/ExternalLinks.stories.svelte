<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { ExternalLinks } from "@autonomy/external_links";

  const { Story } = defineMeta({
    title: "Blocks/ExternalLinks",
    component: ExternalLinks,
    tags: ["autodocs"],
  });
</script>

<Story name="Resource Directory">
  <div style="max-width: 900px; margin: 0 auto;">
    <ExternalLinks />
  </div>
</Story>
