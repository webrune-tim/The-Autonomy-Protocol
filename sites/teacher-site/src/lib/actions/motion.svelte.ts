import { animate } from "motion";
import type { AnimationOptions, DOMKeyframesDefinition } from "motion";

interface MotionParams {
  keyframes: DOMKeyframesDefinition;
  options?: AnimationOptions;
}

export default function motion(node: HTMLElement, getParams: () => MotionParams) {
  let animation: ReturnType<typeof animate> | null = null;

  // Use $effect to tap directly into Svelte 5's reactive tracking matrix
  $effect(() => {
    if (animation) {
      animation.stop();
    }

    // Because getParams() is called inside a $effect,
    // Svelte tracks any signals (like isActive) read inside it.
    const { keyframes, options } = getParams();

    animation = animate(node, keyframes, options);

    // Automatically run cleanup if the effect re-runs or component destroys
    return () => {
      if (animation) animation.stop();
    };
  });
}
