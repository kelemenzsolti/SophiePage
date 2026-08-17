import type { Transition, Variants } from 'framer-motion';

/** Shared easing — a long, settled deceleration that suits editorial layouts. */
export const EASE_EDITORIAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transition = (delay = 0, duration = 0.7): Transition => ({
  duration,
  delay,
  ease: EASE_EDITORIAL,
});

/** Distance presets for `Reveal`. */
export const REVEAL_OFFSET = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { y: 0, x: 28 },
  right: { y: 0, x: -28 },
  none: { y: 0, x: 0 },
} as const;

export type RevealDirection = keyof typeof REVEAL_OFFSET;

/**
 * Builds the hidden/visible pair for a reveal. When `reduced` is true the
 * element only fades, so the page stays legible for motion-sensitive users
 * without losing the sense that content is arriving.
 */
export function revealVariants(
  direction: RevealDirection,
  reduced: boolean,
): Variants {
  const offset = reduced ? REVEAL_OFFSET.none : REVEAL_OFFSET[direction];

  return {
    hidden: { opacity: 0, ...offset },
    visible: (delay: number = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: transition(reduced ? 0 : delay, reduced ? 0.3 : 0.7),
    }),
  };
}

/** Viewport config shared by every scroll-triggered reveal. */
export const REVEAL_VIEWPORT = { once: true, margin: '-12% 0px -8% 0px' };
