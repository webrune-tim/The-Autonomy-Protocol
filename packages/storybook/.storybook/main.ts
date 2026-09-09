import type { StorybookConfig } from "@storybook/sveltekit";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sveltekitPkgPath = path.dirname(require.resolve("@storybook/sveltekit/package.json"));
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)",
  ],
  addons: [
    "@storybook/addon-svelte-csf",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
  ],
  framework: "@storybook/sveltekit",
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    const sveltekitMocksPlugin = {
      name: "custom:mock-sveltekit-stores",
      enforce: "pre" as const,
      resolveId(id: string) {
        if (id === "$app/state" || id === "@storybook/sveltekit/internal/mocks/app/state.svelte.js") {
          return path.join(sveltekitPkgPath, "static/app-state-mock.svelte.js");
        }
        if (id === "$app/forms" || id === "@storybook/sveltekit/internal/mocks/app/forms") {
          return path.join(sveltekitPkgPath, "dist/mocks/app/forms.js");
        }
        if (id === "$app/navigation" || id === "@storybook/sveltekit/internal/mocks/app/navigation") {
          return path.join(sveltekitPkgPath, "dist/mocks/app/navigation.js");
        }
        if (id === "$app/stores" || id === "@storybook/sveltekit/internal/mocks/app/stores") {
          return path.join(sveltekitPkgPath, "dist/mocks/app/stores.js");
        }
        if (id === "$app/env" || id === "$app/environment") {
          return path.resolve(__dirname, "../src/mocks/app-env.ts");
        }
        return null;
      },
    };

    config.plugins = [sveltekitMocksPlugin, ...(config.plugins || [])];
    return config;
  },
};

export default config;
