import { browser } from "$app/environment";

export type Theme = "light" | "dark";

class ThemeState {
  #value = $state<Theme>("light");

  #syncDOM() {
    document.documentElement.setAttribute("data-theme", this.#value);
    document.documentElement.style.colorScheme = this.#value;
    localStorage.setItem("theme", this.#value);
  }

  constructor() {
    if (browser) {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored === "light" || stored === "dark") {
        this.#value = stored;
      }
      this.#syncDOM();
    }
  }

  /**
   * Initialize theme from server data
   */
  init(theme: Theme | null) {
    if (theme && (theme === "light" || theme === "dark")) {
      this.#value = theme;
      if (browser) {
        this.#syncDOM();
      }
    }
  }

  /**
   * Sync the current theme to the server if the user is logged in
   */
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

  // Public accessors for the theme value
  get value() {
    return this.#value;
  }
  set value(v: Theme) {
    this.#value = v;
    if (browser) {
      this.#syncDOM();
      this.syncToServer();
    }
  }
}

export const themeState = new ThemeState();
