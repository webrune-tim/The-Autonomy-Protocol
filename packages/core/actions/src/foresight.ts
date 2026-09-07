import type { Action } from "svelte/action";
import { ForesightManager } from "js.foresight";

/**
 * Svelte action to register an element with ForesightManager for global link prefetching.
 */
export const foresight: Action<HTMLAnchorElement> = (node: HTMLAnchorElement) => {
  const rawHref = node.getAttribute("href");
  // Bypass internal page anchors, void links, or non-HTTP protocols
  if (
    !rawHref ||
    rawHref.startsWith("#") ||
    rawHref.startsWith("mailto:") ||
    rawHref.startsWith("tel:")
  ) {
    return;
  }

  // Register with ForesightManager
  ForesightManager.instance.register({
    element: node,
    callback: () => {
      if (!node.href) return;

      // Avoid injecting duplicate prefetch tags
      if (document.querySelector(`link[rel="prefetch"][href="${node.href}"]`)) {
        return;
      }

      // Inject a <link rel="prefetch"> tag into the document head
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = node.href;
      document.head.appendChild(link);
    },
  });

  // Handle cleanup when Svelte unmounts or destroys the element
  return {
    destroy() {
      // Safely unregister if ForesightManager exposes an unregister method
      if (typeof (ForesightManager.instance as any).unregister === "function") {
        (ForesightManager.instance as any).unregister(node);
      }
    },
  };
};
