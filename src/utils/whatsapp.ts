export const WA_NUMBERS = [
  {
    label: "Admin 1 (WhatsApp Utama)",
    display: "+62 812-9056-1840",
    phone: "6281290561840",
    name: "Admin Toko Kuweh 1",
  },
  {
    label: "Admin 2 (WhatsApp Layanan Cepat)",
    display: "+62 816-4603-1835",
    phone: "6281646031835",
    name: "Admin Toko Kuweh 2",
  },
];

export function getWhatsAppLink(message: string, phoneNumber = "6281290561840"): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
