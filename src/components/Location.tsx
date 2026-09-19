'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, ExternalLink, Navigation, CheckCircle2 } from 'lucide-react';
import { WA_NUMBERS, getWhatsAppLink } from '@/utils/whatsapp';

export default function Location() {
  const gmapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Vila+Mutiara+Cikarang+2+Blok+B2+no+30+Sukasejati+Cikarang+Selatan+Bekasi';

  return (
    <section id="lokasi" className="py-16 lg:py-24 bg-[#F7F3ED] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="font-['Great_Vibes',cursive] text-[#1A6B4F] text-2xl lg:text-3xl block mb-2">
            ✦ Kunjungi Kami ✦
          </span>
          <h2 className="font-['Playfair_Display',serif] text-[#0B3D2E] text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Temukan Toko Kami dengan Mudah
          </h2>
          <p className="text-[#4A4A4A] text-sm sm:text-base mt-2">
            Kunjungi dapur kami atau pesan langsung untuk pengiriman cepat ke seluruh Cikarang &amp; sekitarnya.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-stretch">
          
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full min-h-[350px] lg:min-h-[480px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border-4 border-white relative bg-gray-200"
          >
            <iframe
              src="https://www.google.com/maps?q=Vila+Mutiara+Cikarang+2+Sukasejati+Cikarang+Selatan&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Toko Kuweh Vila Mutiara Cikarang 2"
              className="w-full h-full"
            />
            
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md flex items-center gap-2 text-xs font-semibold text-[#0B3D2E]">
              <MapPin className="w-3.5 h-3.5 text-[#1A6B4F]" />
              <span>Vila Mutiara Cikarang 2</span>
            </div>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-2xl lg:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#E8E4DC] flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Alamat */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#0B3D2E]/10 text-[#0B3D2E] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Playfair_Display',serif] text-base font-bold text-[#0B3D2E] mb-1">
                    Alamat Lengkap Toko
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    <strong>Vila Mutiara Cikarang 2</strong><br />
                    Blok B2 No. 30, Sukasejati,<br />
                    Kec. Cikarang Selatan, Kab. Bekasi, Jawa Barat
                  </p>
                  <p className="text-[11px] text-[#8A8A7A] mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#1A6B4F]" />
                    Tersedia akses parkir &amp; pickup pesanan
                  </p>
                </div>
              </div>

              <div className="border-t border-[#E8E4DC]" />

              {/* Jam Operasional */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#0B3D2E]/10 text-[#0B3D2E] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Playfair_Display',serif] text-base font-bold text-[#0B3D2E] mb-1">
                    Jam Operasional
                  </h3>
                  <div className="space-y-1 text-xs sm:text-sm text-[#4A4A4A]">
                    <div className="flex justify-between gap-4">
                      <span>Senin - Sabtu:</span>
                      <strong className="text-[#0B3D2E]">06:30 - 20:00 WIB</strong>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Minggu &amp; Libur:</span>
                      <strong className="text-[#0B3D2E]">07:00 - 18:00 WIB</strong>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#8A8A7A] mt-1.5">
                    *Kue subuh &amp; snack box pagi disiapkan mulai jam 05:30 WIB
                  </p>
                </div>
              </div>

              <div className="border-t border-[#E8E4DC]" />

              {/* Kontak & WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#0B3D2E]/10 text-[#0B3D2E] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-['Playfair_Display',serif] text-base font-bold text-[#0B3D2E] mb-2">
                    Kontak &amp; WhatsApp Resmi
                  </h3>
                  <div className="space-y-2">
                    {WA_NUMBERS.map((contact) => (
                      <a
                        key={contact.phone}
                        href={getWhatsAppLink('Halo, saya ingin bertanya seputar menu Toko Kuweh.', contact.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#FDFBF7] hover:bg-[#F5E6C8]/50 border border-[#E8E4DC] text-xs font-semibold text-[#0B3D2E] transition-colors"
                      >
                        <span>{contact.display}</span>
                        <span className="text-[10px] text-[#1A6B4F] font-bold">Chat WA →</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps External Link Button */}
            <div className="mt-8 pt-4">
              <a
                href={gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0B3D2E] hover:bg-[#114D3A] text-white font-semibold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4 text-[#C8A96E]" />
                <span>Buka Petunjuk Arah di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/60" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
