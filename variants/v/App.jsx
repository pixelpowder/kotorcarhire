import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Users, Fuel, Settings, Briefcase, ChevronRight, Star,
  ChevronDown, ArrowRight, Search, MapPin, ShieldCheck, Clock,
  Ban, RefreshCw, Globe, Phone, Mail, Check,
  Video, Calendar, CheckCircle
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

/* ===== ANIMATION VARIANTS ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const iconMap = {
  'map-pin':    MapPin,
  'shield-check': ShieldCheck,
  'clock':      Clock,
  'ban':        Ban,
  'refresh-cw': RefreshCw,
  'globe':      Globe,
};

/* ===== AMBIENT BACKGROUND ===== */
function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-blob ambient-blob-1" />
      <div className="ambient-blob ambient-blob-2" />
      <div className="ambient-blob ambient-blob-3" />
      <div className="ambient-blob ambient-blob-4" />
    </div>
  );
}

/* ===== NAV ===== */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <a href="#" className="nav-logo" aria-label={config.name}>
          <div className="nav-logo-icon" aria-hidden="true">
            <Car size={18} />
          </div>
          {config.name}
        </a>

        <ul className="nav-links" role="list">
          <li><a href="#fleet">Fleet</a></li>
          <li><a href="#features">Why Us</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li>
            <a href="#fleet" className="nav-cta">
              Book Now
            </a>
          </li>
        </ul>

        <button className="nav-mobile-toggle" aria-label="Open menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

