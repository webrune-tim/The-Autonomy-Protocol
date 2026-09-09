<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Nav, DropNav, FooterNav } from "@autonomy/nav";

  const sampleLinks = [
    { href: "/", label: "Overview" },
    { href: "/curriculum", label: "Curriculum" },
    { href: "/pathways", label: "CTE Pathways" },
    { href: "/accountability", label: "Accountability" },
    { href: "/resources", label: "Resources" },
  ];

  const { Story } = defineMeta({
    title: "Blocks/Nav",
    component: Nav,
    tags: ["autodocs"],
  });
</script>

<Story name="Desktop Navigation">
  <div style="max-width: 900px; margin: 0 auto;">
    <Nav links={sampleLinks} currentPath="/curriculum" />
  </div>
</Story>

<Story name="Dropdown Menu">
  <div style="display: flex; justify-content: flex-end; padding: 2rem; min-height: 250px;">
    <DropNav links={sampleLinks} currentPath="/curriculum" />
  </div>
</Story>

<Story name="Footer Navigation">
  <div style="max-width: 900px; margin: 0 auto;">
    <FooterNav links={sampleLinks} currentPath="/" />
  </div>
</Story>
