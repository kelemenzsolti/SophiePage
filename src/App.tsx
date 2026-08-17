import { BookingProvider } from './context/BookingContext';
import { useTranslation } from './i18n/useTranslation';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Booking } from './components/sections/Booking';
import { Hero } from './components/sections/Hero';
import { Pricing } from './components/sections/Pricing';
import { Services } from './components/sections/Services';
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
        <Pricing />
        <Booking />
        {/* <Testimonials />*/ }
      </main>

      <Footer />
    </BookingProvider>
  );
}

export default App;
