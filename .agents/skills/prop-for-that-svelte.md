---
name: prop-for-that-svelte
description: Core concepts, syntax, and implementation patterns for the Prop-for-That library using Vanilla JS and Svelte 5 actions/runes.
---

# Prop for That: Pure JS & Svelte 5 Guide

"Props for That" bridges the gap between runtime JavaScript state (such as pointer position and intersections) and CSS by writing batched, diffed CSS custom properties (`--live-*` and `--const-*`) straight to the DOM. This allows your stylesheets to react without continuous JavaScript framework overhead.

## 1. Zero-Config Auto Mode (Vanilla HTML)

The simplest integration uses a global `MutationObserver` that automatically binds elements based on `data-props-for` attributes.

```html
<!DOCTYPE html>
<html lang="en" data-props-for="pointer scroll-velocity" data-props-typed>
  <head>
    <meta charset="UTF-8" />
    <title>Prop for That - Pure JS</title>
    <style>
      .card {
        /* Fluid sizing based on the element's own exact width */
        font-size: calc(var(--live-w) * 0.04px);
        /* Rotate elements based on the pointer's X ratio */
        transform: rotateY(calc((var(--live-pointer-x-ratio) - 0.5) * 16deg));
      }

      /* Threshold styling using style queries */
      @container style(--live-visibility-ratio: 1) {
        .card {
          opacity: 1;
        }
      }
    </style>
  </head>
  <body>
    <!-- Element sources attach directly to the node (e.g., size, visibility) -->
    <div class="card" data-props-for="size visibility">Pure HTML/JS Card</div>

    <!-- Import the auto module to bootstrap the observer -->
    <script type="module">
      import "prop-for-that/auto";
    </script>
  </body>
</html>
```

- `data-props-typed`: Registers custom properties using the CSS `@property` syntax for strict types and CSS transitions.
- `data-props-seed="[number]"`: Seeds the random generator for the `random` plugin.

## 2. Core Sources vs. Plugins

### Core Sources (Main Bundle)

- `viewport`: Window dimensions.
- `size`: Element `width` and `height`.
- `visibility`: Intersection Observer ratios for scroll-reveals.
- `range`: Normalizes native `<input type="range">` data.

### Plugin Sources (Tree-Shakeable)

- **Inputs:** `pointer`, `scroll-velocity`, `fps`.
- **Sensors:** `geo`, `orientation`, `battery`.
- **Utility:** `random`.

## 3. Programmatic API Reference (Vanilla JS)

For granular control, use the exported programmatic API.

```typescript
import {
  configure,
  register,
  unregister,
  propsFor,
  pause,
  resume,
  unbind,
  reset,
} from "prop-for-that";
import { pointer, scrollVelocity } from "prop-for-that/plugins";

// 1. Configure the loop and prefixes
configure({
  livePrefix: "--pft-live-",
  constPrefix: "--pft-const-",
  typed: true,
  liveHz: 30,
  randomSeed: 12345,
});

// 2. Register plugins
register(pointer);
register(scrollVelocity);

// 3. Attach global sources to :root
const unbindGlobal = propsFor(["pointer"]);

// 4. Attach element-specific sources
const cardElement = document.querySelector(".card");
if (cardElement) {
  const unbindCard = propsFor(cardElement, ["size", "visibility"]);
}

// Lifecycle methods available for custom UI controls
// pause();  // Freezes the rAF loop
// resume(); // Resumes the rAF loop
// reset(cardElement, ['size']); // Restores initial un-mutated state
// unbind(cardElement, ['size']); // Explicitly removes bindings
```

## 4. Svelte 5 Integration

To elegantly bind these properties in a Svelte 5 application, extract the `propsFor` initialization into a reusable Svelte action.

### `src/lib/actions/useProps.ts`

```typescript
import { propsFor } from "prop-for-that";
import type { Action } from "svelte/action";

export const useProps: Action<HTMLElement, string[]> = (node, keys) => {
  const unbind = propsFor(node, keys);

  return {
    destroy: () => unbind(),
  };
};
```

### `src/lib/components/InteractiveCard.svelte`

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { register, propsFor } from 'prop-for-that';
  import { pointer } from 'prop-for-that/plugins';
  import { useProps } from '$lib/actions/useProps';

  // Svelte 5 Runes for component props
  let { title = "Interactive Svelte Card" }: { title?: string } = $props();

  // Register the pointer plugin and attach it globally on component mount
  onMount(() => {
    register(pointer);
    const unbindGlobal = propsFor(['pointer']);

    return () => {
      unbindGlobal();
    };
  });
</script>

<div
  class="card"
  use:useProps={['size', 'visibility']}
>
  <h2>{title}</h2>
  <p>Reacting to --live-pointer-x-ratio and --live-w</p>
</div>

<style>
  .card {
    transition: transform 0.1s ease-out;
    /* CSS responds to the state exposed by the Svelte action */
    transform: rotateY(calc((var(--live-pointer-x-ratio, 0.5) - 0.5) * 16deg));
    font-size: calc(var(--live-w, 300) * 0.04px);
    padding: 2rem;
    background: #f4f4f4;
    border-radius: 12px;
  }
</style>
```
