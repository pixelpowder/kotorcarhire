'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import useTranslation from './i18n/useTranslation';
import Nav from './Nav';
import Footer from './Footer';
import StickyMobileCTA from './StickyMobileCTA';
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
import config from './siteConfig';
import { HOMEPAGE_BOOKING_CARS } from './data/fleetCars';

// "From €X / day" floor prices — Kotor pickup, off-season minimum
// vendor price per model. Shared affiliate 14905 inventory with the
// rest of the cluster, so prices match kotorcarrental.
const FLEET_FLOOR_EUR = {
  'vw-polo': 30, 'fiat-500': 32, 'peugeot-208': 18, 'citroen-c3': 22,
  'toyota-yaris': 25, 'vw-golf': 32, 'kia-stonic': 29, 'peugeot-2008': 30,
  'renault-kadjar': 32, 'dacia-sandero': 24, 'renault-megane': 19,
  'citroen-c4-picasso': 40,
};

// Spec fallbacks for cars whose entry isn't in the local siteConfig.cars
// list — keeps the homepage card spec row populated regardless.
const FLEET_SPECS_FALLBACK = {
  'peugeot-2008':       { seats: 5, transmission: 'Manual',    luggage: 3, fuel: 'Diesel' },
  'renault-kadjar':     { seats: 5, transmission: 'Manual',    luggage: 3, fuel: 'Diesel' },
  'dacia-sandero':      { seats: 5, transmission: 'Manual',    luggage: 2, fuel: 'Petrol' },
  'renault-megane':     { seats: 5, transmission: 'Manual',    luggage: 3, fuel: 'Diesel' },
  'citroen-c4-picasso': { seats: 7, transmission: 'Automatic', luggage: 4, fuel: 'Diesel' },
};

// SSR-safe "are we on mobile" hook. Returns false on the server and on
// the very first client render (so SSR HTML matches client hydration),
// then flips to true after mount if the viewport is <=768px.
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

// True only after first client mount. Use to gate browser-only DOM
// (video, navigator checks) so SSR and first client render agree.
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted;
}

// Fisher-Yates shuffle that runs once per page load.
function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const HOMEPAGE_FLEET_LIMIT = 9;
const HOMEPAGE_FLEET_COLUMNS = 3;
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

// LocalRent city IDs, used to configure the booking widget per location
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

const TIME_OPTIONS = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'].map(t => ({ value: t, label: t }));

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
    color: 'var(--gray-800)',
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: '15px',
    fontWeight: '500',
    color: 'var(--gray-800)',
    margin: '0',
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: '15px',
    color: 'var(--gray-500)',
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
    background: 'var(--white)',
    border: '1px solid var(--gray-200)',
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  menuList: (base) => ({
    ...base,
    padding: '4px',
    maxHeight: '260px',
    background: 'var(--white)',
  }),
  option: (base, state) => ({
    ...base,
    fontSize: '14px',
    fontWeight: state.isSelected ? '600' : '400',
    color: state.isSelected ? 'rgb(0,98,227)' : 'var(--gray-800)',
    background: state.isSelected ? 'rgba(0,98,227,0.12)' : state.isFocused ? 'rgba(0,98,227,0.06)' : 'transparent',
    borderRadius: '6px',
    cursor: 'pointer',
    padding: '10px 12px',
  }),
};

function LocationField({ value, onChange }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const selected = LOCATION_OPTIONS.find(o => o.value === value) || null;
  return (
    <div className="booking-field location-field">
      <label>
        <MapPin size={12} />
        {t('hero.pickupLocation')}
      </label>
      <Select
        inputId="f-location"
        instanceId="location-select"
        options={LOCATION_OPTIONS}
        value={selected}
        onChange={opt => onChange(opt.value)}
        styles={locationSelectStyles}
        isSearchable={!isMobile}
        placeholder={t('hero.searchLocation')}
        menuPlacement="auto"
        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
        maxMenuHeight={200}
        onMenuOpen={() => { if (window.innerWidth < 768) { document.activeElement?.blur(); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 400); } }}
      />
    </div>
  );
}

function TimeField({ id, label, value, onChange }) {
  const selected = TIME_OPTIONS.find(o => o.value === value) || null;
  return (
    <div className="booking-field booking-field--time">
      <label htmlFor={id}>{label}</label>
      <Select
        inputId={id}
        options={TIME_OPTIONS}
        value={selected}
        onChange={opt => onChange(opt.value)}
        styles={locationSelectStyles}
        isSearchable={false}
        menuPlacement="bottom"
        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
        maxMenuHeight={240}
      />
    </div>
  );
}

