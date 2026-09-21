'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, MessageCircle, AlertCircle, History } from 'lucide-react';
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

const DRAFT_KEY = 'toko-kuweh-snackbox-draft';

// Tanggal minimal H-2 (2 hari dari hari ini), format YYYY-MM-DD waktu lokal
const getMinEventDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export default function SnackBoxModal({ isOpen, onClose }: SnackBoxModalProps) {
  const [selectedTier, setSelectedTier] = useState(TIERS[0]);
  const [selectedKue, setSelectedKue] = useState<string[]>([]);
  const [boxQuantity, setBoxQuantity] = useState(selectedTier.minBox);
  const [eventDate, setEventDate] = useState('');
  const [eventNotes, setEventNotes] = useState('');
  const [letShopChoose, setLetShopChoose] = useState(false);
  const [isDraftRestored, setIsDraftRestored] = useState(false);

  // Muat draf tersimpan saat modal dibuka; tanpa draf, mulai dari kondisi awal
  useEffect(() => {
    if (!isOpen) return;

    const applyDefaults = () => {
      setSelectedTier(TIERS[0]);
      setSelectedKue([]);
      setBoxQuantity(TIERS[0].minBox);
      setEventDate('');
      setEventNotes('');
      setLetShopChoose(false);
      setIsDraftRestored(false);
    };

    const loadDraft = () => {
      try {
        const raw = window.localStorage.getItem(DRAFT_KEY);
        if (!raw) {
          applyDefaults();
          return;
        }
        const draft = JSON.parse(raw);
        const tier = TIERS.find((t) => t.id === draft?.selectedTierId) ?? TIERS[0];
        setSelectedTier(tier);
        setSelectedKue(
          Array.isArray(draft?.selectedKue)
            ? draft.selectedKue
                .filter((k: unknown) => AVAILABLE_KUE.some((a) => a.name === k))
                .slice(0, tier.itemsAllowed)
            : []
        );
        setBoxQuantity(
          typeof draft?.boxQuantity === 'number' && draft.boxQuantity >= tier.minBox
            ? draft.boxQuantity
            : tier.minBox
        );
        setEventDate(typeof draft?.eventDate === 'string' ? draft.eventDate : '');
        setEventNotes(typeof draft?.eventNotes === 'string' ? draft.eventNotes : '');
        setLetShopChoose(draft?.letShopChoose === true);
        // Anggap sebagai draf hanya jika ada isian yang sudah diubah dari default
        const hasContent =
          (Array.isArray(draft?.selectedKue) && draft.selectedKue.length > 0) ||
          draft?.selectedTierId !== TIERS[0].id ||
          (typeof draft?.boxQuantity === 'number' && draft.boxQuantity > TIERS[0].minBox) ||
          (typeof draft?.eventDate === 'string' && draft.eventDate !== '') ||
          (typeof draft?.eventNotes === 'string' && draft.eventNotes !== '') ||
          draft?.letShopChoose === true;
        setIsDraftRestored(hasContent);
      } catch {
        applyDefaults();
      }
    };

    queueMicrotask(loadDraft);
  }, [isOpen]);

  // Simpan draf ke localStorage setiap ada perubahan selama modal terbuka
  useEffect(() => {
    if (!isOpen) return;
    const draft = {
      selectedTierId: selectedTier.id,
      selectedKue,
      boxQuantity,
      eventDate,
      eventNotes,
      letShopChoose,
    };
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // abaikan jika storage tidak tersedia
    }
  }, [isOpen, selectedTier, selectedKue, boxQuantity, eventDate, eventNotes, letShopChoose]);

  // Tutup modal saat tombol back ditekan di HP.
  // Pola: saat modal dibuka, dorong satu entry history dengan penanda.
  // - User tekan back  -> popstate -> tutup modal (entry sudah terkonsumsi)
  // - User tutup via X -> history.back() sendiri, popstate-nya diabaikan via flag
  const ignoreNextPopState = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    if (!window.history.state?.snackBoxModal) {
      window.history.pushState({ snackBoxModal: true }, '');
    }

    const handlePopState = () => {
      if (ignoreNextPopState.current) {
        ignoreNextPopState.current = false;
        return;
      }
      onCloseRef.current();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen]);

  const requestClose = () => {
    onClose();
    if (window.history.state?.snackBoxModal) {
      ignoreNextPopState.current = true;
      window.history.back();
    }
  };

  const toggleKue = (name: string) => {
    setLetShopChoose(false);
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

  const minEventDate = getMinEventDate();
  const isDateValid = eventDate !== '' && eventDate >= minEventDate;

  const allKueSelected = selectedKue.length === selectedTier.itemsAllowed;
  const kueComplete = allKueSelected || letShopChoose;
  const canOrder = kueComplete && isDateValid;

  const handleResetDraft = () => {
    setSelectedTier(TIERS[0]);
    setSelectedKue([]);
    setBoxQuantity(TIERS[0].minBox);
    setEventDate('');
    setEventNotes('');
    setLetShopChoose(false);
    setIsDraftRestored(false);
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      // abaikan
    }
  };

  const handleOrderWA = () => {
    const kueListText = letShopChoose
      ? '   (Diserahkan ke rekomendasi Toko Kuweh)'
      : selectedKue.map((k, i) => `   ${i + 1}. ${k}`).join('\n');

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

    // Pesanan terkirim, hapus draf
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      // abaikan
    }
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
            onClick={requestClose}
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
            <div className="bg-[#0B3D20] text-white p-5 sm:p-6 relative border-b border-[#C8A96E]/30">
              <button
                onClick={requestClose}
                className="absolute top-4 right-4 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence initial={false}>
                {isDraftRestored && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#FBF6EC] border-b border-[#C8A96E]/30 px-5 sm:px-6 py-2 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8A6D2F]">
                        <History className="w-3.5 h-3.5" />
                        Draf dilanjutkan — pilihan kamu sebelumnya sudah dimuat kembali
                      </span>
                      <button
                        type="button"
                        onClick={handleResetDraft}
                        className="text-[11px] font-bold text-[#0B3D20] hover:text-[#C8A96E] underline underline-offset-2 whitespace-nowrap"
                      >
                        Mulai dari awal
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsDraftRestored(false)}
                        className="p-1 rounded-full text-[#8A6D2F]/60 hover:text-[#8A6D2F] hover:bg-[#C8A96E]/10"
                        aria-label="Tutup notifikasi draf"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                <label className="block font-['Playfair_Display',serif] font-bold text-sm sm:text-base text-[#0B3D20] mb-2.5">
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
                          <span className="text-[10px] uppercase font-bold bg-[#134E2C] text-[#F5E6C8] px-2 py-0.5 rounded-full inline-block mb-1.5">
                            {tier.tag}
                          </span>
                        )}
                        <h4 className="font-bold text-sm text-[#0B3D20]">{tier.name}</h4>
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
                  <label className="font-['Playfair_Display',serif] font-bold text-sm sm:text-base text-[#0B3D20]">
                    2. Pilih {selectedTier.itemsAllowed} Varian Kue Isian:
                  </label>
                  <motion.span
                    key={letShopChoose ? 'toko' : selectedKue.length}
                    initial={{ scale: 1.12, opacity: 0.6 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-[#134E2C]/10 text-[#0B3D20]"
                  >
                    {letShopChoose
                      ? 'Dipilihkan Toko'
                      : `${selectedKue.length} / ${selectedTier.itemsAllowed} Dipilih`}
                  </motion.span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {AVAILABLE_KUE.map((kue) => {
                    const isPicked = selectedKue.includes(kue.name);
                    return (
                      <motion.button
                        key={kue.id}
                        type="button"
                        onClick={() => toggleKue(kue.name)}
                        whileTap={{ scale: 0.97 }}
                        animate={{ scale: isPicked ? [0.96, 1.04, 1] : 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-medium transition-colors ${
                          isPicked
                            ? 'bg-[#0B3D20] text-[#F5E6C8] border-[#0B3D20] shadow-sm'
                            : 'bg-white text-gray-700 border-[#E8E4DC] hover:border-[#C8A96E]'
                        }`}
                      >
                        <span className="truncate pr-1">{kue.name}</span>
                        {isPicked ? (
                          <motion.span
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                            className="flex shrink-0"
                          >
                            <Check className="w-4 h-4 text-[#C8A96E]" />
                          </motion.span>
                        ) : (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="text-[10px] text-gray-400 uppercase shrink-0"
                          >
                            {kue.type}
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Opsi cepat: serahkan pilihan ke toko */}
                <button
                  type="button"
                  onClick={() => {
                    const next = !letShopChoose;
                    setLetShopChoose(next);
                    if (next) setSelectedKue([]);
                  }}
                  className={`w-full mt-3 flex items-center justify-center gap-2 p-2.5 rounded-xl border-2 border-dashed text-xs font-semibold transition-all ${
                    letShopChoose
                      ? 'border-[#C8A96E] bg-[#C8A96E]/10 text-[#0B3D20]'
                      : 'border-[#E8E4DC] text-gray-600 hover:border-[#C8A96E] hover:text-[#0B3D20]'
                  }`}
                >
                  <Sparkles className={`w-4 h-4 ${letShopChoose ? 'text-[#C8A96E]' : 'text-gray-400'}`} />
                  {letShopChoose
                    ? 'Isian akan dipilihkan oleh Toko Kuweh ✓'
                    : 'Serahkan pilihan ke rekomendasi Toko Kuweh'}
                </button>

                {!letShopChoose && selectedKue.length < selectedTier.itemsAllowed && (
                  <p className="text-[11px] text-amber-700 flex items-center gap-1 mt-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Silakan pilih {selectedTier.itemsAllowed - selectedKue.length} kue lagi untuk melengkapi paket.
                  </p>
                )}
              </div>

              {/* Step 3: Jumlah Box & Tanggal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-bold text-[#0B3D20] mb-1">
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
                  <label className="block text-xs font-bold text-[#0B3D20] mb-1">
                    Tanggal Diperlukan:
                  </label>
                  <input
                    type="date"
                    min={minEventDate}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                  />
                  {eventDate !== '' && !isDateValid && (
                    <p className="text-[11px] text-red-600 mt-1">
                      Tanggal acara minimal 2 hari dari sekarang.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B3D20] mb-1">
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
                  <p className="font-['Playfair_Display',serif] text-2xl font-bold text-[#0B3D20]">
                    {formatRupiah(totalPrice)}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {formatRupiah(selectedTier.price)} x {boxQuantity} box
                  </p>
                </div>

                <motion.button
                  type="button"
                  onClick={handleOrderWA}
                  disabled={!canOrder}
                  animate={canOrder ? { scale: [0.96, 1.02, 1] } : { scale: 1 }}
                  whileTap={canOrder ? { scale: 0.97 } : undefined}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-colors ${
                    canOrder
                      ? 'bg-[#0B3D20] hover:bg-[#134E2C] text-[#F5E6C8] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <MessageCircle className={`w-4 h-4 transition-colors ${canOrder ? 'fill-[#C8A96E] text-[#0B3D20]' : 'fill-gray-400 text-gray-300'}`} />
                  <span className="relative inline-block">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={canOrder ? 'ready' : !kueComplete ? `kue-${selectedTier.itemsAllowed - selectedKue.length}` : 'tanggal'}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="block whitespace-nowrap"
                      >
                        {canOrder
                          ? 'Kirim Pesanan ke WhatsApp'
                          : !kueComplete
                            ? `Pilih ${selectedTier.itemsAllowed - selectedKue.length} kue lagi`
                            : 'Pilih tanggal acara (min. 2 hari dari sekarang)'}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
