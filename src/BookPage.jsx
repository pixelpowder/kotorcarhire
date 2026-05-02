'use client';
import { useEffect } from 'react';
import Nav from './Nav';
import useTranslation from './i18n/useTranslation';
import { WIDGET_LOCALE } from './i18n/languages';
import './BookPage.css';

// Fixed-height iframe approach — no postMessage, no auto-resize, no Suspense.
// The iframe is sized via pure CSS to fill the page area; all widget content
// (search, fleet, filter modal, car detail) scrolls internally inside the
// iframe. Same UX as visiting LocalRent's own site directly.
export default function BookPage({ searchParams = {} }) {
  const { t, lang } = useTranslation();

  const get = (k) => searchParams[k] ?? null;
  const pickupDate  = get('pickup_date');
  const dropoffDate = get('dropoff_date');
  const location    = get('location');

  const widgetParams = new URLSearchParams();
  if (pickupDate)             { widgetParams.set('date_from', pickupDate); widgetParams.set('pickup_date', pickupDate); }
  if (dropoffDate)            { widgetParams.set('date_to', dropoffDate); widgetParams.set('dropoff_date', dropoffDate); }
  if (get('pickup_time'))     widgetParams.set('time_from', get('pickup_time'));
  if (get('dropoff_time'))    widgetParams.set('time_to',   get('dropoff_time'));
  if (location)               widgetParams.set('place',     location);
  if (get('city_id'))         widgetParams.set('city_id',   get('city_id'));
  widgetParams.set('lang', WIDGET_LOCALE[lang] || 'en');
  widgetParams.set('v', '12');

  const hashParams = new URLSearchParams();
  if (pickupDate) hashParams.set('pickup_date', pickupDate);
  if (dropoffDate) hashParams.set('dropoff_date', dropoffDate);
  if (get('city_id')) hashParams.set('pickup_city_id', get('city_id'));
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
