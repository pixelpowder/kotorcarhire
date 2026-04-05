'use client';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import useTranslation from './i18n/useTranslation';
import Nav from './Nav';
import Footer from './Footer';
import useGlobalReveal from './useReveal';
import {
  Car,
  MapPin,
  ChevronRight,
  ChevronDown,
  Star,
  ShieldCheck,
  Clock,
  RefreshCw,
  Globe,
  Ban,
  Users,
  Fuel,
  Settings,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  Search,
  Menu,
  X,
  MessageCircle,
  Award,
  TrendingUp,
} from 'lucide-react';
import { useRef, useCallback } from 'react';
import config from './siteConfig';
import './App.css';

/* ─── ICON MAP ─────────────────────────────────────────── */
const FEATURE_ICONS = {
  'map-pin': MapPin,
  'shield-check': ShieldCheck,
  'clock': Clock,
  'ban': Ban,
  'refresh-cw': RefreshCw,
  'globe': Globe,
};

const LOCATIONS = [
  'Tivat', 'Podgorica', 'Kotor', 'Budva', 'Herceg-Novi',
  'Bar', 'Ulcinj', 'Sveti Stefan', 'Perast', 'Petrovac',
  'Bečići', 'Rafailovići', 'Pržno', 'Sutomore', 'Luštica Bay',
  'Žabljak', 'Kolašin', 'Nikšić', 'Igalo', 'Risan',
  'Orahovac', 'Prčanj', 'Bijela', 'Rose', 'Reževići',
  'Dobre Vode', 'Djenovici', 'Krasici', 'Radovici', 'Buljarica',
];

// LocalRent city IDs — used to configure the booking widget per location
const CITY_ID_MAP = {
  'Tivat':             17,
  'Podgorica':         15,
  'Kotor':              9,
  'Budva':              5,
  'Bar':                2,
  'Herceg-Novi':       19,
  'Ulcinj':            18,
  'Kolašin':            8,
  'Žabljak':            7,
  'Sveti Stefan':      25,
  'Perast':            33,
  'Petrovac':          39,
  'Sutomore':          29,
  'Luštica Bay':   549187,
  'Nikšić':        549113,
  'Bečići':            23,
  'Igalo':             35,
  'Rafailovići':       22,
  'Pržno':             24,
  'Risan':             34,
  'Orahovac':          32,
  'Prčanj':            36,
  'Bijela':        549193,
  'Rose':              40,
  'Reževići':          26,
  'Dobre Vode':        30,
  'Djenovici':     548985,
  'Krasici':       548984,
  'Radovici':      548966,
  'Buljarica':     548986,
};

const NAV_LINKS = [
  { label: 'Fleet', href: '#fleet' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'About', href: '#features' },
  { label: 'Help', href: '#faq' },
];

/* ─── LOCATION AUTOCOMPLETE ────────────────────────────── */
const LOCATION_OPTIONS = LOCATIONS.map(l => ({ value: l, label: l }));

