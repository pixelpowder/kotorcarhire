import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Fuel,
  Settings,
  Briefcase,
  ChevronDown,
  ArrowRight,
  Star,
  MapPin,
  ShieldCheck,
  Clock,
  Ban,
  RefreshCw,
  Globe,
  Phone,
  Mail,
  Car,
  Search,
  Check,
  Calendar,
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

/* ─── Icon map for features ─── */
const iconMap = {
  'map-pin':     MapPin,
  'shield-check': ShieldCheck,
  clock:         Clock,
  ban:           Ban,
  'refresh-cw':  RefreshCw,
  globe:         Globe,
};

/* ─── Roman numerals for features ─── */
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

/* ─── Shared animation variants ─── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.09 } },
};


/* ═══════════════════════════════════════
   NAV
   ═══════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Fleet',   href: '#fleet'    },
    { label: 'Why Us',  href: '#features' },
    { label: 'Reviews', href: '#reviews'  },
    { label: 'FAQ',     href: '#faq'      },
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__logo">
          Montenegro<span>Car</span>Hire
        </div>

        <ul className="nav__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="#fleet" className="nav__cta">Book Now</a>

        <button
          className="nav__mobile-toggle"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="nav__mobile-menu">
          <button
            className="nav__mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#fleet" className="btn-primary" onClick={() => setMobileOpen(false)}>
            Book Now <ArrowRight size={16} />
          </a>
        </div>
      )}
    </>
  );
}


/* ═══════════════════════════════════════
   HERO — Two-column: text left, framed image right
   ═══════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">

        {/* ── Left: headline + copy ── */}
        <motion.div
          className="hero__left"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div className="hero__eyebrow" variants={fadeUp} custom={0}>
            Premium Car Hire · Montenegro
          </motion.div>

          <motion.h1 className="hero__title" variants={fadeUp} custom={1}>
            <span className="light">Explore</span>{' '}
            <br />
            <span className="bold">Montenegro</span>
            <br />
            <span className="accent">Your Way</span>
          </motion.h1>

          <motion.div className="hero__title-underline" variants={fadeUp} custom={2} />

          <motion.p className="hero__sub" variants={fadeUp} custom={3}>
            {config.hero.subheadline}
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp} custom={4}>
            <a href="#fleet" className="btn-primary">
              View Our Fleet <ArrowRight size={17} />
            </a>
            <a href="#features" className="btn-outline">
              Why Choose Us
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: vintage-framed car image ── */}
        <motion.div
          className="hero__right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__frame">
            {/* Corner ornaments */}
            <div className="hero__frame-corner hero__frame-corner--tl" />
            <div className="hero__frame-corner hero__frame-corner--tr" />
            <div className="hero__frame-corner hero__frame-corner--bl" />
            <div className="hero__frame-corner hero__frame-corner--br" />

            <div className="hero__img-wrap">
              <img
                src={config.hero.image}
                alt="Montenegro coastal drive"
                loading="eager"
              />
            </div>

            <div className="hero__caption">
              <div className="hero__caption-dot" />
              <div className="hero__caption-text">
                <strong>Tivat &amp; Podgorica</strong> — pickup in minutes
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}


/* ═══════════════════════════════════════
   BOOKING
   ═══════════════════════════════════════ */
