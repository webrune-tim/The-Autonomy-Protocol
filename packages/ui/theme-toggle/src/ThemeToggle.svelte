<script lang="ts">
  import { Sun, Moon } from 'lucide';
  import { MorphIcon } from 'morphicons/svelte';
  import { themeState, type Theme } from './theme.svelte';

  const isLight = $derived(themeState.value === 'light');

  function toggle() {
    const next: Theme = isLight ? 'dark' : 'light';
    themeState.setTheme(next);
  }
</script>

<button
  type="button"
  class="theme-toggle-btn"
  onclick={toggle}
  aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
  title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
>
  <MorphIcon icon={isLight ? Moon : Sun} size={16} strokeWidth={2.2} />
  <span class="theme-label">{isLight ? 'Dark' : 'Light'}</span>
</button>

<style>
  .theme-toggle-btn {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
    background: oklch(from var(--brand-primary) l c h / 0.15);
    border: 1px solid oklch(from var(--brand-primary) l c h / 0.4);
    color: var(--fg);
    font-family: var(--font-ui, sans-serif);
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  }

  .theme-toggle-btn:hover {
    background: oklch(from var(--brand-primary) l c h / 0.25);
    border-color: var(--brand-primary);
    transform: translateY(-1px);
  }

  .theme-toggle-btn:active {
    transform: scale(0.96);
  }

  .theme-label {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.75rem;
  }
</style>
