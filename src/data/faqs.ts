export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Bagaimana cara memesan kue di Toko Kuweh?',
    answer: 'Anda dapat memilih kue atau paket yang diinginkan pada website ini lalu menekan tombol "Pesan via WhatsApp". Anda juga bisa langsung chat kami di WhatsApp +62 812-9056-1840 atau +62 816-4603-1835 dengan mencantumkan nama kue, jumlah pesanan, alamat tujuan, serta tanggal & waktu pengantaran.',
  },
  {
    id: 'faq-2',
    question: 'Berapa lama waktu minimal pemesanan (lead time)?',
    answer: 'Untuk pesanan satuan atau harian, kami sarankan pemesanan H-1 atau hari H pagi selama stok siap kirim. Untuk pesanan Paket Snack Box dalam jumlah besar (di atas 30 box), mohon konfirmasi H-2 atau H-3 agar kami dapat membuatkan kue segar langsung dari oven sesuai jadwal acara Anda.',
  },
  {
    id: 'faq-3',
    question: 'Apakah bisa custom isi Paket Snack Box sesuai budget?',
    answer: 'Sangat bisa! Paket snack box kami mulai dari Rp 10.000 / box. Anda bebas mengombinasikan pilihan kue gurih (Lemper, Risol Mayo, Sosis Solo, Pastel), kue manis (Kue Sus, Dadar Gulung, Pie Buah, Talam), aneka bolu, hingga minuman kemasan sesuai budget acara Anda.',
  },
  {
    id: 'faq-4',
    question: 'Area pengiriman mana saja yang dijangkau?',
    answer: 'Toko Kuweh beralamat di Vila Mutiara Cikarang 2, Blok B2 no 30, Sukasejati, Cikarang Selatan, Bekasi. Kami melayani pengantaran langsung ke seluruh area Cikarang (Lippo Cikarang, Jababeka, EJIP, MM2100, Sukasejati, Serang Baru) serta wilayah Bekasi dan sekitarnya melalui kurir atau kurir instan/same-day.',
  },
  {
    id: 'faq-5',
    question: 'Apakah bisa diambil langsung (Self Pickup) ke lokasi toko?',
    answer: 'Tentu bisa! Anda bisa datang langsung mengambil pesanan di alamat kami di Vila Mutiara Cikarang 2 Blok B2 No. 30, Sukasejati, Cikarang Selatan, Bekasi pada jam operasional (06.30 - 20.00 WIB).',
  },
  {
    id: 'faq-6',
    question: 'Metode pembayaran apa saja yang diterima?',
    answer: 'Kami menerima pembayaran melalui Transfer Bank (BCA, Mandiri, BRI), QRIS instan untuk semua e-wallet (GoPay, OVO, DANA, ShopeePay), dan Cash on Delivery (COD) / Tunai saat penyerahan pesanan sesuai kesepakatan.',
  },
];