const locationSelectStyles = {
  control: (base, state) => ({
    ...base,
    border: 'none',
    boxShadow: 'none',
    background: 'transparent',
    minHeight: 'unset',
    height: 'auto',
    cursor: 'pointer',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0',
  }),
  input: (base) => ({
    ...base,
    margin: '0',
    padding: '0',
    fontSize: '15px',
    fontWeight: '500',
    color: 'rgb(5,32,60)',
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: '15px',
    fontWeight: '500',
    color: 'rgb(5,32,60)',
    margin: '0',
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: '15px',
    color: '#9ca3af',
    margin: '0',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '0',
    color: 'rgb(0,98,227)',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    borderRadius: '10px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    marginTop: '6px',
    overflow: 'hidden',
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  menuList: (base) => ({
    ...base,
    padding: '4px',
    maxHeight: '260px',
  }),
  option: (base, state) => ({
    ...base,
    fontSize: '14px',
    fontWeight: state.isSelected ? '600' : '400',
    color: state.isSelected ? 'rgb(0,98,227)' : 'rgb(5,32,60)',
    background: state.isSelected ? 'rgba(0,98,227,0.08)' : state.isFocused ? 'rgba(0,98,227,0.05)' : 'transparent',
    borderRadius: '6px',
    cursor: 'pointer',
    padding: '10px 12px',
  }),
};

function LocationField({ value, onChange }) {
  const { t } = useTranslation();
  const selected = LOCATION_OPTIONS.find(o => o.value === value) || null;
  return (
    <div className="booking-field location-field">
      <label>
        <MapPin size={12} />
        {t('hero.pickupLocation')}
      </label>
      <Select
        inputId="f-location"
        options={LOCATION_OPTIONS}
        value={selected}
        onChange={opt => onChange(opt.value)}
        styles={locationSelectStyles}
        isSearchable={window.innerWidth >= 768}
        placeholder={t('hero.searchLocation')}
        menuPlacement="auto"
        menuPortalTarget={document.body}
        maxMenuHeight={200}
        onMenuOpen={() => { if (window.innerWidth < 768) { document.activeElement?.blur(); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50); } }}
      />
    </div>
  );
}

/* ─── HERO ─────────────────────────────────────────────── */
function Hero() {
  const { t, localePath } = useTranslation();
  const router = useRouter();
  const [pickup, setPickup] = useState('Tivat');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickupTime, setPickupTime] = useState('10:00');
  const [dropoffTime, setDropoffTime] = useState('10:00');

  const fmt = (d) => {
    if (!d) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSearch = () => {
    const params = new URLSearchParams({
      location: pickup,
      pickup_date: fmt(startDate),
      pickup_time: pickupTime,
      dropoff_date: fmt(endDate),
      dropoff_time: dropoffTime,
    });
    const cityId = CITY_ID_MAP[pickup];
    if (cityId) params.set('city_id', cityId);
    router.push(`${localePath('/book')}?${params.toString()}`);
  };

  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero-fade-in">
          <div className="hero__form-wrapper">
          <h1 className="hero__headline">{t('hero.headline')}</h1>
          <div className="hero__badges">
            <span className="hero__badge"><CheckCircle size={14} /> {t('hero.badges.freeCancellation')}</span>
            <span className="hero__badge"><ShieldCheck size={14} /> {t('hero.badges.fullInsurance')}</span>
            <span className="hero__badge"><Clock size={14} /> {t('hero.badges.airportPickup')}</span>
            <span className="hero__badge hero__badge--accent"><Star size={14} fill="currentColor" /> {t('hero.badges.trustpilot')}</span>
          </div>

          <div className="booking-card">
            <div className="booking-card__fields">
              <LocationField value={pickup} onChange={setPickup} />
              <div className="booking-field booking-field--dates">
                <label>{t('hero.pickupDate')} — {t('hero.dropoffDate')}</label>
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  monthsShown={window.innerWidth < 768 ? 1 : 2}
                  dateFormat="dd MMM yyyy"
                  placeholderText={t('hero.selectDates') || 'Select dates'}
                  className="booking-field__input"
                  calendarClassName="booking-calendar"
                  popperPlacement="bottom-start"
                  popperClassName="booking-datepicker-popper"
                  popperModifiers={[{name:'flip',enabled:false},{name:'preventOverflow',enabled:false}]}
                  onFocus={e => { if (window.innerWidth < 768) e.target.blur(); }}
                  onCalendarOpen={() => { if (window.innerWidth < 768) setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50); }}
                />
              </div>
              <div className="booking-field booking-field--time">
                <label htmlFor="f-pickup-time">{t('hero.pickupTime')}</label>
                <select id="f-pickup-time" className="booking-field__input" value={pickupTime} onChange={e => setPickupTime(e.target.value)}>
                  {['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="booking-field booking-field--time">
                <label htmlFor="f-dropoff-time">{t('hero.dropoffTime')}</label>
                <select id="f-dropoff-time" className="booking-field__input" value={dropoffTime} onChange={e => setDropoffTime(e.target.value)}>
                  {['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <button className="booking-card__search" onClick={handleSearch}>
                {t('hero.search')}
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TRUST STRIP ──────────────────────────────────────── */
function TrustStrip() {
  const { t } = useTranslation();
  const items = [
    { icon: <CheckCircle size={18} />, strong: t('trust.noHiddenFees'), text: t('trust.noHiddenFeesDesc') },
    { icon: <ShieldCheck size={18} />, strong: t('trust.fullInsurance'), text: t('trust.fullInsuranceDesc') },
    { icon: <Clock size={18} />, strong: t('trust.fastPickup'), text: t('trust.fastPickupDesc') },
  ];

  return (
    <div className="trust-strip">
      <div className="trust-strip__inner">
        {items.map(item => (
          <div key={item.strong} className="trust-item">
            <div className="trust-item__icon">{item.icon}</div>
            <div className="trust-item__text">
              <strong>{item.strong}</strong>
              <span>{item.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── STAT COUNTERS ────────────────────────────────────── */
function useCountUp(end, duration = 1.8) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  const onView = useCallback((entry) => {
    if (entry[0]?.isIntersecting && !started.current) {
      started.current = true;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, [end, duration]);

  useEffect(() => {
    const obs = new IntersectionObserver(onView, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [onView]);

  return [count, ref];
}

function StatCounters() {
  const { t } = useTranslation();
  const [years, yearsRef] = useCountUp(18);
  const [rentals, rentalsRef] = useCountUp(2000);
  const [locations, locsRef] = useCountUp(30);

  const stats = [
    { value: `${years}+`, label: t('stats.years'), icon: <Award size={22} />, ref: yearsRef },
    { value: rentals >= 2000 ? '2,000+' : rentals.toLocaleString(), label: t('stats.rentals'), icon: <TrendingUp size={22} />, ref: rentalsRef },
    { value: '4.8/5', label: t('stats.rating'), icon: <Star size={22} fill="currentColor" />, ref: null },
    { value: `${locations}+`, label: t('stats.locations'), icon: <MapPin size={22} />, ref: locsRef },
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-card reveal-item"
              ref={s.ref}
            >
              <div className="stat-card__icon">{s.icon}</div>
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─────────────────────────────────────── */
function HowItWorks() {
  const { t } = useTranslation();
  const steps = [
    { num: '01', title: t('howItWorks.step1Title'), desc: t('howItWorks.step1Desc') },
    { num: '02', title: t('howItWorks.step2Title'), desc: t('howItWorks.step2Desc') },
    { num: '03', title: t('howItWorks.step3Title'), desc: t('howItWorks.step3Desc') },
  ];
  return (
    <section className="section section--gray" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('howItWorks.label')}</span>
          <h2 className="section-title">{t('howItWorks.title')}</h2>
          <p className="section-subtitle">{t('howItWorks.subtitle')}</p>
        </div>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div key={step.num} className="step-card reveal-item">
              <div className="step-card__num">{step.num}</div>
              <h3 className="step-card__title">{step.title}</h3>
              <p className="step-card__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BRAND LOGOS ──────────────────────────────────────── */
const CAR_BRANDS = [
  { name: 'Toyota',     logo: '/img/logo-toyota.png' },
  { name: 'Fiat',       logo: '/img/logo-fiat.png' },
  { name: 'Volkswagen', logo: '/img/logo-volkswagen.png' },
  { name: 'Peugeot',    logo: '/img/logo-peugeot.png' },
  { name: 'Renault',    logo: '/img/logo-renault.png' },
  { name: 'Hyundai',    logo: '/img/logo-hyundai.png' },
  { name: 'Citroën',    logo: '/img/logo-citroen.png' },
  { name: 'Suzuki',     logo: '/img/logo-suzuki.png' },
  { name: 'Ford',       logo: '/img/logo-ford.png' },
  { name: 'Dacia',      logo: '/img/logo-dacia.png' },
];

function BrandLogos() {
  const { t } = useTranslation();
  return (
    <section className="brands-section">
      <div className="container">
        <p className="brands-label">{t("brands.label")}</p>
        <div className="brands-row">
          {CAR_BRANDS.map((brand) => (
            <img key={brand.name} className="brand-logo" src={brand.logo} alt={brand.name} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── DESTINATIONS ──────────────────────────────────────── */
function Destinations() {
  const { t, localePath } = useTranslation();
  return (
    <section className="section section--gray" id="destinations">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t("destinations.label")}</span>
          <h2 className="section-title">{t('destinations.title')}</h2>
          <p className="section-subtitle">{t('destinations.subtitle')}</p>
        </div>
        <div className="destinations-grid">
          {config.destinations.map((dest, i) => (
            <a
              key={dest.slug}
              href={localePath(`/${dest.slug}`)}
              className="dest-card reveal-item"
            >
              <div className="dest-card__img" style={{ backgroundImage: `url(${dest.image})` }} />
              <div className="dest-card__overlay">
                {dest.tag && <span className="dest-card__tag">{t(`destCards.${dest.slug}.tag`) || dest.tag}</span>}
                <h3 className="dest-card__name">{t(`destCards.${dest.slug}.name`) || dest.name}</h3>
                <p className="dest-card__desc">{t(`destCards.${dest.slug}.desc`) || dest.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FLEET ─────────────────────────────────────────────── */
function Fleet() {
  const { t, localePath } = useTranslation();
  const [iframeHeight, setIframeHeight] = useState(800);
  const [iframeSrc, setIframeSrc] = useState(null);
  const fleetRef = useRef(null);

  // Defer iframe load until section is visible + page is idle
  useEffect(() => {
    function onMessage(e) {
      if (e.data && e.data.type === 'iframeHeight') setIframeHeight(Math.min(e.data.height, 1400));
    }
    window.addEventListener('message', onMessage);

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const load = () => setIframeSrc('/widget.html?city_id=9&hide_search=1&v=12');
        if ('requestIdleCallback' in window) {
          requestIdleCallback(load, { timeout: 1500 });
        } else {
          setTimeout(load, 100);
        }
        obs.disconnect();
      }
    }, { rootMargin: '200px' });

    if (fleetRef.current) obs.observe(fleetRef.current);
    return () => { obs.disconnect(); window.removeEventListener('message', onMessage); };
  }, []);

  return (
    <section className="section" id="fleet" ref={fleetRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('fleet.label')}</span>
          <h2 className="section-title">{t('fleet.title')}</h2>
          <p className="section-subtitle">{t('fleet.subtitle')}</p>
        </div>

        <a href={localePath('/book')} className="fleet-widget-wrap">
          {iframeSrc && <iframe
            src={iframeSrc}
            title="Browse fleet"
            frameBorder="0"
            scrolling="no"
            style={{ width: '100%', height: iframeHeight, border: 'none', display: 'block', pointerEvents: 'none', marginTop: '80px' }}
          />}
          <div className="fleet-widget-fade" />
          <div className="fleet-widget-overlay" />
        </a>
      </div>
    </section>
  );
}

/* ─── FEATURES ─────────────────────────────────────────── */
function Features() {
  const { t } = useTranslation();
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t("features.label")}</span>
          <h2 className="section-title">{t("features.title")}</h2>
          <p className="section-subtitle">{t("features.subtitle")}</p>
        </div>

        <div className="features-grid">
          {[
            { icon: 'map-pin', key: 'airportPickup' },
            { icon: 'shield-check', key: 'fullInsurance' },
            { icon: 'clock', key: 'support' },
            { icon: 'ban', key: 'noHiddenFees' },
            { icon: 'refresh-cw', key: 'freeCancellation' },
            { icon: 'globe', key: 'crossBorder' },
          ].map((f, i) => {
            const Icon = FEATURE_ICONS[f.icon] || ShieldCheck;
            return (
              <div key={f.key} className="feature-card reveal-item">
                <div className="feature-card__icon">
                  <Icon size={20} />
                </div>
                <h3 className="feature-card__title">{t(`featureCards.${f.key}.title`)}</h3>
                <p className="feature-card__desc">{t(`featureCards.${f.key}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── TRUSTPILOT BANNER ────────────────────────────────── */
function TrustpilotBanner() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.Trustpilot && ref.current) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
    // Check if the widget rendered visible content
    const timer = setTimeout(() => {
      const iframe = ref.current?.querySelector('iframe');
      if (iframe && iframe.offsetHeight > 10) setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="trustpilot-banner" style={{ display: visible ? 'block' : 'none' }}>
      <div className="container">
        <div
          ref={ref}
          className="trustpilot-widget"
          data-locale="en-US"
          data-template-id="56278e9abfbbba0bdcd568bc"
          data-businessunit-id="69cfbd3879267ca5424dbeb8"
          data-style-height="52px"
          data-style-width="100%"
          data-token="048c09ab-d890-4af6-91a4-0c5532f846df"
        >
          <a href="https://www.trustpilot.com/review/montenegrocarhire.com" target="_blank" rel="noopener">Trustpilot</a>
        </div>
      </div>
    </div>
  );
}

/* ─── REVIEWS ──────────────────────────────────────────── */
function Reviews() {
  const { t } = useTranslation();
  return (
    <section className="section section--gray" id="reviews">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t("reviews.label")}</span>
          <h2 className="section-title">{t("reviews.title")}</h2>
          <p className="section-subtitle">{t("reviews.subtitle")}</p>
        </div>

        <div className="reviews-grid">
          {config.testimonials.map((rev, i) => (
            <div key={rev.name} className="review-card reveal-item">
              <div className="review-card__stars">
                {Array.from({ length: rev.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="review-card__text">{t(`testimonials.${i}.text`)}</p>
              <div className="review-card__author">
                <div className="review-card__avatar">
                  {rev.avatar ? <img src={rev.avatar} alt={rev.name} /> : rev.name.charAt(0)}
                </div>
                <div>
                  <div className="review-card__name">{rev.name}</div>
                  <div className="review-card__location">{rev.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── LOCATIONS ────────────────────────────────────────── */
function Locations() {
  return (
    <section className="section" id="locations">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Pickup Points</span>
          <h2 className="section-title">Where Can You Collect?</h2>
          <p className="section-subtitle">Multiple locations across Montenegro for maximum convenience.</p>
        </div>

        <div className="locations-grid">
          {config.locations.map((loc, i) => (
            <div key={loc.name} className="location-card reveal-item">
              <div className="location-card__icon">
                <MapPin size={18} />
              </div>
              <div className="location-card__info">
                <div className="location-card__name">{loc.name}</div>
                {loc.tag ? <span className="location-card__tag">{loc.tag}</span> : null}
              </div>
              <ChevronRight size={16} className="location-card__arrow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ──────────────────────────────────────────────── */
function FAQ() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);

  return (
    <section className="section section--gray" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t("faq.label")}</span>
          <h2 className="section-title">{t("faq.title")}</h2>
          <p className="section-subtitle">{t("faq.subtitle")}</p>
        </div>

        <div className="faq-list">
          {[0, 6].map(start => (
            <div key={start} className="faq-column">
              {[0, 1, 2, 3, 4, 5].map(offset => {
                const i = start + offset;
                const isOpen = open === i;
                return (
                  <div key={i} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                    <button
                      className="faq-question"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span>{t(`faqItems.${i}.q`)}</span>
                      <ChevronDown
                        size={18}
                        className={`faq-chevron${isOpen ? ' faq-chevron--open' : ''}`}
                      />
                    </button>
                    <div className={`faq-answer-wrap${isOpen ? ' open' : ''}`}>
                      <div>
                        <p className="faq-answer">{t(`faqItems.${i}.a`)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA BANNER ───────────────────────────────────────── */
function CTABanner() {
  const { t, localePath } = useTranslation();
  return (
    <section className="cta-banner">
      <div className="cta-banner__inner">
        <div className="reveal-up">
          <h2 className="cta-banner__title">{t("cta.title")}</h2>
          <p className="cta-banner__subtitle">
            {t('cta.subtitle')}
          </p>
          <div className="cta-banner__actions">
            <a href={localePath("/book")} className="cta-btn--primary" style={{ textDecoration: 'none' }}>
              {t('cta.browseFleet')} <ArrowRight size={16} />
            </a>
            <a href="mailto:info@montenegrocarhire.com" className="cta-btn--outline">
              <Mail size={15} /> info@montenegrocarhire.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── STICKY MOBILE CTA ───────────────────────────────── */
function StickyMobileCTA() {
  const { t, localePath } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`sticky-cta${visible ? ' sticky-cta--visible' : ''}`}>
      <a href={localePath("/book")} className="sticky-cta__btn">
        {t('common.bookNow')} <ArrowRight size={16} />
      </a>
      <a href="https://wa.me/38269000000?text=Hi!%20I%27d%20like%20to%20enquire%20about%20renting%20a%20car%20in%20Montenegro." target="_blank" rel="noopener noreferrer" className="sticky-cta__phone">
        <MessageCircle size={18} />
      </a>
    </div>
  );
}

/* ─── SCROLL TO TOP ────────────────────────────────────── */
function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/38269000000?text=Hi!%20I%27d%20like%20to%20enquire%20about%20renting%20a%20car%20in%20Montenegro.`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} />
    </a>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() { setShow(window.scrollY > 400); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      className="scroll-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <ChevronRight size={20} style={{ transform: 'rotate(-90deg)' }} />
    </button>
  );
}

/* ─── APP ──────────────────────────────────────────────── */
export default function App() {
  useGlobalReveal();
  const { t } = useTranslation();

  // Lock hero height on mount to prevent iOS address bar scroll jump
  useEffect(() => {
    if (window.innerWidth <= 768) {
      document.documentElement.style.setProperty('--hero-h', window.innerHeight + 'px');
    }
  }, []);
  return (
    <>
      <Nav />
      <main>
        <div className="hero-wrapper">
          <div className="hero-wrapper__bg">
            {typeof navigator !== 'undefined' && (!navigator.connection || navigator.connection.effectiveType === '4g') && (
              <video className="hero__video" autoPlay muted loop playsInline preload="auto"
                onPlaying={e => e.target.classList.add('playing')}
                ref={el => {
                  if (!el) return;
                  el.play().catch(() => {});
                  setTimeout(() => { if (el.paused) el.play().catch(() => {}); }, 2000);
                  setTimeout(() => { if (el.paused) el.play().catch(() => {}); }, 5000);
                }}
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
            )}
          </div>
          <Hero />
          <TrustStrip />
        </div>
        <Fleet />
        <Reviews />
        <TrustpilotBanner />
        <HowItWorks />
        <StatCounters />
        <BrandLogos />
        <Destinations />
        <Features />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      <WhatsAppFab />
      <ScrollToTop />
      <StickyMobileCTA />
    </>
  );
}
