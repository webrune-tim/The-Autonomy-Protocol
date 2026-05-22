export export type Theme = "light" | "dark";

class ThemeState {
  // Use a standard public or trackable property instead of a private hash field
  value = $state<Theme>("light");
  #isBrowser = typeof window !== "undefined";

  #syncDOM() {
    document.documentElement.setAttribute("data-theme", this.value);
    document.documentElement.style.colorScheme = this.value;
    localStorage.setItem("theme", this.value);
  }

  constructor() {
    if (this.#isBrowser) {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored === "light" || stored === "dark") {
        this.value = stored;
      }
      this.#syncDOM();
    }
  }

  init(theme: Theme | null) {
    if (theme && (theme === "light" || theme === "dark")) {
      this.value = theme;
      if (this.#isBrowser) {
        this.#syncDOM();
      }
    }
  }

  async syncToServer() {
    try {
      await fetch("/api/theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme: this.value }),
      });
    } catch (e) {
      console.error("Failed to sync theme to server:", e);
    }
  }

  // Intercept the assignment directly to trigger your side-effects
  setTheme(v: Theme) {
    this.value = v;
    if (this.#isBrowser) {
      this.#syncDOM();
      this.syncToServer();
    }
  }
}

export const themeState = new ThemeState();
