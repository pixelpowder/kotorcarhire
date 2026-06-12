'use client';
// Homepage hero booking widget - custom React form with the LR v3 widget's
// visual polish (white pills, navy text, blue gradient Find button, MapPin
// icon, label-above-value layout, calendar matching brand) but rendered as
// pure React so first paint is instant - no third-party Vue widget to wait
// on. Ported from montenegrocarhire's HeroAlt; this site keeps its own
// headline, badge row and peak-season urgency copy.
//
// Rollback: /?legacy=1 renders the previous react-datepicker form
// (HeroLegacy in App.jsx).

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ShieldCheck, Clock, Star, MapPin, ChevronDown } from 'lucide-react';
import useTranslation from '@/src/i18n/useTranslation';
import { CITY_ID_MAP, PICKUP_LOCATIONS_ORDERED } from '@/src/data/localrentCities';
import './HeroAlt.css';

const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_SHORT = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

function fmtRange(a, b) {
  if (!a || !b) return '';
  const sameMonthYear = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  if (sameMonthYear) {
    return `${a.getDate()} – ${b.getDate()} ${MONTHS_SHORT[b.getMonth()]} ${b.getFullYear()}`;
  }
  return `${a.getDate()} ${MONTHS_SHORT[a.getMonth()]} – ${b.getDate()} ${MONTHS_SHORT[b.getMonth()]} ${b.getFullYear()}`;
}
function isoDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function startWeekday(year, month) {
  // Monday-first calendar: Sun=0 -> 6, Mon=1 -> 0, ...
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}
function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function inRange(d, start, end) {
  if (!start || !end) return false;
  const t = d.getTime();
  return t > start.getTime() && t < end.getTime();
}

