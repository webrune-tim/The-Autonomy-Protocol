import { create } from "storybook/theming/create";

export const autonomyTheme = create({
  base: "dark",

  // Typography
  fontBase: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',

  // Brand
  brandTitle: "The Autonomy Protocol",
  brandUrl: "https://the-autonomy-protocol.vercel.app",
  brandTarget: "_blank",

  // Colors
  colorPrimary: "#88c0d0", // Nord 8 (Frost Cyan)
  colorSecondary: "#d08770", // Nord 12 (Brand Secondary Orange)

  // UI
  appBg: "#0e131b", // Deep midnight base
  appContentBg: "#12161f", // Elevated dark surface
  appPreviewBg: "#12161f",
  appBorderColor: "rgba(255, 255, 255, 0.08)",
  appBorderRadius: 8,

  // Text
  textColor: "#eceff4", // Snow storm light
  textInverseColor: "#0e131b",
  textMutedColor: "#8892b0",

  // Toolbar default and active colors
  barTextColor: "#d8dee9",
  barSelectedColor: "#88c0d0",
  barBg: "#12161f",

  // Form colors
  inputBg: "#1a2130",
  inputBorder: "rgba(255, 255, 255, 0.12)",
  inputTextColor: "#eceff4",
  inputBorderRadius: 6,
});

export default autonomyTheme;
