import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Fuel, Settings, Briefcase, ChevronRight, Star, ChevronDown,
  ArrowRight, Search, MapPin, ShieldCheck, Clock, Ban, RefreshCw,
  Globe, Phone, Mail, Check, Car, Calendar, CreditCard, Award, Video
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

const featureIcons = {
  'map-pin': MapPin,
  'shield-check': ShieldCheck,
  'clock': Clock,
  'ban': Ban,
  'refresh-cw': RefreshCw,
  'globe': Globe,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ───── NAV ───── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          Montenegro <em>Car Hire</em>
        </a>
        <ul className="nav-links">
          <li><a href="#fleet">Fleet</a></li>
          <li><a href="#features">Why Us</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a className="nav-phone" href={`tel:${config.phone}`}><Phone size={15} /> {config.phone}</a></li>
          <li><a href="#booking" className="nav-cta">Book Now</a></li>
        </ul>
      </div>
    </nav>
  );
}

/* ───── HERO ───── */
function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.p className="hero-eyebrow" variants={fadeUp}>
          Premium Car Rental in Montenegro
        </motion.p>
        <motion.h1 className="hero-title" variants={fadeUp}>
          Explore the Adriatic <em>at your own pace</em>
        </motion.h1>
        <motion.p className="hero-desc" variants={fadeUp}>
          {config.hero.subheadline}
        </motion.p>
        <motion.div className="hero-actions" variants={fadeUp}>
          <a href="#booking" className="btn-primary">
            Reserve Your Car <ArrowRight size={18} />
          </a>
          <a href="#fleet" className="btn-outline">
            View Fleet <ChevronRight size={18} />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-image-wrap"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img
          className="hero-image"
          src={config.hero.image}
          alt="Montenegro coastal road"
        />
        <div className="hero-image-badge">
          <div className="hero-badge-icon"><Award size={24} /></div>
          <div className="hero-badge-text">
            <span>Rated Excellent</span>
            <strong>4.9 / 5.0</strong>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ───── BOOKING BAR ───── */
