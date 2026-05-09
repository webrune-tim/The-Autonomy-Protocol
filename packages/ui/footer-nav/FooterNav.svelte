<script lang="ts">
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

<nav>
  <ul>
    {#each links as link}
      <li>
        <a
          href={link.href}
          class:active={currentPath === link.href}
          aria-current={currentPath === link.href ? "page" : undefined}
        >
          {link.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    /* Using clamp for the border ensures it stays a 'technical line' across devices */
    border-top: clamp(2px, 0.2svw, 4px) solid var(--bg);
    margin: 0 auto;
    width: 100%;
    margin-top: var(--gap-1);
  }

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /* Space-between pushes links to the edges of your 'thick-margin' container */
    justify-content: space-between;
    padding: calc(var(--gap-1) * 0.5) 0 0 0;
    margin: 0;
  }

  li {
    display: flex;
    place-items: center;
    /* Removing flex: 1 allows the letter-spacing to define the rhythm */
    flex: none;
  }

  a {
    color: --contrast-color(var(--brand-blue));
    text-decoration: none;
    white-space: nowrap;

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
      border-bottom: 2px solid --contrast-color(var(--brand-blue));
    }
  }
</style>
