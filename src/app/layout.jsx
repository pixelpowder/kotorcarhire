import '@/src/index.css';
import '@/src/App.css';
import '@/src/ContentPage.css';
import '@/src/BookPage.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CookieBanner from '@/src/CookieBanner';
import { LanguageContext } from '@/src/i18n/LanguageContext';
import { DEFAULT_LANG } from '@/src/i18n/languages';

export const metadata = {
  title: 'Kotor Car Hire — UNESCO Bay & Old Town Rentals',
  description:
    'Explore Kotor\'s UNESCO walled city and the fjord-like bay by car. Collect at Tivat Airport, just 8 km away, or right outside the medieval gates. From €13/day with full insurance.',
  metadataBase: new URL('https://www.kotorcarhire.com'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/hero-video.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRental",
              "name": "Kotor Car Hire",
              "url": "https://www.kotorcarhire.com",
              "description": "Rent a car in Kotor from trusted local providers with free cancellation, full insurance, and airport pickup included with every booking.",
              "email": "info@kotorcarhire.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kotor",
                "addressCountry": "ME"
              },
              "areaServed": [
                { "@type": "City", "name": "Kotor" },
                { "@type": "City", "name": "Tivat" },
                { "@type": "City", "name": "Budva" },
                { "@type": "City", "name": "Perast" },
                { "@type": "City", "name": "Herceg Novi" },
                { "@type": "City", "name": "Podgorica" }
              ],
              "priceRange": "€25–€120",
              "currenciesAccepted": "EUR",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                  "opens": "09:00",
                  "closes": "17:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Saturday","Sunday"],
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
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "What documents do I need?", "acceptedAnswer": { "@type": "Answer", "text": "Bring your driving licence, passport, and a physical credit card in the main driver's name. If your licence doesn't display Latin-script details, an International Driving Permit is also required." }},
                { "@type": "Question", "name": "Can I drive to Croatia or Albania?", "acceptedAnswer": { "@type": "Answer", "text": "Croatia is 2 hours away via the Debeli Brijeg border crossing — we prepare the Green Card at booking. Albania requires separate Green Card paperwork, so let us know in advance. Bosnia, Serbia, and Kosovo are also permitted." }},
                { "@type": "Question", "name": "Is there a minimum age?", "acceptedAnswer": { "@type": "Answer", "text": "Drivers must be at least 21 with a minimum of 2 years' experience. A young driver supplement applies for those under 25 — the exact amount varies by vehicle and is shown in the search results." }},
                { "@type": "Question", "name": "What's included in the price?", "acceptedAnswer": { "@type": "Answer", "text": "Third Party Liability and CDW insurance are included in the base price for all vehicles, along with VAT and the mandatory safety kit. Unlimited mileage is available on most cars — check the vehicle card before booking." }},
                { "@type": "Question", "name": "How does pickup work at Tivat Airport?", "acceptedAnswer": { "@type": "Answer", "text": "Your agent meets you in the Tivat Airport arrivals hall holding a sign with your name. The car is parked directly outside. From the terminal to the Kotor Old Town walls takes around 15 minutes along the bay road. Alternatively, we can arrange pickup at the Tabacina car park at Kotor's Old Town entrance." }},
                { "@type": "Question", "name": "Can I drop off at a different location?", "acceptedAnswer": { "@type": "Answer", "text": "One-way rentals are available across 28 pickup and dropoff points in Montenegro. Select different locations at the booking stage and a one-way fee may apply depending on the distance." }},
                { "@type": "Question", "name": "Can I cancel my booking?", "acceptedAnswer": { "@type": "Answer", "text": "Free cancellation is available up to 7 days before the rental start date. Luxury cars and convertibles require 30 days' notice. A 6% payment processing fee is applied to all cancellations regardless of timing." }},
                { "@type": "Question", "name": "Is a deposit required?", "acceptedAnswer": { "@type": "Answer", "text": "Most vehicles require a deposit of €100–€350 held on a physical credit card in the driver's name. Some budget cars are available with no deposit — these are clearly flagged in the search results. The hold is released when the vehicle is returned undamaged." }},
                { "@type": "Question", "name": "What happens if I exceed the mileage limit?", "acceptedAnswer": { "@type": "Answer", "text": "Vehicles with mileage restrictions charge a per-kilometre rate above the agreed limit. The exact rate is listed in the vehicle details before you confirm your booking." }},
                { "@type": "Question", "name": "Are there hidden costs?", "acceptedAnswer": { "@type": "Answer", "text": "No. The price shown includes all taxes and fees. There are no airport surcharges, no fuel-policy surprises, and nothing added at the desk." }},
                { "@type": "Question", "name": "How much is the down payment?", "acceptedAnswer": { "@type": "Answer", "text": "A deposit of 15–20% of the total rental cost is required to confirm your booking. The remaining balance is settled directly with the rental agent when you collect the car." }},
                { "@type": "Question", "name": "Can I rent without a credit card?", "acceptedAnswer": { "@type": "Answer", "text": "A small number of vehicles in the fleet are available without a credit card. These options are clearly marked in the search results when you filter by pickup location." }}
              ]
            })
          }}
        />
      </head>
      <body>
        <LanguageContext value={DEFAULT_LANG}>
          {children}
          <CookieBanner />
          <Analytics />
          <SpeedInsights />
        </LanguageContext>
      </body>
    </html>
  );
}
