import { useState, useEffect, useMemo } from 'react';
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
  Video,
  Award,
  Play,
  Calendar,
  CreditCard,
  CheckCircle,
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

/* ─── icon map ─── */
const iconMap = {
  'map-pin': MapPin,
  'shield-check': ShieldCheck,
  clock: Clock,
  ban: Ban,
  'refresh-cw': RefreshCw,
  globe: Globe,
};

/* ─── animation presets ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08 },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ═════════════════════════════════════════════
   NAV
   ═════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__logo">
        Montenegro<span>Car</span>Hire
      </div>

      <ul className="nav__links">
        <li><a href="#fleet">Fleet</a></li>
        <li><a href="#features">Why Us</a></li>
        <li><a href="#reviews">Reviews</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>

      <a href="#fleet" className="nav__cta">
        Book Now <ArrowRight size={14} />
      </a>

      <button
        className="nav__mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <ChevronDown size={24} /> : <Car size={24} />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav__mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <a href="#fleet" onClick={() => setMobileOpen(false)}>Fleet</a>
            <a href="#features" onClick={() => setMobileOpen(false)}>Why Us</a>
            <a href="#reviews" onClick={() => setMobileOpen(false)}>Reviews</a>
            <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
            <a href="#fleet" onClick={() => setMobileOpen(false)} style={{ color: '#059669' }}>Book Now</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═════════════════════════════════════════════
   HERO — 50/50 split
   ═════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero__left"
        initial="hidden"
        animate="visible"
        variants={slideLeft}
      >
        <motion.div className="hero__badge" variants={fadeUp} custom={0}>
          <Zap size={12} /> Premium Car Rentals
        </motion.div>

        <motion.h1 className="hero__title" variants={fadeUp} custom={1}>
          {config.hero.headline.split(' ').slice(0, 2).join(' ')}{' '}
          <em>{config.hero.headline.split(' ').slice(2, 4).join(' ')}</em>{' '}
          {config.hero.headline.split(' ').slice(4).join(' ')}
        </motion.h1>

        <motion.p className="hero__subtitle" variants={fadeUp} custom={2}>
          {config.hero.subheadline}
        </motion.p>

        <motion.div className="hero__form" variants={fadeUp} custom={3}>
          <div className="hero__form-row">
            <div className="hero__form-group">
              <label className="hero__form-label">Pick-up Location</label>
              <select className="hero__form-input">
                {config.locations.map((loc) => (
                  <option key={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>
            <div className="hero__form-group">
              <label className="hero__form-label">Drop-off Location</label>
              <select className="hero__form-input">
                {config.locations.map((loc) => (
                  <option key={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="hero__form-row">
            <div className="hero__form-group">
              <label className="hero__form-label">Pick-up Date</label>
              <input type="date" className="hero__form-input" />
            </div>
            <div className="hero__form-group">
              <label className="hero__form-label">Return Date</label>
              <input type="date" className="hero__form-input" />
            </div>
          </div>
          <button className="hero__form-btn">
            <Search size={16} /> Search Available Cars
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__right"
        initial="hidden"
        animate="visible"
        variants={slideRight}
      >
        <img
          src="https://images.pexels.com/photos/4940742/pexels-photo-4940742.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Montenegro coastline"
          loading="eager"
        />
        <div className="hero__right-overlay" />
        <div className="hero__stats">
          <div className="hero__stat">
            <div className="hero__stat-num">500+</div>
            <div className="hero__stat-label">Happy Clients</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-num">8+</div>
            <div className="hero__stat-label">Vehicle Models</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-num">6</div>
            <div className="hero__stat-label">Locations</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   FEATURES STRIP
   ═════════════════════════════════════════════ */
