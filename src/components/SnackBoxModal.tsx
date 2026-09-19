'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShoppingBag, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';
import { formatRupiah, getWhatsAppLink } from '@/utils/whatsapp';

interface SnackBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIERS = [
  {
    id: '10k',
    name: 'Paket Hemat',
    price: 10000,
    itemsAllowed: 2,
    waterIncluded: true,
    minBox: 15,
    tag: 'Paling Populer',
    desc: 'Cocok untuk rapat singkat, arisan, & snack pembagian berkala.',
  },
  {
    id: '15k',
    name: 'Paket Deluxe',
    price: 15000,
    itemsAllowed: 3,
    waterIncluded: true,
    minBox: 10,
    tag: 'Rekomendasi Kantor',
    desc: 'Kombinasi mantap kue gurih & kue manis pilihan plus air cup.',
  },
  {
    id: '20k',
    name: 'Paket Executive',
    price: 20000,
    itemsAllowed: 4,
    waterIncluded: true,
    minBox: 10,
    tag: 'Acara Formal & Tamu VIP',
    desc: 'Isian lengkap kue premium, slice bolu lembut, air cup, dan perlengkapan.',
  },
];

const AVAILABLE_KUE = [
  { id: 'lemper', name: 'Lemper Ayam Spesial', type: 'gurih' },
  { id: 'risol-mayo', name: 'Risol Mayo Creamy', type: 'gurih' },
  { id: 'sosis-solo', name: 'Sosis Solo Asli', type: 'gurih' },
  { id: 'pastel', name: 'Pastel Sayur Renyah', type: 'gurih' },
  { id: 'tahu-isi', name: 'Tahu Isi Crispy', type: 'gurih' },
  { id: 'kue-sus', name: 'Kue Sus Vla Vanila', type: 'manis' },
  { id: 'dadar-gulung', name: 'Dadar Gulung Pandan', type: 'manis' },
  { id: 'pie-buah', name: 'Pie Buah Segar', type: 'manis' },
  { id: 'bubur-sumsum', name: 'Bubur Sumsum Segitiga', type: 'manis' },
  { id: 'kue-talam', name: 'Kue Lapis / Talam Pandan', type: 'manis' },
  { id: 'bolu-ketan', name: 'Slice Bolu Ketan Hitam', type: 'manis' },
  { id: 'bolu-pelangi', name: 'Slice Bolu Pelangi', type: 'manis' },
];

