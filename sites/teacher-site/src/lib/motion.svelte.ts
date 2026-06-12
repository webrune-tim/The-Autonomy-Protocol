import { browser } from "$app/environment";

/**
 * Global state for tracking user motion preference.
 * Utilizes Svelte 5 runes for reactivity.
 */
class MotionState {
  #reduced = $state(false);

  constructor() {
    if (browser) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.#reduced = mediaQuery.matches;

      mediaQuery.addEventListener("change", (e) => {
        this.#reduced = e.matches;
      });
    }
  }

  /**
   * Returns true if the user prefers reduced motion.
   */
  get reduced() {
    return this.#reduced;
  }
}

export const motionState = new MotionState();
