import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Reveal } from './Reveal';

type Tone = 'paper' | 'shell' | 'sand' | 'forest';

const TONE_CLASS: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  shell: 'bg-shell text-ink',
  sand: 'bg-sand text-ink',
  forest: 'bg-forest-deep text-paper',
};

interface SectionProps {
  id?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
  /** Removes the horizontal container for full-bleed layouts. */
  bleed?: boolean;
  /** Tightens the vertical rhythm for shorter, supporting sections. */
  compact?: boolean;
}

export function Section({
  id,
  children,
  tone = 'paper',
  className,
  bleed = false,
  compact = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative grain',
        TONE_CLASS[tone],
        compact ? 'py-16 md:py-20' : 'py-20 md:py-28 lg:py-32',
        className,
      )}
    >
      {bleed ? children : <div className="shell relative">{children}</div>}
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  /** Inverts the palette for use on the dark forest ground. */
  inverted?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  inverted = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'eyebrow mb-5',
            align === 'center' && 'justify-center',
            inverted && 'text-terracotta-soft before:bg-terracotta-soft/50',
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          'font-display text-display-md font-medium text-balance',
          inverted ? 'text-paper' : 'text-forest-deep',
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'mt-5 text-lead text-pretty',
            align === 'center' && 'mx-auto max-w-2xl',
            inverted ? 'text-paper/70' : 'text-ink/65',
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