function FeaturesStrip() {
  return (
    <section id="features" className="features-strip">
      <motion.div
        className="features-strip__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {config.features.map((feat, i) => {
          const Icon = iconMap[feat.icon] || ShieldCheck;
          return (
            <motion.div
              key={feat.title}
              className="features-strip__item"
              variants={fadeUp}
              custom={i}
            >
              <div className="features-strip__number">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="features-strip__title">{feat.title}</div>
              <div className="features-strip__desc">{feat.description}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   FLEET
   ═════════════════════════════════════════════ */
function Fleet() {
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(config.cars.map((c) => c.category))];
    return cats;
  }, []);

  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? config.cars
    : config.cars.filter((c) => c.category === active);

  return (
    <section id="fleet" className="fleet">
      <div className="fleet__header">
        <div>
          <div className="fleet__label">Our Fleet</div>
          <h2 className="fleet__title">Choose Your Ride</h2>
        </div>
        <div className="fleet__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`fleet__filter-btn ${active === cat ? 'fleet__filter-btn--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="fleet__grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((car, i) => (
            <motion.div
              key={car.id}
              className="fleet-card"
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
              layout
            >
              <div className="fleet-card__img-wrap">
                <img src={car.image} alt={car.name} loading="lazy" />
                <div className="fleet-card__category">{car.category}</div>
              </div>
              <div className="fleet-card__body">
                <div className="fleet-card__name">{car.name}</div>
                <div className="fleet-card__specs">
                  <span className="fleet-card__spec">
                    <Users size={14} /> {car.seats}
                  </span>
                  <span className="fleet-card__spec">
                    <Settings size={14} /> {car.transmission}
                  </span>
                  <span className="fleet-card__spec">
                    <Fuel size={14} /> {car.fuel}
                  </span>
                  <span className="fleet-card__spec">
                    <Briefcase size={14} /> {car.luggage}
                  </span>
                </div>
                <div className="fleet-card__footer">
                  <div className="fleet-card__price">
                    &euro;{car.price} <span>/day</span>
                  </div>
                  <button className="fleet-card__btn">
                    Book <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   REVIEWS
   ═════════════════════════════════════════════ */
function Reviews() {
  return (
    <section id="reviews" className="reviews">
      <motion.div
        className="reviews__header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <div className="reviews__label">Testimonials</div>
        <h2 className="reviews__title">What Drivers Say</h2>
      </motion.div>

      <motion.div
        className="reviews__grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {config.testimonials.map((rev, i) => (
          <motion.div key={i} className="review-card" variants={fadeUp} custom={i}>
            <div className="review-card__stars">
              {Array.from({ length: rev.rating }).map((_, j) => (
                <Star key={j} size={16} />
              ))}
            </div>
            <p className="review-card__text">"{rev.text}"</p>
            <div className="review-card__author">{rev.name}</div>
            <div className="review-card__location">{rev.location}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   FAQ
   ═════════════════════════════════════════════ */
function FAQItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? 'faq-item--open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpen(!open)}>
        {item.q}
        <ChevronDown size={20} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-item__a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="faq-item__a-inner">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  return (
    <section id="faq" className="faq">
      <motion.div
        className="faq__header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <div className="faq__label">FAQ</div>
        <h2 className="faq__title">Common Questions</h2>
      </motion.div>

      <div>
        {config.faq.map((item, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={i}
          >
            <FAQItem item={item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   CTA — split screen
   ═════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="cta">
      <motion.div
        className="cta__image"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideLeft}
      >
        <img
          src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Montenegro road"
          loading="lazy"
        />
      </motion.div>

      <motion.div
        className="cta__content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideRight}
      >
        <h2 className="cta__title">
          Ready to Hit<br />the Open Road?
        </h2>
        <p className="cta__text">
          Book in under two minutes. Pick up at the airport. Drive the entire Adriatic coast.
        </p>
        <a href="#fleet" className="cta__btn">
          View Our Fleet <ArrowRight size={16} />
        </a>
      </motion.div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   FOOTER
   ═════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand-name">
            Montenegro<span>Car</span>Hire
          </div>
          <p className="footer__brand-desc">
            {config.tagline}. Premium car rentals from Tivat and Podgorica airports with full insurance and 24/7 support.
          </p>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Quick Links</div>
          <a href="#fleet">Our Fleet</a>
          <a href="#features">Why Us</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Locations</div>
          {config.locations.slice(0, 4).map((loc) => (
            <a key={loc.name} href="#fleet">
              <MapPin size={14} /> {loc.name}
            </a>
          ))}
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Contact</div>
          <a href={`tel:${config.phone}`}>
            <Phone size={14} /> {config.phone}
          </a>
          <a href={`mailto:${config.email}`}>
            <Mail size={14} /> {config.email}
          </a>
          <a href="#fleet">
            <MapPin size={14} /> {config.address}
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__copy">
          &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
        </div>
        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

/* ═════════════════════════════════════════════
   APP
   ═════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <FeaturesStrip />
      <Fleet />
      <Reviews />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
