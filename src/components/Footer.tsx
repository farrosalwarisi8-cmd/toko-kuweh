'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, MessageCircle, Heart } from 'lucide-react';
import { WA_NUMBERS, getWhatsAppLink } from '@/utils/whatsapp';

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Katalog Produk', href: '#produk' },
  { label: 'Paket Snack Box', href: '#snackbox' },
  { label: 'Peta Lokasi', href: '#lokasi' },
  { label: 'FAQ', href: '#faq' },
];

const POPULAR_ITEMS = [
  { name: 'Lemper Ayam Spesial', price: '' },
  { name: 'Risol Mayo Creamy', price: '' },
  { name: 'Lumpia Special', price: '' },
  { name: 'Kue Sus Vla Vanila', price: '' },
  { name: 'Snack Box Hemat', price: '' },
];

const SOCIAL_LINKS = [
  { icon: InstagramIcon, href: 'https://www.instagram.com/tokokuweh__', label: 'Instagram' },
  { icon: WhatsAppIcon, href: getWhatsAppLink('Halo Toko Kuweh!'), label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#F7F3ED] border-t border-[#E8E4DC]">

      {/* Wave top separator */}
      <div className="absolute -top-px left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-14 fill-[#F7F3ED]" preserveAspectRatio="none">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,22 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#E8E4DC]">

          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#0B3D20] p-1.5 shadow-md overflow-hidden flex items-center justify-center">
                <Image src="/images/logo.jpg" alt="Logo Toko Kuweh" width={52} height={52} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-['Playfair_Display',serif] text-xl font-bold text-[#0B3D20] block leading-none">Toko Kuweh</span>
                <span className="text-[9px] tracking-widest uppercase text-[#8A8A7A] font-sans block mt-1">Taste of Cikarang</span>
              </div>
            </div>

            <p className="text-[#4A4A4A] text-xs sm:text-sm leading-relaxed max-w-xs font-sans">
              Menghadirkan aneka kue basah tradisional, jajanan gurih, bolu, dan paket snack box berkualitas di Cikarang Selatan, Bekasi.
            </p>

            <p className="text-xs text-[#8A8A7A] italic font-sans">
              &ldquo;Dibuat dengan perhatian, disajikan dengan kualitas.&rdquo;
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} Toko Kuweh`}
                  className="w-9 h-9 rounded-full bg-[#0B3D20]/8 hover:bg-[#0B3D20] text-[#0B3D20] hover:text-white flex items-center justify-center transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-['Playfair_Display',serif] text-base font-bold text-[#0B3D20] mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#4A4A4A]">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-[#0B3D20] hover:font-semibold transition-all">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Menu */}
          <div>
            <h4 className="font-['Playfair_Display',serif] text-base font-bold text-[#0B3D20] mb-4">
              Menu Populer
            </h4>
            <ul className="space-y-2.5 font-sans">
              {POPULAR_ITEMS.map(({ name }) => (
                <li key={name} className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#4A4A4A] hover:text-[#0B3D20] transition-colors">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-4">
            <h4 className="font-['Playfair_Display',serif] text-base font-bold text-[#0B3D20]">
              Kontak Kami
            </h4>

            <div className="flex items-start gap-3 text-xs sm:text-sm text-[#4A4A4A] font-sans">
              <div className="w-8 h-8 rounded-xl bg-[#0B3D20]/8 text-[#0B3D20] flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <span>Vila Mutiara Cikarang 2, Blok B2 No. 30, Sukasejati, Cikarang Selatan, Bekasi</span>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-[#4A4A4A] font-sans">
              <div className="w-8 h-8 rounded-xl bg-[#0B3D20]/8 text-[#0B3D20] flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span>06:30 – 20:00 WIB (Setiap Hari)</span>
            </div>

            <div className="space-y-1.5 pt-1">
              {WA_NUMBERS.map((n) => (
                <a
                  key={n.phone}
                  href={getWhatsAppLink('Halo, saya ingin memesan di Toko Kuweh.', n.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs text-[#4A4A4A] hover:text-[#0B3D20] font-sans transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C8A96E] flex-shrink-0" />
                  <span>{n.display}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A8A7A] font-sans">
          <p>© {new Date().getFullYear()} Toko Kuweh Cikarang Selatan. Seluruh hak cipta dilindungi.</p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> untuk momen istimewa Anda
          </p>
        </div>
      </div>

      {/* ── Floating WhatsApp FAB ── */}
      <div className="fixed bottom-6 right-6 z-40 group">
        {/* Tooltip */}
        <div className="absolute bottom-16 right-0 bg-[#0B3D20] text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat WhatsApp Kami
        </div>

        {/* Ping */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8A96E] rounded-full animate-ping opacity-75 pointer-events-none" />

        <motion.a
          href={getWhatsAppLink('Halo, saya ingin bertanya dan memesan di Toko Kuweh.')}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Chat WhatsApp Toko Kuweh"
          className="w-14 h-14 rounded-full bg-[#0B3D20] hover:bg-[#134E2C] text-white flex items-center justify-center shadow-2xl border-2 border-[#C8A96E] transition-colors"
        >
          <MessageCircle className="w-7 h-7 fill-white text-[#0B3D20]" />
        </motion.a>
      </div>
    </footer>
  );
}
