export interface Product {
  id: string;
  name: string;
  category: 'kue-basah' | 'kue-gurih' | 'bolu-tart' | 'nasi-box';
  categoryLabel: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  isPopular?: boolean;
  minOrder?: string;
}

export const CATEGORIES = [
  { id: 'semua', label: 'Semua Produk' },
  { id: 'nasi-box', label: 'Nasi Box' },
  { id: 'kue-gurih', label: 'Gurih & Asin' },
  { id: 'kue-basah', label: 'Kue Basah & Manis' },
  { id: 'bolu-tart', label: 'Bolu & Loyang' },
] as const;

const PRODUCT_LIST: Product[] = [
  // Nasi Box
  // nasi-box-ayam-telur: 1 card, gambar dari nasi kotak.jpeg
  {
    id: 'nasi-box-ayam-telur',
    name: 'Nasi Box Ayam Suwir & Telur',
    category: 'nasi-box',
    categoryLabel: 'Nasi Box',
    rating: 5.0,
    reviewCount: 140,
    image: '/images/nasi-box.jpeg',
    description: 'Nasi putih hangat dengan lauk ayam suwir bumbu manis gurih, telur dadar & ceplok spesial, ditambah sambal dan lalapan segar dalam box rapi. Cocok untuk meeting, acara, dan hajatan.',
    isPopular: true,
    minOrder: 'Min. 10 box',
  },
  // Kue Gurih & Asin
  // lemper-ayam: 1 card, gambar dari lemper-pastel-real.jpg
  {
    id: 'lemper-ayam',
    name: 'Lemper Ayam Spesial',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.9,
    reviewCount: 220,
    image: '/images/lemper-pastel-real.jpg',
    description: 'Ketan pulen gurih santan kelapa murni, diisi suwiran daging ayam berbumbu rempah gurih wangi melimpah, dibungkus daun pisang alami dan dikukus/dibakar.',
    isPopular: true,
  },
  {
    id: 'risol-mayo',
    name: 'Risoles Mayo Creamy',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.9,
    reviewCount: 198,
    image: '/images/risoles-box-real.jpg',
    description: 'Kulit risoles berbalut tepung panir emas super renyah dengan isian smoked beef gurih, irisan telur rebus, dan saus mayones creamy racikan Toko Kuweh. Krispi di luar, lembut di dalam!',
    isPopular: true,
  },
  {
    id: 'sosis-solo',
    name: 'Sosis Solo Asli',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.9,
    reviewCount: 142,
    image: '/images/lumpia-sosis-real.jpg',
    description: 'Dadar telur tipis lembut menggulung daging ayam giling manis gurih beraroma pala dan ketumbar khas resep tradisional Solo.',
    isPopular: true,
  },

  // Kue Basah & Manis
  // tahu-isi: 1 card, gambar dari tahu-isi-crispy.jpg
  {
    id: 'tahu-isi',
    name: 'Tahu Isi Crispy Pedas Gurih',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.7,
    reviewCount: 94,
    image: '/images/tahu-isi-crispy.jpg',
    description: 'Tahu goreng berkulit renyah dengan isian sayuran taoge, kol, wortel dengan sentuhan cabai rawit pedas nikmat.',
  },
  {
    id: 'pie-buah',
    name: 'Pie Buah Segar Premium',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.9,
    reviewCount: 195,
    image: '/images/pie-buah-real.jpg',
    description: 'Crust pie mentega renyah wangi diisi custard vla vanila lembut sutra dan dihiasi potongan buah stroberi segar serta jeruk manis menyegarkan.',
    isPopular: true,
  },
  {
    id: 'kue-sus',
    name: 'Kue Sus Vla Vanila Klasik',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 5.0,
    reviewCount: 230,
    image: '/images/kue-sus-real.jpg',
    description: 'Kue sus klasik mekar dengan kulit choux lembut dan isian custard vla vanila melimpah yang manis creamy dan disukai semua usia.',
    isPopular: true,
  },
  // Bolu & Loyang
  // bolu-pelangi: 1 card, gambar dari bolu-cake.jpg
  {
    id: 'bolu-pelangi',
    name: 'Bolu Pelangi Kukus Lembut',
    category: 'bolu-tart',
    categoryLabel: 'Bolu & Loyang',
    rating: 4.9,
    reviewCount: 104,
    image: '/images/bolu-cake.jpg',
    description: 'Bolu kukus warna-warni dengan tekstur sangat empuk, berpori rapat, dan manis pas. Tersedia juga ukuran loyang keluarga dan slice satuan.',
    isPopular: true,
  },
];

const normalizeName = (name: string) => name.trim().toLowerCase();

export const PRODUCTS: Product[] = PRODUCT_LIST.filter((product, index, list) => {
  const name = normalizeName(product.name);
  const firstByName = list.findIndex((p) => normalizeName(p.name) === name);
  if (firstByName !== index) return false;
  const firstById = list.findIndex((p) => p.id === product.id);
  return firstById === index;
});
