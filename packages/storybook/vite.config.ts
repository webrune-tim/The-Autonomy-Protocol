import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const sveltekitPkgPath = path.dirname(require.resolve("@storybook/sveltekit/package.json"));

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "$app/state": path.join(sveltekitPkgPath, "static/app-state-mock.svelte.js"),
      "$app/forms": path.join(sveltekitPkgPath, "dist/mocks/app/forms.js"),
      "$app/navigation": path.join(sveltekitPkgPath, "dist/mocks/app/navigation.js"),
      "$app/stores": path.join(sveltekitPkgPath, "dist/mocks/app/stores.js"),
      "$app/env": path.join(__dirname, "src/mocks/app-env.ts"),
      "$app/environment": path.join(__dirname, "src/mocks/app-env.ts"),
    },
  },
  server: {
    fs: {
      allow: ["../../"],
    },
  },
});
