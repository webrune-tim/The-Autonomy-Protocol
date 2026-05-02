<script lang="ts">
  import { Menu } from "@lucide/svelte";

  interface NavLink {
    href: string;
    label: string;
  }

  let {
    links = [],
    currentPath = "/",
  }: { links: NavLink[]; currentPath?: string } = $props();

  // UI State
  let isOpen = $state(false);

  const toggleMenu = (e: MouseEvent) => {
    e.stopPropagation();
    isOpen = !isOpen;
  };

  const closeMenu = () => {
    isOpen = false;
  };

  // Close menu when clicking anywhere else on the page
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
    <Menu />
  </button>

  {#if isOpen}
    <div class="dropdown-content">
      <nav>
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
        </ul>
      </nav>
    </div>
  {/if}
</div>

<style>
  /* Wrapper handles the positioning context */
  .dropdown-wrapper {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
  }

  button.dropdown-toggle {
    /*all: unset;*/
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    background-color: transparent;
    appearance: none;
    border: none;
    box-shadow: none;
    color: var(--brand-orange) !important;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 4px;
    transition: transform 0.1s ease;
  }

  button.dropdown-toggle:active {
    transform: scale(0.95);
  }

  /* The Dropdown Menu */
  .dropdown-content {
    position: absolute;
    top: 100%;
    left: -400%;
    margin-top: 0.5rem;

    /* Transparent Background */
    background: var(--surface-1) !important;

    /* Visuals */
    border: 2px solid var(--brand-orange);
    border-radius: var(--border-radius, 8px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    width: max-content;
    min-width: 160px;
    z-index: 100;
    overflow: hidden;
  }

  ul {
    list-style: none;
    padding: 0.5rem;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    background: transparent;
  }

  li {
    margin: 0;
    padding: 0;
  }

  a {
    display: block;
    padding: 0.6rem 1rem;
    text-decoration: none;
    color: var(--brand-blue);
    border-radius: 4px;
    font-weight: 500;
    transition: background 0.2s ease;
  }

  /* Transparent hover effect using relative color syntax */
  a:hover,
  a.active {
    background: rgb(from var(--brand-orange) r g b / 0.15);
    color: var(--brand-orange);
  }

  /* Ensure the icon inside stays the right color */
  .dropdown-toggle :global(svg) {
    stroke: currentColor !important;
    fill: none;
  }
</style>
