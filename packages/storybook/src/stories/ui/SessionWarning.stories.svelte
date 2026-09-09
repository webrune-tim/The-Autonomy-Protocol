<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { SessionWarning } from "@autonomy/session-warning";

  const { Story } = defineMeta({
    title: "UI/SessionWarning",
    component: SessionWarning,
    tags: ["autodocs"],
  });
</script>

<Story name="Active User Inactivity Warning">
  <div style="padding: 1rem; border: 1px dashed rgba(255,255,255,0.2); border-radius: 8px;">
    <p>Session warning configured with a brief countdown to showcase modal rendering:</p>
    <SessionWarning
      user={{ id: "student-001", name: "Alex Mercer" }}
      idleThresholdMinutes={0.05}
      warningCountdownSeconds={30}
      logoutEndpoint="#"
    />
  </div>
</Story>
