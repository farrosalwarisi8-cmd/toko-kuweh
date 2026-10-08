import { SITE } from "@/data/site";
import { FAQS } from "@/data/faqs";

/**
 * Structured data (JSON-LD) untuk mesin pencari.
 * Membantu Google memahami bahwa Toko Kuweh adalah "toko kue" (Bakery) di
 * Cikarang Selatan berikut alamat, jam buka, area layanan, FAQ, dan paketnya.
 */
export function getStructuredData() {
  const url = SITE.url;
  const tokoId = `${url}/#toko`;
  const websiteId = `${url}/#website`;

  const priceRange = `Mulai Rp ${SITE.priceFrom.toLocaleString("id-ID")}`;

  const address = {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: `${SITE.address.district}, ${SITE.address.city}`,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  };

  const tokoKue = {
    "@type": "Bakery",
    "@id": tokoId,
    name: SITE.name,
    alternateName: SITE.alternateName,
    description: SITE.description,
    url,
    image: [`${url}/images/hero-platter.jpg`, `${url}/images/logo.jpg`],
    logo: `${url}/images/logo.jpg`,
    telephone: SITE.phone,
    priceRange,
    currenciesAccepted: "IDR",
    paymentAccepted: "Tunai, Transfer bank, QRIS, COD",
    servesCuisine: ["Kue basah tradisional", "Jajanan gurih", "Bolu", "Snack box", "Nasi box"],
    address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    hasMap: SITE.mapsUrl,
    areaServed: SITE.serviceAreas.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: SITE.openingHours.map(({ days, opens, closes }) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...days],
      opens,
      closes,
    })),
    sameAs: [SITE.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Katalog Kue & Paket Toko Kuweh",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Paket Snack Box",
            category: "Snack Box",
            image: `${url}/images/snack-box.jpg`,
            description:
              "Paket snack box isi kue gurih dan manis pilihan (lemper, risol, sosis solo, tahu isi, kue sus, pie buah) plus air cup, cocok untuk meeting kantor, arisan, dan syukuran.",
          },
          price: SITE.priceFrom,
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Nasi Box",
            category: "Nasi Box",
            image: `${url}/images/nasi-box.jpeg`,
            description:
              "Nasi box dengan lauk ayam suwir, ayam bakar, atau ayam chiken, lengkap dengan telur, sambal, dan lalapan. Minimal pemesanan 10 box.",
          },
          availability: "https://schema.org/InStock",
        },
      ],
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url,
    name: SITE.name,
    alternateName: SITE.alternateName,
    description: SITE.description,
    inLanguage: "id-ID",
    publisher: { "@id": tokoId },
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: { "@id": websiteId },
    about: { "@id": tokoId },
    inLanguage: "id-ID",
    primaryImageOfPage: `${url}/images/hero-platter.jpg`,
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${url}/#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [tokoKue, website, webPage, faqPage],
  };
}
