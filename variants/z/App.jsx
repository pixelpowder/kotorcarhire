import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Users, Fuel, Settings, Briefcase, ChevronRight, Star,
  ChevronDown, ArrowRight, Search, MapPin, ShieldCheck, Clock,
  Ban, RefreshCw, Globe, Phone, Mail, Check, CheckCircle,
  Video, Calendar, Phone as PhoneIcon
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

/* ===== ANIMATION VARIANTS ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger = {
  visible: { transition: { staggerChildren: 0.09 } }
};

const iconMap = {
  'map-pin': MapPin,
  'shield-check': ShieldCheck,
  'clock': Clock,
  'ban': Ban,
  'refresh-cw': RefreshCw,
  'globe': Globe,
};

/* ===== NAV ===== */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon"><Car size={18} /></div>
          {config.name}
        </a>
        <ul className="nav-links">
          <li><a href="#fleet">Fleet</a></li>
          <li><a href="#features">Why Us</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#fleet" className="nav-cta">Book Now</a></li>
        </ul>
        <button className="nav-mobile-toggle" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <section className="hero">
      <div className="hero-bg">
        <img
          src="https://images.pexels.com/photos/4940742/pexels-photo-4940742.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Montenegro coastline"
          loading="eager"
        />
      </div>
      <div className="hero-content">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 className="hero-headline" variants={fadeUp} custom={0}>
            Explore Montenegro{' '}
            <span className="accent">in style.</span>
          </motion.h1>
          <motion.p className="hero-subheadline" variants={fadeUp} custom={1}>
            {config.hero.subheadline}
          </motion.p>
          <motion.div className="hero-badges" variants={fadeUp} custom={2}>
            <div className="hero-badge"><CheckCircle size={14} /> Free Cancellation</div>
            <div className="hero-badge"><ShieldCheck size={14} /> Full Insurance</div>
            <div className="hero-badge"><Check size={14} /> No Hidden Fees</div>
          </motion.div>
        </motion.div>

        <motion.div
          className="booking-bar"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="booking-bar-field">
            <span className="booking-bar-label">Pickup Location</span>
            <select defaultValue="">
              <option value="" disabled>Select location</option>
              {config.locations.map((loc, i) => (
                <option key={i} value={loc.name}>
                  {loc.name}{loc.tag ? ` — ${loc.tag}` : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="booking-bar-field">
            <span className="booking-bar-label">Pick-up Date</span>
            <input type="date" />
          </div>
          <div className="booking-bar-field">
            <span className="booking-bar-label">Return Date</span>
            <input type="date" />
          </div>
          <button className="booking-bar-btn">
            <Search size={16} /> Search
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== STATS ===== */
function Stats() {
  const stats = [
    { number: '2,400', suffix: '+', label: 'Happy Customers' },
    { number: '8', suffix: '', label: 'Vehicles in Fleet' },
    { number: '6', suffix: '', label: 'Pickup Locations' },
    { number: '24/7', suffix: '', label: 'Roadside Support' },
  ];

  return (
    <div className="stats-section">
      <div className="stats-inner">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="stat-number">
              {stat.number}<span>{stat.suffix}</span>
            </div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
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
    <div className="fleet-section" id="fleet">
      <div className="fleet-section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div className="section-label" variants={fadeUp}><Car size={13} /> Our Fleet</motion.div>
          <motion.h2 className="section-title" variants={fadeUp}>Choose Your Perfect Ride</motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            From nimble city cars to premium SUVs — find the ideal vehicle for your Montenegro adventure.
          </motion.p>

          <motion.div className="fleet-filters" variants={fadeUp}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`fleet-pill ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="fleet-grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((car, i) => (
              <motion.div
                key={car.id}
                className="fleet-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div className="fleet-card-img">
                  <img src={car.image} alt={car.name} loading="lazy" />
                  {car.popular && <div className="fleet-card-badge">Popular</div>}
                </div>
                <div className="fleet-card-body">
                  <div className="fleet-card-name">{car.name}</div>
                  <div className="fleet-card-cat">{car.category}</div>
                  <div className="fleet-card-specs">
                    <div className="fleet-spec"><Users size={13} /> {car.seats} Seats</div>
                    <div className="fleet-spec"><Settings size={13} /> {car.transmission}</div>
                    <div className="fleet-spec"><Fuel size={13} /> {car.fuel}</div>
                    <div className="fleet-spec"><Briefcase size={13} /> {car.luggage} Bags</div>
                  </div>
                  <div className="fleet-card-footer">
                    <div className="fleet-price">
                      &euro;{car.price}<span>/day</span>
                    </div>
                    <button className="fleet-book-btn">Book Now</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ===== FEATURES ===== */
function Features() {
  return (
    <div className="features-section" id="features">
      <div className="features-section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div className="section-label" variants={fadeUp}><ShieldCheck size={13} /> Why Choose Us</motion.div>
          <motion.h2 className="section-title" variants={fadeUp}>Everything Included, No Surprises</motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            Every rental includes full coverage, unlimited mileage and airport pickup — at the price you see.
          </motion.p>
        </motion.div>

        <div className="features-grid">
          {config.features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || ShieldCheck;
            return (
              <motion.div
                key={i}
                className="feature-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <span className="feature-number">0{i + 1}</span>
                <div className="feature-icon"><Icon size={22} /></div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
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
      transition={{ duration: 0.8 }}
    >
      <img
        src="https://images.pexels.com/photos/18924402/pexels-photo-18924402.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Montenegro coast road"
        loading="lazy"
      />
      <div className="coast-overlay" />
      <div className="coast-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover the Adriatic Coast
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          From the walled city of Kotor to the golden beaches of Ulcinj — drive
          through some of Europe's most breathtaking scenery at your own pace.
        </motion.p>
        <motion.a
          href="#fleet"
          className="coast-btn"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Browse the Fleet <ArrowRight size={16} />
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ===== REVIEWS ===== */
function Reviews() {
  return (
    <div className="reviews-section" id="reviews">
      <div className="reviews-section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div className="section-label" variants={fadeUp}><Star size={13} /> Reviews</motion.div>
          <motion.h2 className="section-title" variants={fadeUp}>Loved by Travellers</motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            Real experiences from drivers who explored Montenegro with us.
          </motion.p>
        </motion.div>

        <div className="reviews-grid">
          {config.testimonials.map((review, i) => (
            <motion.div
              key={i}
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <div className="review-stars">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <div className="review-avatar">
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
      </div>
    </div>
  );
}

/* ===== FAQ ===== */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-section" id="faq">
      <div className="faq-section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div className="section-label" variants={fadeUp}><CheckCircle size={13} /> FAQ</motion.div>
          <motion.h2 className="section-title" variants={fadeUp}>Common Questions</motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            Quick answers to everything you need to know before you book.
          </motion.p>
        </motion.div>

        <div className="faq-list">
          {config.faq.map((item, i) => (
            <motion.div
              key={i}
              className="faq-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <button
                className={`faq-question ${openIndex === i ? 'open' : ''}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {item.q}
                <ChevronDown size={18} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== CTA ===== */
function CTA() {
  return (
    <section className="cta-section">
      <motion.div
        className="cta-box"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2>Ready to Hit the Road?</h2>
        <p>
          Book online in under two minutes. Your car will be waiting at the arrivals hall.
          No queues, no shuttle, no hassle.
        </p>
        <div className="cta-buttons">
          <a href="#fleet" className="cta-btn-primary">
            Browse Cars <ArrowRight size={16} />
          </a>
          <a href={`tel:${config.phone}`} className="cta-btn-secondary">
            <Phone size={16} /> {config.phone}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ===== FOOTER ===== */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="nav-logo">
              <div className="nav-logo-icon"><Car size={18} /></div>
              {config.name}
            </a>
            <p>
              Premium car rentals across Montenegro. Airport pickup, full insurance,
              and 24/7 support included as standard on every booking.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link" aria-label="Website"><Globe size={16} /></a>
              <a href="#" className="footer-social-link" aria-label="Video"><Video size={16} /></a>
              <a href={`mailto:${config.email}`} className="footer-social-link" aria-label="Email"><Mail size={16} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Navigate</h4>
            <a href="#fleet">Our Fleet</a>
            <a href="#features">Why Choose Us</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="footer-col">
            <h4>Locations</h4>
            {config.locations.map((loc, i) => (
              <a key={i} href="#fleet">{loc.name}</a>
            ))}
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <Phone size={14} /> {config.phone}
            </div>
            <div className="footer-contact-item">
              <Mail size={14} /> {config.email}
            </div>
            <div className="footer-contact-item">
              <MapPin size={14} /> {config.address}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {config.name}. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
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
      <Nav />
      <Hero />
      <Stats />
      <Fleet />
      <Features />
      <CoastBreak />
      <Reviews />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
