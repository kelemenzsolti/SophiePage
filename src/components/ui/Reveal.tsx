import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { REVEAL_VIEWPORT, revealVariants, type RevealDirection } from '../../lib/motion';

type MotionTag =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'header'
  | 'figure'
  | 'blockquote'
  | 'ul'
  | 'li'
  | 'p'
  | 'span';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to stagger this element behind its neighbours. */
  delay?: number;
  direction?: RevealDirection;
  /** Play immediately on mount instead of waiting for the element to scroll in. */
  immediate?: boolean;
  as?: MotionTag;
}

/**
 * Scroll-triggered entrance used across every section, so the whole page shares
 * one motion signature. Collapses to a plain fade when the visitor has asked for
 * reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  immediate = false,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion() ?? false;
  const Component = motion[as] as ElementType;

  return (
    <Component
      className={className}
      variants={revealVariants(direction, reduced)}
      custom={delay}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: REVEAL_VIEWPORT })}
    >
      {children}
    </Component>
  );
}
