'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, Phone, MessageCircle, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { getWhatsAppLink } from '@/utils/whatsapp';

interface NavbarProps {
  onOpenSnackBoxBuilder?: () => void;
  onOpenNasiBoxBuilder?: () => void;
}

const NAV_LINKS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Produk', href: '#produk' },
  { label: 'Nasi Box', href: '#nasibox' },
  { label: 'Snack Box', href: '#snackbox' },
  { label: 'Lokasi', href: '#lokasi' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar({ onOpenSnackBoxBuilder, onOpenNasiBoxBuilder }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waUrl = getWhatsAppLink('Halo Toko Kuweh, saya ingin bertanya dan melakukan pemesanan.');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md py-3'
            : 'bg-white/80 backdrop-blur-lg py-4'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link href="#beranda" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#0B3D20] p-1 overflow-hidden flex items-center justify-center shadow-sm">
                <Image
                  src="/images/logo.jpg"
                  alt="Logo Toko Kuweh"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-['Playfair_Display',serif] text-lg font-bold text-[#0B3D20] group-hover:text-[#1E673C] transition-colors">
                  Toko Kuweh
                </span>
                <span className="text-[9px] tracking-widest uppercase text-[#8A8A7A] font-sans mt-0.5">
                  Taste of Cikarang
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-sans text-sm font-medium text-[#4A4A4A] hover:text-[#0B3D20] transition-colors relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C8A96E] transition-all duration-200 group-hover:w-full rounded-full" />
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
              <a
                href="tel:+6281290561840"
                className="hidden lg:flex items-center gap-2 border border-[#C8A96E] text-[#0B3D20] hover:bg-[#FFF8EE] px-4 py-2 rounded-full text-xs font-semibold transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#C8A96E]" />
                <span>0812-9056-1840</span>
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#C8A96E] hover:bg-[#0B3D20] text-[#0B3D20] hover:text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Pesan WA</span>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 text-[#0B3D20] hover:text-[#1E673C] transition-colors"
              aria-label="Buka Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0B3D20] p-1 overflow-hidden flex items-center justify-center">
                    <Image src="/images/logo.jpg" alt="Logo" width={32} height={32} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-['Playfair_Display',serif] text-base font-bold text-[#0B3D20]">Toko Kuweh</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between py-3 px-4 rounded-xl text-[#0B3D20] font-medium font-sans text-sm hover:bg-[#FFF8EE] hover:text-[#0B3D20] transition-all"
                      >
                        <span>{link.label}</span>
                        <span className="text-[#C8A96E] text-xs">→</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-gray-100 space-y-2.5">
                {onOpenNasiBoxBuilder && (
                  <button
                    onClick={() => { setIsOpen(false); onOpenNasiBoxBuilder(); }}
                    className="w-full flex items-center justify-center gap-2 bg-[#0B3D20] text-white py-3 rounded-xl font-semibold text-sm transition-colors hover:bg-[#134E2C]"
                  >
                    <UtensilsCrossed className="w-4 h-4" />
                    Custom Nasi Box
                  </button>
                )}
                {onOpenSnackBoxBuilder && (
                  <button
                    onClick={() => { setIsOpen(false); onOpenSnackBoxBuilder(); }}
                    className="w-full flex items-center justify-center gap-2 border-2 border-[#C8A96E] text-[#0B3D20] py-3 rounded-xl font-semibold text-sm transition-colors hover:bg-[#FFF8EE]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Custom Snack Box (10rb)
                  </button>
                )}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#0B3D20] text-white py-3 rounded-xl font-semibold text-sm transition-colors hover:bg-[#134E2C]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Pesan via WhatsApp
                </a>
                <div className="text-xs text-center text-[#8A8A7A] pt-1">
                  Vila Mutiara Cikarang 2, Bekasi
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
