import { WA_NUMBERS } from "@/utils/whatsapp";

/**
 * Sumber tunggal identitas & info bisnis.
 * Dipakai untuk metadata, robots.txt, sitemap.xml, dan structured data (JSON-LD).
 */
export const SITE = {
  name: "Toko Kuweh",
  /** Nama alternatif untuk mesin pencari (memperkuat keyword "toko kue"). */
  alternateName: "Toko Kue Kuweh Cikarang",
  url: "https://tokokuweh.com",
  locale: "id_ID",
  tagline: "Taste of Cikarang",
  title: "Toko Kuweh - Toko Kue & Snack Box Cikarang Selatan, Bekasi",
  description:
    "Toko Kuweh adalah toko kue di Cikarang Selatan, Bekasi. Menyediakan kue basah tradisional, jajanan gurih, bolu, nasi box, dan paket snack box mulai Rp 10.000. Pesan mudah via WhatsApp, siap kirim area Cikarang & Bekasi.",
  keywords: [
    // Keyword utama
    "toko kue",
    "toko kue cikarang",
    "toko kue cikarang selatan",
    "toko kue bekasi",
    "toko kue terdekat",
    "toko kue online",
    "toko kuweh",
    // Keyword turunan / layanan
    "kue basah cikarang",
    "jajanan pasar cikarang",
    "snack box cikarang",
    "snack box murah cikarang",
    "nasi box cikarang",
    "pesan kue via whatsapp",
    "lemper ayam cikarang",
    "risol mayo cikarang",
    "kue kotak bekasi",
    "catering snack box bekasi",
    "vila mutiara cikarang 2",
  ],
  category: "Toko Kue & Snack Box",
  phone: `+${WA_NUMBERS[0].phone}`,
  whatsapp: WA_NUMBERS[0].phone,
  address: {
    street: "Vila Mutiara Cikarang 2, Blok B2 No. 30, Sukasejati",
    district: "Cikarang Selatan",
    city: "Bekasi",
    region: "Jawa Barat",
    country: "ID",
  },
  geo: {
    latitude: -6.3394513,
    longitude: 107.0976944,
  },
  mapsUrl: "https://maps.app.goo.gl/C1fQHCzHXogC3FZp8?g_st=ac",
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "06:30", closes: "20:00" },
    { days: ["Sunday"], opens: "07:00", closes: "18:00" },
  ],
  priceFrom: 10000,
  instagram: "https://www.instagram.com/tokokuweh__",
  /** Area layanan pengiriman (dipakai di konten & structured data). */
  serviceAreas: [
    "Cikarang Selatan",
    "Cikarang Utara",
    "Cikarang Barat",
    "Cikarang Pusat",
    "Cikarang Timur",
    "Sukasejati",
    "Lippo Cikarang",
    "Jababeka",
    "EJIP",
    "MM2100",
    "Serang Baru",
    "Cibitung",
    "Tambun",
    "Bekasi",
  ],
} as const;

export const SITE_URL = SITE.url;
