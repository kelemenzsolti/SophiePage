import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ServiceCategory } from '../content/site';

interface BookingContextValue {
  /** The service the visitor is enquiring about. */
  category: ServiceCategory;
  setCategory: (category: ServiceCategory) => void;
  /** Selects a service and scrolls the booking form into view. */
  selectAndScroll: (category: ServiceCategory) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

/**
 * Shares the selected service between the pricing cards and the booking form,
 * so choosing a plan pre-fills the enquiry instead of dropping the visitor into
 * an empty form.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<ServiceCategory>('individual');

  const selectAndScroll = useCallback((next: ServiceCategory) => {
    setCategory(next);

    const target = document.getElementById('booking-form');
    if (!target) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  const value = useMemo(
    () => ({ category, setCategory, selectAndScroll }),
    [category, selectAndScroll],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
