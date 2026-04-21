'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Nav from './Nav';
import Footer from './Footer';
import useTranslation from './i18n/useTranslation';
import { WIDGET_LOCALE } from './i18n/languages';
import './BookPage.css';

export default function BookPage() {
  const { t, lang, localePath } = useTranslation();
  const [iframeHeight, setIframeHeight] = useState(700);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const iframeRef = useRef(null);
  const params = useSearchParams();

  const pickupDate  = params.get('pickup_date');
  const dropoffDate = params.get('dropoff_date');
  const location    = params.get('location');

  const widgetParams = new URLSearchParams();
  if (pickupDate)             { widgetParams.set('date_from', pickupDate); widgetParams.set('pickup_date', pickupDate); }
  if (dropoffDate)            { widgetParams.set('date_to', dropoffDate); widgetParams.set('dropoff_date', dropoffDate); }
  if (params.get('pickup_time'))  widgetParams.set('time_from', params.get('pickup_time'));
  if (params.get('dropoff_time')) widgetParams.set('time_to',   params.get('dropoff_time'));
  if (location)               widgetParams.set('place',     location);
  if (params.get('city_id')) widgetParams.set('city_id', params.get('city_id'));
  widgetParams.set('lang', WIDGET_LOCALE[lang] || 'en');
  widgetParams.set('v', '11');
  // Widget reads dates from location.hash
  const hashParams = new URLSearchParams();
  if (pickupDate) hashParams.set('pickup_date', pickupDate);
  if (dropoffDate) hashParams.set('dropoff_date', dropoffDate);
  if (params.get('city_id')) hashParams.set('pickup_city_id', params.get('city_id'));
  const hash = hashParams.toString() ? `#${hashParams.toString()}` : '';
  const widgetSrc = `/widget.html?${widgetParams.toString()}${hash}`;

  useEffect(() => {
    function onMessage(e) {
      if (!e.data) return;
      if (e.data.type === 'iframeHeight') setIframeHeight(e.data.height);
      if (e.data.type === 'lightboxOpen') setLightboxOpen(true);
      if (e.data.type === 'lightboxClose') setLightboxOpen(false);
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  return (
    <div className="book-page">
      <Nav />
      <div className="book-page__body">
        <h1 className="book-page__title">{t('book.title')}</h1>
        <iframe
          ref={iframeRef}
          src={widgetSrc}
          className="book-page__widget"
          title="Car rental booking"
          frameBorder="0"
          scrolling="no"
          style={lightboxOpen ? {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            border: 'none',
          } : { height: iframeHeight }}
        />
      </div>
      <Footer />
    </div>
  );
}
