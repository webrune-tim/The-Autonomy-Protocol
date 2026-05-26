// $lib/utils/contrast.ts

function getRelativeLuminance(color: string): number {
  let r = 0,
    g = 0,
    b = 0;

  // Handle browser rgb() or rgba() strings
  if (color.startsWith("rgb")) {
    const matches = color.match(/\d+/g);
    if (matches && matches.length >= 3) {
      r = parseInt(matches[0], 10) / 255;
      g = parseInt(matches[1], 10) / 255;
      b = parseInt(matches[2], 10) / 255;
    }
  } else {
    // Handle standard Hex strings
    let cleanHex = color.replace("#", "").trim();
    if (cleanHex.length === 3) {
      cleanHex = cleanHex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  }

  const transform = (val: number): number => {
    return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function getAAAContrastColor(
  backgroundColor: string,
  darkText = "#2e3440",
  lightText = "#eceff4",
): string {
  try {
    const bgLume = getRelativeLuminance(backgroundColor);
    const darkLume = getRelativeLuminance(darkText);
    const lightLume = getRelativeLuminance(lightText);

    return getContrastRatio(bgLume, lightLume) > getContrastRatio(bgLume, darkLume)
      ? lightText
      : darkText;
  } catch {
    return lightText;
  }
}
