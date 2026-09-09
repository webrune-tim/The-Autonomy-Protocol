import { propsFor, register, isRegistered, type PropsForOptions } from "prop-for-that";
import { pointerLocal } from "prop-for-that/plugins";
import type { Action } from "svelte/action";

// Register pointerLocal plugin client-side if not already registered
if (typeof window !== "undefined" && !isRegistered("pointer-local")) {
  register(pointerLocal);
}

export type UsePropsParam = string[] | { keys: string[]; options?: PropsForOptions };

export const useProps: Action<HTMLElement, UsePropsParam> = (node, params) => {
  if (!isRegistered("pointer-local")) {
    register(pointerLocal);
  }

  let keys = Array.isArray(params) ? params : (params?.keys ?? []);
  let options = Array.isArray(params) ? undefined : params?.options;
  let unbind = propsFor(node, keys, options);

  return {
    update(newParams) {
      unbind?.();
      keys = Array.isArray(newParams) ? newParams : (newParams?.keys ?? []);
      options = Array.isArray(newParams) ? undefined : newParams?.options;
      unbind = propsFor(node, keys, options);
    },
    destroy() {
      unbind?.();
    },
  };
};
