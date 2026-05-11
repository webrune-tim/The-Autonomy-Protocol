<script lang="ts">
  // Using Svelte 5 Runes
  let { data } = $props();

  // Create a capitalized alias for the component for standard Svelte rendering
  const Content = $derived(data.content);
</script>

<svelte:head>
  <title>{data.meta.title} | Teacher Portal</title>
</svelte:head>

<article class="resource-layout">
  <nav>
    <a href="/resources" class="nav-link">← Back to Resources</a>
  </nav>

  <header class="doc-header">
    <h1>{data.meta.title}</h1>
    {#if data.meta.description}
      <p class="description">{data.meta.description}</p>
    {/if}
  </header>

  <div class="markdown-body">
    {#if Content}
      {@render Content()}
    {/if}
  </div>
</article>

<!-- <style>
  /* Dark Theme Aesthetic */
  :global(body) {
    background-color: #0f111a; /* Deep dark background */
    color: #eceff4;
  }

  .resource-layout {
    max-width: 800px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .nav-link {
    color: #82aaff;
    text-decoration: none;
    font-weight: 500;
  }

  .doc-header {
    margin-top: 2rem;
    border-bottom: 1px solid #2e3440;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }

  h1 {
    color: #80cbc4; /* Brand teal */
    font-size: 2.5rem;
    margin: 0;
  }

  .description {
    color: #94a3b8;
    font-size: 1.1rem;
  }

  /* Targeting the Markdown content specifically */
  .markdown-body :global(h2) {
    color: #c792ea; /* Soft purple */
    margin-top: 2rem;
  }

  .markdown-body :global(p) {
    line-height: 1.7;
    margin-bottom: 1.25rem;
  }

  .markdown-body :global(code) {
    background: #1e293b;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
  }
</style> -->