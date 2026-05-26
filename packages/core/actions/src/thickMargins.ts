import type { Action } from "svelte/action";

/**
 * Toggles a class based on a viewport threshold.
 * @param node The HTMLElement the action is attached to.
 * @param threshold The pixel width at which to toggle the margin class.
 */
export const thickMargins: Action<HTMLElement, number | undefined> = (node, threshold = 700) => {
  const mediaQuery = window.matchMedia(`(max-width: ${threshold - 1}px)`);

  const update = (e: MediaQueryListEvent | MediaQueryList): void => {
    // Toggles 'thick-margins' if the viewport is wider than the threshold
    node.classList.toggle("thick-margins", !e.matches);
  };

  // Initial check
  update(mediaQuery);

  mediaQuery.addEventListener("change", update);

  return {
    destroy() {
      mediaQuery.removeEventListener("change", update);
    },
  };
};