function BookingBar() {
  return (
    <section className="booking-section" id="booking">
      <motion.div
        className="booking-bar"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="booking-field">
          <label>Pick-up Location</label>
          <select defaultValue="">
            <option value="" disabled>Select location</option>
            {config.locations.map((l) => (
              <option key={l.name} value={l.name}>{l.name}</option>
            ))}
          </select>
        </div>
        <div className="booking-field">
          <label>Pick-up Date</label>
          <input type="date" />
        </div>
        <div className="booking-field">
          <label>Return Date</label>
          <input type="date" />
        </div>
        <div className="booking-field">
          <label>Vehicle Type</label>
          <select defaultValue="">
            <option value="" disabled>Any category</option>
            {[...new Set(config.cars.map((c) => c.category))].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button className="booking-submit">
          <Search size={18} /> Search
        </button>
      </motion.div>
    </section>
  );
}

/* ───── FLEET ───── */
function Fleet() {
  const categories = ['All', ...new Set(config.cars.map((c) => c.category))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? config.cars.slice(0, 6)
    : config.cars.filter((c) => c.category === active).slice(0, 6);

  return (
    <section className="section" id="fleet">
      <div className="fleet-header">
        <div>
          <p className="section-eyebrow">Our Fleet</p>
          <h2 className="section-title">Choose your <em>perfect ride</em></h2>
          <p className="section-subtitle">
            From city compacts to premium SUVs — every vehicle serviced, insured, and ready for the open road.
          </p>
        </div>
        <div className="fleet-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`fleet-filter${active === cat ? ' active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="fleet-editorial"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        <AnimatePresence mode="wait">
          {filtered.map((car, i) => (
            <motion.div
              key={car.id}
              className={`fleet-item${i % 2 !== 0 ? ' reverse' : ''}`}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              layout
            >
              <div className="fleet-item-image-wrap">
                <img className="fleet-item-image" src={car.image} alt={car.name} />
                {car.popular && <span className="fleet-item-tag">Popular</span>}
              </div>
              <div className="fleet-item-content">
                <p className="fleet-item-category">{car.category}</p>
                <h3 className="fleet-item-name">{car.name}</h3>
                <div className="fleet-item-specs">
                  <span className="fleet-spec"><Users size={16} /> {car.seats} seats</span>
                  <span className="fleet-spec"><Settings size={16} /> {car.transmission}</span>
                  <span className="fleet-spec"><Fuel size={16} /> {car.fuel}</span>
                  <span className="fleet-spec"><Briefcase size={16} /> {car.luggage} bags</span>
                </div>
                <div className="fleet-item-price">
                  <span className="fleet-price-amount">€{car.price}</span>
                  <span className="fleet-price-period">/ day</span>
                </div>
                <button className="fleet-item-cta">
                  Reserve Now <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ───── FEATURES ───── */
function Features() {
  return (
    <section className="section-full section-bg-white" id="features">
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <p className="section-eyebrow">Why Choose Us</p>
          <h2 className="section-title">Renting made <em>effortless</em></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Everything you need for a seamless trip — from airport handoff to cross-border paperwork.
          </p>
        </div>

        <motion.div
          className="features-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {config.features.map((feat, i) => {
            const Icon = featureIcons[feat.icon] || Check;
            return (
              <motion.div key={i} className="feature-card" variants={fadeUp} custom={i}>
                <div className="feature-icon"><Icon size={24} /></div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ───── REVIEWS ───── */
function Reviews() {
  return (
    <section className="section" id="reviews">
      <p className="section-eyebrow">Testimonials</p>
      <h2 className="section-title">What our guests <em>say</em></h2>
      <p className="section-subtitle">Real feedback from real travellers across Europe and beyond.</p>

      <motion.div
        className="reviews-layout"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.div className="reviews-highlight" variants={fadeUp}>
          <div className="reviews-highlight-score">4.9</div>
          <div className="reviews-highlight-stars">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
          </div>
          <p className="reviews-highlight-text">
            Based on 200+ reviews from verified customers. We take pride in delivering an exceptional rental experience.
          </p>
        </motion.div>

        <div className="reviews-list">
          {config.testimonials.map((rev, i) => (
            <motion.div key={i} className="review-card" variants={fadeUp} custom={i}>
              <div className="review-stars">
                {[...Array(rev.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="review-text">"{rev.text}"</p>
              <div className="review-author">
                <div className="review-avatar">{rev.name.charAt(0)}</div>
                <div className="review-author-info">
                  <span className="review-author-name">{rev.name}</span>
                  <span className="review-author-loc">{rev.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ───── FAQ ───── */
function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section-full section-bg-cream" id="faq">
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="faq-layout">
          <div>
            <p className="section-eyebrow">FAQ</p>
            <h2 className="section-title">Common <em>questions</em></h2>
            <p className="section-subtitle">
              Everything you need to know before you book. Can't find your answer? Just call us.
            </p>
            <a
              href={`tel:${config.phone}`}
              className="btn-primary"
              style={{ marginTop: '1.5rem', display: 'inline-flex' }}
            >
              <Phone size={18} /> Call Us
            </a>
          </div>

          <div className="faq-list">
            {config.faq.map((item, i) => (
              <motion.div
                key={i}
                className="faq-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <button
                  className={`faq-question${open === i ? ' open' : ''}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {item.q}
                  <ChevronDown size={20} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="faq-answer">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── CTA ───── */
function CTA() {
  return (
    <section className="cta-section">
      <motion.div
        className="cta-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div>
          <h2 className="cta-title">Ready to explore <em>Montenegro?</em></h2>
          <p className="cta-desc">
            Book in under two minutes. Pick up at the airport. Drive the most beautiful coastline in Europe.
          </p>
          <div className="cta-actions">
            <a href="#booking" className="cta-btn-primary">
              Book Your Car <ArrowRight size={18} />
            </a>
            <a href={`tel:${config.phone}`} className="cta-btn-outline">
              <Phone size={18} /> Call Us
            </a>
          </div>
        </div>
        <div className="cta-stats">
          <div className="cta-stat">
            <div className="cta-stat-number">2,500+</div>
            <div className="cta-stat-label">Happy Customers</div>
          </div>
          <div className="cta-stat">
            <div className="cta-stat-number">50+</div>
            <div className="cta-stat-label">Vehicles Available</div>
          </div>
          <div className="cta-stat">
            <div className="cta-stat-number">4.9</div>
            <div className="cta-stat-label">Average Rating</div>
          </div>
          <div className="cta-stat">
            <div className="cta-stat-number">6</div>
            <div className="cta-stat-label">Pickup Locations</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ───── FOOTER ───── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">Montenegro <em>Car Hire</em></div>
            <p className="footer-brand-desc">
              Premium car rental across Montenegro. Airport pickup, full insurance, and the freedom to explore at your own pace.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social" aria-label="Website"><Globe size={18} /></a>
              <a href="#" className="footer-social" aria-label="Video"><Video size={18} /></a>
              <a href={`mailto:${config.email}`} className="footer-social" aria-label="Email"><Mail size={18} /></a>
              <a href={`tel:${config.phone}`} className="footer-social" aria-label="Phone"><Phone size={18} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#fleet">Our Fleet</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Locations</h4>
            <ul>
              {config.locations.slice(0, 5).map((l) => (
                <li key={l.name}><a href="#">{l.name}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <ul>
              <li><a href={`tel:${config.phone}`}>{config.phone}</a></li>
              <li><a href={`mailto:${config.email}`}>{config.email}</a></li>
              <li><span>{config.address}</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {config.name}. All rights reserved.</span>
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

/* ───── APP ───── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <BookingBar />
      <Fleet />
      <Features />
      <Reviews />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
