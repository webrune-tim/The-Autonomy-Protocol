<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { ThemeToggle } from "@autonomy/theme-toggle";

  const { Story } = defineMeta({
    title: "UI/ThemeToggle",
    component: ThemeToggle,
    tags: ["autodocs"],
  });
</script>

<Story name="Default" />
