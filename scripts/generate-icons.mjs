// Buat favicon & app icon dari logo utama (public/images/logo.jpg).
//
// Jalankan: node scripts/generate-icons.mjs
//
// Menghasilkan (dipakai otomatis lewat konvensi file Next.js di src/app):
//   - src/app/favicon.ico     → 16, 32, 48 px (tag <link rel="icon"> untuk browser lama)
//   - src/app/icon.png        → 512 px (favicon modern / hasil pencarian Google)
//   - src/app/apple-icon.png  → 180 px (ikon homescreen iOS)
//
// Logo di-trim dulu (buang area putih di sekeliling) agar gambar kue terlihat
// sebesar mungkin di ukuran kecil, lalu diberi sedikit padding putih dan
// ditempatkan di kanvas persegi.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SOURCE = path.join(ROOT, 'public', 'images', 'logo.jpg');
const APP_DIR = path.join(ROOT, 'src', 'app');

// Padding 6% dari sisi kanvas supaya logo tidak menempel ke tepi ikon.
const PADDING_RATIO = 0.06;
const FAVICON_SIZES = [16, 32, 48];

/** Susun file .ico dari beberapa buffer PNG (format PNG-in-ICO, didukung semua browser modern). */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(16 * entries.length);
  let offset = header.length + directory.length;

  entries.forEach((entry, index) => {
    const base = index * 16;
    const dimension = entry.size >= 256 ? 0 : entry.size; // 0 berarti 256
    directory.writeUInt8(dimension, base + 0); // width
    directory.writeUInt8(dimension, base + 1); // height
    directory.writeUInt8(0, base + 2); // jumlah warna palet
    directory.writeUInt8(0, base + 3); // reserved
    directory.writeUInt16LE(1, base + 4); // color planes
    directory.writeUInt16LE(32, base + 6); // bits per pixel
    directory.writeUInt32LE(entry.png.length, base + 8);
    directory.writeUInt32LE(offset, base + 12);
    offset += entry.png.length;
  });

  return Buffer.concat([header, directory, ...entries.map((entry) => entry.png)]);
}

/**
 * Render persegi `size` x `size` berisi logo (sudah di-trim) di atas latar putih.
 *
 * `rgba: true` menghasilkan PNG RGBA — wajib untuk isi favicon.ico, karena
 * Turbopack (build Next.js) menolak entri ICO yang bukan RGBA. Padding dibuat
 * transparan supaya encoder PNG benar-benar menyimpan channel alpha (encoder
 * otomatis membuang alpha yang seluruhnya opaque).
 */
async function renderIcon(size, mark, { rgba = false } = {}) {
  const inner = Math.max(1, Math.round(size * (1 - PADDING_RATIO * 2)));
  const resized = await sharp(mark)
    .resize(inner, inner, { fit: 'inside', kernel: 'lanczos3' })
    .png()
    .toBuffer();

  const meta = await sharp(resized).metadata();
  const width = meta.width ?? inner;
  const height = meta.height ?? inner;

  const canvas = sharp({
    create: rgba
      ? { width: size, height: size, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } }
      : { width: size, height: size, channels: 3, background: { r: 255, g: 255, b: 255 } },
  }).composite([
    {
      input: resized,
      left: Math.round((size - width) / 2),
      top: Math.round((size - height) / 2),
    },
  ]);

  if (rgba) {
    const { data, info } = await canvas
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const png = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png({ compressionLevel: 9, effort: 8 })
      .toBuffer();
    const output = await sharp(png).metadata();
    if (!output.hasAlpha) {
      throw new Error(`PNG ${size}px tidak menyimpan channel alpha (wajib RGBA untuk favicon.ico).`);
    }
    return png;
  }

  // flatten() menyerap alpha agar PNG tidak menyimpan channel yang tidak perlu.
  return canvas.flatten({ background: '#ffffff' }).png({ compressionLevel: 9, effort: 8 }).toBuffer();
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`Logo tidak ditemukan: ${SOURCE}`);
    process.exit(1);
  }

  // Trim latar putih di sekeliling logo agar komposisi ikon lebih padat.
  const mark = await sharp(SOURCE).trim({ threshold: 12 }).png().toBuffer();

  const faviconEntries = [];
  for (const size of FAVICON_SIZES) {
    faviconEntries.push({ size, png: await renderIcon(size, mark, { rgba: true }) });
  }
  const icon512 = await renderIcon(512, mark);
  const apple180 = await renderIcon(180, mark);

  fs.writeFileSync(path.join(APP_DIR, 'favicon.ico'), buildIco(faviconEntries));
  fs.writeFileSync(path.join(APP_DIR, 'icon.png'), icon512);
  fs.writeFileSync(path.join(APP_DIR, 'apple-icon.png'), apple180);

  const report = [
    ['src/app/favicon.ico', fs.statSync(path.join(APP_DIR, 'favicon.ico')).size],
    ['src/app/icon.png', icon512.length],
    ['src/app/apple-icon.png', apple180.length],
  ];
  for (const [file, bytes] of report) {
    console.log(`${(bytes / 1024).toFixed(1).padStart(6)} KB  ${file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
