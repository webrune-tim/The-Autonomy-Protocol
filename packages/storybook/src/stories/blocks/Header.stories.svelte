<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Header } from "@autonomy/header";
  import { Logo } from "@autonomy/logo";
  import { ThemeToggle } from "@autonomy/theme-toggle";

  const { Story } = defineMeta({
    title: "Blocks/Header",
    component: Header,
    tags: ["autodocs"],
  });
</script>

<Story name="Standard Header">
  <Header>
    {#snippet logo()}
      <Logo />
    {/snippet}
    {#snippet actions()}
      <ThemeToggle />
    {/snippet}
  </Header>
</Story>
