import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],
  server: {
    hmr: {
      timeout: 240000,
    },
    watch: {
      ignored: ["**/node_modules/**", "**/.svelte-kit/**"],
    },
  },
  ssr: {
    noExternal: [
      "@lucide/svelte",
      "@autonomy/horizontal-scroll",
      "@autonomy/nav",
      "@autonomy/style",
      "svelte-french-toast",
    ],
  },
  optimizeDeps: {
    // MOVE Lucide from exclude to include.
    // This flattens hundreds of icon files into ONE single JS file.
    include: ["@lucide/svelte", "@autonomy/nav", "@autonomy/theme"],
    // If the timeout is the main concern, explicitly tell Vite where to look
    // to speed up the discovery phase.
    entries: ["./src/routes/**/*.{svelte,ts}"],
  },
});
