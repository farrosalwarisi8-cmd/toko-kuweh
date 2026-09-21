'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, MessageCircle, AlertCircle, History, UtensilsCrossed } from 'lucide-react';
import { getWhatsAppLink } from '@/utils/whatsapp';

interface NasiBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_DEFAULTS = [
  { id: 'ayam-suwir-dadar', name: 'Ayam Suwir + Telur Dadar', desc: 'Lauk ayam suwir + telur dadar' },
  { id: 'ayam-suwir-ceplok', name: 'Ayam Suwir + Telur Ceplok', desc: 'Lauk ayam suwir + telur ceplok' },
  { id: 'ayam-suwir-lengkap', name: 'Ayam Suwir + Dadar & Ceplok', desc: 'Lauk ayam suwir + telur dadar & ceplok' },
];

const DRAFT_KEY = 'toko-kuweh-nasibox-draft';

const getMinEventDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export default function NasiBoxModal({ isOpen, onClose }: NasiBoxModalProps) {
  const [selectedMenu, setSelectedMenu] = useState(MENU_DEFAULTS[0]);
  const [customLauk, setCustomLauk] = useState('');
  const [boxQuantity, setBoxQuantity] = useState(10);
  const [eventDate, setEventDate] = useState('');
  const [eventNotes, setEventNotes] = useState('');
  const [isDraftRestored, setIsDraftRestored] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const applyDefaults = () => {
      setSelectedMenu(MENU_DEFAULTS[0]);
      setCustomLauk('');
      setBoxQuantity(10);
      setEventDate('');
      setEventNotes('');
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
        const menu = MENU_DEFAULTS.find((m) => m.id === draft?.selectedMenuId) ?? MENU_DEFAULTS[0];
        setSelectedMenu(menu);
        setCustomLauk(typeof draft?.customLauk === 'string' ? draft.customLauk : '');
        setBoxQuantity(
          typeof draft?.boxQuantity === 'number' && draft.boxQuantity >= 10
            ? draft.boxQuantity
            : 10
        );
        setEventDate(typeof draft?.eventDate === 'string' ? draft.eventDate : '');
        setEventNotes(typeof draft?.eventNotes === 'string' ? draft.eventNotes : '');
        const hasContent =
          (typeof draft?.customLauk === 'string' && draft.customLauk !== '') ||
          draft?.selectedMenuId !== MENU_DEFAULTS[0].id ||
          (typeof draft?.boxQuantity === 'number' && draft.boxQuantity > 10) ||
          (typeof draft?.eventDate === 'string' && draft.eventDate !== '') ||
          (typeof draft?.eventNotes === 'string' && draft.eventNotes !== '');
        setIsDraftRestored(hasContent);
      } catch {
        applyDefaults();
      }
    };

    queueMicrotask(loadDraft);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const draft = {
      selectedMenuId: selectedMenu.id,
      customLauk,
      boxQuantity,
      eventDate,
      eventNotes,
    };
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // abaikan jika storage tidak tersedia
    }
  }, [isOpen, selectedMenu, customLauk, boxQuantity, eventDate, eventNotes]);

  const ignoreNextPopState = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    if (!window.history.state?.nasiBoxModal) {
      window.history.pushState({ nasiBoxModal: true }, '');
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
    if (window.history.state?.nasiBoxModal) {
      ignoreNextPopState.current = true;
      window.history.back();
    }
  };

  const minEventDate = getMinEventDate();
  const isDateValid = eventDate !== '' && eventDate >= minEventDate;
  const canOrder = isDateValid;

  const handleResetDraft = () => {
    setSelectedMenu(MENU_DEFAULTS[0]);
    setCustomLauk('');
    setBoxQuantity(10);
    setEventDate('');
    setEventNotes('');
    setIsDraftRestored(false);
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      // abaikan
    }
  };

  const handleOrderWA = () => {
    const menusText = [
      `   • ${selectedMenu.name}`,
      customLauk.trim() !== '' ? `   • Lauk tambahan / custom: ${customLauk.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const message = `*FORM PEMESANAN NASI BOX - TOKO KUWEH*
Halo Admin Toko Kuweh Cikarang, saya ingin memesan Nasi Box:

🍱 *Menu Nasi:* ${selectedMenu.name}
🔢 *Jumlah Pesanan:* ${boxQuantity} Box
🧂 *Lauk Isian / Custom:*
${menusText}
📅 *Tanggal Acara:* ${eventDate || 'Akan dikonfirmasi'}
📝 *Catatan / Alamat Kirim:* ${eventNotes || 'Area Cikarang / Bekasi'}

Mohon informasi ketersediaan slot, harga, dan instruksi pembayaran. Terima kasih!`;

    window.open(getWhatsAppLink(message), '_blank');

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
                    src="/images/nasi-box.jpeg"
                    alt="Nasi Box Toko Kuweh"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#C8A96E] text-xs font-semibold uppercase tracking-wider mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C8A96E]" />
                    <span>Custom Order Spesial Acara</span>
                  </div>
                  <h3 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold text-white">
                    Builder Nasi Box Toko Kuweh
                  </h3>
                  <p className="text-white/80 text-xs mt-0.5">
                    Pilih menu nasi box, isi lauk andalan, atau minta dibuatkan lauk lain sesuai selera!
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-[#1A1A1A]">
              {/* Step 1: Pilih Menu Nasi */}
              <div>
                <label className="block font-['Playfair_Display',serif] font-bold text-sm sm:text-base text-[#0B3D20] mb-2.5">
                  1. Pilih Menu Nasi Box:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MENU_DEFAULTS.map((menu) => {
                    const isSelected = selectedMenu.id === menu.id;
                    return (
                      <button
                        key={menu.id}
                        type="button"
                        onClick={() => setSelectedMenu(menu)}
                        className={`text-left p-3.5 rounded-2xl border-2 transition-all relative ${
                          isSelected
                            ? 'border-[#C8A96E] bg-[#FDFBF7] shadow-md ring-2 ring-[#C8A96E]/30'
                            : 'border-[#E8E4DC] hover:border-gray-300 bg-white'
                        }`}
                      >
                        <h4 className="font-bold text-sm text-[#0B3D20]">{menu.name}</h4>
                        <p className="text-[11px] text-gray-600 leading-tight mt-1">
                          {menu.desc}
                        </p>
                        {isSelected && (
                          <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#C8A96E] text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Custom Lauk */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-['Playfair_Display',serif] font-bold text-sm sm:text-base text-[#0B3D20]">
                    2. Lauk Tambahan / Custom:
                  </label>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1E673C]">
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    Bisa request lauk di luar menu
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-[#C8A96E]">
                  <UtensilsCrossed className="w-4 h-4 shrink-0 text-[#C8A96E]" />
                  <input
                    type="text"
                    value={customLauk}
                    onChange={(e) => setCustomLauk(e.target.value)}
                    placeholder="Contoh: ayam bakar, rendang, sambal goreng kentang, ikan goreng..."
                    className="w-full text-sm text-gray-800 focus:outline-none bg-transparent"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Kosongkan jika cukup dengan menu nasi box standar di atas.
                </p>
              </div>

              {/* Step 3: Jumlah Box & Tanggal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-bold text-[#0B3D20] mb-1">
                    Jumlah Box (Minimal 10 box):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={10}
                      value={boxQuantity}
                      onChange={(e) => setBoxQuantity(Math.max(10, Number(e.target.value) || 0))}
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

              {/* Submit Card */}
              <div className="bg-[#F7F3ED] rounded-2xl p-4 border border-[#C8A96E]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-600">Pesanan ({boxQuantity} Box):</p>
                  <p className="text-sm font-bold text-[#0B3D20]">
                    {selectedMenu.name}
                    {customLauk.trim() !== '' && (
                      <span className="text-[#C8A96E]"> + custom lauk</span>
                    )}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Harga dapat dikonfirmasi admin via WhatsApp
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
                        key={isDateValid ? 'ready' : 'tanggal'}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="block whitespace-nowrap"
                      >
                        {isDateValid
                          ? 'Kirim Pesanan ke WhatsApp'
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