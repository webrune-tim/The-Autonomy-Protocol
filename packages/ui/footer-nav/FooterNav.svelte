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
    margin: 0 auto;
    margin-top: var(--gap-1);
    margin-bottom: var(--gap-1);
    width: 100%;
    height: fit-content;
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: var(--gap-1);
    padding: var(--gap-1) 0;
    margin: 0;
    font-weight: bold;
    height: fit-content;

    li {
      display: flex;
      place-items: center;
      margin: 0;
      padding: 0;
      flex: 1;
    }
  }

  a {
    color: var(--brand-teal);
    padding: 2px 4px;
    text-decoration: none;
    white-space: nowrap;
    flex: 1;
    text-align: center;

    &:hover,
    &.active {
      color: var(--fb);
      text-decoration: underline;
    }
  }
</style>
