'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ChevronRight, Award, ShieldCheck, Package } from 'lucide-react';
import { getWhatsAppLink } from '@/utils/whatsapp';

interface HeroProps {
  onOpenSnackBoxBuilder?: () => void;
}

export default function Hero({ onOpenSnackBoxBuilder }: HeroProps) {
  const waLink = getWhatsAppLink(
    'Halo Toko Kuweh, saya ingin memesan kue/snack box untuk acara saya!'
  );

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="beranda"
      className="relative min-h-screen bg-[#F8F4EE] overflow-hidden flex items-center pt-24 pb-28"
    >
      {/* Background decorative blobs */}
      <div className="absolute top-1/4 right-[5%] w-96 h-96 bg-[#C8A96E]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-72 h-72 bg-[#1A6B4F]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-[20%] w-48 h-48 bg-[#C8A96E]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Dot pattern subtle */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#0B3D2E 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[80vh]">

          {/* ── Left: Photo Collage ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="relative order-2 lg:order-1 flex items-center justify-center"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C8A96E]/15 via-transparent to-[#1A6B4F]/10 rounded-[40px] blur-2xl" />

            {/* ── Collage Grid ── */}
            <div className="relative w-full max-w-md lg:max-w-none">

              {/* Large main image — lumpia special (user's own photo) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-2xl border-4 border-white"
                style={{ filter: 'drop-shadow(0 20px 48px rgba(11,61,46,0.16))' }}
              >
                <Image
                  src="/images/lumpia-special.jpg"
                  alt="Lumpia Special Homemade - Toko Kuweh"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E]/20 via-transparent to-transparent" />

                {/* Label overlay */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-md">
                  <p className="font-['Great_Vibes',cursive] text-[#1A6B4F] text-xl leading-none">Lumpia Special</p>
                  <p className="font-sans text-[10px] text-[#4A4A4A] mt-0.5">Homemade · Fresh Daily</p>
                </div>
              </motion.div>

              {/* Bottom row: 2 smaller images */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                {/* Risoles box */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-3 border-white"
                >
                  <Image
                    src="/images/risoles-box-real.jpg"
                    alt="Risoles Box Toko Kuweh"
                    fill
                    sizes="200px"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E]/40 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2.5 text-white text-[10px] font-bold font-sans drop-shadow">Risoles Mayo</span>
                </motion.div>

                {/* Pie buah */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-3 border-white"
                >
                  <Image
                    src="/images/pie-buah-real.jpg"
                    alt="Pie Buah Segar Toko Kuweh"
                    fill
                    sizes="200px"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E]/40 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2.5 text-white text-[10px] font-bold font-sans drop-shadow">Pie Buah</span>
                </motion.div>
              </div>

              {/* ── Floating Badge: Snack Box price ── */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                onClick={onOpenSnackBoxBuilder}
                className="cursor-pointer absolute -top-4 -right-3 sm:-right-5 bg-[#0B3D2E] rounded-2xl px-3.5 py-3 shadow-2xl border-2 border-[#C8A96E]/50 flex items-center gap-2.5 z-20 hover:scale-105 transition-transform"
              >
                <div className="w-9 h-9 rounded-xl bg-[#C8A96E]/20 border border-[#C8A96E]/50 flex items-center justify-center text-lg">
                  🍱
                </div>
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-[#C8A96E] block leading-none">Best Seller</span>
                  <span className="font-['Playfair_Display',serif] text-sm font-bold text-white leading-none block mt-0.5">Snack Box 10rb</span>
                </div>
              </motion.div>

              {/* ── Floating Badge: Rating ── */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-2 -left-3 sm:-left-5 bg-white rounded-2xl px-3.5 py-2.5 shadow-xl border border-[#E8E4DC] flex items-center gap-2.5 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-[#0B3D2E] text-[#C8A96E] flex items-center justify-center">
                  <ShieldCheck className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0B3D2E] leading-none">Bahan Alami 100%</p>
                  <p className="text-[10px] text-[#8A8A7A] mt-0.5 leading-none">Tanpa Pengawet Buatan</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* ── Right: Text Content ── */}
          <motion.div
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.1 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            {/* Script subtitle */}
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="font-['Great_Vibes',cursive] text-[#1A6B4F] text-4xl sm:text-5xl block mb-1"
            >
              Paket Spesial
            </motion.span>

            {/* Main title + price badge */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="relative inline-block mb-4"
            >
              <h1 className="font-['Playfair_Display',serif] text-6xl sm:text-7xl lg:text-8xl font-black text-[#0B3D2E] leading-none tracking-tight">
                Snack Box
              </h1>
              {/* Circular price badge */}
              <div className="absolute -top-6 -right-6 sm:-right-10 w-[72px] h-[72px] bg-[#0B3D2E] rounded-full flex flex-col items-center justify-center text-white shadow-xl z-10 border-4 border-[#F8F4EE]">
                <span className="text-[7px] uppercase tracking-widest opacity-70 font-sans leading-none">MULAI</span>
                <span className="text-lg font-black leading-none font-['Playfair_Display',serif]">10rb</span>
                <span className="text-[8px] opacity-50 line-through leading-none font-sans">15rb</span>
              </div>
            </motion.div>

            {/* Stars */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 mb-5 justify-center lg:justify-start"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="font-bold text-[#0B3D2E] text-sm ml-1">4.9</span>
              <span className="text-[#8A8A7A] text-xs">500+ Ulasan</span>
            </motion.div>

            {/* Description box */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E4DC] mb-6 text-left"
            >
              <p className="text-[#4A4A4A] text-sm leading-relaxed font-sans">
                Kue basah tradisional dan modern berkualitas untuk setiap momen istimewa Anda. Dibuat{' '}
                <strong className="text-[#0B3D2E]">fresh setiap hari</strong> dengan bahan alami pilihan — tanpa pengawet. Melayani kantor di kawasan industri Cikarang, arisan, syukuran, dan hampers.
              </p>
            </motion.div>

            {/* Mini feature pills */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start"
            >
              {[
                { icon: '✅', text: 'Bahan Alami' },
                { icon: '🕐', text: 'Fresh Harian' },
                { icon: '🚗', text: 'Kirim Cikarang' },
                { icon: '🎁', text: 'Custom Hampers' },
              ].map(({ icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 bg-[#0B3D2E]/6 text-[#0B3D2E] text-xs font-medium px-3 py-1.5 rounded-full font-sans border border-[#0B3D2E]/10">
                  <span>{icon}</span>
                  {text}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#C8A96E] hover:bg-[#0B3D2E] text-[#0B3D2E] hover:text-white px-8 py-3.5 rounded-full font-bold text-sm font-sans transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                PESAN SEKARANG
              </a>
              <a
                href="#produk"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#C8A96E] text-[#0B3D2E] hover:bg-[#C8A96E] px-8 py-3.5 rounded-full font-bold text-sm font-sans transition-all duration-300 active:scale-95"
              >
                LIHAT MENU
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Wave bottom separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 88"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-20 sm:h-24 fill-white"
          preserveAspectRatio="none"
        >
          <path d="M0,44 C180,88 360,0 540,44 C720,88 900,16 1080,44 C1200,64 1360,36 1440,44 L1440,88 L0,88 Z" />
        </svg>
      </div>
    </section>
  );
}
