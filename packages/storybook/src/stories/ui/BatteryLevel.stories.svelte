<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { BatteryLevel } from "@autonomy/battery-level";

  const { Story } = defineMeta({
    title: "UI/BatteryLevel",
    component: BatteryLevel,
    tags: ["autodocs"],
  });
</script>

<Story name="Default">
  <div style="min-height: 120px; position: relative;">
    <BatteryLevel />
  </div>
</Story>