export default function HeroAlt() {
  const { t, localePath } = useTranslation();
  const router = useRouter();

  // Pickup location (display name from CITY_ID_MAP).
  const [pickup, setPickup] = useState('Tivat');
  const [dropoff, setDropoff] = useState(null); // null = "Same place"
  const [locOpen, setLocOpen] = useState(false);
  const [activeLocTab, setActiveLocTab] = useState('pickup'); // 'pickup' | 'dropoff'
  const locRef = useRef(null);

  // Date range, defaults to +14 days from today. Initialised to null on
  // SSR + first render to AVOID a hydration mismatch (new Date() returns
  // a different value on the server vs the client, so React would
  // rerender and the form would flash twice). Set via useEffect once
  // we're on the client.
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [calOpen, setCalOpen] = useState(false);
  const [pickingPhase, setPickingPhase] = useState('start'); // 'start' | 'end'
  const [viewMonth, setViewMonth] = useState(0);
  const [viewYear, setViewYear] = useState(2026);
  useEffect(() => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const plus14 = new Date(today); plus14.setDate(plus14.getDate() + 14);
    setStartDate(today);
    setEndDate(plus14);
    setViewMonth(today.getMonth());
    setViewYear(today.getFullYear());
  }, []);
  const calRef = useRef(null);

  // Close popovers on click-outside.
  useEffect(() => {
    function onClick(e) {
      if (locRef.current && !locRef.current.contains(e.target)) setLocOpen(false);
      if (calRef.current && !calRef.current.contains(e.target)) setCalOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function pickCity(city) {
    if (activeLocTab === 'pickup') {
      setPickup(city);
      // Auto-advance to drop-off tab so the user can also pick a different
      // drop-off without re-opening the popover.
      setActiveLocTab('dropoff');
    } else {
      setDropoff(city);
      setLocOpen(false);
    }
  }

  function pickDay(d) {
    if (pickingPhase === 'start') {
      setStartDate(d);
      setEndDate(null);
      setPickingPhase('end');
    } else {
      if (d < startDate) {
        // User picked an earlier date than start; treat it as new start.
        setStartDate(d);
        setEndDate(null);
        return;
      }
      setEndDate(d);
      setCalOpen(false);
      setPickingPhase('start');
    }
  }

  function goSearch() {
    const cityId = CITY_ID_MAP[pickup];
    const dropoffCityId = dropoff ? CITY_ID_MAP[dropoff] : null;
    const params = new URLSearchParams({
      location: pickup,
      pickup_date: isoDate(startDate),
      dropoff_date: isoDate(endDate || startDate),
      pickup_time: '10:00',
      dropoff_time: '10:00',
      driver_age: '30',
    });
    if (cityId) {
      params.set('city_id', String(cityId));
      params.set('pickup_city_id', String(cityId));
    }
    if (dropoff && dropoffCityId && dropoffCityId !== cityId) {
      params.set('dropoff_city_id', String(dropoffCityId));
      params.set('dropoff_city_name', dropoff);
    }
    router.push(`${localePath('/book')}?${params.toString()}`);
  }

  // Build the two-month calendar (current + next).
  // Local `today` for the past-date check - the state `startDate` may be
  // null on the first SSR-matching render, so we can't depend on it.
  const todayForCheck = (typeof window === 'undefined') ? null : new Date();
  if (todayForCheck) todayForCheck.setHours(0, 0, 0, 0);
  function renderMonth(y, m) {
    const total = daysInMonth(y, m);
    const lead = startWeekday(y, m);
    const cells = [];
    for (let i = 0; i < lead; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(new Date(y, m, d));
    const monthName = MONTHS_EN[m];
    return (
      <div className="ha-cal__month" key={`${y}-${m}`}>
        <div className="ha-cal__month-title">{monthName} {y}</div>
        <div className="ha-cal__weekdays">
          {['MO','TU','WE','TH','FR','SA','SU'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="ha-cal__grid">
          {cells.map((d, i) => {
            if (!d) return <div key={i} className="ha-cal__cell ha-cal__cell--empty" />;
            const past = todayForCheck ? d < todayForCheck : false;
            const isStart = sameDay(d, startDate);
            const isEnd = sameDay(d, endDate);
            const isBetween = inRange(d, startDate, endDate);
            const cls = [
              'ha-cal__cell',
              past ? 'is-past' : '',
              isStart || isEnd ? 'is-selected' : '',
              isBetween ? 'is-between' : '',
            ].filter(Boolean).join(' ');
            return (
              <button
                key={i}
                type="button"
                className={cls}
                disabled={past}
                onClick={() => !past && pickDay(d)}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  return (
    <section className="hero hero--alt">
      {/* z-index lift via inline JSX style prop. Tried per-component
          CSS + App.css + injected <style> tag - Next.js's CSS pipeline
          + React's <style> handling were dropping the override. JSX
          inline style is the one path that always wins. */}
      <div className="hero__content" style={{ zIndex: 9999, position: 'relative' }}>
        <div className="hero-fade-in">
          <div className="hero__form-wrapper">
            <h1 className="hero__headline">
              {`${t('hero.headlineLine1') || t('hero.headline') || ''} ${t('hero.headlineLine2') || ''}`.trim()}
            </h1>
            <div className="hero__badges">
              <span className="hero__badge"><CheckCircle size={14} /> {t('hero.badges.freeCancellation')}</span>
              <span className="hero__badge"><ShieldCheck size={14} /> {t('hero.badges.fullInsurance')}</span>
              <span className="hero__badge"><Clock size={14} /> {t('hero.badges.airportPickup')}</span>
              <span className="hero__badge hero__badge--accent"><Star size={14} fill="currentColor" /> {t('hero.badges.priceFrom')}</span>
            </div>

            <div className="booking-card">
              <div className="booking-card__fields ha-fields">
                {/* Pick-up location pill */}
                <div className="ha-pill" ref={locRef}>
                  <button
                    type="button"
                    className="ha-pill__trigger"
                    onClick={() => setLocOpen(o => !o)}
                  >
                    <span className="ha-pill__label">
                      <MapPin size={12} />
                      {t('hero.pickupLocation') || 'Pick-up location'}
                    </span>
                    <span className="ha-pill__value">
                      {pickup}{dropoff ? ` → ${dropoff}` : ''}
                    </span>
                    <ChevronDown size={16} className={`ha-pill__chev${locOpen ? ' is-open' : ''}`} />
                  </button>
                  {locOpen && (
                    <div className="ha-pop ha-pop--loc">
                      <div className="ha-pop__tabs">
                        <button
                          type="button"
                          className={`ha-pop__tab${activeLocTab === 'pickup' ? ' is-active' : ''}`}
                          onClick={() => setActiveLocTab('pickup')}
                        >
                          {t('hero.tabPickup') || 'Pick up'}
                        </button>
                        <button
                          type="button"
                          className={`ha-pop__tab${activeLocTab === 'dropoff' ? ' is-active' : ''}`}
                          onClick={() => setActiveLocTab('dropoff')}
                        >
                          {t('hero.tabDropoff') || 'Drop off'}
                        </button>
                      </div>
                      <ul className="ha-pop__list">
                        {activeLocTab === 'dropoff' && (
                          <li
                            className={`ha-pop__item${dropoff === null ? ' is-active' : ''}`}
                            onClick={() => { setDropoff(null); setLocOpen(false); }}
                          >
                            {t('hero.sameLocation') || 'Same place'}
                          </li>
                        )}
                        {PICKUP_LOCATIONS_ORDERED.map(city => {
                          const active = activeLocTab === 'pickup' ? city === pickup : city === dropoff;
                          return (
                            <li
                              key={city}
                              className={`ha-pop__item${active ? ' is-active' : ''}`}
                              onClick={() => pickCity(city)}
                            >
                              {city}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Dates pill */}
                <div className="ha-pill" ref={calRef}>
                  <button
                    type="button"
                    className="ha-pill__trigger"
                    onClick={() => setCalOpen(o => !o)}
                  >
                    <span className="ha-pill__label">
                      {`${t('hero.pickupDate') || 'Pick-up date'}  ${t('hero.dropoffDate') || 'Drop-off date'}`}
                    </span>
                    <span className="ha-pill__value">{fmtRange(startDate, endDate)}</span>
                    <ChevronDown size={16} className={`ha-pill__chev${calOpen ? ' is-open' : ''}`} />
                  </button>
                  {calOpen && (
                    <div className="ha-pop ha-pop--cal">
                      <div className="ha-cal__nav">
                        <button
                          type="button"
                          className="ha-cal__navbtn"
                          onClick={() => {
                            const m = viewMonth - 1;
                            if (m < 0) { setViewMonth(11); setViewYear(viewYear - 1); }
                            else setViewMonth(m);
                          }}
                          aria-label="Previous month"
                        >‹</button>
                        <button
                          type="button"
                          className="ha-cal__navbtn"
                          onClick={() => {
                            const m = viewMonth + 1;
                            if (m > 11) { setViewMonth(0); setViewYear(viewYear + 1); }
                            else setViewMonth(m);
                          }}
                          aria-label="Next month"
                        >›</button>
                      </div>
                      <div className="ha-cal__months">
                        {renderMonth(viewYear, viewMonth)}
                        {renderMonth(nextYear, nextMonth)}
                      </div>
                    </div>
                  )}
                </div>

                <button className="ha-find" type="button" onClick={goSearch}>
                  {t('hero.search') || 'Find'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
