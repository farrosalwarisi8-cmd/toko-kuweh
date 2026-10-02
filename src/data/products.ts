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
  {
    id: 'eggroll',
    name: 'Eggroll',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.8,
    reviewCount: 120,
    image: '/images/lumpia-sosis-real.jpg',
    description: 'Eggroll goreng kering dengan kulit renyah di luar dan isian ayam suwir bumbu gurih wangi di dalam. Cocok untuk snack, hampers, dan pelengkap acara.',
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
    image: '/images/lemper-pastel-real.jpg',
    description: 'Ketan pulen gurih santan kelapa murni, diisi suwiran daging ayam berbumbu rempah gurih wangi melimpah, dibungkus daun pisang alami.',
    isPopular: true,
  },
  {
    id: 'karipap',
    name: 'Karipap',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.7,
    reviewCount: 88,
    image: '/images/hero-platter.jpg',
    description: 'Karipap isi ayam kari gurih dengan kulit pastry renyah lapis, garing dan lumer di mulut.',
  },
  {
    id: 'pastel',
    name: 'Pastel',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.8,
    reviewCount: 132,
    image: '/images/lemper-pastel-real.jpg',
    description: 'Pastel goreng kering isian ayam suwir, wortel, dan tauge bumbu gurih, dengan kulit tipis yang renyah.',
  },
  {
    id: 'lontong-ayam',
    name: 'Lontong Ayam',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.9,
    reviewCount: 154,
    image: '/images/nasi-box.jpeg',
    description: 'Lontong padat hangat dengan ayam suwir bumbu gurih, kuah kental, telur, dan taburan bawang goreng.',
    isPopular: true,
  },
  {
    id: 'bakwan',
    name: 'Bakwan',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.7,
    reviewCount: 96,
    image: '/images/tahu-isi-crispy.jpg',
    description: 'Bakwan sayuran goreng renyah dengan isian kol, wortel, dan tauge segar bumbu gurih wangi.',
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
  {
    id: 'tahu-isi',
    name: 'Tahu Isi',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.8,
    reviewCount: 110,
    image: '/images/tahu-isi-crispy.jpg',
    description: 'Tahu goreng berkulit renyah dengan isian sayuran taoge, kol, dan wortel bumbu gurih nikmat.',
    isPopular: true,
  },
  {
    id: 'martabak',
    name: 'Martabak',
    category: 'kue-gurih',
    categoryLabel: 'Gurih & Asin',
    rating: 4.8,
    reviewCount: 102,
    image: '/images/snack-box.jpg',
    description: 'Martabak gurih renyah dengan isian ayam cincang bumbu, disajikan dengan saus kacang dan acar segar.',
  },

  // Kue Basah & Manis
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
    image: '/images/hero-platter.jpg',
    description: 'Kue sus mekar segar berisi vla susu creamy dan potongan buah segar manis yang menyegarkan.',
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
    image: '/images/hero-platter.jpg',
    description: 'Dadar gulung hijau pandan lembut dengan isian kelapa parut manis gurih wangi gula aren.',
  },
  {
    id: 'lapis',
    name: 'Lapis',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.9,
    reviewCount: 118,
    image: '/images/bolu-cake.jpg',
    description: 'Kue lapis legit tradisional dengan lapisan santan dan gula aren yang lembut dan legit.',
  },
  {
    id: 'bugis',
    name: 'Bugis',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.8,
    reviewCount: 97,
    image: '/images/lemper-pastel-real.jpg',
    description: 'Kue bugis ketan lembut berisi kelapa parut manis gurih khas Bugis, kenyal dan menggugah selera.',
  },
  {
    id: 'ketan-srikaya',
    name: 'Ketan Srikaya',
    category: 'kue-basah',
    categoryLabel: 'Kue Basah & Manis',
    rating: 4.9,
    reviewCount: 126,
    image: '/images/bubur-sumsum-real.jpg',
    description: 'Ketan pulen berkuah santan dengan vla srikaya kuning manis gurih khas, tekstur lembut dan wangi.',
  },

  // Bolu & Loyang
  // bolu-pelangi: 1 card, gambar dari bolu-cake.jpg
  {
    id: 'bolu-pelangi',
    name: 'Bolu Pelangi',
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
