import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Fuel,
  Settings,
  Briefcase,
  ChevronRight,
  Star,
  ChevronDown,
  ArrowRight,
  Search,
  MapPin,
  ShieldCheck,
  Clock,
  Ban,
  RefreshCw,
  Globe2,
  Phone,
  Mail,
  Zap,
  Check,
  Car,
  Shield,
  Globe,
  Award,
  Calendar,
  CreditCard,
  CheckCircle,
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

/* ─── icon map (for config.features) ─── */
const iconMap = {
  'map-pin': MapPin,
  'shield-check': ShieldCheck,
  clock: Clock,
  ban: Ban,
  'refresh-cw': RefreshCw,
  globe: Globe,
};

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ═══════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Fleet', 'Features', 'Reviews', 'FAQ'];

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__logo">
          <div className="nav__logo-icon">
            <Car size={20} />
          </div>
          {config.name}
        </div>

        <div className="nav__links">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav__link">
              {l}
            </a>
          ))}
          <a href={`tel:${config.phone}`} className="nav__phone">
            <Phone size={15} />
            {config.phone}
          </a>
          <button className="nav__cta" onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}>
            Book Now
          </button>
        </div>

        <button className="nav__hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <ChevronDown size={24} /> : <Settings size={24} />}
        </button>
      </nav>

      <div className={`nav__mobile ${mobileOpen ? 'active' : ''}`}>
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav__link" onClick={() => setMobileOpen(false)}>
            {l}
          </a>
        ))}
        <a href={`tel:${config.phone}`} className="nav__link">
          <Phone size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          {config.phone}
        </a>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <img
          src="https://images.pexels.com/photos/4940742/pexels-photo-4940742.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Montenegro road"
          loading="eager"
        />
        <div className="hero__overlay" />
      </div>

      <motion.div
        className="hero__content"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="hero__badge">
          <span className="hero__badge-dot" />
          Trusted by 3,000+ travellers
        </motion.div>

        <motion.h1 variants={fadeUp} className="hero__heading">
          {config.hero.headline.split(' ').slice(0, 2).join(' ')}{' '}
          <span>{config.hero.headline.split(' ').slice(2).join(' ')}</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="hero__sub">
          {config.hero.subheadline}
        </motion.p>

        <motion.div variants={fadeUp} className="hero__trust-row">
          <span className="hero__trust-item">
            <CheckCircle size={16} /> Full insurance included
          </span>
          <span className="hero__trust-item">
            <CheckCircle size={16} /> Free cancellation
          </span>
          <span className="hero__trust-item">
            <CheckCircle size={16} /> Airport pickup
          </span>
          <span className="hero__trust-item">
            <CheckCircle size={16} /> No hidden fees
          </span>
        </motion.div>
      </motion.div>

      <BookingForm />
    </section>
  );
}

/* ═══════════════════════════════════════════
   BOOKING FORM
   ═══════════════════════════════════════════ */