/* ===== HERO ===== */
function Hero() {
  return (
    <section className="hero" aria-label="Hero">
      {/* Full-bleed background photo */}
      <div className="hero-bg" aria-hidden="true">
        <img
          src={config.hero.image}
          alt="Montenegro coastline"
          loading="eager"
          fetchpriority="high"
        />
      </div>

      <div className="hero-content">
        {/* Headline block */}
        <motion.div
          className="hero-text"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div className="hero-eyebrow" variants={fadeUp} custom={0}>
            <MapPin size={13} />
            Montenegro &bull; Tivat &amp; Podgorica Airports
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1}>
            Explore Montenegro <span>Your Way</span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2}>
            {config.hero.subheadline}
          </motion.p>
        </motion.div>

        {/* Frosted glass booking widget */}
        <motion.div
          className="booking-glass"
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Book your car"
        >
          <h3>Find Your Car</h3>

          <div className="booking-row">
            <div className="booking-field">
              <label htmlFor="pickup-location">Pickup Location</label>
              <div className="booking-field-input">
                <MapPin size={16} aria-hidden="true" />
                <select id="pickup-location" defaultValue="tivat-airport" aria-label="Select pickup location">
                  {config.locations.map((loc, i) => (
                    <option key={i} value={loc.name.toLowerCase().replace(/\s+/g, '-')}>
                      {loc.name}{loc.tag ? ` — ${loc.tag}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="booking-field">
              <label htmlFor="pickup-date">Pick-up Date</label>
              <div className="booking-field-input">
                <Calendar size={16} aria-hidden="true" />
                <input type="date" id="pickup-date" aria-label="Pick-up date" />
              </div>
            </div>

            <div className="booking-field">
              <label htmlFor="return-date">Return Date</label>
              <div className="booking-field-input">
                <Calendar size={16} aria-hidden="true" />
                <input type="date" id="return-date" aria-label="Return date" />
              </div>
            </div>
          </div>

          <button className="booking-btn" aria-label="Search available cars">
            <Search size={17} aria-hidden="true" />
            Search Available Cars
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Key statistics"
        >
          <div className="hero-stat">
            <span className="hero-stat-value">50<span>+</span></span>
            <span className="hero-stat-label">Vehicles</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">4.9<span>★</span></span>
            <span className="hero-stat-label">Rating</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">24<span>/7</span></span>
            <span className="hero-stat-label">Support</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">0<span>€</span></span>
            <span className="hero-stat-label">Hidden Fees</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== FLEET ===== */
function Fleet() {
  const categories = ['All', ...new Set(config.cars.map(c => c.category))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? config.cars
    : config.cars.filter(c => c.category === active);

  return (
    <section className="section" id="fleet" aria-labelledby="fleet-title">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div className="section-label" variants={fadeUp} custom={0}>
          <Car size={14} aria-hidden="true" /> Our Fleet
        </motion.div>
        <motion.h2 className="section-title" id="fleet-title" variants={fadeUp} custom={1}>
          Choose Your Perfect Ride
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
          From compact city cars to premium SUVs — every vehicle maintained to the highest standard for your Montenegro journey.
        </motion.p>

        {/* Category filters */}
        <motion.div className="fleet-filters" variants={fadeUp} custom={3} role="group" aria-label="Filter by vehicle category">
          {categories.map(cat => (
            <button
              key={cat}
              className={`fleet-pill${active === cat ? ' active' : ''}`}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Animated grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="fleet-grid"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.map((car, i) => (
              <motion.article
                key={car.id}
                className="fleet-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.52, delay: i * 0.065 }}
                aria-label={`${car.name}, ${car.category}, from €${car.price} per day`}
              >
                <div className="fleet-card-img">
                  <img src={car.image} alt={car.name} loading="lazy" />
                  {car.popular && (
                    <div className="fleet-card-badge" aria-label="Popular choice">Popular</div>
                  )}
                </div>

                <div className="fleet-card-body">
                  <div className="fleet-card-name">{car.name}</div>
                  <div className="fleet-card-cat">{car.category}</div>

                  <div className="fleet-card-specs" aria-label="Vehicle specifications">
                    <div className="fleet-spec"><Users size={14} aria-hidden="true" /> {car.seats} Seats</div>
                    <div className="fleet-spec"><Settings size={14} aria-hidden="true" /> {car.transmission}</div>
                    <div className="fleet-spec"><Fuel size={14} aria-hidden="true" /> {car.fuel}</div>
                    <div className="fleet-spec"><Briefcase size={14} aria-hidden="true" /> {car.luggage} Bags</div>
                  </div>

                  <div className="fleet-card-footer">
                    <div className="fleet-price" aria-label={`€${car.price} per day`}>
                      &euro;{car.price} <span>/day</span>
                    </div>
                    <button className="fleet-book-btn" aria-label={`Book ${car.name}`}>
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ===== SECTION DIVIDER ===== */
function BlueDivider() {
  return <div className="section-divider" aria-hidden="true" />;
}

/* ===== FEATURES ===== */
function Features() {
  return (
    <>
      <BlueDivider />
      <div className="section-dark" id="features" aria-labelledby="features-title">
        <div className="section-dark-inner">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div className="section-label" variants={fadeUp} custom={0}>
              <ShieldCheck size={14} aria-hidden="true" /> Why Choose Us
            </motion.div>
            <motion.h2 className="section-title" id="features-title" variants={fadeUp} custom={1}>
              Everything Included, No Surprises
            </motion.h2>
            <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
              Every booking comes with full insurance, unlimited mileage, and airport pickup — all in the price you see.
            </motion.p>

            <div className="features-grid">
              {config.features.map((feature, i) => {
                const Icon = iconMap[feature.icon] || Check;
                return (
                  <motion.div
                    key={i}
                    className="feature-card"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.52, delay: i * 0.08 }}
                    aria-label={feature.title}
                  >
                    <div className="feature-icon" aria-hidden="true">
                      <Icon size={22} />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      <BlueDivider />
    </>
  );
}

/* ===== COAST BREAK ===== */
function CoastBreak() {
  return (
    <motion.div
      className="coast-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      aria-label="Montenegro coastal scenery"
    >
      <img
        src="https://images.pexels.com/photos/18924402/pexels-photo-18924402.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Montenegro Adriatic coast"
        loading="lazy"
      />
      <div className="coast-overlay" aria-hidden="true" />
      <div className="coast-content">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          The Adriatic at Your Fingertips
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.35 }}
        >
          From the medieval walls of Kotor to the wild beaches of Ulcinj — drive through
          some of Europe's most breathtaking coastal scenery at your own pace.
        </motion.p>
        <motion.a
          href="#fleet"
          className="coast-btn"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.5 }}
          aria-label="Browse our fleet"
        >
          Browse Our Fleet <ArrowRight size={17} aria-hidden="true" />
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ===== REVIEWS ===== */
function Reviews() {
  return (
    <section className="section" id="reviews" aria-labelledby="reviews-title">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div className="section-label" variants={fadeUp} custom={0}>
          <Star size={14} aria-hidden="true" /> Reviews
        </motion.div>
        <motion.h2 className="section-title" id="reviews-title" variants={fadeUp} custom={1}>
          Loved by Travellers
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
          Real experiences from drivers who explored Montenegro with us.
        </motion.p>

        <div className="reviews-grid" role="list">
          {config.testimonials.map((review, i) => (
            <motion.div
              key={i}
              className="review-card"
              role="listitem"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.52, delay: i * 0.1 }}
              aria-label={`Review from ${review.name}`}
            >
              <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <div className="review-avatar" aria-hidden="true">
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="review-author-info">
                  <h4>{review.name}</h4>
                  <span>{review.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ===== FAQ ===== */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <BlueDivider />
      <div className="section-dark" id="faq" aria-labelledby="faq-title">
        <div className="section-dark-inner">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div className="section-label" variants={fadeUp} custom={0}>
              <CheckCircle size={14} aria-hidden="true" /> FAQ
            </motion.div>
            <motion.h2 className="section-title" id="faq-title" variants={fadeUp} custom={1}>
              Common Questions
            </motion.h2>
            <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
              Quick answers to everything you need to know before renting with us.
            </motion.p>

            <div className="faq-list" role="list">
              {config.faq.map((item, i) => (
                <motion.div
                  key={i}
                  className="faq-item"
                  role="listitem"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, delay: i * 0.06 }}
                >
                  <button
                    className={`faq-question${openIndex === i ? ' open' : ''}`}
                    onClick={() => toggle(i)}
                    aria-expanded={openIndex === i}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    {item.q}
                    <ChevronDown size={18} aria-hidden="true" />
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        className="faq-answer"
                        role="region"
                        aria-labelledby={`faq-question-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {item.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <BlueDivider />
    </>
  );
}

/* ===== CTA ===== */
function CTA() {
  return (
    <section className="cta-section" aria-label="Call to action">
      <motion.div
        className="cta-box"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Ready to Explore Montenegro?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          Book your car in under two minutes and pick up at the airport.
          Full insurance, no hidden fees, and 24/7 support as standard.
        </motion.p>
        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.32 }}
        >
          <a href="#fleet" className="cta-btn-primary" aria-label="Browse available cars">
            Browse Cars <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a href={`tel:${config.phone}`} className="cta-btn-secondary" aria-label={`Call us at ${config.phone}`}>
            <Phone size={17} aria-hidden="true" /> {config.phone}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ===== FOOTER ===== */
function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand column */}
          <div className="footer-brand">
            <a href="#" className="nav-logo" aria-label={config.name}>
              <div className="nav-logo-icon" aria-hidden="true">
                <Car size={18} />
              </div>
              {config.name}
            </a>
            <p>
              Premium car rentals across Montenegro. Airport pickup, comprehensive
              insurance, and 24/7 support included as standard with every booking.
            </p>
            <div className="footer-socials" aria-label="Social links">
              <a href="#" className="footer-social-link" aria-label="Website">
                <Globe size={17} aria-hidden="true" />
              </a>
              <a href="#" className="footer-social-link" aria-label="Video channel">
                <Video size={17} aria-hidden="true" />
              </a>
              <a href={`mailto:${config.email}`} className="footer-social-link" aria-label="Email us">
                <Mail size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="#fleet">Our Fleet</a>
            <a href="#features">Why Choose Us</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
          </div>

          {/* Locations */}
          <div className="footer-col">
            <h4>Locations</h4>
            {config.locations.map((loc, i) => (
              <a key={i} href="#fleet" aria-label={`Pick up at ${loc.name}`}>
                {loc.name}
                {loc.tag && <span style={{ color: 'var(--accent-light)', marginLeft: '6px', fontSize: '0.7rem' }}>{loc.tag}</span>}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-item">
              <Phone size={15} aria-hidden="true" />
              <a href={`tel:${config.phone}`} aria-label={`Call ${config.phone}`}>{config.phone}</a>
            </div>
            <div className="footer-contact-item">
              <Mail size={15} aria-hidden="true" />
              <a href={`mailto:${config.email}`} aria-label={`Email ${config.email}`}>{config.email}</a>
            </div>
            <div className="footer-contact-item">
              <MapPin size={15} aria-hidden="true" />
              <span>{config.address}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {config.name}. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===== APP ===== */
export default function App() {
  return (
    <>
      <AmbientBackground />
      <Nav />
      <main>
        <Hero />
        <Fleet />
        <Features />
        <CoastBreak />
        <Reviews />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
