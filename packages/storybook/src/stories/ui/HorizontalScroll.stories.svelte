<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { HorizontalScroll } from "@autonomy/horizontal-scroll";

  const { Story } = defineMeta({
    title: "UI/HorizontalScroll",
    component: HorizontalScroll,
    tags: ["autodocs"],
    args: {
      cards_content: [
        "<h3>Phase 1: Orientation</h3><p>Acknowledging limits of control, sourcing an objective standard, and committing to cognitive alignment.</p>",
        "<h3>Phase 2: Internal Audit</h3><p>Objective self-assessment to identify behavioral liabilities, peer validation, and active intervention.</p>",
        "<h3>Phase 3: Restorative Practice</h3><p>Mapping interpersonal impact and executing action-based repair to rebuild collective trust.</p>",
        "<h3>Phase 4: Maintenance</h3><p>Daily cognitive inventory, real-time conflict de-escalation, and peer mentorship.</p>",
      ],
    },
  });
</script>

<Story name="Default" />
