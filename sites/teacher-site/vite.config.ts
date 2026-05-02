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
      ignored: ["!**/node_modules/@autonomy/**", "**/node_modules/**", "**/.svelte-kit/**"],
    },
  },

  ssr: {
    noExternal: ["@lucide/svelte", "@autonomy/**", "svelte-french-toast"],
  },

  optimizeDeps: {
    // Keep Lucide included for performance, but EXCLUDE workspace packages
    // so they are treated as source code and support HMR.
    include: ["@lucide/svelte"],
    exclude: [
      "@autonomy/nav",
      "@autonomy/style",
      "@autonomy/theme",
      "@autonomy/header",
      "@autonomy/footer",
      "@autonomy/logo",
      "@autonomy/pill",
    ],
    entries: ["./src/routes/**/*.{svelte,ts}"],
  },
});