/* ─── HERO ─────────────────────────────────────────────── */
function Hero() {
  const { t, localePath } = useTranslation();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [pickup, setPickup] = useState('Tivat');
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    d.setHours(0, 0, 0, 0);
    return d;
  });
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
          <h1 className="hero__headline hero__headline--two-line">
            <span className="hero__headline-line1">{t('hero.headlineLine1') || t('hero.headline')}</span>{' '}
            <span className="hero__headline-line2">{t('hero.headlineLine2') || ''}</span>
          </h1>
          <div className="hero__badges">
            <span className="hero__badge"><CheckCircle size={14} /> {t('hero.badges.freeCancellation')}</span>
            <span className="hero__badge"><ShieldCheck size={14} /> {t('hero.badges.fullInsurance')}</span>
            <span className="hero__badge"><Clock size={14} /> {t('hero.badges.airportPickup')}</span>
            <span className="hero__badge hero__badge--accent"><Star size={14} fill="currentColor" /> {t('hero.badges.priceFrom')}</span>
          </div>

          <div className="booking-card">
            <div className="booking-card__fields">
              <LocationField value={pickup} onChange={setPickup} />
              <div className="booking-field booking-field--dates">
                <label>{t('hero.pickupDate')}, {t('hero.dropoffDate')}</label>
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  monthsShown={isMobile ? 1 : 2}
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
              <TimeField id="f-pickup-time" label={t('hero.pickupTime')} value={pickupTime} onChange={setPickupTime} />
              <TimeField id="f-dropoff-time" label={t('hero.dropoffTime')} value={dropoffTime} onChange={setDropoffTime} />
              <button className="booking-card__search" onClick={handleSearch}>
                {t('hero.search')}
              </button>
            </div>
            {(() => {
              const pickupMonth = startDate ? startDate.getMonth() + 1 : null;
              const currentMonth = new Date().getMonth() + 1;
              const inPeak = pickupMonth ? (pickupMonth >= 5 && pickupMonth <= 9) : (currentMonth >= 3 && currentMonth <= 8);
              if (!inPeak) return null;
              return (
                <p className="booking-card__urgency">{t('hero.urgency')}</p>
              );
            })()}
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
/* ─── TIVAT AIRPORT ARRIVALS ──────────────────────────── */
function TivatArrivals() {
  const { t } = useTranslation();
  return (
    <section className="section section--gray" id="tivat">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('tivat.label')}</span>
          <h2 className="section-title">{t('tivat.title')}</h2>
          <p className="section-subtitle">{t('tivat.subtitle')}</p>
        </div>
        <div className="cruise-grid">
          {[
            { icon: <MapPin size={24} />, title: t('tivat.items.0.title'), desc: t('tivat.items.0.desc') },
            { icon: <Star size={24} fill="currentColor" />, title: t('tivat.items.1.title'), desc: t('tivat.items.1.desc') },
            { icon: <Globe size={24} />, title: t('tivat.items.2.title'), desc: t('tivat.items.2.desc') },
            { icon: <Car size={24} />, title: t('tivat.items.3.title'), desc: t('tivat.items.3.desc') },
          ].map((item) => (
            <div key={item.title} className="cruise-card reveal-item">
              <div className="cruise-card__icon">{item.icon}</div>
              <h3 className="cruise-card__title">{item.title}</h3>
              <p className="cruise-card__desc">{item.desc}</p>
            </div>
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

/* ─── FLEET SHOWCASE (homepage teaser → /cars) ─────────── */
const FLEET_TABS = [
  { key: 'all',     fallback: 'All' },
  { key: 'economy', fallback: 'Economy' },
  { key: 'suv',     fallback: 'SUV' },
  { key: 'midsize', fallback: 'Mid-Size' },
];

// Homepage curates 6 of 7, the Kotor cruise/bay set.
const HOMEPAGE_FLEET_SLUGS = [
  'vw-polo', 'fiat-500', 'peugeot-208',
  'toyota-yaris', 'kia-stonic', 'vw-golf',
];

function FleetShowcase() {
  const { t, localePath } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const tf = (key, fb) => {
    const v = t(key);
    return v && v !== key ? v : fb;
  };
  const homepageCars = config.cars.filter(c => HOMEPAGE_FLEET_SLUGS.includes(c.slug));
  const filtered = activeTab === 'all'
    ? homepageCars
    : homepageCars.filter(c => c.typeGroup === activeTab);

  return (
    <section className="section fleet-showcase" id="fleet-info">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{tf('fleetShowcase.label', 'Know your car')}</span>
          <h2 className="section-title">{tf('fleetShowcase.title', 'Guides to every car in the Kotor fleet')}</h2>
          <p className="section-subtitle">{tf('fleetShowcase.subtitle', 'Specs, fuel use, boot size and what each car is really good at around the Bay of Kotor, Perast and Lovćen.')}</p>
        </div>

        <div className="fleet-showcase__tabs" role="tablist">
          {FLEET_TABS.map(tab => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`fleet-showcase__tab${activeTab === tab.key ? ' fleet-showcase__tab--active' : ''}`}
            >
              {tf(`fleetShowcase.tabs.${tab.key}`, tab.fallback)}
            </button>
          ))}
        </div>

        <div className="fleet-showcase__strip">
          {filtered.map((car) => {
            const tk = (sub, fb) => {
              const val = t(`cars.${car.slug}.${sub}`);
              return val && val !== `cars.${car.slug}.${sub}` ? val : fb;
            };
            const name = tk('name', car.name);
            const category = tk('category', car.category);
            return (
              <a
                key={car.slug}
                href={localePath(`/cars/${car.slug}`)}
                className="fleet-showcase__chip"
                title={tk('tagline', car.tagline)}
              >
                <div className="fleet-showcase__chip-img" style={{ backgroundImage: `url(${car.image})` }} />
                <div className="fleet-showcase__chip-body">
                  <div className="fleet-showcase__chip-cat">{category}</div>
                  <div className="fleet-showcase__chip-name">{name}</div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="fleet-showcase__all">
          <a href={localePath('/cars')} className="fleet-showcase__all-link">
            {tf('fleetShowcase.viewAll', 'See all fleet guides')} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── FLEET ─────────────────────────────────────────────── */
// HOMEPAGE_BOOKING_CARS lives in src/data/fleetCars.js so BookPage can
// resolve a /book?model=<slug> URL back to the vendor car_ids list
// without duplicating the array.

function Fleet() {
  const { t, localePath } = useTranslation();
  const slugMap = Object.fromEntries(config.cars.map(c => [c.slug, c]));
  // SSR-safe shuffle: render the deterministic first slice on the server
  // (and on first client render so hydration matches), then shuffle after
  // mount via useEffect.
  const [cars, setCars] = useState(() => HOMEPAGE_BOOKING_CARS.slice(0, HOMEPAGE_FLEET_LIMIT));
  useEffect(() => {
    setCars(shuffled(HOMEPAGE_BOOKING_CARS).slice(0, HOMEPAGE_FLEET_LIMIT));
  }, []);
  return (
    <section className="section" id="fleet-widget">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('fleet.label')}</span>
          <h2 className="section-title">{t('fleet.title')}</h2>
          <p className="section-subtitle">{t('fleet.subtitle')}</p>
        </div>

        <div className="fleet-grid" style={{
          gridTemplateColumns: `repeat(${HOMEPAGE_FLEET_COLUMNS}, 1fr)`,
          gap: '20px',
          marginTop: '32px',
        }}>
          {cars.map((car) => {
            const localCar = car.siteSlug ? slugMap[car.siteSlug] : (slugMap[car.slug] || null);
            const image = (localCar && localCar.image) || car.image || `/img/fleet/${car.slug}.jpg`;
            const href = car.carIds ? localePath(`/book?model=${car.slug}`) : localePath('/book');
            const specs = localCar || FLEET_SPECS_FALLBACK[car.slug] || null;
            return (
              <a
                key={car.id}
                href={href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,98,227,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(0,98,227,0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                }}
              >
                <div style={{
                  width: '100%',
                  aspectRatio: '16 / 10',
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundColor: '#fff',
                }} />
                <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>
                    {t(`cars.categories.${car.category}`, car.category)}
                  </span>
                  <span style={{ fontSize: '17px', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.01em' }}>
                    {car.name}
                  </span>
                  {specs && (
                    <div style={{
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      rowGap: '6px',
                      columnGap: '12px',
                      fontSize: '12px',
                      color: '#4b5563',
                      fontWeight: 500,
                    }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 14px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Users size={13} /> {specs.seats}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Settings size={13} /> {(specs.transmission || '').slice(0, 1) || 'M'}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Briefcase size={13} /> {specs.luggage}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Fuel size={13} /> {specs.fuel}
                        </span>
                      </div>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#0f6b34',
                        fontSize: '11px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        marginLeft: 'auto',
                      }}>
                        <CheckCircle size={11} strokeWidth={3} />
                        {t('hero.badges.freeCancellation') || 'Free Cancellation'}
                      </span>
                    </div>
                  )}
                  <div style={{
                    marginTop: '10px',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#2D5C8A' }}>
                      {t('fleet.bookCta') || 'Book this car'} →
                    </span>
                    {FLEET_FLOOR_EUR[car.slug] && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'baseline',
                        gap: '4px',
                        background: '#2D5C8A',
                        color: '#fff',
                        padding: '4px 9px 5px',
                        borderRadius: '7px',
                        whiteSpace: 'nowrap',
                      }}>
                        <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>
                          {t('fleet.fromPrefix') || 'From'}
                        </span>
                        <span style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '-0.01em' }}>
                          €{FLEET_FLOOR_EUR[car.slug]}
                        </span>
                        <span style={{ fontSize: '9px', fontWeight: 600, opacity: 0.9 }}>
                          {t('fleet.perDay') || '/ day'}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
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
          {steps.map((step) => (
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
  const [locations, locsRef] = useCountUp(6);
  const stats = [
    { value: `${years}+`, label: t('stats.years'), icon: <Award size={22} />, ref: yearsRef },
    { value: rentals >= 2000 ? '2,000+' : rentals.toLocaleString(), label: t('stats.rentals'), icon: <TrendingUp size={22} />, ref: rentalsRef },
    { value: '200+', label: t('stats.cars'), icon: <Car size={22} />, ref: null },
    { value: `${locations}`, label: t('stats.locations'), icon: <MapPin size={22} />, ref: locsRef },
  ];
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card reveal-item" ref={s.ref}>
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
        <p className="brands-label">{t('brands.label')}</p>
        <div className="brands-row">
          {CAR_BRANDS.map((brand) => (
            <img key={brand.name} className="brand-logo" src={brand.logo} alt={brand.name} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
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
  const { t } = useTranslation();
  return (
    <section className="section" id="locations">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('locations.label')}</span>
          <h2 className="section-title">{t('locations.title')}</h2>
          <p className="section-subtitle">{t('locations.subtitle')}</p>
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

/* ─── BLOG CARDS ──────────────────────────────────────── */
const blogPosts = [
  { key: 'walls', image: '/img/blog-kotor-walls.webp', href: '/blog/kotor-city-walls-hike' },
  { key: 'lovcen', image: '/img/blog-lovcen-road.webp', href: '/blog/kotor-to-lovcen-drive' },
  { key: 'boat', image: '/img/blog-bay-boat.webp', href: '/blog/bay-of-kotor-boat-day' },
];

function BlogCards() {
  const { t, localePath } = useTranslation();
  return (
    <section className="section" id="blog">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('blogHome.sectionLabel')}</span>
          <h2 className="section-title">{t('blogHome.sectionTitle')}</h2>
          <p className="section-subtitle">{t('blogHome.sectionSubtitle')}</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}>
          {blogPosts.map((post) => (
            <a
              key={post.href}
              href={localePath(post.href)}
              style={{
                background: 'var(--white)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--gray-200)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'box-shadow 0.2s, transform 0.2s',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={post.image}
                alt={t(`blogIndex.card_${post.key}_title`)}
                style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy, #05203c)', lineHeight: 1.3, marginBottom: '8px' }}>
                  {t(`blogIndex.card_${post.key}_title`)}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--gray-600, #6c757d)', lineHeight: 1.6, flex: 1 }}>
                  {t(`blogIndex.card_${post.key}_excerpt`)}
                </p>
              </div>
            </a>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <a
            href={localePath('/blog')}
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--blue, #0770e3)',
              textDecoration: 'none',
            }}
          >
            {t('blogHome.viewAll')} &rarr;
          </a>
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
          {[0, 4].map(start => (
            <div key={start} className="faq-column">
              {Array.from({ length: 4 }, (_, i) => i).map(offset => {
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
            <a href="mailto:info@kotorcarhire.com" className="cta-btn--outline">
              <Mail size={15} /> info@kotorcarhire.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollToTop() {
  const { t } = useTranslation();
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
      aria-label={t('common.scrollTopAria')}
    >
      <ChevronRight size={20} style={{ transform: 'rotate(-90deg)' }} />
    </button>
  );
}

/* ─── APP ──────────────────────────────────────────────── */
export default function App() {
  useGlobalReveal();
  const { t } = useTranslation();
  const mounted = useMounted();

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
            {mounted && (!navigator.connection || navigator.connection.effectiveType === '4g') && (
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
        {/* <Reviews /> */}
        <Fleet />
        <FleetShowcase />
        <HowItWorks />
        <StatCounters />
        <BrandLogos />
        <TivatArrivals />
        <Destinations />
        <Features />
        <BlogCards />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      <ScrollToTop />
      <StickyMobileCTA />
    </>
  );
}
