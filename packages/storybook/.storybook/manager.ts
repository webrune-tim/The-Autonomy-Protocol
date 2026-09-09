import { addons } from "storybook/manager-api";
import autonomyTheme from "./theme";

addons.setConfig({
  theme: autonomyTheme,
  showToolbar: true,
});
