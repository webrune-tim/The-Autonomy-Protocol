<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Logo } from "@autonomy/logo";

  const { Story } = defineMeta({
    title: "UI/Logo",
    component: Logo,
    tags: ["autodocs"],
  });
</script>

<Story name="Default" />
