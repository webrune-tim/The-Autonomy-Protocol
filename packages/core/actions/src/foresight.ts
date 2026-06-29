import type { Action } from "svelte/action";
import { ForesightManager } from "js.foresight";

/**
 * Svelte action to register an element with ForesightManager for global link prefetching.
 */
export const foresight: Action<HTMLAnchorElement> = (node: HTMLAnchorElement) => {
  // Ensure the node has a valid href before registering
  if (!node.href) return;

  // Register with ForesightManager
  ForesightManager.instance.register({
    element: node,
    callback: () => {
      // Re-verify href exists at execution time
      if (!node.href) return;

      console.log(`[Foresight] Prefetching triggered for: ${node.href}`);

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
