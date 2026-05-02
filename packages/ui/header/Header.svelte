<script lang="ts">
    import type { Snippet } from 'svelte';

    let {
        logo,
        actions,
        nav
    }: {
        logo?: Snippet;
        actions?: Snippet;
        nav?: Snippet;
    } = $props();
</script>

<header>
    <div class="brand">
        {#if logo}{@render logo()}{/if}
    </div>

    <div class="actions">
        {#if actions}{@render actions()}{/if}
        {#if nav}{@render nav()}{/if}
    </div>
</header>

<style>
    header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        background-color: var(--color-background);
        border-bottom: 1px solid var(--color-border);
    }

    .actions {
        display: flex;
        gap: var(--gap-1);
    }

    .navigation {
        width: 100%; /* Forces nav to its own row if desired, or let flex handle it */
    }

    @media (max-width: 600px) {
        header {
            justify-content: center;
            gap: 0 var(--gap-2);
        }
    }
</style>