function BookingForm() {
  return (
    <motion.div
      className="booking"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      <div className="booking__card">
        <div className="booking__row">
          <div className="booking__group">
            <label className="booking__label">Pickup Location</label>
            <div className="booking__input-wrap">
              <MapPin size={16} />
              <select defaultValue="">
                <option value="" disabled>
                  Select location
                </option>
                {config.locations.map((l) => (
                  <option key={l.name} value={l.name}>
                    {l.name} {l.tag ? `(${l.tag})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="booking__group">
            <label className="booking__label">Pickup Date</label>
            <div className="booking__input-wrap">
              <Calendar size={16} />
              <input type="date" />
            </div>
          </div>

          <div className="booking__group">
            <label className="booking__label">Return Date</label>
            <div className="booking__input-wrap">
              <Calendar size={16} />
              <input type="date" />
            </div>
          </div>

          <div className="booking__group">
            <label className="booking__label">Vehicle Type</label>
            <div className="booking__input-wrap">
              <Car size={16} />
              <select defaultValue="">
                <option value="" disabled>
                  Any type
                </option>
                {[...new Set(config.cars.map((c) => c.category))].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="booking__submit">
            <Search size={18} />
            Search
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   FLEET
   ═══════════════════════════════════════════ */
function Fleet() {
  const categories = ['All', ...new Set(config.cars.map((c) => c.category))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? config.cars : config.cars.filter((c) => c.category === active);

  return (
    <section id="fleet" className="section section--gray">
      <div className="section__container">
        <div className="section__header">
          <div className="section__label">
            <Car size={16} /> Our Fleet
          </div>
          <h2 className="section__heading">Find Your Perfect Ride</h2>
          <p className="section__sub">
            From compact city cars to premium SUVs, every vehicle is fully insured with unlimited mileage.
          </p>
        </div>

        <div className="fleet__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`fleet__pill ${active === cat ? 'fleet__pill--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div className="fleet__grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((car, i) => (
              <motion.div
                key={car.id}
                className="fleet__card"
                variants={fadeUp}
                custom={i}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <div className="fleet__card-img">
                  <img src={car.image} alt={car.name} loading="lazy" />
                  {car.popular && <span className="fleet__popular-badge">Popular</span>}
                </div>
                <div className="fleet__card-body">
                  <div className="fleet__card-cat">{car.category}</div>
                  <div className="fleet__card-name">{car.name}</div>
                  <div className="fleet__card-specs">
                    <span className="fleet__spec"><Users size={15} /> {car.seats}</span>
                    <span className="fleet__spec"><Settings size={15} /> {car.transmission}</span>
                    <span className="fleet__spec"><Fuel size={15} /> {car.fuel}</span>
                    <span className="fleet__spec"><Briefcase size={15} /> {car.luggage} bags</span>
                  </div>
                  <div className="fleet__card-footer">
                    <div className="fleet__price">
                      €{car.price} <span>/day</span>
                    </div>
                    <button className="fleet__book-btn">
                      Book <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURES
   ═══════════════════════════════════════════ */
function Features() {
  return (
    <section id="features" className="section">
      <div className="section__container">
        <div className="section__header section__header--center">
          <div className="section__label">
            <ShieldCheck size={16} /> Why Choose Us
          </div>
          <h2 className="section__heading">Everything You Need, Nothing You Don't</h2>
          <p className="section__sub">
            Transparent pricing, comprehensive insurance, and genuine 24/7 support from a local team.
          </p>
        </div>

        <motion.div
          className="features__grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {config.features.map((f, i) => {
            const Icon = iconMap[f.icon] || ShieldCheck;
            return (
              <motion.div key={i} className="features__card" variants={fadeUp} custom={i}>
                <div className="features__icon">
                  <Icon size={22} />
                </div>
                <h3 className="features__title">{f.title}</h3>
                <p className="features__desc">{f.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   REVIEWS
   ═══════════════════════════════════════════ */
function Reviews() {
  return (
    <section id="reviews" className="section section--gray">
      <div className="section__container">
        <div className="section__header section__header--center">
          <div className="section__label">
            <Star size={16} /> Reviews
          </div>
          <h2 className="section__heading">What Our Customers Say</h2>
          <p className="section__sub">
            Real feedback from real travellers who explored Montenegro with us.
          </p>
        </div>

        <motion.div
          className="reviews__grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {config.testimonials.map((t, i) => (
            <motion.div key={i} className="reviews__card" variants={fadeUp} custom={i}>
              <div className="reviews__stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="#f59e0b" />
                ))}
              </div>
              <p className="reviews__text">"{t.text}"</p>
              <div className="reviews__author">
                <div className="reviews__avatar">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="reviews__name">{t.name}</div>
                  <div className="reviews__location">{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="section">
      <div className="section__container">
        <div className="section__header section__header--center">
          <div className="section__label">
            <Zap size={16} /> FAQ
          </div>
          <h2 className="section__heading">Frequently Asked Questions</h2>
          <p className="section__sub">
            Everything you need to know before renting a car in Montenegro.
          </p>
        </div>

        <div className="faq__list">
          {config.faq.map((item, i) => (
            <motion.div
              key={i}
              className={`faq__item ${openIndex === i ? 'faq__item--open' : ''}`}
              initial={false}
            >
              <button className="faq__q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                {item.q}
                <ChevronDown size={18} />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="faq__a">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════ */
function CTA() {
  return (
    <section className="cta">
      <div className="cta__pattern" />
      <motion.div
        className="cta__content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="cta__heading">
          Ready to Explore Montenegro?
        </motion.h2>
        <motion.p variants={fadeUp} className="cta__sub">
          Book in under two minutes. Free cancellation up to 24 hours before pickup. Full insurance with zero excess available.
        </motion.p>
        <motion.div variants={fadeUp} className="cta__buttons">
          <button className="cta__btn cta__btn--primary" onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}>
            <Car size={18} />
            Browse Fleet
          </button>
          <a href={`tel:${config.phone}`} className="cta__btn cta__btn--secondary">
            <Phone size={18} />
            Call Us Now
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand-name">
              <Car size={20} style={{ color: '#0d9488' }} />
              {config.name}
            </div>
            <p className="footer__brand-desc">
              Montenegro's trusted car rental service. Premium vehicles, transparent pricing, and genuine local support since 2018.
            </p>
            <div className="footer__social">
              <span className="footer__social-link">FB</span>
              <span className="footer__social-link">IG</span>
              <span className="footer__social-link">TW</span>
            </div>
          </div>

          <div>
            <h4 className="footer__col-title">Quick Links</h4>
            <div className="footer__links">
              <a href="#fleet" className="footer__link">Our Fleet</a>
              <a href="#features" className="footer__link">Why Choose Us</a>
              <a href="#reviews" className="footer__link">Reviews</a>
              <a href="#faq" className="footer__link">FAQ</a>
              <span className="footer__link">Terms & Conditions</span>
              <span className="footer__link">Privacy Policy</span>
            </div>
          </div>

          <div>
            <h4 className="footer__col-title">Locations</h4>
            <div className="footer__links">
              {config.locations.map((l) => (
                <span key={l.name} className="footer__link">{l.name}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer__col-title">Contact</h4>
            <div className="footer__contact-item">
              <Phone size={15} />
              {config.phone}
            </div>
            <div className="footer__contact-item">
              <Mail size={15} />
              {config.email}
            </div>
            <div className="footer__contact-item">
              <MapPin size={15} />
              {config.address}
            </div>
            <div className="footer__contact-item" style={{ marginTop: '0.75rem' }}>
              <Clock size={15} />
              Open 24/7
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
          </span>
          <div className="footer__bottom-links">
            <span className="footer__bottom-link">Terms</span>
            <span className="footer__bottom-link">Privacy</span>
            <span className="footer__bottom-link">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Fleet />
      <Features />
      <Reviews />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
