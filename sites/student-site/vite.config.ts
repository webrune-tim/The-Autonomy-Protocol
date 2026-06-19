import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [sveltekit()],

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
    external: ["@libsql/client", "@neon-rs/load", "ws", "bufferutil", "utf-8-validate"],
  },

  optimizeDeps: {
    include: ["@lucide/svelte"],
    exclude: [
      "@autonomy/nav",
      "@autonomy/style",
      "@autonomy/theme",
      "@autonomy/header",
      "@autonomy/footer",
      "@autonomy/footer-nav",
      "@autonomy/logo",
      "@autonomy/pill",
      "@autonomy/theme-toggle",
    ],
    entries: ["./src/routes/**/*.{svelte,ts}"],
  },
});
