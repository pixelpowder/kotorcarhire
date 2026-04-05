import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Fuel, Settings, Briefcase, ChevronRight, Star,
  ChevronDown, ArrowRight, Phone, Mail, Globe, MapPin,
  ShieldCheck, Clock, Ban, RefreshCw, Calendar, Check, Car
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

/* ─── Helpers ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }
  })
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function pad(n) { return String(n).padStart(2, '0'); }

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

const categories = ['All', ...new Set((config.cars || []).map(c => c.category))];

/* ─── Nav ─── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Fleet', href: '#fleet' },
    { label: 'Features', href: '#features' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#" className="nav-logo">
            {config.company?.name || 'Montenegro'}<span>.</span>
          </a>
          <div className="nav-links">
            {links.map(l => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
            <a href="#book" className="nav-cta">Book Now</a>
          </div>
          <button className="nav-mobile-toggle" onClick={() => setMobileOpen(true)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMobileOpen(false)}>
          &times;
        </button>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
        ))}
        <a href="#book" onClick={() => setMobileOpen(false)} style={{ color: 'var(--red)' }}>
          Book Now
        </a>
      </div>
    </>
  );
}

/* ─── Hero ─── */

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 className="hero-heading" variants={fadeUp}>
              Rent<span className="dot">.</span><br />
              Drive<span className="dot">.</span><br />
              Explore<span className="dot">.</span>
            </motion.h1>
            <motion.p className="hero-sub" variants={fadeUp} custom={1}>
              {config.hero?.subtitle || 'Premium car hire across Montenegro. From the Adriatic coast to the mountain passes, travel on your own terms.'}
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp} custom={2}>
              <a href="#fleet" className="btn-primary">
                View Fleet <ArrowRight size={16} />
              </a>
              <a href="#features" className="btn-secondary">
                Learn More <ChevronRight size={14} />
              </a>
            </motion.div>
            <motion.div className="hero-stats" variants={fadeUp} custom={3}>
              <div>
                <div className="hero-stat-number">500<span>+</span></div>
                <div className="hero-stat-label">Happy Drivers</div>
              </div>
              <div>
                <div className="hero-stat-number">30<span>+</span></div>
                <div className="hero-stat-label">Vehicles</div>
              </div>
              <div>
                <div className="hero-stat-number">4.9</div>
                <div className="hero-stat-label">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image-wrap"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="hero-image-frame">
              <img
                src={config.hero?.image || 'https://images.unsplash.com/photo-1564668791439-07a09e1120d5?w=600&h=800&fit=crop'}
                alt="Montenegro scenery"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
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
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <div className="fleet-item-image">
                  {car.image && <img src={car.image} alt={car.name} />}
                </div>
                <div className="fleet-item-name">{car.name}</div>
                <div className="fleet-item-category">{car.category}</div>
                <div className="fleet-item-specs">
                  <span className="fleet-item-spec"><Users size={14} /> {car.seats || 5}</span>
                  <span className="fleet-item-spec"><Settings size={14} /> {car.transmission || 'Manual'}</span>
                  <span className="fleet-item-spec"><Fuel size={14} /> {car.fuel || 'Petrol'}</span>
                  {car.luggage && <span className="fleet-item-spec"><Briefcase size={14} /> {car.luggage}</span>}
                </div>
                <div className="fleet-item-footer">
                  <div className="fleet-item-price">
                    &euro;{car.price}<span>/day</span>
                  </div>
                  <a href="#book" className="fleet-book-link">
                    Book <ArrowRight size={14} />
                  </a>
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

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-label">Why Us</div>
        <h2 className="section-title">How We Work</h2>
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
          <div className="section-divider" style={{ margin: '24px auto 0' }} />
        </div>

        <div className="reviews-list">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="review-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="review-quote-mark">&ldquo;</div>
              <p className="review-text">{t.text}</p>
              <div className="review-author">
                <div className="review-author-avatar">{getInitials(t.name)}</div>
                <div className="review-author-info">
                  <div className="review-author-name">{t.name}</div>
                  {t.location && <div className="review-author-detail">{t.location}</div>}
                </div>
                <div className="review-stars">
                  {[...Array(t.rating || 5)].map((_, j) => (
                    <Star key={j} size={14} />
                  ))}
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
        {item.question}
        <ChevronDown size={18} className={`faq-chevron${open ? ' open' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="faq-answer-inner">{item.answer}</div>
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
          <div className="section-divider" style={{ margin: '24px auto 0' }} />
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
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
    <section className="cta-section" id="book">
      <div className="container">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-heading">
            Ready To<br /><span>Hit The Road?</span>
          </h2>
          <p className="cta-sub">
            Book your perfect car in under two minutes. Free cancellation, no hidden fees, and 24/7 roadside support across Montenegro.
          </p>
          <div className="cta-buttons">
            <a href="#fleet" className="btn-primary">
              Browse Cars <ArrowRight size={16} />
            </a>
            <a href={`tel:${config.company?.phone || ''}`} className="btn-secondary">
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
  const company = config.company || {};

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              {company.name || 'Montenegro'}<span>.</span>
            </div>
            <p className="footer-desc">
              {company.description || 'Premium car hire in Montenegro. Explore the coast, mountains, and everything in between.'}
            </p>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <a href="#fleet">Our Fleet</a>
            <a href="#features">Features</a>
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
            {company.phone && (
              <div className="footer-contact-item">
                <Phone size={14} /> {company.phone}
              </div>
            )}
            {company.email && (
              <div className="footer-contact-item">
                <Mail size={14} /> {company.email}
              </div>
            )}
            {company.address && (
              <div className="footer-contact-item">
                <MapPin size={14} /> {company.address}
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} {company.name || 'Montenegro Car Hire'}. All rights reserved.
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
      <Fleet />
      <Features />
      <Reviews />
      <Faq />
      <CtaSection />
      <Footer />
    </>
  );
}
