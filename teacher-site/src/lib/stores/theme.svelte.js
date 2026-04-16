// src/lib/theme.svelte.js
import { browser } from '$app/environment'

class ThemeState {
	// 1. Initialize with your preferred default
	value = $state('dark')

	constructor() {
		// 2. Only access localStorage if we are in the browser (prevents SSR errors)
		if (browser) {
			const stored = localStorage.getItem('theme')

			if (stored) {
				this.value = stored
			} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
				this.value = 'light'
			}

			// Apply the theme to the DOM immediately on load
			document.documentElement.setAttribute('data-theme', this.value)
		}
	}

	// 3. Centralized toggle function
	toggle() {
		this.value = this.value === 'dark' ? 'light' : 'dark'

		if (browser) {
			document.documentElement.setAttribute('data-theme', this.value)
			localStorage.setItem('theme', this.value)
		}
	}
}

// Export a single instance to be shared across your app
export const themeState = new ThemeState()
