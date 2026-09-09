<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { ReadingTime } from "@autonomy/reading-time";

  const { Story } = defineMeta({
    title: "UI/ReadingTime",
    component: ReadingTime,
    tags: ["autodocs"],
    args: {
      targetSelector: "#sample-reading-content",
      wordsPerMinute: 200,
      suffix: "min read",
      textColor: "var(--brand-primary, #88c0d0)",
      fontSize: "1rem",
    },
  });
</script>

<Story name="Default">
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <ReadingTime targetSelector="#sample-reading-content" />
    <div id="sample-reading-content" style="max-width: 600px; line-height: 1.6; opacity: 0.85;">
      <p>
        The Autonomy Protocol refactors conventional behavioral paradigms into collegiate-level executive functioning curricula.
        By transitioning adolescent learners from external policing to internal self-governance, students acquire
        the psychological literacy needed to audit cognitive distortions, de-escalate interpersonal friction,
        and establish baseline professional resilience.
      </p>
      <p>
        Observable behavioral shifts replace ambiguous emotional assessments, enabling CTE pathways and advisory
        programs to deliver verified, action-based developmental outcomes.
      </p>
    </div>
  </div>
</Story>
