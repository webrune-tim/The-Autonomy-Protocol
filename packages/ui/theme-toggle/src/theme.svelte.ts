// theme.svelte.ts
export type Theme = "light" | "dark";

function createThemeState() {
	// A simple, deeply reactive POJO proxy
	const state = $state({
		value: "light" as Theme
	});

	const isBrowser = typeof window !== "undefined";

	function syncDOM(currentTheme: Theme) {
		document.documentElement.setAttribute("data-theme", currentTheme);
		document.documentElement.style.colorScheme = currentTheme;
		localStorage.setItem("theme", currentTheme);
	}

	async function syncToServer(currentTheme: Theme) {
		try {
			await fetch("/api/theme", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ theme: currentTheme })
			});
		} catch (e) {
			console.error("Failed to sync theme to server:", e);
		}
	}

	// Initialize on creation safely
	if (isBrowser) {
		const stored = localStorage.getItem("theme") as Theme | null;
		if (stored === "light" || stored === "dark") {
			state.value = stored;
		}
		syncDOM(state.value);
	}

	return {
		// Getter allows the UI to reactively track changes to state.value
		get value() {
			return state.value;
		},
		// A clean updater that changes state and triggers your side-effects
		setTheme(v: Theme) {
			state.value = v;
			if (isBrowser) {
				syncDOM(v);
				syncToServer(v);
			}
		},
		// Exposed if you still need it for your server-side entry points
		init(theme: Theme | null) {
			if (theme && (theme === "light" || theme === "dark")) {
				state.value = theme;
				if (isBrowser) {
					syncDOM(theme);
				}
			}
		}
	};
}

// Export the singleton instance safely
export const themeState = createThemeState();
