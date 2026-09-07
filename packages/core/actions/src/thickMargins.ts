import type { Action } from "svelte/action";

/**
 * Attaches the 'thick-margins' class, with breakpoint responsiveness
 * delegated entirely to CSS media queries for optimal rendering performance.
 */
export const thickMargins: Action<HTMLElement, number | undefined> = (node) => {
  node.classList.add("thick-margins");
};