export default function SnackBoxModal({ isOpen, onClose }: SnackBoxModalProps) {
  const [selectedTier, setSelectedTier] = useState(TIERS[0]);
  const [selectedKue, setSelectedKue] = useState<string[]>(['lemper', 'kue-sus']);
  const [boxQuantity, setBoxQuantity] = useState(selectedTier.minBox);
  const [eventDate, setEventDate] = useState('');
  const [eventNotes, setEventNotes] = useState('');

  const toggleKue = (name: string) => {
    if (selectedKue.includes(name)) {
      setSelectedKue(selectedKue.filter((item) => item !== name));
    } else {
      if (selectedKue.length < selectedTier.itemsAllowed) {
        setSelectedKue([...selectedKue, name]);
      }
    }
  };

  const handleSelectTier = (tier: typeof TIERS[0]) => {
    setSelectedTier(tier);
    if (boxQuantity < tier.minBox) {
      setBoxQuantity(tier.minBox);
    }
    // Trim selected if exceeds new allowance
    if (selectedKue.length > tier.itemsAllowed) {
      setSelectedKue(selectedKue.slice(0, tier.itemsAllowed));
    }
  };

  const totalPrice = selectedTier.price * boxQuantity;

  const handleOrderWA = () => {
    const kueListText = selectedKue.length > 0
      ? selectedKue.map((k, i) => `   ${i + 1}. ${k}`).join('\n')
      : '   (Belum dipilih / serahkan rekomendasi Toko Kuweh)';

    const message = `*FORM PEMESANAN PAKET SNACK BOX - TOKO KUWEH*
Halo Admin Toko Kuweh Cikarang, saya ingin memesan Paket Snack Box:

📦 *Tipe Paket:* ${selectedTier.name} (${formatRupiah(selectedTier.price)}/box)
🔢 *Jumlah Pesanan:* ${boxQuantity} Box
💰 *Estimasi Total:* ${formatRupiah(totalPrice)}

🍰 *Pilihan Isian Kue:*
${kueListText}
🥤 *Tambahan:* Air Mineral Cup (Gratis dalam paket)

📅 *Tanggal Acara:* ${eventDate || 'Akan dikonfirmasi'}
📝 *Catatan / Alamat Kirim:* ${eventNotes || 'Area Cikarang / Bekasi'}

Mohon informasi ketersediaan slot dan instruksi pembayaran. Terima kasih!`;

    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-6 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="bg-[#0B3D2E] text-white p-5 sm:p-6 relative border-b border-[#C8A96E]/30">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-md overflow-hidden flex items-center justify-center shrink-0">
                  <Image
                    src="/images/logo.jpg"
                    alt="Logo Toko Kuweh"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#C8A96E] text-xs font-semibold uppercase tracking-wider mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C8A96E]" />
                    <span>Custom Order Spesial Acara</span>
                  </div>
                  <h3 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold text-white">
                    Builder Paket Snack Box Toko Kuweh
                  </h3>
                  <p className="text-white/80 text-xs mt-0.5">
                    Pilih paket mulai 10 rb, sesuaikan kombinasi kue favorit, dan pesan instan via WhatsApp!
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-[#1A1A1A]">
              {/* Step 1: Pilih Tier Paket */}
              <div>
                <label className="block font-['Playfair_Display',serif] font-bold text-sm sm:text-base text-[#0B3D2E] mb-2.5">
                  1. Pilih Pilihan Paket:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TIERS.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => handleSelectTier(tier)}
                        className={`text-left p-3.5 rounded-2xl border-2 transition-all relative ${
                          isSelected
                            ? 'border-[#C8A96E] bg-[#FDFBF7] shadow-md ring-2 ring-[#C8A96E]/30'
                            : 'border-[#E8E4DC] hover:border-gray-300 bg-white'
                        }`}
                      >
                        {tier.tag && (
                          <span className="text-[10px] uppercase font-bold bg-[#114D3A] text-[#F5E6C8] px-2 py-0.5 rounded-full inline-block mb-1.5">
                            {tier.tag}
                          </span>
                        )}
                        <h4 className="font-bold text-sm text-[#0B3D2E]">{tier.name}</h4>
                        <p className="font-['Playfair_Display',serif] text-base font-bold text-[#C8A96E] my-1">
                          {formatRupiah(tier.price)}
                          <span className="text-xs font-normal text-gray-500">/box</span>
                        </p>
                        <p className="text-[11px] text-gray-600 leading-tight">
                          Pilih {tier.itemsAllowed} kue + Air Cup
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Pilih Isian Kue */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-['Playfair_Display',serif] font-bold text-sm sm:text-base text-[#0B3D2E]">
                    2. Pilih {selectedTier.itemsAllowed} Varian Kue Isian:
                  </label>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#114D3A]/10 text-[#0B3D2E]">
                    {selectedKue.length} / {selectedTier.itemsAllowed} Dipilih
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {AVAILABLE_KUE.map((kue) => {
                    const isPicked = selectedKue.includes(kue.name);
                    return (
                      <button
                        key={kue.id}
                        type="button"
                        onClick={() => toggleKue(kue.name)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                          isPicked
                            ? 'bg-[#0B3D2E] text-[#F5E6C8] border-[#0B3D2E] shadow-sm'
                            : 'bg-white text-gray-700 border-[#E8E4DC] hover:border-[#C8A96E]'
                        }`}
                      >
                        <span className="truncate pr-1">{kue.name}</span>
                        {isPicked ? (
                          <Check className="w-4 h-4 text-[#C8A96E] shrink-0" />
                        ) : (
                          <span className="text-[10px] text-gray-400 uppercase shrink-0">
                            {kue.type}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedKue.length < selectedTier.itemsAllowed && (
                  <p className="text-[11px] text-amber-700 flex items-center gap-1 mt-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Silakan pilih {selectedTier.itemsAllowed - selectedKue.length} kue lagi untuk melengkapi paket.
                  </p>
                )}
              </div>

              {/* Step 3: Jumlah Box & Tanggal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-bold text-[#0B3D2E] mb-1">
                    Jumlah Box (Minimal {selectedTier.minBox} box):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={selectedTier.minBox}
                      value={boxQuantity}
                      onChange={(e) => setBoxQuantity(Math.max(selectedTier.minBox, Number(e.target.value) || 0))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                    />
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Kotak</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B3D2E] mb-1">
                    Tanggal Diperlukan:
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B3D2E] mb-1">
                  Catatan Tambahan / Alamat Pengiriman di Cikarang:
                </label>
                <textarea
                  rows={2}
                  value={eventNotes}
                  onChange={(e) => setEventNotes(e.target.value)}
                  placeholder="Contoh: Kirim ke Lippo Cikarang jam 08:30 pagi untuk acara rapat direksi."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                />
              </div>

              {/* Price Calculation Summary Card */}
              <div className="bg-[#F7F3ED] rounded-2xl p-4 border border-[#C8A96E]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-600">Estimasi Total ({boxQuantity} Box):</p>
                  <p className="font-['Playfair_Display',serif] text-2xl font-bold text-[#0B3D2E]">
                    {formatRupiah(totalPrice)}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {formatRupiah(selectedTier.price)} x {boxQuantity} box
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOrderWA}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B3D2E] hover:bg-[#114D3A] text-[#F5E6C8] font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-[#C8A96E] text-[#0B3D2E]" />
                  <span>Kirim Pesanan ke WhatsApp</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
