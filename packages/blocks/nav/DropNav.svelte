<script lang="ts">
  import { page } from "$app/state";
  import { Menu } from "@lucide/svelte";
  import { fly } from "svelte/transition";
  import { ThemeToggle } from "@autonomy/theme-toggle";
  import { cubicOut, cubicIn } from "svelte/easing";

  interface NavLink {
    href: string;
    label: string;
  }

  let {
    links = [],
    currentPath = "/",
  }: { links: NavLink[]; currentPath?: string } = $props();

  let isOpen = $state(false);

  const toggleMenu = (e: MouseEvent) => {
    e.stopPropagation();
    isOpen = !isOpen;
  };

  const closeMenu = () => {
    isOpen = false;
  };

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (isOpen && !node.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClick, true);
    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }
</script>

<div class="dropdown-wrapper" use:clickOutside>
  <button
    class="dropdown-toggle"
    type="button"
    onclick={toggleMenu}
    aria-haspopup="menu"
    aria-expanded={isOpen}
  >
    <Menu size={32} />
  </button>

  {#if isOpen}
    <div 
      class="dropdown-content"
      in:fly={{ y: -10, duration: 550, easing: cubicOut }}
      out:fly={{ y: -10, duration: 150, easing: cubicIn }}
    >
      <nav>
        <section class="theme-toggle-wrapper">
          <ThemeToggle />
        </section>
        <ul>
          {#each links as link}
            <li>
              <a
                href={link.href}
                class:active={currentPath === link.href}
                onclick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          {/each}
          {#if page.data.user}
            <li>
              <form method="POST" action="/logout">
                <button type="submit" class="link-button">
                  Logout
                </button>
              </form>
            </li>
          {:else}
            <li>
              <a href="/login" onclick={closeMenu}>Login</a>
            </li>
          {/if}
        </ul>
      </nav>
    </div>
  {/if}
</div>

<style>
  .theme-toggle-wrapper {
    width: 100%;
    max-height: 80svh;
    overflow-y: scroll;
    display: flex;
    place-content: center;
    padding-top: 0.5rem;
  }

  .dropdown-wrapper {
    position: relative;
    display: inline-flex;
  }

  button.dropdown-toggle {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent !important;
    color: var(--brand-secondary);
    cursor: pointer;
    transition: transform 0.1s ease;
  }

  button.dropdown-toggle:active {
    transform: scale(0.95);
  }

  .dropdown-content {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0; /* Changed from left -400% to right-align with button */
    background:  var(--bg);
    border: 2px solid var(--brand-secondary);
    border-radius: var(--border-radius, 1rem);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    background: var(--bg);
    width: max-content;
    min-width: 180px;
    z-index: 100;
    overflow: hidden;
  }

  ul {
    list-style: none !important;
    padding: 0.5rem;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  a {
    display: block;
    padding: 0.75rem 1.25rem;
    text-decoration: none;
    text-transform: uppercase;
    /* color: var(--brand-primary); */
    border-radius: 6px;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }

  a:hover,
  a.active {
    background: rgb(from var(--brand-secondary) r g b / 0.15) !important;
    color: var(--brand-secondary);
  }

  .link-button {
    all: unset;
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem 1.25rem;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.9rem;
    /* color: var(--brand-primary); */
    cursor: pointer;
  }

  .link-button:hover {
    color: var(--brand-secondary);
    background: rgb(from var(--brand-secondary) r g b / 0.1) !important;
  }
</style>
