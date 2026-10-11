'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import SnackBoxModal from '@/components/SnackBoxModal';
import NasiBoxModal from '@/components/NasiBoxModal';
import { PRODUCTS } from '@/data/products';
import { SITE } from '@/data/site';
import { WA_NUMBERS } from '@/utils/whatsapp';

interface ModalContextValue {
  openSnackBox: () => void;
  closeSnackBox: () => void;
  openNasiBox: () => void;
  closeNasiBox: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal harus dipakai di dalam <ModalProvider>');
  }
  return ctx;
}

type RegisterToolFn = (
  tool: Record<string, unknown>,
  options?: { signal?: AbortSignal },
) => Promise<unknown>;

type ModelContext = { registerTool: RegisterToolFn };

function getModelContext(): ModelContext | null {
  if (typeof document === 'undefined') return null;
  const doc = document as { modelContext?: ModelContext };
  if (doc.modelContext && typeof doc.modelContext.registerTool === 'function') {
    return doc.modelContext;
  }
  const nav = navigator as { modelContext?: ModelContext };
  if (nav.modelContext && typeof nav.modelContext.registerTool === 'function') {
    return nav.modelContext;
  }
  return null;
}

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [isSnackBoxOpen, setIsSnackBoxOpen] = useState(false);
  const [isNasiBoxOpen, setIsNasiBoxOpen] = useState(false);

  const openSnackBox = useCallback(() => setIsSnackBoxOpen(true), []);
  const closeSnackBox = useCallback(() => setIsSnackBoxOpen(false), []);
  const openNasiBox = useCallback(() => setIsNasiBoxOpen(true), []);
  const closeNasiBox = useCallback(() => setIsNasiBoxOpen(false), []);

  // WebMCP (Chrome): daftarkan tools agar AI agent bisa membuka form pemesanan
  // dan membaca info toko. Feature-detected — tidak berpengaruh di browser
  // yang belum mendukung WebMCP.
  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;

    const controller = new AbortController();
    const { signal } = controller;

    const register = async () => {
      try {
        await modelContext.registerTool(
          {
            name: 'info-toko-kuweh',
            description:
              'Info lengkap Toko Kuweh: alamat, jam operasional, kontak WhatsApp, dan area pengiriman.',
            inputSchema: { type: 'object', properties: {} },
            annotations: { readOnlyHint: true },
            execute: () => ({
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    nama: SITE.name,
                    alamat: `${SITE.address.street}, ${SITE.address.district}, ${SITE.address.city}, ${SITE.address.region}`,
                    jam_buka: SITE.openingHours.map(
                      (o) => `${o.days.join(', ')}: ${o.opens}-${o.closes} WIB`,
                    ),
                    whatsapp: WA_NUMBERS.map((n) => n.display),
                    area_kirim: SITE.serviceAreas,
                    peta: SITE.mapsUrl,
                  }),
                },
              ],
            }),
          },
          { signal },
        );

        await modelContext.registerTool(
          {
            name: 'daftar-produk-kue',
            description: 'Daftar produk kue, nasi box, dan jajanan Toko Kuweh.',
            inputSchema: { type: 'object', properties: {} },
            annotations: { readOnlyHint: true },
            execute: () => ({
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    PRODUCTS.map((p) => ({
                      nama: p.name,
                      kategori: p.categoryLabel,
                      rating: p.rating,
                    })),
                  ),
                },
              ],
            }),
          },
          { signal },
        );

        await modelContext.registerTool(
          {
            name: 'buka-form-snack-box',
            description:
              'Membuka form pemesanan Paket Snack Box Toko Kuweh (mulai Rp 10.000/box).',
            inputSchema: { type: 'object', properties: {} },
            execute: () => {
              openSnackBox();
              return {
                content: [
                  { type: 'text', text: 'Form pemesanan Paket Snack Box dibuka di halaman.' },
                ],
              };
            },
          },
          { signal },
        );

        await modelContext.registerTool(
          {
            name: 'buka-form-nasi-box',
            description:
              'Membuka form custom Nasi Box Toko Kuweh (minimal 10 box, bisa custom lauk).',
            inputSchema: { type: 'object', properties: {} },
            execute: () => {
              openNasiBox();
              return {
                content: [
                  { type: 'text', text: 'Form custom Nasi Box dibuka di halaman.' },
                ],
              };
            },
          },
          { signal },
        );
      } catch {
        // WebMCP bersifat opsional — abaikan jika pendaftaran ditolak browser.
      }
    };

    register();

    return () => controller.abort();
  }, [openSnackBox, openNasiBox]);

  return (
    <ModalContext.Provider
      value={{ openSnackBox, closeSnackBox, openNasiBox, closeNasiBox }}
    >
      {children}
      <SnackBoxModal isOpen={isSnackBoxOpen} onClose={closeSnackBox} />
      <NasiBoxModal isOpen={isNasiBoxOpen} onClose={closeNasiBox} />
    </ModalContext.Provider>
  );
}
