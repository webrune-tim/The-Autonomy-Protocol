export type Theme = "light" | "dark" | "system";

class ThemeState {
  #value = $state<Theme>("system");
  #systemTheme = $state<"light" | "dark">("dark");
  #isBrowser = typeof window !== "undefined";

  resolved = $derived.by(() => {
    if (this.#value === "system") {
      return this.#systemTheme;
    }
    return this.#value as "light" | "dark";
  });

  constructor() {
    if (this.#isBrowser) {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored === "light" || stored === "dark" || stored === "system") {
        this.#value = stored;
      }

      $effect.root(() => {
        $effect(() => {
          const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
          this.#systemTheme = mediaQuery.matches ? "dark" : "light";

          const handler = (e: MediaQueryListEvent) => {
            this.#systemTheme = e.matches ? "dark" : "light";
          };

          mediaQuery.addEventListener("change", handler);
          return () => mediaQuery.removeEventListener("change", handler);
        });

        $effect(() => {
          const theme = this.resolved;
          document.documentElement.setAttribute("data-theme", theme);
          document.documentElement.style.colorScheme = theme;
          localStorage.setItem("theme", this.#value);
        });
      });
    }
  }

  init(theme: Theme | null) {
    if (theme && (theme === "light" || theme === "dark" || theme === "system")) {
      this.#value = theme;
    }
  }

  async syncToServer() {
    try {
      await fetch("/api/theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme: this.#value }),
      });
    } catch (e) {
      console.error("Failed to sync theme to server:", e);
    }
  }

  get value() {
    return this.#value;
  }
  set value(v: Theme) {
    this.#value = v;
    if (this.#isBrowser) {
      this.syncToServer();
    }
  }
}

export const themeState = new ThemeState();
