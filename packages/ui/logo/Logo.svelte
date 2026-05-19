<script lang="ts">
  import { Rainbow } from "@lucide/svelte";
</script>

<div class="logo">
  <p>TAP <span class="icon-container"><Rainbow size={57} /></span></p>
  <span>The Autonomy Protocol</span>
</div>

<style>
  .icon-container {
    color: var(--brand-secondary);
  }
  p {
    display: flex;
    font-size: 2.5em;
    font-family: var(--font-thick);
    font-weight: 800;
    color: var(--brand-primary);
    margin: 0;
    margin-bottom: -22px;
  }
  span {
    font-size: 0.9em;
    font-family: var(--font-sans-2);
    font-weight: 800;
    color: var(--brand-tertiary-light);
  }

  @media (max-width: 600px) {
    .logo {
      text-align: center;
      margin-bottom: var(--gap-1);
    }
  }
</style>
