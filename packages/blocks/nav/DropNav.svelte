<script lang="ts">
    import { page } from '$app/state'
    import { Menu } from '@lucide/svelte'
    import { fly } from 'svelte/transition'
    import { ThemeToggle } from '@autonomy/theme-toggle'
    import { cubicOut, cubicIn } from 'svelte/easing'
    import { getPortalToggle } from './portal-toggle.svelte.ts'

    interface NavLink {
        href: string
        label: string
    }

    let { links = [], currentPath = '/' }: { links: NavLink[]; currentPath?: string } =
        $props()

    let isOpen = $state(false)

    const toggleMenu = (e: MouseEvent) => {
        e.stopPropagation()
        isOpen = !isOpen
    }

    const closeMenu = () => {
        isOpen = false
    }

    function clickOutside(node: HTMLElement) {
        const handleClick = (event: MouseEvent) => {
            if (isOpen && !node.contains(event.target as Node)) {
                closeMenu()
            }
        }

        document.addEventListener('click', handleClick, true)
        return {
            destroy() {
                document.removeEventListener('click', handleClick, true)
            }
        }
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

                    <li>
                        <a href={getPortalToggle(page.url.pathname).href} onclick={closeMenu}>
                            {getPortalToggle(page.url.pathname).label}
                        </a>
                    </li>

                    {#if page.data.user}
                        <li>
                            <form method="POST" action="/logout">
                                <button type="submit" class="link-button"> Logout </button>
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
        display: flex;
        place-content: center;
        padding: 0.75rem 0.5rem 0.5rem;
        border-bottom: 1px solid rgb(from var(--fg) r g b / 0.1);
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
        background: transparent;
        color: var(--fg);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: var(--border-radius);
        transition: transform 0.15 ease, background-color 0.2s ease;
    }

    button.dropdown-toggle:hover {
        background: rgb(from var(--fg) r g b / 0.1);
    }

    button.dropdown-toggle:active {
        transform: scale(0.95);
    }

    .dropdown-content {
        position: absolute;
        top: calc(100% + 0.5rem);
        right: 0;
        background: oklch(from var(--bg) l c h / 0.92);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 2px solid var(--brand-primary);
        box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.6), 0 0 0 1px rgb(from var(--brand-primary) r g b / 0.25);
        border-radius: var(--border-radius);
        width: max-content;
        min-width: 210px;
        max-height: 80dvh;
        z-index: 100;
        overflow-y: auto;
        overflow-x: hidden;
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
        display: flex;
        align-items: center;
        padding: 0.65rem 1rem;
        text-decoration: none;
        text-transform: uppercase;
        color: var(--fg);
        font-weight: 600;
        font-size: 0.85rem;
        letter-spacing: 0.03em;
        white-space: nowrap;
        border-radius: var(--border-radius);
        transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
    }

    a.active {
        color: var(--brand-primary);
        background: rgb(from var(--brand-primary) r g b / 0.15);
        border-left: 3px solid var(--brand-primary);
    }

    a:hover {
        color: var(--fg);
        background: rgb(from var(--brand-secondary) r g b / 0.2);
    }

    .link-button {
        all: unset;
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        padding: 0.65rem 1rem;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 0.85rem;
        letter-spacing: 0.03em;
        color: var(--fg);
        cursor: pointer;
        border-radius: var(--border-radius);
        transition: background-color 0.2s ease;
    }

    .link-button:hover {
        color: var(--fg);
        background: rgb(from var(--brand-secondary) r g b / 0.2);
    }
</style>
