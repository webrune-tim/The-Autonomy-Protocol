<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { FourAgreements } from "@autonomy/four-agreements";

  const { Story } = defineMeta({
    title: "Content/IntegrityShield (4 Agreements)",
    component: FourAgreements,
    tags: ["autodocs"],
  });
</script>

<Story name="The Integrity Shield">
  <div style="max-width: 960px; margin: 0 auto;">
    <FourAgreements />
  </div>
</Story>
