<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { SEO } from "@autonomy/seo";

  const { Story } = defineMeta({
    title: "Blocks/SEO",
    component: SEO,
    tags: ["autodocs"],
    args: {
      title: "Advisory Curriculum | The Autonomy Protocol",
      description: "Non-secular, politically neutral educational framework designed to transition high school students to internal self-governance.",
      keywords: "executive functioning, psychological literacy, autonomy protocol, CTE",
      siteName: "The Autonomy Protocol",
      canonical: "https://the-autonomy-protocol.vercel.app/curriculum",
    },
  });
</script>

<Story name="Metadata Preview">
  <SEO
    title="Advisory Curriculum | The Autonomy Protocol"
    description="Non-secular, politically neutral educational framework designed to transition high school students to internal self-governance."
    keywords="executive functioning, psychological literacy, autonomy protocol, CTE"
    siteName="The Autonomy Protocol"
    canonical="https://the-autonomy-protocol.vercel.app/curriculum"
  />

  <div style="background: var(--surface-1, #1e222a); border: 1px solid var(--ui-border, #333); border-radius: 8px; padding: 1.5rem; max-width: 600px;">
    <h3 style="margin-top: 0; color: var(--brand-primary, #88c0d0); font-size: 1.1rem;">Search Engine Snippet Preview</h3>
    <div style="font-size: 0.85rem; color: var(--text-secondary, #a0aec0); margin-bottom: 0.25rem;">https://the-autonomy-protocol.vercel.app &rsaquo; curriculum</div>
    <div style="font-size: 1.2rem; color: #58a6ff; margin-bottom: 0.5rem; text-decoration: underline; cursor: pointer;">Advisory Curriculum | The Autonomy Protocol</div>
    <div style="font-size: 0.9rem; color: var(--fg, #eceff4); line-height: 1.4;">
      Non-secular, politically neutral educational framework designed to transition high school students to internal self-governance.
    </div>
  </div>
</Story>
