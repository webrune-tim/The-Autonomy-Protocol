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
          class="auto-contrast"
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
    width: 100%;
  }

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    /* Center prevents awkward spacing on mobile when links wrap */
    justify-content: center;
    gap: var(--gap-2) var(--gap-3); /* Vertical gap, horizontal gap */
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    place-items: center;
    flex: none;
  }

  a {
    background: inherit;
    text-decoration: none;
    white-space: nowrap;
    color: var(--fg);
    
    /* Technical Index Aesthetic */
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    opacity: 0.8; /* Slightly dim inactive links */
    transition: opacity 0.2s ease, color 0.2s ease;

    &:hover {
      color: var(--brand-secondary);
      opacity: 1;
      font-weight: bolder;
    }

    &.active {
      font-weight: bolder;
      opacity: 1;
      border-bottom: 2px solid;
    }
  }
</style>
