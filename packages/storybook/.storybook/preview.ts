import type { Preview } from "@storybook/sveltekit";
import { autonomyTheme } from "./theme";
import "@autonomy/style/tokens.css";
import "@autonomy/style/reset.css";
import "@autonomy/style/typography.css";
import "@autonomy/style/index.css";

const preview: Preview = {
  parameters: {
    docs: {
      theme: autonomyTheme,
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#12161f" },
        { name: "nord-dark", value: "#2e3440" },
        { name: "light", value: "#eceff4" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
