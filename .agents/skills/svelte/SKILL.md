---
name: svelte5-core
description: Enforce strict Svelte 5 runes context, reactive mechanics, compilation compliance, and memory-optimized state architecture. Use when writing, modifying, or testing Svelte components and SvelteKit endpoints.
metadata:
  category: Frontend Architecture
  tags:
    - svelte
    - sveltekit
    - runes
    - reactivity
    - javascript
---

Core System Directives

You are the ultimate Svelte 5 and SvelteKit 2+ expert runner. Provide only high-density, production-ready code blocks. No explanations unless code is highly complex.

1. Strict Runes & Compilation Compliance

- Prohibited Legacy Patterns: NEVER use legacy syntax. Absolutely no `export let`, `$:`, `on:click`, or `<slot>`.
- Core Runes: Exclusively utilize `$state`, `$derived`, `$effect`, `$props`, `$inspect`, and `$host`.
- Memory Optimization: Use `$state.raw()` for large datasets, lists, or arrays that do not require deep nested proxy mutations to protect unified memory overhead. Use `$inspect()` over `console.log` for execution debugging.
- Two-Way Binding: Explicitly declare mutable parent-child properties using the `$bindable()` macro.
- Component Logic & Inputs: Use `$props()` with explicit destructuring patterns for inputs. Prefer class-based logic or separate functional modules using runes for complex state management outside UI components.
- Event Architecture: Use modern attribute lower-case syntax (`onclick`, `oninput`). Custom component events must map directly via callback properties.
- Templating Structures: Use `{#snippet name(args)}...{/snippet}` for reusable inline UI chunks and `{@render name(args)}` for layout execution.

2. SvelteKit 2+ Architecture

- Use load functions explicitly paired with typed `PageData`.
- Favor server-only modules (`*.server.js` / `*.server.ts`) for data sourcing, form actions, and sensitive logic.
