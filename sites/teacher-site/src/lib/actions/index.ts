import { animate } from "motion";
import type { AnimationOptions, MotionKeyframesDefinition } from "motion";

interface MotionParams {
  keyframes: MotionKeyframesDefinition;
  options?: AnimationOptions;
}

// We pass a function returning parameters to ensure Svelte 5 reactive bindings track smoothly
export function motion(node: HTMLElement, getParams: () => MotionParams) {
  let animation: ReturnType<typeof animate> | null = null;

  const runAnimation = () => {
    if (animation) animation.stop();
    const { keyframes, options } = getParams();
    animation = animate(node, keyframes, options);
  };

  // Run on mount
  runAnimation();

  return {
    update() {
      // Re-trigger or morph animation smoothly if reactive inputs change
      runAnimation();
    },
    destroy() {
      if (animation) animation.stop();
    }
  };
}