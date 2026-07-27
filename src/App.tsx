import { Navbar } from './components/layout/Navbar';
import { Booking } from './components/sections/Booking';
import { Footer } from './components/sections/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Testimonials } from './components/sections/Testimonials';
import { VideoSection } from './components/sections/VideoSection';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <VideoSection />
        <Services />
        <Booking />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

export default App;
