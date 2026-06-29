import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite"; // ⚡️ Back to clean, vanilla vite imports

export default defineConfig({
  plugins: [sveltekit()],

  server: {
    hmr: { timeout: 240000 },
    fs: { allow: ["../../"] },
    watch: {
      ignored: ["!**/node_modules/@autonomy/**", "**/node_modules/**", "**/.svelte-kit/**"],
    },
  },

  ssr: {
    noExternal: ["@lucide/svelte", "@autonomy/**", "svelte-french-toast"],
    external: ["@libsql/client", "@neon-rs/load", "ws", "bufferutil", "utf-8-validate"],
  },

  optimizeDeps: {
    exclude: [
      "@lucide/svelte",
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
