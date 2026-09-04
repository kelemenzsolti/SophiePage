import { useEffect, useRef, useState } from 'react';

/**
 * Reports when the referenced element comes within `margin` of the viewport.
 *
 * Used to hold expensive third-party work — the Cal.com embed — out of the
 * initial page load. The margin is deliberately generous: the point is to be
 * ready by the time the visitor arrives, not to load at the last moment.
 *
 * Latches on first hit and disconnects; this never flips back to false.
 */
export function useNearViewport<T extends Element>(margin = '600px') {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || near) return;

    // Without IntersectionObserver, fall back to loading straight away rather
    // than leaving the feature unreachable.
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [margin, near]);

  return [ref, near, () => setNear(true)] as const;
}
