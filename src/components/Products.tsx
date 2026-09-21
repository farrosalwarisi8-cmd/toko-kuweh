'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Box, Sparkles } from 'lucide-react';
import { CATEGORIES, PRODUCTS, Product } from '@/data/products';
import { getWhatsAppLink } from '@/utils/whatsapp';

interface ProductsProps {
  onOpenSnackBoxBuilder?: () => void;
}

export default function Products({ onOpenSnackBoxBuilder }: ProductsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [centerIdx, setCenterIdx] = useState(1);

  const filtered = activeCategory === 'semua' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setCenterIdx(Math.min(1, Math.max(0, (PRODUCTS.filter(p => id === 'semua' ? true : p.category === id).length) - 1)));
  };

  const canPrev = centerIdx > 0;
  const canNext = centerIdx < filtered.length - 1;

  const prev = () => canPrev && setCenterIdx((i) => i - 1);
  const next = () => canNext && setCenterIdx((i) => i + 1);

  // Get visible window: [center-1, center, center+1] clamped
  const visibleIndices: number[] = [];
  for (let offset = -1; offset <= 1; offset++) {
    const idx = centerIdx + offset;
    if (idx >= 0 && idx < filtered.length) visibleIndices.push(idx);
  }

  const handleOrder = (product: Product) => {
    const msg = `Halo Toko Kuweh Cikarang, saya ingin memesan:\n🍰 *Produk:* ${product.name}\n\nBolehkah saya tahu ketersediaan dan minimal pemesanan? Terima kasih.`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <section id="produk" className="relative bg-white pt-8 pb-28 overflow-hidden">

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-10">
          <span className="font-['Great_Vibes',cursive] text-[#1E673C] text-3xl block mb-1">
            ✦ Menu Pilihan ✦
          </span>
          <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-[#0B3D20]">
            Kue &amp; Jajanan Terbaik Kami
          </h2>
          <p className="text-[#4A4A4A] text-sm mt-2 max-w-lg mx-auto font-sans">
            Dari kue basah tradisional, gorengan gurih, bolu lembut, hingga paket snack box eksklusif.
          </p>
        </div>

        {/* ── Snack Box Banner ── */}
        <div
          id="snackbox"
          className="mb-12 bg-[#F8F4EE] rounded-3xl border-2 border-[#C8A96E]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0B3D20] text-[#C8A96E] flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
              🍱
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A96E]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8A96E] font-sans">
                  Paket Spesial Acara &amp; Rapat
                </span>
              </div>
              <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-[#0B3D20]">
                Snack Box Mulai{' '}
                <span className="text-[#C8A96E]">Rp 10.000 / Box</span>
              </h3>
              <p className="text-xs text-[#4A4A4A] mt-1 font-sans max-w-md">
                Bebas kombinasi isi kue gurih dan manis. Cocok untuk meeting kantor Cikarang, arisan, dan syukuran.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenSnackBoxBuilder}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0B3D20] hover:bg-[#134E2C] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg transition-all active:scale-95 font-sans"
          >
            <Box className="w-4 h-4" />
            Custom Snack Box
          </button>
        </div>

        {/* ── Category Pills ── */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-16">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold font-sans transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0B3D20] text-white shadow-md'
                    : 'bg-gray-100 text-[#4A4A4A] hover:bg-[#F5E6C8] hover:text-[#0B3D20]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── Carousel ── */}
        <div className="relative mt-16 sm:mt-0">
          {/* Prev Arrow */}
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Produk sebelumnya"
            className="absolute left-0 top-1/2 -translate-y-8 -translate-x-3 sm:-translate-x-5 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center hover:bg-[#F5E6C8] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-[#0B3D20]" />
          </button>

          {/* Cards grid — with top padding to accommodate the floating image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + '-' + centerIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 pt-20"
            >
              {visibleIndices.map((idx) => {
                const product = filtered[idx];
                const isCenter = idx === centerIdx;
                const cardBg = isCenter ? 'bg-[#C8A96E]' : 'bg-[#0B3D20]';
                const titleColor = isCenter ? 'text-[#0B3D20]' : 'text-white';
                const scriptColor = isCenter ? 'text-[#0B3D20]/70' : 'text-[#C8A96E]';
                const starColor = isCenter ? 'fill-[#0B3D20] text-[#0B3D20]' : 'fill-[#C8A96E] text-[#C8A96E]';
                const descColor = isCenter ? 'text-[#0B3D20]/75' : 'text-white/70';
                const btnStyle = isCenter
                  ? 'bg-[#0B3D20] text-white hover:bg-[#134E2C]'
                  : 'bg-white text-[#0B3D20] hover:bg-[#F5E6C8]';
                const ratingColor = isCenter ? 'text-[#0B3D20]' : 'text-white';

                // On mobile: only show center card to prevent floating image overlap
                const hiddenOnMobile = !isCenter ? 'hidden sm:block' : 'block';

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className={`relative ${hiddenOnMobile}`}
                  >
                    {/* Floating image area — overflows above card */}
                    <div className="absolute -top-16 inset-x-0 flex justify-center z-10 px-6">
                      <div className="relative w-48 h-36">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="192px"
                          className="object-cover rounded-2xl shadow-2xl"
                        />
                      </div>
                    </div>

                    {/* Card body */}
                    <div className={`${cardBg} rounded-3xl pt-24 pb-6 px-6 shadow-2xl transition-all duration-300`}>
                      {/* Script category */}
                      <span className={`font-['Great_Vibes',cursive] text-2xl block mb-0.5 ${scriptColor}`}>
                        {product.categoryLabel}
                      </span>

                      {/* Product name */}
                      <h3 className={`font-['Playfair_Display',serif] text-2xl font-black mb-3 leading-tight ${titleColor}`}>
                        {product.name}
                      </h3>

                      {/* Stars + rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? starColor : 'text-white/30'}`} />
                        ))}
                        <span className={`text-sm font-bold ml-1 font-sans ${ratingColor}`}>
                          {product.rating.toFixed(1)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className={`text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-sans ${descColor}`}>
                        {product.description}
                      </p>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleOrder(product)}
                        className={`w-full py-3 px-5 rounded-full font-bold text-sm font-sans transition-all hover:scale-[1.02] active:scale-95 shadow-md ${btnStyle}`}
                      >
                        PESAN VIA WA
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Next Arrow */}
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Produk berikutnya"
            className="absolute right-0 top-1/2 -translate-y-8 translate-x-3 sm:translate-x-5 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center hover:bg-[#F5E6C8] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5 text-[#0B3D20]" />
          </button>
        </div>

        {/* Carousel dots */}
        {filtered.length > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {filtered.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCenterIdx(idx)}
                aria-label={`Produk ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  idx === centerIdx
                    ? 'w-6 h-2.5 bg-[#0B3D20]'
                    : 'w-2.5 h-2.5 bg-gray-200 hover:bg-[#C8A96E]'
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 88"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-20 sm:h-24 fill-[#F7F3ED]"
          preserveAspectRatio="none"
        >
          <path d="M0,44 C240,0 480,88 720,44 C960,0 1200,72 1440,44 L1440,88 L0,88 Z" />
        </svg>
      </div>
    </section>
  );
}
