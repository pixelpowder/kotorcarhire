'use client';
import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import config from '../siteConfig';
import useTranslation from '../i18n/useTranslation';
import './LocationsMap.css';

// Pickup-point coordinates for the LocalRent drop-off network.
// Names must match the corresponding entry in siteConfig.locations
// so the legend below the map mirrors the pin labels exactly.
const PIN_COORDS = {
  'Tivat Airport':    { lat: 42.4047, lng: 18.7233, type: 'airport' },
  'City Delivery':    { lat: 42.4247, lng: 18.7712, type: 'service' },
  'Kotor Port':       { lat: 42.4226, lng: 18.7689, type: 'port' },
  'Bus Terminal':     { lat: 42.4196, lng: 18.7714, type: 'transit' },
  'Kameija Mall':     { lat: 42.4135, lng: 18.7723, type: 'landmark' },
  'Hotel Forza Mare': { lat: 42.4569, lng: 18.7578, type: 'hotel' },
};

const TYPE_COLOR = {
  airport:  '#2563eb',
  port:     '#0891b2',
  transit:  '#7c3aed',
  landmark: '#16a34a',
  hotel:    '#dc2626',
  service:  '#6b7280',
};

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function LocationsMap() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [tokenMissing, setTokenMissing] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!TOKEN) { setTokenMissing(true); return; }

    mapboxgl.accessToken = TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [18.745, 42.43],
      zoom: 11.5,
      minZoom: 10,
      maxZoom: 15,
      cooperativeGestures: true,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      for (const loc of config.locations) {
        const pin = PIN_COORDS[loc.name];
        if (!pin) continue;
        const color = TYPE_COLOR[pin.type] || '#0770e3';
        const el = document.createElement('div');
        el.className = 'lm-pin';
        const dot = document.createElement('span');
        dot.className = 'lm-pin__dot';
        dot.style.background = color;
        el.appendChild(dot);
        new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([pin.lng, pin.lat])
          .setPopup(new mapboxgl.Popup({ offset: 14, closeButton: false }).setHTML(
            `<strong>${loc.name}</strong>${loc.tag ? `<br><span class="lm-pop__tag">${loc.tag}</span>` : ''}`
          ))
          .addTo(map);
      }
    });

    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);

  return (
    <section className="locations-map-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('locations.label')}</span>
          <h2 className="section-title">{t('locations.title')}</h2>
          <p className="section-subtitle">{t('locations.subtitle')}</p>
        </div>

        <div className="locations-map">
          {tokenMissing ? (
            <div className="locations-map__canvas locations-map__canvas--missing">
              <p>Map unavailable — set <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> in <code>.env.local</code>.</p>
            </div>
          ) : (
            <div ref={containerRef} className="locations-map__canvas" />
          )}
          <ul className="locations-map__legend">
            {config.locations.map((loc) => {
              const pin = PIN_COORDS[loc.name];
              const color = pin ? (TYPE_COLOR[pin.type] || '#0770e3') : '#6b7280';
              return (
                <li key={loc.name} className="locations-map__legend-item">
                  <span className="locations-map__dot" style={{ background: color }} />
                  <span className="locations-map__name">
                    <MapPin size={13} /> {loc.name}
                  </span>
                  {loc.tag ? <span className="locations-map__tag">{loc.tag}</span> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
