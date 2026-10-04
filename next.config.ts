import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sajikan AVIF (lebih kecil) dengan fallback WebP untuk browser lama.
    formats: ["image/avif", "image/webp"],
    // Next.js 16 mewajibkan allowlist kualitas gambar.
    qualities: [60, 75],
    // Simpan hasil optimasi lebih lama agar tidak di-encode ulang tiap 4 jam.
    minimumCacheTTL: 2678400, // 31 hari
  },
};

export default nextConfig;
