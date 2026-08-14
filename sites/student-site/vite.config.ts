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
      preprocess: [mdsvex({ extensions: [".svx", ".md"] })],
      extensions: [".svelte", ".svx", ".md"],
      adapter: adapter({
        images: {
          sizes: [640, 828, 1200, 1920, 3840],
          formats: ["image/avif", "image/webp"],
          minimumCacheTTL: 300,
          domains: [],
        },
      }),

      alias: {
        $actions: "src/lib/actions",
        $components: "src/lib/components",
        $docs: "src/lib/docs",
        $images: "src/lib/assets/images",
        $stores: "src/lib/stores",
      },
      // @migration-task `typescript.config` is deprecated; configure TypeScript in tsconfig.json directly
      typescript: {
        config: (config) => ({
          ...config,
          include: [...config.include, "../drizzle.config.ts"],
        }),
      },
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
