<script lang="ts">
    import { page } from '$app/state'
    import { Menu, X } from '@lucide/svelte'
    import { fly } from 'svelte/transition'
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
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    >
        {#if isOpen}
            <X size={28} />
        {:else}
            <Menu size={28} />
        {/if}
    </button>

    {#if isOpen}
        <div
            class="dropdown-content"
            in:fly={{ y: -8, duration: 250, easing: cubicOut }}
            out:fly={{ y: -8, duration: 150, easing: cubicIn }}
        >
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

                    <li>
                        <a href={getPortalToggle(page.url.pathname).href} class="portal-link" onclick={closeMenu}>
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
                            <a href="/login" class="login-link" onclick={closeMenu}>Login</a>
                        </li>
                    {/if}
                </ul>
            </nav>
        </div>
    {/if}
</div>

<style>
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
        padding: 0.35rem;
        border-radius: var(--border-radius-sm);
        border: 1px solid transparent;
        transition: transform 0.15s ease, background-color 0.2s ease, border-color 0.2s ease;
    }

    button.dropdown-toggle:hover {
        background: oklch(from var(--fg) l c h / 0.1);
        border-color: var(--ui-border);
    }

    button.dropdown-toggle:active {
        transform: scale(0.95);
    }

    .dropdown-content {
        position: absolute;
        top: calc(100% + 0.5rem);
        right: 0;
        background: oklch(from var(--surface-1) l c h / 95%);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--ui-border);
        box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.4), 0 0 0 1px oklch(from var(--brand-primary) l c h / 0.2);
        border-radius: var(--border-radius);
        width: max-content;
        min-width: 220px;
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
        letter-spacing: 0.04em;
        white-space: nowrap;
        border-radius: var(--border-radius-sm);
        transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
    }

    a.active {
        color: var(--brand-primary);
        background: oklch(from var(--brand-primary) l c h / 0.15);
        border-left: 3px solid var(--brand-primary);
        font-weight: 700;
    }

    a:hover {
        color: var(--fg);
        background: oklch(from var(--brand-secondary) l c h / 0.15);
    }

    .portal-link {
        color: var(--brand-tertiary);
        border-top: 1px solid var(--ui-border);
        margin-top: 0.25rem;
        padding-top: 0.65rem;
    }

    .portal-link:hover {
        background: oklch(from var(--brand-tertiary) l c h / 0.15);
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
        letter-spacing: 0.04em;
        color: var(--error-border);
        cursor: pointer;
        border-radius: var(--border-radius-sm);
        transition: background-color 0.2s ease;
    }

    .link-button:hover {
        background: oklch(from var(--error-border) l c h / 0.15);
    }

    .login-link {
        color: var(--brand-primary);
        font-weight: 700;
    }
</style>
