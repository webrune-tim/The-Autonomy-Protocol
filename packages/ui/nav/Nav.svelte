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
    {#if page.data.user}
      <li>
        <a href="/dashboard">Dashboard</a>
      </li>
      <li>
        <form method="POST" action="/logout" use:enhance>
      <button type="submit" class="link-button">
        Logout
      </button>
    </form>
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
    anchor-name: --active-link;
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
    color: var(--brand-blue);
    padding: 4px 8px;
    border-radius: var(--border-radius);
    border: 2px solid var(--brand-orange);
    background: rgb(from var(--brand-orange) r g b / 0.15);
    text-decoration: none;
    white-space: nowrap;
    flex: 1;
    text-align: center;

    &:hover,
    &.active {
      color: var(--fb);
      background: rgb(from var(--brand-orange) r g b / 0.3);
    }

    &.active {
      /* If you want a specific active indicator via anchor positioning */
      anchor-name: --active-item;
      border-color: var(--brand-blue);
    }
  }
</style>
