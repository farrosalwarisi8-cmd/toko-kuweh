'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { FAQS } from '@/data/faqs';
import { getWhatsAppLink } from '@/utils/whatsapp';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const defaultWaAsk = getWhatsAppLink(
    'Halo Admin Toko Kuweh, saya ingin bertanya hal lain yang belum ada di daftar FAQ.'
  );

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#FDFBF7] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-['Great_Vibes',cursive] text-[#1A6B4F] text-2xl lg:text-3xl block mb-2">
            ✦ FAQ ✦
          </span>
          <h2 className="font-['Playfair_Display',serif] text-[#0B3D2E] text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-[#4A4A4A] text-sm sm:text-base mt-2">
            Informasi lengkap seputar pemesanan kue, kemasan snack box, pengiriman, dan pembayaran.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-['Playfair_Display',serif] text-sm sm:text-base font-bold text-[#0B3D2E] pr-4 leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-8 h-8 rounded-full bg-[#114D3A]/10 text-[#0B3D2E] flex items-center justify-center shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-[#4A4A4A] leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* FAQ CTA Box */}
        <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-br from-[#0B3D2E] to-[#114D3A] rounded-3xl p-6 sm:p-10 text-center text-white shadow-2xl border border-[#C8A96E]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A96E]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-12 h-12 rounded-2xl bg-[#C8A96E]/20 border border-[#C8A96E]/40 text-[#C8A96E] flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>

          <h3 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold mb-2">
            Masih Ada Pertanyaan Lain?
          </h3>
          <p className="text-white/80 text-xs sm:text-sm max-w-md mx-auto mb-6">
            Tim kami siap membantu merekomendasikan pilihan kue dan snack box yang paling pas dengan anggaran acara Anda.
          </p>

          <a
            href={defaultWaAsk}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#C8A96E] hover:bg-[#F5E6C8] text-[#0B3D2E] font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat Langsung via WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
