// src/lib/theme.svelte.ts
import { browser } from "$app/environment";

type Theme = "light" | "dark" | "system";

class ThemeState {
  #value = $state<Theme>("system");

  constructor() {
    if (browser) {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored) {
        this.#value = stored;
      }

      // Sync changes to the DOM and localStorage
      $effect.root(() => {
        $effect(() => {
          const root = document.documentElement;
          const resolvedTheme = this.resolvedValue;

          // Only update if it's different to avoid unnecessary snaps
          if (root.getAttribute("data-theme") !== resolvedTheme) {
            root.setAttribute("data-theme", resolvedTheme);
            root.style.colorScheme = resolvedTheme;
          }
          localStorage.setItem("theme", this.#value);
        });

        // Listen for OS preference changes
        $effect(() => {
          if (this.#value !== "system") return;

          const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
          const handler = () => {
            const root = document.documentElement;
            const resolved = mediaQuery.matches ? "dark" : "light";
            if (root.getAttribute("data-theme") !== resolved) {
              root.setAttribute("data-theme", resolved);
              root.style.colorScheme = resolved;
            }
          };

          mediaQuery.addEventListener("change", handler);
          return () => mediaQuery.removeEventListener("change", handler);
        });
      });
    }
  }

  get value() {
    return this.#value;
  }

  set value(v: Theme) {
    this.#value = v;
  }

  // This determines what is actually applied to the HTML tag
  get resolvedValue(): "light" | "dark" {
    if (!browser) return "dark";
    if (this.#value === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return this.#value;
  }
}

export const themeState = new ThemeState();
