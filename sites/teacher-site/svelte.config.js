import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
    runes: ({ filename }) => (filename.split(/[/\\]/).includes("node_modules") ? undefined : true),
  },
  kit: {
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
    typescript: {
      config: (config) => ({
        ...config,
        include: [...config.include, "../drizzle.config.ts"],
      }),
    },
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
};

export default config;
