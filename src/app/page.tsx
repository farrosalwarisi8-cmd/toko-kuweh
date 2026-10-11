import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Location from '@/components/Location';
import ServiceArea from '@/components/ServiceArea';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ModalProvider from '@/components/ModalProvider';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F4EE]">
      <ModalProvider>
        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          <Hero />
          <About />
          <Products />
          <Location />
          <ServiceArea />
          <FAQ />
        </main>
        <Footer />
      </ModalProvider>
    </div>
  );
}
