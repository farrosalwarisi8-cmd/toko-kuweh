'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Location from '@/components/Location';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import SnackBoxModal from '@/components/SnackBoxModal';

export default function Home() {
  const [isSnackBoxOpen, setIsSnackBoxOpen] = useState(false);

  const handleOpenSnackBox = () => {
    setIsSnackBoxOpen(true);
  };

  const handleCloseSnackBox = () => {
    setIsSnackBoxOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F4EE]">
      {/* Navigation */}
      <Navbar onOpenSnackBoxBuilder={handleOpenSnackBox} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenSnackBoxBuilder={handleOpenSnackBox} />
        <About />
        <Products onOpenSnackBoxBuilder={handleOpenSnackBox} />
        <Location />
        <FAQ />
      </main>

      {/* Footer & Floating WhatsApp */}
      <Footer />

      {/* Interactive Snack Box Customizer Modal */}
      <SnackBoxModal isOpen={isSnackBoxOpen} onClose={handleCloseSnackBox} />
    </div>
  );
}
