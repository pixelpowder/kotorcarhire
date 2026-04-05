import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Fuel, Settings, Briefcase, ChevronRight, Star,
  ChevronDown, ArrowRight, Phone, Mail, MapPin,
  ShieldCheck, Clock, RefreshCw, Search, Car, CheckCircle
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

function pad(n) { return String(n).padStart(2, '0'); }
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

const categories = ['All', ...new Set((config.cars || []).map(c => c.category))];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }
  })
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

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
          <button className="nav-mobile-toggle" onClick={() => setMobileOpen(true)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMobileOpen(false)}>&times;</button>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
        ))}
        <a href="#book" onClick={() => setMobileOpen(false)} style={{ color: 'var(--blue)' }}>Book Now</a>
      </div>
    </>
  );
}

/* ─── Hero ─── */
function Hero() {
  const locations = (config.locations || []).map(l => l.name || l);
  if (!locations.length) locations.push('Tivat Airport', 'Podgorica Airport', 'Budva');
  const today = new Date();
  const fmt = d => d.toISOString().split('T')[0];
  const pickup = fmt(today);
  const dropoff = fmt(new Date(today.getTime() + 7 * 86400000));

  return (
    <section className="hero" id="book">
      <div className="hero-bg">
        <img
          src="https://images.pexels.com/photos/4940742/pexels-photo-4940742.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Montenegro"
        />
      </div>
      <div className="hero-content">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.h1 className="hero-heading" variants={fadeUp}>
            {config.hero?.headline || 'Find the best car rental in Montenegro'}
          </motion.h1>
          <motion.p className="hero-sub" variants={fadeUp} custom={1}>
            {config.hero?.subheadline || 'Pick up at Tivat or Podgorica airports. Free cancellation, no hidden fees.'}
          </motion.p>
          <motion.div className="search-widget" variants={fadeUp} custom={2}>
            <div className="search-widget-label">Hire a car</div>
            <div className="search-row">
              <div className="search-field">
                <label>Pick-up location</label>
                <select defaultValue={locations[0]}>
                  {locations.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="search-field">
                <label>Pick-up date</label>
                <input type="date" defaultValue={pickup} />
              </div>
              <div className="search-field">
                <label>Return date</label>
                <input type="date" defaultValue={dropoff} />
              </div>
              <a href="#fleet" className="search-btn">Search</a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Trust Bar ─── */
function TrustBar() {
  const items = [
    { icon: <ShieldCheck size={18} />, title: 'Free cancellation', desc: 'Cancel up to 48 hours before pick-up for a full refund.', link: 'Learn more' },
    { icon: <Clock size={18} />, title: '24/7 support', desc: '82% of our car hire deals include unlimited mileage.', link: 'Book with confidence' },
    { icon: <MapPin size={18} />, title: 'Pick up anywhere', desc: 'Collect your car from Tivat, Podgorica, or any major town.', link: 'Choose your spot' },
  ];
  return (
    <div className="trust-bar">
      <div className="trust-bar-inner">
        {items.map((item, i) => (
          <div className="trust-item" key={i}>
            <div className="trust-item-icon">{item.icon}</div>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
            <a href="#fleet">{item.link} →</a>
          </div>
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
            <div className="section-label">Fleet</div>
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
                className="fleet-item"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <div className="fleet-item-image">
                  {car.image && <img src={car.image} alt={car.name} />}
                </div>
                <div className="fleet-item-body">
                  <div className="fleet-item-name">{car.name}</div>
                  <div className="fleet-item-category">{car.category}</div>
                  <div className="fleet-item-specs">
                    <span className="fleet-item-spec"><Users size={13} /> {car.seats || 5}</span>
                    <span className="fleet-item-spec"><Settings size={13} /> {car.transmission || 'Manual'}</span>
                    <span className="fleet-item-spec"><Fuel size={13} /> {car.fuel || 'Petrol'}</span>
                    {car.luggage && <span className="fleet-item-spec"><Briefcase size={13} /> {car.luggage}</span>}
                  </div>
                  <div className="fleet-item-footer">
                    <div className="fleet-item-price">
                      &euro;{car.price}<span>/day</span>
                    </div>
                    <a href="#book" className="fleet-book-link">
                      Book <ArrowRight size={13} />
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
  const icons = [<Car size={20} />, <CheckCircle size={20} />, <ShieldCheck size={20} />, <Clock size={20} />];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-label">Why Us</div>
        <h2 className="section-title">How It Works</h2>
        <div className="section-divider" />
        <motion.div
          className="features-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {features.map((f, i) => (
            <motion.div key={i} className="feature-item" variants={fadeUp} custom={i}>
              <div className="feature-icon">{icons[i % icons.length]}</div>
              <div className="feature-number">{pad(i + 1)}</div>
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
        <div style={{ textAlign: 'center' }}>
          <div className="section-label">Testimonials</div>
          <h2 className="section-title">What Drivers Say</h2>
          <div className="section-divider" style={{ margin: '12px auto 0' }} />
        </div>
        <div className="reviews-list">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="review-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <p className="review-text">"{t.text}"</p>
              <div className="review-author">
                <div className="review-author-avatar">{getInitials(t.name)}</div>
                <div>
                  <div className="review-author-name">{t.name}</div>
                  {t.location && <div className="review-author-detail">{t.location}</div>}
                </div>
                <div className="review-stars">
                  {[...Array(t.rating || 5)].map((_, j) => <Star key={j} size={13} fill="currentColor" />)}
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
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen(!open)}>
        {item.question || item.q}
        <ChevronDown size={18} className={`faq-chevron${open ? ' open' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
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
        <div style={{ textAlign: 'center' }}>
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Common Questions</h2>
          <div className="section-divider" style={{ margin: '12px auto 0' }} />
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <FaqItem item={faq} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CtaSection() {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-heading">Ready to <span>Hit the Road?</span></h2>
          <p className="cta-sub">
            Book your perfect car in under two minutes. Free cancellation, no hidden fees, and 24/7 support.
          </p>
          <div className="cta-buttons">
            <a href="#fleet" className="btn-primary">Browse Cars <ArrowRight size={15} /></a>
            <a href={`tel:${config.phone || ''}`} className="btn-secondary"><Phone size={14} /> Call Us</a>
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
          <div>
            <div className="footer-brand">Montenegro<span>CarHire</span></div>
            <p className="footer-desc">
              Premium car hire in Montenegro. Explore the coast, mountains and everything in between.
            </p>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <a href="#fleet">Our Fleet</a>
            <a href="#features">Why Us</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Legal</div>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Rental Agreement</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            {config.phone && <div className="footer-contact-item"><Phone size={13} /> {config.phone}</div>}
            {config.email && <div className="footer-contact-item"><Mail size={13} /> {config.email}</div>}
            {config.address && <div className="footer-contact-item"><MapPin size={13} /> {config.address}</div>}
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">&copy; {new Date().getFullYear()} {config.name || 'Montenegro Car Hire'}. All rights reserved.</span>
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

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustBar />
      <Fleet />
      <Features />
      <Reviews />
      <Faq />
      <CtaSection />
      <Footer />
    </>
  );
}
