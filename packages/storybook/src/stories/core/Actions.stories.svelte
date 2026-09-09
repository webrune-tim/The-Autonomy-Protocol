<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { autoContrast, foresight, thickMargins } from "@autonomy/actions";

  const { Story } = defineMeta({
    title: "Core/Actions",
    tags: ["autodocs"],
  });
</script>

<Story name="DOM Actions">
  <div style="font-family: var(--font-body, sans-serif); color: var(--fg, #eceff4); max-width: 800px; display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <h3>1. <code>autoContrast</code> Action</h3>
      <p>Automatically measures background computed color and updates element contrast styles:</p>
      <div use:autoContrast style="background-color: #88c0d0; padding: 1.5rem; border-radius: 8px; font-weight: 600;">
        Element with <code>use:autoContrast</code> on Nord Frost
      </div>
    </div>

    <div>
      <h3>2. <code>thickMargins</code> Action</h3>
      <p>Applies ergonomic breathing room and margin adjustments dynamically:</p>
      <div use:thickMargins style="background: var(--surface-1, #1e222a); border: 1px solid var(--ui-border, #333); padding: 1.5rem; border-radius: 8px;">
        Element with <code>use:thickMargins</code>
      </div>
    </div>

    <div>
      <h3>3. <code>foresight</code> Action</h3>
      <p>Speculative prefetching on link hover / intent for accelerated navigation:</p>
      <a href="#demo-foresight" use:foresight style="color: var(--brand-primary, #88c0d0); text-decoration: underline;">
        Speculatively Prefetched Link with <code>use:foresight</code>
      </a>
    </div>
  </div>
</Story>
