import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Fuel, Settings, Briefcase, ChevronRight, Star,
  ChevronDown, ArrowRight, Phone, Mail, MapPin,
  ShieldCheck, Clock, RefreshCw, Car, CheckCircle, Search,
  Globe, Video, Calendar, Check, Ban
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

/* ─── Helpers ─── */
function pad(n) { return String(n).padStart(2, '0'); }
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}
function todayStr() { return new Date().toISOString().split('T')[0]; }
function plusDaysStr(n) {
  return new Date(Date.now() + n * 86400000).toISOString().split('T')[0];
}

const categories = ['All', ...new Set((config.cars || []).map(c => c.category))];

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
};

/* ─── Nav ─── */
function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { label: 'Fleet', href: '#fleet' },
    { label: 'Why Us', href: '#features' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            Montenegro<span>CarHire</span>
          </a>
          <div className="nav-links">
            {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </div>
          <div className="nav-actions">
            <a href="#book" className="nav-cta">Book Now</a>
          </div>
          <button className="nav-mobile-toggle" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button className="mobile-menu-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}>&times;</button>
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#book"
              className="green"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.06 }}
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Hero ─── */
function Hero() {
  const locations = (config.locations || []).map(l => l.name || l); if (!locations.length) { locations.push("Tivat Airport", "Podgorica Airport", "Budva"); }

  return (
    <section className="hero" id="book">
      <div className="hero-bg">
        <img
          src={config.hero?.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop'}
          alt="Montenegro coastline"
        />
      </div>

      <div className="hero-content">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <motion.div className="hero-eyebrow" variants={fadeUp}>
            <span className="hero-eyebrow-dot" />
            Montenegro Car Hire — Est. 2010
          </motion.div>

          <motion.h1 className="hero-heading" variants={fadeUp} custom={1}>
            {config.hero?.headingParts ? (
              <>
                {config.hero.headingParts.before}{' '}
                <span className="accent">{config.hero.headingParts.accent}</span>{' '}
                {config.hero.headingParts.after}
              </>
            ) : (
              <>
                Explore Montenegro
                <br />in <span className="accent">Complete Freedom</span>
              </>
            )}
          </motion.h1>

          <motion.p className="hero-sub" variants={fadeUp} custom={2}>
            {config.hero?.subheadline || 'Pick up at Tivat or Podgorica airports. Free cancellation, no hidden fees, and 24/7 roadside support.'}
          </motion.p>

          {/* Booking panel */}
          <motion.div className="booking-panel" variants={fadeUp} custom={3}>
            <div className="booking-panel-label">Find Your Car</div>
            <div className="booking-row">
              <div className="booking-field">
                <label>Pick-up location</label>
                <select defaultValue={locations[0]}>
                  {locations.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="booking-field">
                <label>Pick-up date</label>
                <input type="date" defaultValue={todayStr()} />
              </div>
              <div className="booking-field">
                <label>Return date</label>
                <input type="date" defaultValue={plusDaysStr(7)} />
              </div>
              <a href="#fleet" className="booking-search-btn">
                <Search size={15} />
                Search
              </a>
            </div>
          </motion.div>

          {/* Trust pills */}
          <motion.div className="hero-trust-pills" variants={fadeUp} custom={4}>
            <div className="trust-pill"><Check size={13} /> Free cancellation</div>
            <div className="trust-pill"><ShieldCheck size={13} /> Full insurance available</div>
            <div className="trust-pill"><Clock size={13} /> 24/7 support</div>
            <div className="trust-pill"><MapPin size={13} /> Airport pick-up included</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Stats Bar ─── */
function StatsBar() {
  const stats = [
    { value: '14+', label: 'Years operating' },
    { value: '40+', label: 'Vehicles in fleet' },
    { value: '4.9★', label: 'Average rating' },
    { value: '5k+', label: 'Happy customers' },
  ];
  return (
    <div className="stats-bar">
      <div className="stats-bar-inner">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="stat-item"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
          >
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Fleet ─── */
function Fleet() {
  const [filter, setFilter] = useState('All');
  const cars = (config.cars || []).filter(c => filter === 'All' || c.category === filter);

  return (
    <section className="fleet" id="fleet">
      <div className="container">
        <div className="fleet-header">
          <div>
            <div className="section-label">Our Fleet</div>
            <h2 className="section-title">Choose Your Car</h2>
            <div className="section-divider" />
          </div>
          <div className="fleet-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`fleet-filter-btn${filter === cat ? ' active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div className="fleet-grid" layout>
          <AnimatePresence mode="popLayout">
            {cars.map((car, i) => (
              <motion.div
                key={car.name || i}
                className="fleet-card"
                layout
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <div className="fleet-card-image">
                  {car.image && <img src={car.image} alt={car.name} loading="lazy" />}
                  {car.category && (
                    <div className="fleet-card-badge">{car.category}</div>
                  )}
                </div>
                <div className="fleet-card-body">
                  <div className="fleet-card-name">{car.name}</div>
                  <div className="fleet-card-category">{car.transmission || 'Manual'} · {car.fuel || 'Petrol'}</div>
                  <div className="fleet-card-specs">
                    <span className="fleet-card-spec"><Users size={13} /> {car.seats || 5} seats</span>
                    <span className="fleet-card-spec"><Settings size={13} /> {car.transmission || 'Manual'}</span>
                    <span className="fleet-card-spec"><Fuel size={13} /> {car.fuel || 'Petrol'}</span>
                    {car.luggage && (
                      <span className="fleet-card-spec"><Briefcase size={13} /> {car.luggage}</span>
                    )}
                  </div>
                  <div className="fleet-card-footer">
                    <div className="fleet-card-price">
                      &euro;{car.price}<span>/day</span>
                    </div>
                    <a href="#book" className="fleet-book-btn">
                      Book <ArrowRight size={12} />
                    </a>
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

/* ─── Features ─── */
function Features() {
  const features = config.features || [];
  const featureIcons = [
    <Car size={18} />,
    <CheckCircle size={18} />,
    <ShieldCheck size={18} />,
    <Clock size={18} />,
    <RefreshCw size={18} />,
    <MapPin size={18} />,
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features-intro">
          <div>
            <div className="section-label">Why Choose Us</div>
            <h2 className="section-title">Built Around<br />Your Journey</h2>
            <div className="section-divider" />
          </div>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', maxWidth: 360, lineHeight: 1.7 }}>
            We make renting a car in Montenegro straightforward — from booking to drop-off, every step is designed to save you time.
          </p>
        </div>

        <motion.div
          className="features-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          {features.map((f, i) => (
            <motion.div key={i} className="feature-card" variants={fadeUp} custom={i}>
              <div className="feature-number">{pad(i + 1)}</div>
              <div className="feature-icon-wrap">
                {featureIcons[i % featureIcons.length]}
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Reviews ─── */
function Reviews() {
  const testimonials = config.testimonials || [];

  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <div className="reviews-header">
          <div className="section-label">Testimonials</div>
          <h2 className="section-title">What Our Drivers Say</h2>
          <div className="section-divider" />
          <div className="reviews-rating-row">
            <div className="reviews-rating-score">4.9</div>
            <div>
              <div className="reviews-rating-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <div className="reviews-rating-count">Based on 300+ verified reviews</div>
            </div>
          </div>
        </div>

        <div className="reviews-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <div className="review-stars">
                {[...Array(t.rating || 5)].map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="review-text">"{t.text}"</p>
              <div className="review-author">
                <div className="review-avatar">{getInitials(t.name)}</div>
                <div>
                  <div className="review-author-name">{t.name}</div>
                  {t.location && <div className="review-author-location">{t.location}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button
        className="faq-question"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        {item.question || item.q}
        <ChevronDown size={17} className={`faq-chevron${open ? ' open' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="faq-answer-inner">{item.answer || item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faq() {
  const faqs = config.faq || [];
  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq-header">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Common Questions</h2>
          <div className="section-divider" />
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <FaqItem item={faq} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
function CtaSection() {
  
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="cta-heading">
            Ready to <span className="accent">Hit the Road?</span>
          </h2>
          <p className="cta-sub">
            Book your perfect car in under two minutes. Free cancellation, no hidden fees, and 24/7 roadside support throughout Montenegro.
          </p>
          <div className="cta-actions">
            <a href="#fleet" className="btn-primary">
              Browse Fleet <ArrowRight size={15} />
            </a>
            <a href={`tel:${config.phone || ''}`} className="btn-outline">
              <Phone size={14} /> Call Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand">Montenegro<span>CarHire</span></div>
            <p className="footer-desc">
              {config.description || 'Premium car hire in Montenegro. Explore the coast, mountains and everything in between with confidence.'}
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Website"><Globe size={15} /></a>
              <a href="#" className="footer-social-link" aria-label="Video"><Video size={15} /></a>
              <a href="#" className="footer-social-link" aria-label="Phone"><Phone size={15} /></a>
            </div>
          </div>

          {/* Company */}
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <a href="#fleet">Our Fleet</a>
            <a href="#features">Why Us</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <div className="footer-col-title">Legal</div>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Rental Agreement</a>
            <a href="#">Cookie Policy</a>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            {config.phone && (
              <div className="footer-contact-row"><Phone size={13} /> {config.phone}</div>
            )}
            {config.email && (
              <div className="footer-contact-row"><Mail size={13} /> {config.email}</div>
            )}
            {config.address && (
              <div className="footer-contact-row"><MapPin size={13} /> {config.address}</div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} {config.name || 'Montenegro Car Hire'}. All rights reserved.
          </span>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <Fleet />
      <Features />
      <Reviews />
      <Faq />
      <CtaSection />
      <Footer />
    </>
  );
}
