// $lib/actions/contrastColor.ts
import type { Action } from "svelte/action";
import { getAAAContrastColor } from "@autonomy/utils";

export const contrastColor: Action<HTMLElement, string> = (node, backgroundColor) => {
  const applyContrast = (bg: string) => {
    if (bg) node.style.color = getAAAContrastColor(bg);
  };

  applyContrast(backgroundColor);

  return {
    update(newBg) {
      applyContrast(newBg);
    },
  };
};
