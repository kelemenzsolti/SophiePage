import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently occupying the middle of the viewport,
 * used to highlight the matching navigation link.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // With several sections in view at once, the most exposed one wins.
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }

        setActive(best);
      },
      {
        // Ignore the band behind the fixed header and the bottom third, so the
        // highlight changes when a section genuinely takes over the screen.
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
