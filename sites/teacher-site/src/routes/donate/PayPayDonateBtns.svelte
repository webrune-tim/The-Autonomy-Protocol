<script lang="ts">
  import { Layers, Milestone, ShieldCheck, Wrench } from '@lucide/svelte';
  import { enhance } from '$app/forms';
  
  let custom_amount = $state('');
</script>

<h2>Choose your Impact</h2>

<form method="POST" action="?/donate" use:enhance class="donations-list">
  
  <button type="submit" name="amount" value="25" class="cta-donate">
    <Layers /> $25 - The Individual Inventory
  </button>
  
  <button type="submit" name="amount" value="100" class="cta-donate">
    <ShieldCheck /> $100 - The Integrity Shield
  </button>
  
  <button type="submit" name="amount" value="500" class="cta-donate">
    <Milestone /> $500 - The Foundation Pillar
  </button>
  
  <button type="submit" name="amount" value={custom_amount} class="cta-donate">
    <Wrench /> 
    <input 
      type="number"
      class="custom-amount" 
      bind:value={custom_amount} 
      placeholder="0.00"
      min="1"
      onclick={e => e.stopPropagation()}
      onkeydown={e => {
        // If they press enter inside the input, it naturally submits the form
        if (e.key === 'Enter' && (!custom_amount || Number(custom_amount) <= 0)) {
          e.preventDefault(); // Block invalid native submission
          console.log('Please enter a valid amount');
        }
      }}
    /> 
    - Build the Future
  </button>

</form>

<style>
  /* Your existing dark-themed architectural CSS remains completely unchanged */
  .donations-list {
    display: flex;
    flex-direction: column; /* Or whatever layout your original setup used wrapper-wise */
    gap: var(--gap-1, 1rem);
  }
  
  .cta-donate {
    display: inline-flex;
    align-items: center;
    max-width: fit-content;
    gap: 0.5rem;
    padding: var(--gap-1);
    margin-right: var(--gap-1);
    font-size: var(--font-size-4);
    border-radius: 100px;
    text-decoration: none;
    border: clamp(2px, 4svw, 4px) solid var(--brand-secondary);
    background-color: var(--brand-secondary);
    color: var(--brand-secondary-contrast) !important;
    font-weight: 700;
    box-shadow: 0 4px 0px oklch(from var(--brand-secondary) calc(l - 0.25) c h);
    transition: transform 100ms ease, box-shadow 100ms ease;

    @media (max-width: 600px) {
      margin-bottom: var(--gap-1);
      width: 100%;
      justify-content: center;
    }

    &:hover {
      background-color: var(--brand-secondary-light);
      border-color: var(--brand-secondary-light);
      transform: translateY(-2px);
      box-shadow: 0 6px 0px oklch(from var(--brand-secondary) calc(l - 0.3) c h);
    }

    &:active {
      transform: translateY(2px);
      box-shadow: 0 2px 0px oklch(from var(--brand-secondary) calc(l - 0.2) c h);
    }
  }

  .custom-amount {
    width: 8ch;
    background: var(--fg-surface);
    color: var(--bg);
    border: none;
    border-radius: 4px;
    padding: 0.1rem 0.4rem;
    font-family: inherit;
    font-weight: bold;
    font-size: inherit;
    outline: none; 
  }
</style>