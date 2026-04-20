// src/lib/theme.svelte.ts
import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

class ThemeState {
	#value = $state<Theme>('system');

	constructor() {
		if (browser) {
			const stored = localStorage.getItem('theme') as Theme | null;
			if (stored) {
				this.#value = stored;
			}

			// Sync changes to the DOM and localStorage
			$effect.root(() => {
				$effect(() => {
					const root = document.documentElement;
					const resolvedTheme = this.resolvedValue;

					root.setAttribute('data-theme', resolvedTheme);
					root.style.colorScheme = resolvedTheme;
					localStorage.setItem('theme', this.#value);
				});

				// Listen for OS preference changes if set to system
				$effect(() => {
					if (this.#value !== 'system') return;

					const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
					const handler = () => {
						// This trigger forces the derived value to re-evaluate
						// if the OS setting changes while the user is on the site.
						const root = document.documentElement;
						root.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
					};

					mediaQuery.addEventListener('change', handler);
					return () => mediaQuery.removeEventListener('change', handler);
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
	get resolvedValue(): 'light' | 'dark' {
		if (!browser) return 'dark';
		if (this.#value === 'system') {
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		return this.#value;
	}
}

export const themeState = new ThemeState();