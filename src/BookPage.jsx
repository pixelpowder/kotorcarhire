'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Nav from './Nav';
import useTranslation from './i18n/useTranslation';
import { WIDGET_LOCALE } from './i18n/languages';
import { FLEET_SLUG_TO_CAR_IDS } from './data/fleetCars';
import pickupPoints from './data/pickupPoints.json';
import './BookPage.css';

// Fixed-height iframe approach — no postMessage, no auto-resize, no Suspense.
// The iframe is sized via pure CSS to fill the page area; all widget content
// (search, fleet, filter modal, car detail) scrolls internally inside the
// iframe. Same UX as visiting LocalRent's own site directly.

// Resolve a numeric pickup_place_id back to its human-readable point name and
// its parent city name by consulting the cached pickupPoints.json catalogue.
// Used by the forward pipe below to handle share URLs that the widget's reverse
// pipe emitted as `pickup_place_ids[]=<id>` (wire form). Without this, a fresh
// visitor lands on /book with the city correct but the "Specify location"
// dropdown stuck on "Any location in the city". We need BOTH names because the
// widget keeps city label and point label in separate Vuex state.
function lookupPlace(placeId, hintCityId) {
  if (placeId == null) return null;
  const numId = Number(placeId);
  if (!Number.isFinite(numId)) return null;
  const tryCity = (cid) => {
    const city = cid != null ? pickupPoints[cid] : null;
    if (!city || !Array.isArray(city.points)) return null;
    const hit = city.points.find(p => Number(p.id) === numId);
    return hit ? { pointName: hit.name.trim(), cityName: city.name } : null;
  };
  const fromHint = tryCity(hintCityId);
  if (fromHint) return fromHint;
  for (const cid of Object.keys(pickupPoints)) {
    const hit = tryCity(cid);
    if (hit) return hit;
  }
  return null;
}

export default function BookPage() {
  const { t, lang } = useTranslation();
  const searchParams = useSearchParams();

  const get = (k) => searchParams?.get(k) ?? null;
  const pickupDate  = get('pickup_date');
  const dropoffDate = get('dropoff_date');
  const location    = get('location');

  const widgetParams = new URLSearchParams();
  if (pickupDate)             { widgetParams.set('date_from', pickupDate); widgetParams.set('pickup_date', pickupDate); }
  if (dropoffDate)            { widgetParams.set('date_to', dropoffDate); widgetParams.set('dropoff_date', dropoffDate); }
  if (get('pickup_time'))     widgetParams.set('time_from', get('pickup_time'));
  if (get('dropoff_time'))    widgetParams.set('time_to',   get('dropoff_time'));
  if (location)               widgetParams.set('place',     location);
  // Pickup city accepts either URL-form (`city_id`) or wire-form
  // (`pickup_city_id`) so share URLs work whichever name the address bar
  // carried.
  const cityIdVal = get('city_id') || get('pickup_city_id');
  // Share URLs emitted by the widget's reverse pipe carry the specific pickup
  // and dropoff points as `pickup_place_ids[]=<id>` / `dropoff_place_ids[]=<id>`
  // (LocalRent wire form). Resolve each id into BOTH the city name and the
  // point name so the widget can populate "Specify location" instead of leaving
  // it stuck on "Any location in the city". Skip if the URL already carries an
  // explicit `location` (curated CTA link, not a widget round-trip).
  if (!location) {
    const pickupPlaceId = searchParams?.getAll('pickup_place_ids[]')[0]
      ?? searchParams?.get('pickup_place_ids[]');
    const pickupResolved = lookupPlace(pickupPlaceId, cityIdVal);
    if (pickupResolved) {
      widgetParams.set('place', pickupResolved.cityName);
      widgetParams.set('place_name', pickupResolved.pointName);
    }
    const dropoffPlaceId = searchParams?.getAll('dropoff_place_ids[]')[0]
      ?? searchParams?.get('dropoff_place_ids[]');
    const dropoffCityIdHint = get('dropoff_city_id') || cityIdVal;
    const dropoffResolved = lookupPlace(dropoffPlaceId, dropoffCityIdHint);
    const isSamePlace = pickupResolved && dropoffResolved
      && pickupResolved.cityName === dropoffResolved.cityName
      && Number(pickupPlaceId) === Number(dropoffPlaceId);
    if (dropoffResolved && !isSamePlace) {
      widgetParams.set('dropoff_place_name', dropoffResolved.pointName);
      if (!get('dropoff_city_name')) {
        widgetParams.set('dropoff_city_name', dropoffResolved.cityName);
      }
    }
  }
  if (cityIdVal)              widgetParams.set('city_id',   cityIdVal);
  if (get('car_id'))          widgetParams.set('car_id',    get('car_id'));
  // Resolve /book?model=<slug> against the shared fleet map so the
  // user-facing URL stays clean (?model=renault-megane) while the
  // iframe still receives the full car_ids list LocalRent's filter
  // requires. Direct ?car_ids= still works as a fallback.
  const modelSlug = get('model');
  const carIdsFromSlug = modelSlug ? FLEET_SLUG_TO_CAR_IDS[modelSlug] : null;
  const carIdsParam = carIdsFromSlug || get('car_ids');
  if (carIdsParam)            widgetParams.set('car_ids',   carIdsParam);
  for (const v of (searchParams?.getAll('pickup_place_ids[]') || [])) widgetParams.append('pickup_place_ids[]', v);
  for (const v of (searchParams?.getAll('dropoff_place_ids[]') || [])) widgetParams.append('dropoff_place_ids[]', v);
  widgetParams.set('lang', WIDGET_LOCALE[lang] || 'en');
  widgetParams.set('v', '15');

  const hashParams = new URLSearchParams();
  if (pickupDate) hashParams.set('pickup_date', pickupDate);
  if (dropoffDate) hashParams.set('dropoff_date', dropoffDate);
  if (cityIdVal) hashParams.set('pickup_city_id', cityIdVal);
  const hash = hashParams.toString() ? `#${hashParams.toString()}` : '';
  const widgetSrc = `/widget.html?${widgetParams.toString()}${hash}`;

  // Lock the parent page scroll so the iframe is the only scrollable surface
  // (matches LocalRent's single-scrollbar UX). Restore on unmount.
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  return (
    <div className="book-page" style={{
      // Lock page to viewport height; iframe fills the area below nav exactly
      // so the modal action bar inside the iframe is always reachable. Keep
      // .book-page's existing padding-top from BookPage.css (136px desktop /
      // 64px mobile) so the iframe sits BELOW the fixed nav, not under it.
      height: '100dvh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Nav />
      <iframe
        src={widgetSrc}
        className="book-page__widget"
        title={t('book.iframeTitle')}
        frameBorder="0"
        scrolling="auto"
        style={{
          width: '100%',
          flex: '1 1 auto',
          minHeight: 0,
          border: 'none',
          display: 'block',
        }}
      />
    </div>
  );
}
