<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { getAAAContrastColor } from "@autonomy/utils";

  const { Story } = defineMeta({
    title: "Core/Utils",
    tags: ["autodocs"],
  });
</script>

<Story name="AAA Contrast Calculator">
  {@const testColors = ["#88c0d0", "#bf616a", "#2e3440", "#ebcb8b", "#a3be8c", "#eceff4"]}
  <div style="font-family: var(--font-body, sans-serif); color: var(--fg, #eceff4); max-width: 800px;">
    <h2>Automated AAA Contrast Calculation</h2>
    <p>Using <code>getAAAContrastColor(bgColor)</code> to dynamically select the optimal accessible text color for any background color:</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
      {#each testColors as bg}
        {@const text = getAAAContrastColor(bg)}
        <div style="background-color: {bg}; color: {text}; padding: 1.5rem; border-radius: 8px; font-weight: bold; border: 1px solid rgba(255,255,255,0.1);">
          Background: {bg}
          <div style="font-size: 0.85rem; font-weight: normal; margin-top: 0.5rem;">
            Optimal Text: {text}
          </div>
        </div>
      {/each}
    </div>
  </div>
</Story>
