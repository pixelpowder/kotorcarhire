// Locale-aware JSON-LD schema: AutoRental + FAQPage with translated strings.
// Replaces the previously hardcoded English schema blocks in src/app/layout.jsx.

import en from '@/src/i18n/locales/en.json';
import de from '@/src/i18n/locales/de.json';
import ru from '@/src/i18n/locales/ru.json';
import it from '@/src/i18n/locales/it.json';
import fr from '@/src/i18n/locales/fr.json';
import me from '@/src/i18n/locales/me.json';

const translations = { en, de, ru, it, fr, me };

const BASE_AUTO_RENTAL = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  "name": "Kotor Car Hire",
  "url": "https://www.kotorcarhire.com",
  "email": "info@kotorcarhire.com",
  "image": "https://www.kotorcarhire.com/img/schema-car.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Tabacina BB",
    "addressLocality": "Kotor",
    "postalCode": "85330",
    "addressCountry": "ME"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Kotor"
    },
    {
      "@type": "City",
      "name": "Tivat"
    },
    {
      "@type": "City",
      "name": "Budva"
    },
    {
      "@type": "City",
      "name": "Perast"
    },
    {
      "@type": "City",
      "name": "Herceg Novi"
    },
    {
      "@type": "City",
      "name": "Podgorica"
    }
  ],
  "priceRange": "€25–€120",
  "currenciesAccepted": "EUR",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Saturday",
        "Sunday"
      ],
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

function pick(obj, path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

export default function LocaleAwareSchema({ lang = 'en' }) {
  const locale = translations[lang] ? lang : 'en';
  const t = translations[locale];

  const description = pick(t, 'home.seoDesc')
    || pick(t, 'meta.homeDescription')
    || pick(t, 'hero.subtitle')
    || "Rent a car in Kotor from trusted local providers with free cancellation, full insurance, and airport pickup included with every booking.";

  const autoRental = { ...BASE_AUTO_RENTAL, description };

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
    </>
  );
}
