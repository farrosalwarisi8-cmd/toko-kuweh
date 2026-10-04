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
  // ── Nasi Box ──
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

  // ── Gurih & Asin ──
  {
    id: 'risol-mayo',
    name: 'Risol Mayo',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.9,
    reviewCount: 173,
    image: '/images/risol-mayo.jpg',
    description: 'Risol isi ayam suwir dengan mayones creamy yang lembut dan gurih, dibungkus kulit panir emas yang renyah.',
    isPopular: true,
  },
  {
    id: 'risol',
    name: 'Risol',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.9,
    reviewCount: 198,
    image: '/images/risoles-box-real.jpg',
    description: 'Kulit risoles berbalut tepung panir emas super renyah dengan isian gurih creamy racikan Toko Kuweh. Krispi di luar, lembut di dalam!',
    isPopular: true,
  },
  {
    id: 'lumpia',
    name: 'Lumpia',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.9,
    reviewCount: 176,
    image: '/images/lumpia-special.jpg',
    description: 'Lumpia goreng renyah dengan isian ayam dan sayuran bumbu gurih, disajikan dengan saus acar kacang yang menggugah selera.',
  },
  {
    id: 'lemper',
    name: 'Lemper',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.9,
    reviewCount: 220,
    image: '/images/lemper.jpeg',
    description: 'Ketan pulen gurih santan kelapa murni, diisi suwiran daging ayam berbumbu rempah gurih wangi melimpah, dibungkus daun pisang alami.',
    isPopular: true,
  },
  {
    id: 'pastel',
    name: 'Pastel',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.8,
    reviewCount: 132,
    image: '/images/pastel.jpg',
    description: 'Pastel goreng kering isian ayam suwir, wortel, dan tauge bumbu gurih, dengan kulit tipis yang renyah.',
  },
  {
    id: 'lontong-isi',
    name: 'Lontong Isi',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.9,
    reviewCount: 154,
    image: '/images/lontongIsi.jpg',
    description: 'Lontong padat berisi ayam suwir, telur, dan taoge goreng dengan kuah kental gurih serta taburan bawang goreng.',
    isPopular: true,
  },
  {
    id: 'bakwan',
    name: 'Bakwan',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.7,
    reviewCount: 96,
    image: '/images/bakwan.jpg',
    description: 'Bakwan sayuran goreng renyah dengan isian kol, wortel, dan tauge segar bumbu gurih wangi.',
  },
  {
    id: 'tahu-isi',
    name: 'Tahu Isi',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.8,
    reviewCount: 110,
    image: '/images/tahu-isi.jpg',
    description: 'Tahu goreng renyah dengan isian taoge, kol, dan wortel bumbu gurih.',
    isPopular: true,
  },
  {
    id: 'martabak',
    name: 'Martabak',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.8,
    reviewCount: 102,
    image: '/images/martabak.jpg',
    description: 'Martabak gurih renyah dengan isian ayam cincang bumbu, disajikan dengan saus kacang dan acar segar.',
  },
  {
    id: 'sosis-solo',
    name: 'Sosis Solo',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.9,
    reviewCount: 142,
    image: '/images/lumpia-sosis-real.jpg',
    description: 'Dadar telur tipis lembut menggulung sosis ayam giling manis gurih beraroma pala dan ketumbar khas resep tradisional Solo.',
    isPopular: true,
  },

  // ── Kue Basah & Manis ──
  {
    id: 'sus-vla',
    name: 'Sus Vla',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 5.0,
    reviewCount: 230,
    image: '/images/kue-sus-real.jpg',
    description: 'Kue sus klasik mekar dengan kulit choux lembut dan isian custard vla vanila melimpah yang manis creamy dan disukai semua usia.',
    isPopular: true,
  },
  {
    id: 'sus-buah',
    name: 'Sus Buah',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.9,
    reviewCount: 165,
    image: '/images/susBuah.jpg',
    description: 'Kue sus mekar segar berisi vla susu creamy dan potongan buah segar. Berbeda dari Pie Buah karena kuihnya lebih ringan dan isiannya buah langsung.',
  },
  {
    id: 'pie-buah',
    name: 'Pie Buah',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.9,
    reviewCount: 195,
    image: '/images/pie-buah-real.jpg',
    description: 'Crust pie mentega renyah wangi diisi custard vla vanila lembut sutra dan dihiasi potongan buah segar.',
    isPopular: true,
  },
  {
    id: 'dadar-gulung',
    name: 'Dadar Gulung',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.8,
    reviewCount: 140,
    image: '/images/dadar-gulung.jpg',
    description: 'Dadar gulung hijau pandan lembut dengan isian kelapa parut manis gurih wangi gula aren.',
  },
  {
    id: 'lapis',
    name: 'Lapis',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.9,
    reviewCount: 118,
    image: '/images/lapis.jpg',
    description: 'Kue lapis legit tradisional dengan lapisan santan dan gula aren yang lembut dan legit.',
  },
  {
    id: 'bugis',
    name: 'Bugis',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.8,
    reviewCount: 97,
    image: '/images/bugis.jpg',
    description: 'Kue bugis ketan lembut berisi kelapa parut manis gurih khas Bugis, kenyal dan menggugah selera.',
  },
  {
    id: 'ketan-srikaya',
    name: 'Ketan Srikaya',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.9,
    reviewCount: 126,
    image: '/images/ketan-srikaya.jpg',
    description: 'Ketan pulen berkuah santan dengan vla srikaya kuning manis gurih khas, tekstur lembut dan wangi.',
  },
  {
    id: 'serabi',
    name: 'Serabi',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.8,
    reviewCount: 108,
    image: '/images/serabi.jpg',
    description: 'Serabi panggang di atas wajan dengan permukaan kecokelatan mengilap, dibuat dari santan gurih beraroma pandan.',
  },
  {
    id: 'kue-nona-manis',
    name: 'Kue Nona Manis',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.8,
    reviewCount: 92,
    image: '/images/kue-nona-manis.jpg',
    description: 'Kue Nona Manis yang lembut bertopping kelapa parut dan gula aren, manis legit wangi dan lumer di mulut.',
  },
  {
    id: 'kue-cente-manis',
    name: 'Kue Cente Manis',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.8,
    reviewCount: 84,
    image: '/images/kue-cente-manis.jpg',
    description: 'Kue cente bertekstur kenyal lembut dengan sirup gula aren yang lumer dan rasa manis legit yang khas.',
  },

  // ── Bolu & Loyang ──
  {
    id: 'bolu-pelangi',
    name: 'Bolu Pelangi',
    category: 'bolu-tart',
    categoryLabel: 'Bolu & Loyang',
    rating: 4.9,
    reviewCount: 104,
    image: '/images/bolu-pelangi.jpg',
    description: 'Bolu kukus warna-warni dengan tekstur sangat empuk, berpori rapat, dan manis pas. Tersedia juga ukuran loyang keluarga dan slice satuan.',
    isPopular: true,
  },
];

const normalizeName = (name: string) => name.trim().toLowerCase();

// Jaring pengaman: pastikan tidak ada produk dengan nama/id sama muncul dua kali.
export const PRODUCTS: Product[] = PRODUCT_LIST.filter((product, index, list) => {
  const name = normalizeName(product.name);
  const firstByName = list.findIndex((p) => normalizeName(p.name) === name);
  if (firstByName !== index) return false;
  const firstById = list.findIndex((p) => p.id === product.id);
  return firstById === index;
});