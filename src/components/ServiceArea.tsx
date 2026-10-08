'use client';

import { motion } from 'framer-motion';
import { Truck, MessageCircle, Clock, MapPin } from 'lucide-react';
import { SITE } from '@/data/site';
import { getWhatsAppLink } from '@/utils/whatsapp';

const HIGHLIGHTS = [
  {
    icon: Clock,
    title: 'Toko Kue yang Buka Setiap Hari',
    desc: 'Kue basah tradisional, jajanan gurih, dan bolu dibuat fresh setiap pagi mulai 06.30 WIB. Jadi Anda bisa membeli kue untuk sarapan, bekal kantor, atau camilan sore tanpa harus memesan jauh hari.',
  },
  {
    icon: MessageCircle,
    title: 'Pesan Kue Online via WhatsApp',
    desc: 'Cukup pilih menu di halaman ini, lalu chat WhatsApp kami untuk cek stok, custom isian, dan jadwal pengantaran. Pembayaran bisa transfer bank, QRIS, atau tunai saat pesanan diserahkan.',
  },
  {
    icon: Truck,
    title: 'Pengiriman Cikarang & Sekitarnya',
    desc: 'Sebagai toko kue di Cikarang Selatan, kami mengantar pesanan ke kawasan industri, perkantoran, dan rumah di Lippo Cikarang, Jababeka, EJIP, MM2100, Sukasejati, Serang Baru, Cibitung, Tambun, hingga Bekasi.',
  },
];

export default function ServiceArea() {
  const waLink = getWhatsAppLink(
    'Halo Toko Kuweh, saya ingin bertanya stok kue hari ini dan ongkir ke area saya.'
  );

  return (
    <section id="area-layanan" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -left-32 top-1/3 w-80 h-80 bg-[#C8A96E]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="font-['Great_Vibes',cursive] text-[#1E673C] text-2xl lg:text-3xl block mb-2">
            ✦ Area Layanan ✦
          </span>
          <h2 className="font-['Playfair_Display',serif] text-[#0B3D20] text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
            Toko Kue di Cikarang Selatan &amp; Sekitarnya
          </h2>
          <p className="text-[#4A4A4A] text-sm sm:text-base mt-3">
            Toko Kuweh adalah toko kue rumahan di Sukasejati, Cikarang Selatan, Bekasi, yang melayani
            pembelian kue harian maupun pesanan kue dan snack box untuk acara dalam jumlah besar.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent mx-auto mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {HIGHLIGHTS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex items-start gap-4 bg-[#FDFBF7] border border-[#E8E4DC] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1E673C]/10 text-[#1E673C] flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Playfair_Display',serif] text-sm sm:text-base font-bold text-[#0B3D20] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Service area card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 bg-gradient-to-br from-[#0B3D20] to-[#134E2C] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-[#C8A96E]/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#C8A96E]/20 border border-[#C8A96E]/40 text-[#C8A96E] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-['Playfair_Display',serif] text-lg font-bold">
                Area Pengiriman Kue
              </h3>
            </div>

            <p className="text-white/75 text-xs sm:text-sm leading-relaxed mb-5">
              Mencari toko kue terdekat di Cikarang? Kami mengantar kue, snack box, dan nasi box ke
              wilayah berikut:
            </p>

            <ul className="flex flex-wrap gap-2 mb-6">
              {SITE.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="text-[11px] sm:text-xs font-medium bg-white/10 border border-white/15 text-white/90 px-3 py-1.5 rounded-full font-sans"
                >
                  {area}
                </li>
              ))}
            </ul>

            <p className="text-white/70 text-xs leading-relaxed mb-6">
              Belum menemukan area Anda? Kirim pesan — kami bantu cek kemungkinan pengantaran atau
              self pickup di Vila Mutiara Cikarang 2, Sukasejati.
            </p>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 bg-[#C8A96E] hover:bg-[#F5E6C8] text-[#0B3D20] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              Tanya Stok &amp; Ongkir
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
