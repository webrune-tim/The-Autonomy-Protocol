<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { TwelveSteps } from "@autonomy/twelve-steps";

  const { Story } = defineMeta({
    title: "Content/AccountabilityCycle (12 Steps)",
    component: TwelveSteps,
    tags: ["autodocs"],
  });
</script>

<Story name="The Accountability Cycle">
  <div style="max-width: 960px; margin: 0 auto;">
    <TwelveSteps />
  </div>
</Story>
