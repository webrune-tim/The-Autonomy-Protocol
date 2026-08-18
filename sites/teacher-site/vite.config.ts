import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-vercel";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite"; // ⚡️ Back to clean, vanilla vite imports

export default defineConfig({
  plugins: [
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
      },
      preprocess: [
        mdsvex({ extensions: [".svx", ".md"] }),
        {
          markup({ content, filename }) {
            if (filename && (filename.endsWith(".md") || filename.endsWith(".svx"))) {
              return {
                code: content.replace(/<script\s+context="module">/g, "<script module>"),
              };
            }
          },
        },
      ],
      extensions: [".svelte", ".svx", ".md"],
      inlineStyleThreshold: 20480,
      adapter: adapter({
        images: {
          sizes: [640, 828, 1200, 1920, 3840],
          formats: ["image/avif", "image/webp"],
          minimumCacheTTL: 300,
          domains: [],
        },
      }),
    }),
  ],
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
