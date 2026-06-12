'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Nav from './Nav';
import useTranslation from './i18n/useTranslation';
import { WIDGET_LOCALE } from './i18n/languages';
import { getStoredGclid } from './lib/clickId';
import LocalRentWidget from './components/LocalRentWidget';
import { FLEET_SLUG_TO_CAR_IDS, DBV_SLUG_TO_CAR_IDS } from './data/fleetCars';
import './BookPage.css';

// No-iframe variant of /book. Mounts LocalRent's white-label app directly on
// the page; LR's position:sticky on .search-cigarette pins against the page
// scroll natively (no iframe boundary), giving the same scroll-to-pin
// transition as localrent.com's own site.
//
// LIVE on /book. The previous iframe build (src/BookPage.jsx) is kept as a
// rollback at /book-iframe for one week; delete that folder once this build
// has run without conversion regression.
export default function BookPageNative() {
  const { lang } = useTranslation();
  const searchParams = useSearchParams();
  const get = (k) => searchParams?.get(k) ?? null;

  // gclid is captured on the landing page into localStorage; read once on
  // mount so the LocalRent script tag boots with the correct data-marker.
  const [gclid, setGclid] = useState(null);
  useEffect(() => {
    setGclid(getStoredGclid());
  }, []);

  // Mirror BookPage.jsx: mark <html> with .on-book-page so the App.css
  // rules scoped to that class (mobile top-bar hide, scroll-bar hide,
  // anything else book-only) apply here too. Without this, mobile
  // header-stack height is 100 (top-bar visible) instead of 64, and the
  // cigarette's translateY(-64px) under-shifts when the nav scroll-hides.
  useEffect(() => {
    document.documentElement.classList.add('on-book-page');
    return () => document.documentElement.classList.remove('on-book-page');
  }, []);

  const cityId = get('city_id') || get('pickup_city_id') || '9';
  // Non-Montenegro pickups (Dubrovnik = Croatia, country 202) pass `country`
  // on the URL so the right national inventory boots.
  const country = get('country') || '133';
  const widgetLang = WIDGET_LOCALE[lang] || 'en';
  // Date / time forwarded from the homepage hero (handleSearch in
  // App.jsx, or the v3 widget interceptor in HeroLR.jsx). When absent
  // (direct landing on /book), LocalRentWidget falls back to LR's
  // default 14-day window.
  const pickupDate = get('pickup_date') || get('date_from');
  const dropoffDate = get('dropoff_date') || get('date_to');
  const pickupTime = get('pickup_time') || get('time_from') || '10:00';
  const dropoffTime = get('dropoff_time') || get('time_to') || '10:00';
  // One-way drop-off: the homepage v3 widget interceptor passes both
  // dropoff_city_id and dropoff_city_name when the user picked a
  // different drop-off than pickup. Same param shape as widget.html
  // (iframe build) line 2096-2102. Falls through to "Same place" when
  // unset, which is LR's default.
  const dropoffCityId = get('dropoff_city_id');
  const dropoffCityName = get('dropoff_city_name');

  // ?model=<slug> -> car_ids CSV (homepage fleet cards). Resolved here at
  // the page level and forwarded to LocalRentWidget as a string; the
  // widget pre-writes it into the URL hash so LR's router applies the
  // filter on boot. No Vuex polling, no fetchCars spam (the polling
  // version in fb9bab6 caused 500 bursts and was reverted in e798eab).
  const modelSlug = get('model');
  const carIds = modelSlug
    ? (country === '202' ? DBV_SLUG_TO_CAR_IDS[modelSlug] : FLEET_SLUG_TO_CAR_IDS[modelSlug])
    : null;
  // The pickup location name (e.g. "Tivat") - LR's hash uses uppercase
  // ASCII city codes (pc=TIVAT). Pass through so the widget can stamp
  // both pc and dc on the hash.
  const location = get('location');

  return (
    <div className="book-page" style={{
      // Match the iframe version's layout: viewport-locked, flex column with
      // nav at top and the LR app below. BookPage.css supplies padding-top
      // for the fixed nav clearance.
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      // Override the navy .book-page bg from BookPage.css. The iframe build
      // uses navy to frame the iframe; the native build has no iframe, so the
      // bg should be white to match the rest of the site.
      background: '#fff',
    }}>
      <Nav />
      <main style={{ flex: '1 1 auto', minHeight: 0 }}>
        <LocalRentWidget
          cityId={cityId}
          country={country}
          lang={widgetLang}
          gclid={gclid}
          pickupDate={pickupDate}
          dropoffDate={dropoffDate}
          pickupTime={pickupTime}
          dropoffTime={dropoffTime}
          dropoffCityId={dropoffCityId}
          dropoffCityName={dropoffCityName}
          carIds={carIds}
          location={location}
        />
      </main>
    </div>
  );
}
