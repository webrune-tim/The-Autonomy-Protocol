<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { ScrollToTop, ScrollToTopWithTime } from "@autonomy/scroll-to-top";

  const { Story } = defineMeta({
    title: "UI/ScrollToTop",
    component: ScrollToTop,
    tags: ["autodocs"],
  });
</script>

<Story name="Standard">
  <div style="min-height: 1200px; padding: 2rem;">
    <p>Scroll down the viewport to reveal the scroll-to-top trigger button...</p>
    <ScrollToTop threshold={5} position="right" />
  </div>
</Story>

<Story name="With Reading Time Indicator">
  <div style="min-height: 1200px; padding: 2rem;">
    <p>Scroll down to reveal the integrated progress and time indicator...</p>
    <ScrollToTopWithTime threshold={5} position="right" />
  </div>
</Story>
