import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  MapPin,
  Calendar,
  Search,
  ChevronRight,
  ChevronDown,
  Star,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  RefreshCw,
  Globe,
  Ban,
  Users,
  Fuel,
  Settings,
  Briefcase,
  ArrowRight,
  Check,
  CheckCircle,
} from 'lucide-react';
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

/* ─── NAV ──────────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <a href="#" className="nav__logo">
          <div className="nav__logo-icon">
            <Car size={18} />
          </div>
          <div className="nav__logo-text">
            {config.name}
            <span className="nav__logo-sub">Montenegro</span>
          </div>
        </a>

        <div className="nav__links">
          <a href="#fleet" className="nav__link">Fleet</a>
          <a href="#features" className="nav__link">Why Us</a>
          <a href="#locations" className="nav__link">Locations</a>
          <a href="#reviews" className="nav__link">Reviews</a>
          <a href="#faq" className="nav__link">FAQ</a>
        </div>

        <button className="nav__cta" onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}>
          Book Now
        </button>
      </div>
    </nav>
  );
}

/* ─── HERO ─────────────────────────────────────────────── */
function Hero() {
  const [location, setLocation] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="hero__eyebrow">
            <Check size={11} /> Tivat &amp; Podgorica Airports
          </span>

          <h1 className="hero__headline">{config.hero.headline}</h1>
          <p className="hero__subheadline">{config.hero.subheadline}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="booking-card">
            <p className="booking-card__title">Find your car</p>
            <div className="booking-card__fields">
              <div className="booking-field">
                <label>
                  <MapPin size={12} /> Pickup Location
                </label>
                <select
                  className="booking-field__input"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                >
                  <option value="">Select location…</option>
                  {config.locations.map(loc => (
                    <option key={loc.name} value={loc.name}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div className="booking-field">
                <label>
                  <Calendar size={12} /> Pick-up Date
                </label>
                <input
                  type="date"
                  className="booking-field__input"
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                />
              </div>

              <div className="booking-field">
                <label>
                  <Calendar size={12} /> Drop-off Date
                </label>
                <input
                  type="date"
                  className="booking-field__input"
                  value={dropoff}
                  onChange={e => setDropoff(e.target.value)}
                />
              </div>

              <button
                className="booking-card__search"
                onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Search size={16} />
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── TRUST STRIP ──────────────────────────────────────── */
function TrustStrip() {
  const items = [
    { icon: <CheckCircle size={18} />, strong: 'No Hidden Fees', text: 'Price shown is all-inclusive' },
    { icon: <ShieldCheck size={18} />, strong: 'Full Insurance', text: 'Zero excess option available' },
    { icon: <Clock size={18} />, strong: '10-Min Pickup', text: 'Meet you at arrivals' },
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

/* ─── FLEET ─────────────────────────────────────────────── */
function Fleet() {
  const categories = ['All', ...Array.from(new Set(config.cars.map(c => c.category)))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? config.cars : config.cars.filter(c => c.category === active);

  return (
    <section className="section section--gray" id="fleet">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Fleet</span>
          <h2 className="section-title">Choose Your Ride</h2>
          <p className="section-subtitle">From city runabouts to premium SUVs — all fully insured and airport-ready.</p>
        </div>

        <div className="fleet-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`fleet-filter-btn${active === cat ? ' fleet-filter-btn--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="fleet-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map(car => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.22 }}
                className="car-card"
              >
                <div className="car-card__img-wrap">
                  <img src={car.image} alt={car.name} loading="lazy" />
                  {car.popular ? (
                    <span className="car-card__badge car-card__badge--popular">Popular</span>
                  ) : (
                    <span className="car-card__badge">{car.category}</span>
                  )}
                </div>

                <div className="car-card__body">
                  <div className="car-card__header">
                    <h3 className="car-card__name">{car.name}</h3>
                    <div className="car-card__price">
                      <div className="car-card__price-amount">€{car.price}</div>
                      <div className="car-card__price-unit">per day</div>
                    </div>
                  </div>

                  <div className="car-card__specs">
                    <span className="car-spec">
                      <Users size={13} /> {car.seats} seats
                    </span>
                    <span className="car-spec">
                      <Fuel size={13} /> {car.fuel}
                    </span>
                    <span className="car-spec">
                      <Briefcase size={13} /> {car.luggage} bags
                    </span>
                    <span className="car-spec">
                      <Settings size={13} /> {car.transmission}
                    </span>
                  </div>

                  <hr className="car-card__divider" />

                  <div className="car-card__footer">
                    <span className="car-card__transmission">{car.transmission}</span>
                    <button className="car-card__book">
                      Book Now <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES ─────────────────────────────────────────── */
function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">Everything Included</h2>
          <p className="section-subtitle">No add-ons, no surprises. Just a great car and an open road.</p>
        </div>

        <div className="features-grid">
          {config.features.map((f, i) => {
            const Icon = FEATURE_ICONS[f.icon] || ShieldCheck;
            return (
              <motion.div
                key={f.title}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
              >
                <div className="feature-card__icon">
                  <Icon size={20} />
                </div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── REVIEWS ──────────────────────────────────────────── */
function Reviews() {
  return (
    <section className="section section--gray" id="reviews">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Reviews</span>
          <h2 className="section-title">Loved by Travellers</h2>
          <p className="section-subtitle">Real experiences from real customers across Montenegro.</p>
        </div>

        <div className="reviews-grid">
          {config.testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.1 }}
            >
              <div className="review-card__stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="review-card__text">{t.text}</p>
              <div className="review-card__author">
                <div className="review-card__avatar">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="review-card__name">{t.name}</div>
                  <div className="review-card__location">{t.location}</div>
                </div>
              </div>
            </motion.div>
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
            <motion.div
              key={loc.name}
              className="location-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            >
              <div className="location-card__icon">
                <MapPin size={18} />
              </div>
              <div className="location-card__info">
                <div className="location-card__name">{loc.name}</div>
                {loc.tag ? <span className="location-card__tag">{loc.tag}</span> : null}
              </div>
              <ChevronRight size={16} className="location-card__arrow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ──────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section section--gray" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Common Questions</h2>
          <p className="section-subtitle">Everything you need to know before you book.</p>
        </div>

        <div className="faq-list">
          {config.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`faq-chevron${isOpen ? ' faq-chevron--open' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="faq-answer">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA BANNER ───────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="cta-banner__title">Ready to Explore Montenegro?</h2>
          <p className="cta-banner__subtitle">
            Book in minutes. Pick up at the airport. Drive the entire Adriatic coast at your own pace.
          </p>
          <div className="cta-banner__actions">
            <button
              className="cta-btn--primary"
              onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Fleet <ArrowRight size={16} />
            </button>
            <a href={`tel:${config.phone}`} className="cta-btn--outline">
              <Phone size={15} /> {config.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <div className="footer__brand-logo">
            <div className="footer__brand-icon">
              <Car size={16} />
            </div>
            <span className="footer__brand-name">{config.name}</span>
          </div>
          <p className="footer__brand-desc">
            Premium car rentals in Montenegro. Airport pickups, full insurance, and no hidden fees — since day one.
          </p>
          <div className="footer__contact-list">
            <div className="footer__contact-item">
              <Phone size={13} /> {config.phone}
            </div>
            <div className="footer__contact-item">
              <Mail size={13} /> {config.email}
            </div>
            <div className="footer__contact-item">
              <MapPin size={13} /> {config.address}
            </div>
          </div>
        </div>

        <div>
          <div className="footer__col-title">Quick Links</div>
          <div className="footer__links">
            {[
              { label: 'Our Fleet', href: '#fleet' },
              { label: 'Why Choose Us', href: '#features' },
              { label: 'Pickup Locations', href: '#locations' },
              { label: 'Customer Reviews', href: '#reviews' },
              { label: 'FAQ', href: '#faq' },
            ].map(l => (
              <a key={l.label} href={l.href} className="footer__link">
                <ChevronRight size={12} /> {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="footer__col-title">Fleet</div>
          <div className="footer__links">
            {Array.from(new Set(config.cars.map(c => c.category))).map(cat => (
              <a key={cat} href="#fleet" className="footer__link">
                <ChevronRight size={12} /> {cat}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="footer__col-title">Locations</div>
          <div className="footer__links">
            {config.locations.map(loc => (
              <a key={loc.name} href="#locations" className="footer__link">
                <MapPin size={12} /> {loc.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">
          &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
        </span>
        <div className="footer__bottom-links">
          <a href="#" className="footer__bottom-link">Privacy Policy</a>
          <a href="#" className="footer__bottom-link">Terms &amp; Conditions</a>
          <a href="#" className="footer__bottom-link">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ──────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Fleet />
        <Features />
        <Reviews />
        <Locations />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
