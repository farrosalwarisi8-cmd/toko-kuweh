'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Clock, Heart, Award, CheckCircle2 } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Leaf className="w-6 h-6 text-[#1A6B4F]" />,
      title: 'Bahan Alami Premium',
      desc: 'Bahan-bahan segar terpilih tanpa bahan pengawet berbahaya. Menggunakan santan murni dan gula aren asli.',
    },
    {
      icon: <Clock className="w-6 h-6 text-[#1A6B4F]" />,
      title: 'Resep Turun Temurun',
      desc: 'Resep autentik khas warisan keluarga yang menjaga kelezatan asli kue tradisional nusantara.',
    },
    {
      icon: <Award className="w-6 h-6 text-[#1A6B4F]" />,
      title: 'Kualitas Selalu Fresh',
      desc: 'Diproduksi segar setiap hari secara higienis, menjamin tekstur empuk, renyah, dan aroma wangi.',
    },
    {
      icon: <Heart className="w-6 h-6 text-[#1A6B4F]" />,
      title: 'Dibuat dengan Cinta',
      desc: 'Perhatian penuh pada detail tampilan dan kelezatan rasa untuk memeriahkan setiap momen spesial Anda.',
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  return (
    <section id="tentang" className="py-16 lg:py-24 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative subtle side blob */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#C8A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="font-['Great_Vibes',cursive] text-[#1A6B4F] text-2xl lg:text-3xl block mb-2">
            ✦ Tentang Kami ✦
          </span>
          <h2 className="font-['Playfair_Display',serif] text-[#0B3D2E] text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
            Cerita di Balik Setiap Kue yang Kami Sajikan
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent mx-auto mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Image Column (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold ring offset */}
              <div className="absolute -inset-3 rounded-3xl border-2 border-[#C8A96E]/40 transform -rotate-2" />
              
              <div className="relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/lemper-pastel-real.jpg"
                  alt="Produksi Asli Toko Kuweh - Lemper Ayam, Dadar Gulung, Pastel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
              </div>

              {/* Float Tag */}
              <div className="absolute -bottom-5 -right-3 bg-white border border-[#E8E4DC] p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B3D2E] text-[#C8A96E] flex items-center justify-center font-bold text-lg">
                  10+
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0B3D2E]">Tahun Pengalaman</p>
                  <p className="text-[11px] text-[#8A8A7A]">Membuat Kue Lezat</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text & Features Column (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="space-y-4 text-sm sm:text-base text-[#4A4A4A] leading-relaxed mb-8">
              <p>
                <strong className="text-[#0B3D2E] font-semibold">Toko Kuweh</strong> adalah usaha kuliner yang berbasis di{' '}
                <span className="text-[#1A6B4F] font-semibold underline decoration-[#C8A96E] underline-offset-4">
                  Cikarang Selatan, Bekasi
                </span>
                , yang menghadirkan beragam pilihan kue dan jajanan untuk berbagai kebutuhan dan momen istimewa.
              </p>
              <p>
                Dengan mengutamakan kualitas bahan, cita rasa, serta proses pembuatan yang diperhatikan dengan baik, kami berkomitmen menghadirkan produk yang tidak hanya lezat, tetapi juga memberikan pengalaman kuliner yang menyenangkan bagi pelanggan.
              </p>
              <p>
                Mulai dari kebutuhan santai pribadi di rumah, acara keluarga, arisan, syukuran, hampers, hingga berbagai kegiatan kantor dan perayaan akbar, Toko Kuweh siap menjadi bagian dari setiap momen spesial Anda.
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-[#114D3A]/10 border-l-4 border-[#C8A96E] text-xs sm:text-sm font-medium text-[#0B3D2E]">
                <em>&ldquo;Dibuat dengan perhatian, disajikan dengan kualitas.&rdquo;</em>
              </div>
            </div>

            {/* Feature Cards Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E4DC] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1A6B4F]/10 flex items-center justify-center mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-['Playfair_Display',serif] text-sm sm:text-base font-bold text-[#0B3D2E] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[#8A8A7A] leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
