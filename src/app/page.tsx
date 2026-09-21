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
import NasiBoxModal from '@/components/NasiBoxModal';

export default function Home() {
  const [isSnackBoxOpen, setIsSnackBoxOpen] = useState(false);
  const [isNasiBoxOpen, setIsNasiBoxOpen] = useState(false);

  const handleOpenSnackBox = () => {
    setIsSnackBoxOpen(true);
  };

  const handleCloseSnackBox = () => {
    setIsSnackBoxOpen(false);
  };

  const handleOpenNasiBox = () => {
    setIsNasiBoxOpen(true);
  };

  const handleCloseNasiBox = () => {
    setIsNasiBoxOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F4EE]">
      {/* Navigation */}
      <Navbar onOpenSnackBoxBuilder={handleOpenSnackBox} onOpenNasiBoxBuilder={handleOpenNasiBox} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenSnackBoxBuilder={handleOpenSnackBox} />
        <About />
        <Products onOpenSnackBoxBuilder={handleOpenSnackBox} onOpenNasiBoxBuilder={handleOpenNasiBox} />
        <Location />
        <FAQ />
      </main>

      {/* Footer & Floating WhatsApp */}
      <Footer />

      {/* Interactive Customizer Modals */}
      <SnackBoxModal isOpen={isSnackBoxOpen} onClose={handleCloseSnackBox} />
      <NasiBoxModal isOpen={isNasiBoxOpen} onClose={handleCloseNasiBox} />
    </div>
  );
}