function Booking() {
  return (
    <section className="booking">
      <motion.div
        className="booking__card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        <div className="booking__header">
          <div className="booking__header-icon">
            <Calendar size={16} />
          </div>
          Quick Reservation
        </div>

        <form className="booking__form" onSubmit={(e) => e.preventDefault()}>
          <div className="booking__field">
            <label>Pick-up Location</label>
            <select defaultValue="">
              <option value="" disabled>Select location</option>
              {config.locations.map((loc) => (
                <option key={loc.name} value={loc.name}>{loc.name}</option>
              ))}
            </select>
          </div>

          <div className="booking__field">
            <label>Pick-up Date</label>
            <input type="date" />
          </div>

          <div className="booking__field">
            <label>Return Date</label>
            <input type="date" />
          </div>

          <div className="booking__field">
            <label>Vehicle Type</label>
            <select defaultValue="">
              <option value="" disabled>Any category</option>
              {[...new Set(config.cars.map((c) => c.category))].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="booking__submit">
            <Search size={15} /> Search
          </button>
        </form>
      </motion.div>
    </section>
  );
}


/* ═══════════════════════════════════════
   FLEET
   ═══════════════════════════════════════ */
function Fleet() {
  const categories = ['All', ...new Set(config.cars.map((c) => c.category))];
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All' ? config.cars : config.cars.filter((c) => c.category === active);

  return (
    <section id="fleet" className="fleet section">
      <div className="container">
        <div className="text-center">
          <div className="section-label">Our Collection</div>
          <h2 className="section-title">Choose Your Vehicle</h2>
          <div className="ornament">
            <div className="ornament-diamond" />
          </div>
          <p className="section-subtitle">
            Hand-picked vehicles for every journey — coast roads, mountain passes, or city streets.
          </p>
        </div>

        <div className="fleet__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`fleet__filter ${active === cat ? 'fleet__filter--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          className="fleet__grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((car, i) => (
              <motion.div
                key={car.id}
                className="car-card"
                variants={fadeUp}
                custom={i}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.38 }}
              >
                <div className="car-card__img-wrap">
                  <img src={car.image} alt={car.name} loading="lazy" />
                  <div className="car-card__badge">{car.category}</div>
                  {car.popular && (
                    <div className="car-card__popular">Popular</div>
                  )}
                </div>

                <div className="car-card__body">
                  <h3 className="car-card__name">{car.name}</h3>

                  <div className="car-card__specs">
                    <span className="car-card__spec">
                      <Users size={13} /> {car.seats}
                    </span>
                    <span className="car-card__spec">
                      <Settings size={13} /> {car.transmission}
                    </span>
                    <span className="car-card__spec">
                      <Fuel size={13} /> {car.fuel}
                    </span>
                    <span className="car-card__spec">
                      <Briefcase size={13} /> {car.luggage}
                    </span>
                  </div>

                  <div className="car-card__footer">
                    <div className="car-card__price">
                      &euro;{car.price}<span>/day</span>
                    </div>
                    <button className="car-card__book">
                      Reserve <ArrowRight size={13} />
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


/* ═══════════════════════════════════════
   FEATURES — Numbered list with large roman numerals
   ═══════════════════════════════════════ */
function Features() {
  return (
    <section id="features" className="features section">
      <div className="container">
        <div className="text-center">
          <div className="section-label">Our Promise</div>
          <h2 className="section-title">Why Travellers Choose Us</h2>
          <div className="ornament">
            <div className="ornament-diamond" />
          </div>
          <p className="section-subtitle">
            Six pillars of service that have earned the trust of thousands of visitors to Montenegro.
          </p>
        </div>

        <motion.div
          className="features__grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {config.features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="feature-card"
              variants={fadeUp}
              custom={i}
            >
              <div className="feature-card__number" aria-hidden="true">
                {ROMAN[i]}
              </div>
              <div className="feature-card__content">
                <h3 className="feature-card__title">{feat.title}</h3>
                <p className="feature-card__desc">{feat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════
   REVIEWS
   ═══════════════════════════════════════ */
function Reviews() {
  return (
    <section id="reviews" className="reviews section">
      <div className="container">
        <div className="text-center">
          <div className="section-label">Testimonials</div>
          <h2 className="section-title">Words from Our Guests</h2>
          <div className="ornament">
            <div className="ornament-diamond" />
          </div>
          <p className="section-subtitle">
            Real stories from travellers who discovered Montenegro behind the wheel.
          </p>
        </div>

        <motion.div
          className="reviews__grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {config.testimonials.map((review, i) => (
            <motion.div
              key={review.name}
              className="review-card"
              variants={fadeUp}
              custom={i}
            >
              <div className="review-card__quote" aria-hidden="true">&ldquo;</div>

              <div className="review-card__stars">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={15} />
                ))}
              </div>

              <p className="review-card__text">{review.text}</p>

              <div className="review-card__author">
                <div className="review-card__avatar">
                  {review.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="review-card__name">{review.name}</div>
                  <div className="review-card__location">{review.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════
   FAQ
   ═══════════════════════════════════════ */
function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button className="faq-item__trigger" onClick={onToggle}>
        <span>{item.q}</span>
        <ChevronDown size={20} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-item__answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="faq section">
      <div className="container">
        <div className="text-center">
          <div className="section-label">Questions</div>
          <h2 className="section-title">Frequently Asked</h2>
          <div className="ornament">
            <div className="ornament-diamond" />
          </div>
        </div>

        <div className="faq__list">
          {config.faq.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════
   CTA
   ═══════════════════════════════════════ */
function Cta() {
  return (
    <section className="cta">
      <div className="container">
        <motion.div
          className="cta__card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="cta__ornament">
            <div className="cta__ornament-line" />
            <Car size={22} className="cta__ornament-icon" />
            <div className="cta__ornament-line" />
          </div>

          <h2 className="cta__title">Ready for the Open Road?</h2>

          <p className="cta__sub">
            Reserve your vehicle today and discover the beauty of Montenegro's coastline, mountains, and hidden villages.
          </p>

          <div className="cta__buttons">
            <a href="#fleet" className="cta__btn-primary">
              Browse Fleet <ArrowRight size={17} />
            </a>
            <a href={`tel:${config.phone}`} className="cta__btn-secondary">
              <Phone size={15} /> {config.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          {/* Brand column */}
          <div>
            <div className="footer__brand">
              Montenegro<span>Car</span>Hire
            </div>
            <p className="footer__desc">
              Premium car rental service along the Adriatic coast. Trusted by thousands of travellers since day one.
            </p>
            <div className="footer__contact-item">
              <Phone size={15} /> {config.phone}
            </div>
            <div className="footer__contact-item">
              <Mail size={15} /> {config.email}
            </div>
            <div className="footer__contact-item">
              <MapPin size={15} /> {config.address}
            </div>
          </div>

          {/* Fleet column */}
          <div>
            <h4 className="footer__heading">Fleet</h4>
            {['Economy', 'Mid-Size', 'Premium', 'SUV', 'Van'].map((cat) => (
              <a key={cat} href="#fleet" className="footer__link">{cat}</a>
            ))}
          </div>

          {/* Locations column */}
          <div>
            <h4 className="footer__heading">Locations</h4>
            {config.locations.slice(0, 5).map((loc) => (
              <a key={loc.name} href="#booking" className="footer__link">{loc.name}</a>
            ))}
          </div>

          {/* Company column */}
          <div>
            <h4 className="footer__heading">Company</h4>
            {['About Us', 'Terms & Conditions', 'Privacy Policy', 'Contact', 'Blog'].map((item) => (
              <a key={item} href="#" className="footer__link">{item}</a>
            ))}
          </div>

        </div>

        <div className="footer__bottom">
          &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


/* ═══════════════════════════════════════
   APP
   ═══════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Booking />
      <Fleet />
      <Features />
      <Reviews />
      <Faq />
      <Cta />
      <Footer />
    </>
  );
}
