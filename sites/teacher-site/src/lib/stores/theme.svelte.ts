import { browser } from "$app/environment";

export type Theme = "light" | "dark" | "system";

class ThemeState {
  #value = $state<Theme>("system");
  #systemTheme = $state<"light" | "dark">("dark");

  // Use $derived for the resolved theme to ensure perfect reactivity
  resolved = $derived.by(() => {
    if (this.#value === "system") {
      return this.#systemTheme;
    }
    return this.#value as "light" | "dark";
  });

  constructor() {
    if (browser) {
      // 1. Initialize from localStorage with validation
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored === "light" || stored === "dark" || stored === "system") {
        this.#value = stored;
      }

      // 2. Use $effect.root for module-level side effects
      $effect.root(() => {
        // Manage system theme listener
        $effect(() => {
          const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

          // Initial sync
          this.#systemTheme = mediaQuery.matches ? "dark" : "light";

          const handler = (e: MediaQueryListEvent) => {
            this.#systemTheme = e.matches ? "dark" : "light";
          };

          if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handler);
            return () => mediaQuery.removeEventListener("change", handler);
          } else {
            // Fallback for older browsers
            // @ts-ignore
            mediaQuery.addListener(handler);
            // @ts-ignore
            return () => mediaQuery.removeListener(handler);
          }
        });

        // Sync to DOM and localStorage
        $effect(() => {
          const theme = this.resolved;
          document.documentElement.setAttribute("data-theme", theme);
          document.documentElement.style.colorScheme = theme;
          localStorage.setItem("theme", this.#value);
        });
      });
    }
  }

  // Public accessors for the theme value
  get value() {
    return this.#value;
  }
  set value(v: Theme) {
    this.#value = v;
  }
}

export const themeState = new ThemeState();
