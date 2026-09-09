<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { RevealingImage } from "@autonomy/revealing_image";

  const { Story } = defineMeta({
    title: "Blocks/RevealingImage",
    component: RevealingImage,
    tags: ["autodocs"],
    args: {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      alt: "Collaborative learning session",
      width: 600,
      height: 400,
    },
  });
</script>

<Story name="Default" />
