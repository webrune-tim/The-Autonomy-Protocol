import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],

  server: {
    hmr: {
      // High timeout for complex monorepo graphs
      timeout: 240000,
    },
    fs: {
      // Allow Vite to serve files from the workspace root (packages/ui, etc.)
      allow: ["../../"],
    },
    watch: {
      // Prevent infinite loops by ignoring build artifacts
      ignored: ["**/node_modules/**", "**/.svelte-kit/**"],
    },
  },

  ssr: {
    // Ensure these are processed by Svelte during SSR
    noExternal: [
      "@lucide/svelte",
      "@autonomy/nav",
      "@autonomy/new-style",
      "@autonomy/theme",
      "svelte-french-toast",
    ],
  },

  optimizeDeps: {
    // Force Vite to pre-bundle heavy third-party icons into a single file
    include: ["@lucide/svelte"],

    // IMPORTANT: Exclude local workspace packages.
    // This prevents Vite from "freezing" them into node_modules/.vite/deps.
    // When excluded, Vite treats them as raw source code, allowing HMR to work.
    exclude: ["@autonomy/nav", "@autonomy/theme", "@autonomy/new-style"],

    // Speed up discovery by pointing exactly where the source code lives
    entries: ["./src/routes/**/*.{svelte,ts}"],
  },
});
