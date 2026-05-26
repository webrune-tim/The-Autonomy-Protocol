// $lib/actions/autoContrast.ts
import type { Action } from "svelte/action";
import { getAAAContrastColor } from "@autonomy/utils";

export const autoContrast: Action<HTMLElement, void> = (node) => {
  queueMicrotask(() => {
    const computedBg = window.getComputedStyle(node).backgroundColor;
    if (computedBg && computedBg !== "rgba(0, 0, 0, 0)" && computedBg !== "transparent") {
      node.style.color = getAAAContrastColor(computedBg);
    }
  });
};
