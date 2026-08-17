import { useEffect, type RefObject } from 'react';

type ElementRef = RefObject<HTMLElement | null>;

/**
 * Closes a transient overlay on Escape or on a pointer press outside every
 * element in `refs`. Pass the trigger alongside the panel so pressing it while
 * open toggles closed instead of dismissing and immediately reopening.
 *
 * No-ops while `active` is false, so listeners exist only while open.
 */
export function useDismiss(
  refs: ElementRef | ElementRef[],
  active: boolean,
  onDismiss: () => void,
) {
  useEffect(() => {
    if (!active) return;

    const list = Array.isArray(refs) ? refs : [refs];

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const inside = list.some((ref) => ref.current?.contains(target));
      if (!inside) onDismiss();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
    // `refs` is a fresh array literal on most renders; the effect only reads
    // `.current` at event time, so re-subscribing on identity change is safe.
  }, [refs, active, onDismiss]);
}
