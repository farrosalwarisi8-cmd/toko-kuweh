// Kompres aset gambar di public/images agar website tidak berat.
//
// Jalankan: node scripts/optimize-images.mjs [--force]
//
// - JPEG/JPG : resize maksimal 1400px (tanpa memperbesar) + encode mozjpeg q78.
// - PNG      : jika punya transparansi → dioptimalkan sebagai PNG.
//              jika tidak → dikonversi ke .jpg (jauh lebih kecil) dan file .png dihapus.
// Hanya menimpa file jika hasilnya lebih kecil. Gunakan --force untuk memaksa ulang
// meski file sudah tampak teroptimasi.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

const MAX_DIMENSION = 1400;
const JPEG_QUALITY = 78;
// Ambang batas bytes-per-pixel untuk menganggap gambar sudah teroptimasi.
const OPTIMIZED_BPP = 0.4;

const force = process.argv.includes('--force');

const kb = (bytes) => (bytes / 1024).toFixed(0).padStart(6);

async function optimizeJpeg(input, meta) {
  const { width = 0, height = 0 } = meta;
  const resizeOptions =
    width > MAX_DIMENSION || height > MAX_DIMENSION
      ? width >= height
        ? { width: MAX_DIMENSION, withoutEnlargement: true }
        : { height: MAX_DIMENSION, withoutEnlargement: true }
      : null;

  let pipeline = sharp(input);
  if (resizeOptions) pipeline = pipeline.resize(resizeOptions);

  return pipeline
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
    .toBuffer();
}

async function optimizePng(input) {
  return sharp(input)
    .png({ palette: true, quality: 82, compressionLevel: 9, effort: 8 })
    .toBuffer();
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Folder tidak ditemukan: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(IMAGES_DIR)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort();

  let before = 0;
  let after = 0;

  for (const file of files) {
    const src = path.join(IMAGES_DIR, file);
    const stat = fs.statSync(src);
    const ext = path.extname(file).toLowerCase();
    before += stat.size;

    // Baca ke buffer dulu agar handle file tidak ditahan saat menimpa file yang sama.
    const input = fs.readFileSync(src);
    const meta = await sharp(input).metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    const bpp = w * h > 0 ? stat.size / (w * h) : Infinity;
    const withinDimensions = w <= MAX_DIMENSION && h <= MAX_DIMENSION;

    if (!force && withinDimensions && bpp <= OPTIMIZED_BPP) {
      after += stat.size;
      console.log(`${kb(stat.size)} KB  +  ${file} (sudah teroptimasi, dilewati)`);
      continue;
    }

    if (ext === '.png' && meta.hasAlpha) {
      const out = await optimizePng(input);
      if (out.length < stat.size) {
        fs.writeFileSync(src, out);
        after += out.length;
        console.log(`${kb(stat.size)} → ${kb(out.length)} KB  ${file}`);
      } else {
        after += stat.size;
        console.log(`${kb(stat.size)} KB  =  ${file} (tidak ada penghematan)`);
      }
      continue;
    }

    // JPEG, atau PNG tanpa alpha → keluaran JPEG.
    const out = await optimizeJpeg(input, meta);
    if (out.length >= stat.size && ext !== '.png') {
      after += stat.size;
      console.log(`${kb(stat.size)} KB  =  ${file} (tidak ada penghematan)`);
      continue;
    }

    if (ext === '.png') {
      const dest = src.replace(/\.png$/i, '.jpg');
      fs.writeFileSync(dest, out);
      fs.unlinkSync(src);
      after += out.length;
      console.log(`${kb(stat.size)} → ${kb(out.length)} KB  ${file} → ${path.basename(dest)}`);
    } else {
      fs.writeFileSync(src, out);
      after += out.length;
      console.log(`${kb(stat.size)} → ${kb(out.length)} KB  ${file}`);
    }
  }

  console.log('\n──────────────────────────────────────────────');
  console.log(`Total: ${(before / 1024 / 1024).toFixed(1)} MB → ${(after / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Hemat: ${((1 - after / before) * 100).toFixed(0)}%`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
