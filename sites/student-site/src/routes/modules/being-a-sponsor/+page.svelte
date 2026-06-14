<script>
    import { moduleState, getModuleProgress } from '$stores/moduleStore.svelte.ts';

    // Set which module this page represents
    const moduleId = 'module-5';

    // Mock data for the 5 sections
    const sections = [
        { id: 'section1', title: '1. Introduction', content: 'Welcome to the first section. Read this carefully to understand the basics.' },
        { id: 'section2', title: '2. Core Concepts', content: 'Let us dive into the core concepts and fundamental rules of this module.' },
        { id: 'section3', title: '3. Practical Application', content: 'Time to put those concepts into practice with some real-world examples.' },
        { id: 'section4', title: '4. Advanced Techniques', content: 'Here are some advanced tips and tricks to level up your workflow.' },
        { id: 'section5', title: '5. Summary & Review', content: 'Review what you learned. Check this off when you are ready to move on.' }
    ];

    // $derived ensures this variable recalculates anytime moduleState changes
    let progress = $derived(getModuleProgress(moduleId));
</script>

<div class="module-container">
    <header class="angled-bottom-box">
        <h1 class="reveal-header">Module 5: Being A Sponsor</h1>

        <div class="progress-wrapper">
            <div class="progress-bar" style="width: {progress}%;"></div>
        </div>
        <p class="larger-text">{progress}% Completed</p>
    </header>

    <main class="margin-top-2">
        {#each sections as section}
            <section class="content">
                <h2>{section.title}</h2>
                <p>{section.content}</p>

                <label>
                    <input
                        type="checkbox"
                        bind:checked={moduleState[moduleId][section.id]}
                    />
                    Mark "{section.title}" as complete
                </label>
            </section>
        {/each}
    </main>
</div>

<style>
    /* Kept only the layout-specific constraints;
       everything else maps to tokens.css and index.css */
    .module-container {
        max-width: 800px;
        margin: 0 auto;
        /* Padding maps to standard gap system */
        padding: var(--gap-2);
    }

    .progress-wrapper {
        width: 100%;
        /* Utilizing theme surfaces for correct dark/light mode behavior */
        background-color: var(--surface-3);
        border-radius: var(--border-radius);
        height: 12px;
        overflow: hidden;
        margin: var(--gap-1) 0;
    }

    .progress-bar {
        height: 100%;
        /* Popping the progress bar with the secondary accent */
        background-color: var(--brand-secondary);
        transition: width 0.3s ease;
    }
</style>
