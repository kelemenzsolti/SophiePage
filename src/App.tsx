import { BookingProvider } from './context/BookingContext';
import { useTranslation } from './i18n/useTranslation';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { ExternalBooking } from './components/sections/ExternalBooking';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
// Disabled sections. The imports are commented out alongside the JSX below
// because `noUnusedLocals` is on — leaving them in place fails `tsc -b`, and
// with it `npm run build`.
// import { Booking } from './components/sections/Booking';
// import { Pricing } from './components/sections/Pricing';
// import { Testimonials } from './components/sections/Testimonials';

function App() {
  const { t } = useTranslation();

  return (
    <BookingProvider>
      <a
        href="#main"
        className="btn-primary btn-md sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60]"
      >
        {t.ui.skipToContent}
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Services />
        {/* Stands in for <Booking /> and owns the `#booking` id while that
            section is disabled — see ExternalBooking.tsx. */}
        <ExternalBooking />
        {/* <Pricing /> */}
        {/* <Booking /> */}
        {/* <Testimonials /> */}
      </main>

      <Footer />
    </BookingProvider>
  );
}

export default App;
