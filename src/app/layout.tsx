import type { Metadata, Viewport } from "next";
import { Playfair_Display, Great_Vibes, Inter } from "next/font/google";
import { SITE } from "@/data/site";
import { getStructuredData } from "@/utils/seo";
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
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: SITE.category,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: "/images/hero-platter.jpg",
        width: 1200,
        height: 896,
        alt: "Aneka kue dan snack box Toko Kuweh, toko kue di Cikarang Selatan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/images/hero-platter.jpg"],
  },
  // Ikon (favicon, icon, apple-icon) diambil otomatis dari
  // src/app/favicon.ico, src/app/icon.png, dan src/app/apple-icon.png.
};

export const viewport: Viewport = {
  themeColor: "#0B3D20",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = getStructuredData();

  return (
    <html lang="id" className={`${playfair.variable} ${greatVibes.variable} ${inter.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#FDFBF7] text-[#4A4A4A]">
        {children}
        <script
          type="application/ld+json"
          // JSON-LD aman disisipkan di sini: dibuat dari data internal, bukan input pengguna.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
