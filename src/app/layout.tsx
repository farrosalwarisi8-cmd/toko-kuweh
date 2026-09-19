import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tokokuweh.com'),
  title: "Toko Kuweh - Toko Kue & Snack Box Premium Cikarang Selatan",
  description: "Toko Kuweh menyajikan aneka kue basah tradisional, jajanan gurih, bolu, dan paket snack box mulai Rp 10.000 di Cikarang Selatan, Bekasi. Pesan mudah via WhatsApp!",
  keywords: [
    "toko kue cikarang",
    "snack box cikarang",
    "toko kuweh",
    "kue basah cikarang selatan",
    "lemper ayam cikarang",
    "risol mayo cikarang",
    "kue kotak bekasi",
    "vila mutiara cikarang 2"
  ],
  openGraph: {
    title: "Toko Kuweh - Kue Premium & Snack Box Cikarang Selatan",
    description: "Dibuat dengan perhatian, disajikan dengan kualitas. Pilihan kue dan jajanan terbaik untuk setiap momen istimewa Anda.",
    images: ["/images/hero-platter.jpg"],
    type: "website",
  },
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${greatVibes.variable} ${inter.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#FDFBF7] text-[#4A4A4A]">
        {children}
      </body>
    </html>
  );
}
