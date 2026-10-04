'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Box, Sparkles, UtensilsCrossed } from 'lucide-react';
import { CATEGORIES, PRODUCTS, Product } from '@/data/products';
import { getWhatsAppLink } from '@/utils/whatsapp';

interface ProductsProps {
  onOpenSnackBoxBuilder?: () => void;
  onOpenNasiBoxBuilder?: () => void;
}

export default function Products({ onOpenSnackBoxBuilder, onOpenNasiBoxBuilder }: ProductsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [currentIdx, setCurrentIdx] = useState(0);

  // 1 produk = 1 slide. Tidak ada produk yang muncul dua kali.
  const filtered = activeCategory === 'semua' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setCurrentIdx(0);
  };

  const canPrev = currentIdx > 0;
  const canNext = currentIdx < filtered.length - 1;

  const prev = () => canPrev && setCurrentIdx((i) => Math.max(0, i - 1));
  const next = () => canNext && setCurrentIdx((i) => Math.min(filtered.length - 1, i + 1));

  const product = filtered[currentIdx];

  const handleOrder = (product: Product) => {
    if (product.category === 'nasi-box') {
      onOpenNasiBoxBuilder?.();
      return;
    }
    const msg = `Halo Toko Kuweh Cikarang, saya ingin memesan:\n🍰 *Produk:* ${product.name}\n\nBolehkah saya tahu ketersediaan dan minimal pemesanan? Terima kasih.`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  // Warna kartu mengikuti kategori produk yang sedang tampil
  const isNasiBox = product?.category === 'nasi-box';
  const titleColor = isNasiBox ? 'text-white' : 'text-[#0B3D20]';
  const scriptColor = isNasiBox ? 'text-[#C8A96E]' : 'text-[#0B3D20]/70';
  const starColor = isNasiBox ? 'fill-[#C8A96E] text-[#C8A96E]' : 'fill-[#0B3D20] text-[#0B3D20]';
  const descColor = isNasiBox ? 'text-white/70' : 'text-[#0B3D20]/75';
  const ratingColor = isNasiBox ? 'text-white' : 'text-[#0B3D20]';
  const btnStyle = isNasiBox
    ? 'bg-white text-[#0B3D20] hover:bg-[#F5E6C8]'
    : 'bg-[#0B3D20] text-white hover:bg-[#134E2C]';

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
            Dari nasi box harian, kue basah tradisional, gorengan gurih, bolu lembut, hingga paket snack box eksklusif.
          </p>
        </div>

        {/* ── Nasi Box Banner ── */}
        <div
          id="nasibox"
          className="mb-12 bg-[#F8F4EE] rounded-3xl border-2 border-[#C8A96E]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1E673C] text-[#F5E6C8] flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A96E]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8A96E] font-sans">
                  Nasi Box Harian &amp; Acara
                </span>
              </div>
              <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-[#0B3D20]">
                Nasi Box Ayam Suwir &amp; Telur
              </h3>
              <p className="text-xs text-[#4A4A4A] mt-1 font-sans max-w-md">
                Nasi hangat + ayam suwir + telur dadar &amp; ceplok. Bisa juga dibuatkan lauk lain di luar menu sesuai permintaan kamu.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenNasiBoxBuilder}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0B3D20] hover:bg-[#134E2C] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg transition-all active:scale-95 font-sans"
          >
            <UtensilsCrossed className="w-4 h-4" />
            Custom Nasi Box
          </button>
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

        {/* ── Carousel: 1 produk per slide ── */}
        <div className="relative mt-10 sm:mt-0">
          {!product && (
            <div className="text-center py-12 text-[#8A8A7A]">
              <p>Belum ada produk di kategori ini.</p>
            </div>
          )}

          {product && (
            <>
              {/* Prev Arrow */}
              <button
                onClick={prev}
                disabled={!canPrev}
                aria-label="Produk sebelumnya"
                className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center hover:bg-[#F5E6C8] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-[#0B3D20]" />
              </button>

              <div className="px-12 sm:px-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory + '-' + product.id}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -32 }}
                    transition={{ duration: 0.28 }}
                    className="max-w-md mx-auto"
                  >
                    <article className={`${isNasiBox ? 'bg-[#0B3D20]' : 'bg-[#C8A96E]'} rounded-3xl shadow-2xl overflow-hidden`}>
                      {/* Foto produk — 1 produk 1 foto */}
                      {product.image && (
                        <div className="relative w-full aspect-[16/11] bg-white/20">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            priority
                            sizes="(max-width: 640px) 88vw, 448px"
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="px-6 sm:px-8 pb-7 pt-5">
                        <span className={`font-['Great_Vibes',cursive] text-2xl block mb-0.5 ${scriptColor}`}>
                          {product.categoryLabel}
                        </span>

                        <h3 className={`font-['Playfair_Display',serif] text-2xl sm:text-3xl font-black mb-2 leading-tight ${titleColor}`}>
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? starColor : 'text-white/30'}`} />
                          ))}
                          <span className={`text-sm font-bold ml-1 font-sans ${ratingColor}`}>
                            {product.rating.toFixed(1)}
                          </span>
                          {product.reviewCount > 0 && (
                            <span className={`text-xs ml-1 font-sans ${descColor}`}>({product.reviewCount} ulasan)</span>
                          )}
                        </div>

                        {product.minOrder && (
                          <p className={`text-xs font-bold mb-2 font-sans ${ratingColor}`}>{product.minOrder}</p>
                        )}

                        <p className={`text-xs sm:text-sm leading-relaxed mb-6 font-sans ${descColor}`}>
                          {product.description}
                        </p>

                        <button
                          onClick={() => handleOrder(product)}
                          className={`w-full py-3 px-5 rounded-full font-bold text-sm font-sans transition-all hover:scale-[1.02] active:scale-95 shadow-md ${btnStyle}`}
                        >
                          {isNasiBox ? 'PESAN & CUSTOM NASI BOX' : 'PESAN VIA WA'}
                        </button>
                      </div>
                    </article>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Arrow */}
              <button
                onClick={next}
                disabled={!canNext}
                aria-label="Produk berikutnya"
                className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center hover:bg-[#F5E6C8] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5 text-[#0B3D20]" />
              </button>
            </>
          )}
        </div>

        {/* Carousel dots + counter */}
        {filtered.length > 1 && (
          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-xs font-semibold text-[#8A8A7A] font-sans tracking-wide">
              Produk {currentIdx + 1} dari {filtered.length}
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {filtered.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentIdx(idx)}
                  aria-label={`Produk ${idx + 1}: ${p.name}`}
                  aria-current={idx === currentIdx}
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentIdx
                      ? 'w-6 h-2.5 bg-[#0B3D20]'
                      : 'w-2.5 h-2.5 bg-gray-200 hover:bg-[#C8A96E]'
                  }`}
                />
              ))}
            </div>
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
