<script lang="ts">
  import { page } from "$app/state";

  interface NavLink {
    href: string;
    label: string;
  }

  let {
    links = [],
    currentPath = "/",
  }: {
    links: NavLink[];
    currentPath?: string;
  } = $props();
</script>

<nav class="auto-contrast">
  <ul>
    {#each links as link}
      <li>
        <a
          href={link.href}
          class="auto-contrast"
          class:active={currentPath === link.href}
          aria-current={currentPath === link.href ? "page" : undefined}
        >
          {link.label}
        </a>
      </li>
    {/each}
    {#if page.data.user}
      <li>
        <a href="/dashboard">Dashboard</a>
      </li>
      <li>
        <button class="link-button" href="/logout">Logout</button>
      </li>
    {:else}
      <li>
        <a href="/login">Login</a>
      </li>
    {/if}
  </ul>
</nav>

<style>
  nav {
    /* Using clamp for the border ensures it stays a 'technical line' across devices */
    border-top: clamp(2px, 0.2svw, 4px) solid var(--fg);
    color: var(--fg);
    background: var(--brand-blue-dark);
    margin: 0 auto;
    width: 100%;
    margin-top: var(--gap-2);
  }

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap-1);
    align-items: center;
    /* Space-between pushes links to the edges of your 'thick-margin' container */
    justify-content: space-around;
    padding: var(--gap-1) 0 0 0;
    padding-top: var(--gap);
    margin: 0;
  }

  li {
    display: flex;
    place-items: center;
    /* Removing flex: 1 allows the letter-spacing to define the rhythm */
    flex: none;
  }

  a, .link-button {
    background: inherit;
    text-decoration: none;
    white-space: nowrap;
    color: var(--fg);

    /* Technical Index Aesthetic */
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    transition:
      opacity 0.2s ease,
      color 0.2s ease;

    &:hover {
      color: var(--brand-orange);
    }

    &.active {
      font-weight: 900;
      /* Subtle underline to tie back to the structural top-border */
      border-bottom: 2px solid var(--fg);
    }
  }
</style>
