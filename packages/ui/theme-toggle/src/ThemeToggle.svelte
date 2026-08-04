<script lang="ts">
  import { Sun, Moon } from '@lucide/svelte'
  import { Pill } from '@autonomy/pill'

  let isMobile = $state(false)
  let mode = $state(localStorage.getItem('mode') ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  $effect(() => {
    const mediaQuery = window.matchMedia('(max-width: 699px)')
    isMobile = mediaQuery.matches

    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('mode', mode);
  })

  function toggleMode(newMode: string) {
    mode = newMode;
  }
</script>

<Pill>
  <div class="theme-toggle">
    <input type="radio" id="mode_dark" name="mode" value="dark" checked={mode === 'dark'} onchange={() => toggleMode('dark')}>
    <label for="mode_dark" aria-label="Switch to dark mode">
      Theme <Moon size={isMobile ? 20 : 14} />
    </label>
    <input type="radio" id="mode_light" name="mode" value="light" checked={mode === 'light'} onchange={() => toggleMode('light')}>
    <label for="mode_light" aria-label="Switch to light mode">
      Theme <Sun size={isMobile ? 20 : 14} />
    </label>
  </div>
</Pill>

<style>
  @media (prefers-color-scheme: dark) {
    :global(:root) {
      /* dark mode variables */
      color-scheme: dark;
      --bg-surface: var(--black-80);
      --fg-surface: var(--white);
      --bg: var(--bg-surface);
      --fg: var(--fg-surface);
      --surface-1: var(--nord0);
      --surface-2: var(--nord1);
      --surface-3: var(--nord2);
      --ui-border: var(--nord4);
    }
  }
  :global(:root:has(#mode_dark:checked)) {
    /* dark mode variables */
    color-scheme: dark;
    --bg-surface: var(--black-80);
    --fg-surface: var(--white);
    --bg: var(--bg-surface);
    --fg: var(--fg-surface);
    --surface-1: var(--nord0);
    --surface-2: var(--nord1);
    --surface-3: var(--nord2);
    --ui-border: var(--nord4);
  }
  :global(:root:has(#mode_light:checked)) {
    /* light mode variables */
    color-scheme: light;
    --bg-surface: var(--nord4);
    --fg-surface: var(--nord0);
    --bg: var(--bg-surface);
    --fg: var(--fg-surface);
    --surface-1: var(--nord4);
    --surface-2: var(--nord5);
    --surface-3: var(--nord6);
    --ui-border: var(--nord4);
  }

  :global(html:has(#mode_dark:checked)) p,
  :global(html:has(#mode_dark:checked)) a {
    /* update variables */
    background: var(--bg);
    color: var(--fg);
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  /* style of the toggle */
  .theme-toggle {
    display: flex;
    align-items: center;
    width: fit-content;
    margin-left: auto;
  }

  /* hide the input */
  .theme-toggle input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    margin: 0;
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .theme-toggle label {
    width: fit-content;
    height: 20px;
    display: grid;
    grid-template-columns: auto 1fr;
    place-items: center;
    cursor: pointer;
  }

  /* icon visibility
   *
   * default light with system and radio button overwrite
   */
  label[for="mode_light"] { display: none; }
  label[for="mode_dark"] { display: grid; }

  @media (prefers-color-scheme: dark) {
    label[for="mode_light"] { display: grid; }
    label[for="mode_dark"] { display: none; }
  }
  :root:has(#mode_dark:checked) label[for="mode_light"] {
     display: grid;
  }
  :root:has(#mode_dark:checked) label[for="mode_dark"] {
     display: none;
  }
  :root:has(#mode_light:checked) label[for="mode_light"] {
     display: none;
  }
  :root:has(#mode_light:checked) label[for="mode_dark"] {
     display: grid;
  }

  .author-link {
    margin-top: auto;
  }
</style>
