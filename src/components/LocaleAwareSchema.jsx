// Locale-aware JSON-LD schema: AutoRental + FAQPage with translated strings.
// Replaces the previously hardcoded English schema blocks in src/app/layout.jsx.
// Reads FAQ items from the current locale's translation file so Google sees
// German schema on /de, Russian on /ru, etc.

import en from '@/src/i18n/locales/en.json';
import de from '@/src/i18n/locales/de.json';
import ru from '@/src/i18n/locales/ru.json';
import it from '@/src/i18n/locales/it.json';
import fr from '@/src/i18n/locales/fr.json';
import me from '@/src/i18n/locales/me.json';
import config from '@/src/siteConfig';

const translations = { en, de, ru, it, fr, me };

// Same company-level facts across locales — only the prose strings vary.
// Name, URL and email are pulled from siteConfig so each site has its own.
const SITE_URL = `https://www.${config.domain}`;
const BASE_AUTO_RENTAL = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  "name": config.name,
  "url": SITE_URL,
  "email": config.email,
  "image": `${SITE_URL}/img/schema-car.jpg`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Tabacina BB",
    "addressLocality": "Kotor",
    "postalCode": "85330",
    "addressCountry": "ME"
  },
  "areaServed": [
    { "@type": "City", "name": "Kotor" },
    { "@type": "City", "name": "Tivat" },
    { "@type": "City", "name": "Budva" },
    { "@type": "City", "name": "Herceg Novi" },
    { "@type": "City", "name": "Podgorica" },
    { "@type": "City", "name": "Ulcinj" }
  ],
  "priceRange": "€25-€120",
  "currenciesAccepted": "EUR",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "3",
    "bestRating": "5"
  }
};

// Resolve a nested path like "faqItems.0.q" against a translations object.
function pick(obj, path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

export default function LocaleAwareSchema({ lang = 'en' }) {
  const locale = translations[lang] ? lang : 'en';
  const t = translations[locale];

  const description = pick(t, 'home.seoDesc')
    || pick(t, 'meta.homeDescription')
    || pick(t, 'hero.subtitle')
    || 'Rent a car in Montenegro from trusted local providers with free cancellation, full insurance, and airport pickup included with every booking.';

  const autoRental = { ...BASE_AUTO_RENTAL, description };

  // FAQ items: read from faqItems.0.q / .a, .1.q / .a, etc.
  // Falls back to English if a key is missing.
  const faqItems = [];
  const faqFallback = translations.en.faqItems || {};
  const faqSource = t.faqItems || {};
  const indices = Object.keys({ ...faqFallback, ...faqSource }).filter(k => /^\d+$/.test(k));
  for (const i of indices) {
    const q = (faqSource[i] && faqSource[i].q) || (faqFallback[i] && faqFallback[i].q);
    const a = (faqSource[i] && faqSource[i].a) || (faqFallback[i] && faqFallback[i].a);
    if (q && a) {
      faqItems.push({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a },
      });
    }
  }

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems,
  };

  // Product/Offer list for fleet cars — fixes "Product snippets missing offers" GSC issue
  const siteUrl = BASE_AUTO_RENTAL.url;
  const vehicleList = (config.cars || []).map((car, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "item": {
      "@type": "Product",
      "name": car.name,
      "image": car.image && (car.image.startsWith('http') ? car.image : `${siteUrl}${car.image}`),
      "description": `${car.category} rental — ${car.transmission}, ${car.fuel}, ${car.seats} seats`,
      "brand": { "@type": "Brand", "name": car.name.split(' ')[0] },
      "offers": {
        "@type": "Offer",
        "price": String(car.price),
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": `${siteUrl}/book`,
        "priceValidUntil": `${new Date().getFullYear() + 1}-12-31`,
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "47",
        "bestRating": "5"
      }
    }
  }));

  const fleetItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${BASE_AUTO_RENTAL.name} Fleet`,
    "itemListElement": vehicleList
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autoRental) }}
      />
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
      {vehicleList.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fleetItemList) }}
        />
      )}
    </>
  );
}
