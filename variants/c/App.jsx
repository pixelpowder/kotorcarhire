import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Users, Fuel, Settings, Briefcase, ChevronRight, Star,
  ChevronDown, ArrowRight, Search, MapPin, ShieldCheck, Clock,
  Ban, RefreshCw, Globe, Phone, Mail, Zap, Check, Shield,
  Video, Award, Calendar, CreditCard, CheckCircle, Menu, X
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
};

const iconMap = {
  'map-pin': MapPin,
  'shield-check': ShieldCheck,
  'clock': Clock,
  'ban': Ban,
  'refresh-cw': RefreshCw,
  'globe': Globe,
};

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon"><Car size={20} /></div>
          {config.name}
        </a>
        <ul className="nav-links">
          <li><a href="#fleet">Fleet</a></li>
          <li><a href="#features">Why Us</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#fleet" className="nav-cta">Book Now</a></li>
        </ul>
        <button className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src="https://images.pexels.com/photos/4940742/pexels-photo-4940742.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Montenegro coastline"
          loading="eager"
        />
      </div>
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 variants={fadeUp} custom={0}>
            {config.hero.headline}
          </motion.h1>
          <motion.p variants={fadeUp} custom={1}>
            {config.hero.subheadline}
          </motion.p>
          <motion.div className="hero-badges" variants={fadeUp} custom={2}>
            <div className="hero-badge"><CheckCircle size={16} /> Free Cancellation</div>
            <div className="hero-badge"><ShieldCheck size={16} /> Full Insurance</div>
            <div className="hero-badge"><Zap size={16} /> Instant Confirmation</div>
          </motion.div>
        </motion.div>

        <motion.div
          className="booking-glass"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3>Book Your Car</h3>
          <div className="booking-field">
            <label>Pickup Location</label>
            <div className="booking-field-input">
              <MapPin />
              <select defaultValue="tivat">
                {config.locations.map((loc, i) => (
                  <option key={i} value={loc.name.toLowerCase().replace(/\s/g, '-')}>
                    {loc.name} {loc.tag ? `(${loc.tag})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="booking-dates">
            <div className="booking-field">
              <label>Pick-up Date</label>
              <div className="booking-field-input">
                <Calendar />
                <input type="date" />
              </div>
            </div>
            <div className="booking-field">
              <label>Return Date</label>
              <div className="booking-field-input">
                <Calendar />
                <input type="date" />
              </div>
            </div>
          </div>
          <button className="booking-btn">
            <Search size={18} /> Search Available Cars
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Fleet() {
  const categories = ['All', ...new Set(config.cars.map(c => c.category))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? config.cars
    : config.cars.filter(c => c.category === active);

  return (
    <section className="section" id="fleet">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div className="section-label" variants={fadeUp}><Car size={15} /> Our Fleet</motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>Choose Your Perfect Ride</motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          From compact city cars to premium SUVs, find the ideal vehicle for your Montenegro adventure.
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

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="fleet-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
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
                    <div className="fleet-spec"><Users size={15} /> {car.seats} Seats</div>
                    <div className="fleet-spec"><Settings size={15} /> {car.transmission}</div>
                    <div className="fleet-spec"><Fuel size={15} /> {car.fuel}</div>
                    <div className="fleet-spec"><Briefcase size={15} /> {car.luggage} Bags</div>
                  </div>
                  <div className="fleet-card-footer">
                    <div className="fleet-price">
                      &euro;{car.price} <span>/day</span>
                    </div>
                    <button className="fleet-book-btn">Book Now</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function Features() {
  return (
    <section className="section" id="features">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div className="section-label" variants={fadeUp}><Award size={15} /> Why Choose Us</motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>Everything You Need, Included</motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          No surprises, no hidden fees. Just a seamless car rental experience from start to finish.
        </motion.p>

        <div className="features-grid">
          {config.features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Shield;
            return (
              <motion.div
                key={i}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="feature-icon"><Icon size={24} /></div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function ImageBreak() {
  return (
    <motion.div
      className="image-break"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <img
        src="https://images.pexels.com/photos/18924402/pexels-photo-18924402.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Montenegro scenery"
        loading="lazy"
      />
      <div className="image-break-overlay">
        <div className="image-break-content">
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
            From the Bay of Kotor to the beaches of Ulcinj, drive through some of
            Europe's most stunning coastal scenery.
          </motion.p>
          <motion.a
            href="#fleet"
            className="image-break-btn"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            View Our Fleet <ArrowRight size={18} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function Reviews() {
  return (
    <section className="section" id="reviews">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div className="section-label" variants={fadeUp}><Star size={15} /> Reviews</motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>Loved by Travellers</motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          Real experiences from drivers who explored Montenegro with us.
        </motion.p>

        <div className="reviews-grid">
          {config.testimonials.map((review, i) => (
            <motion.div
              key={i}
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="review-stars">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={18} />
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
      </motion.div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section" id="faq">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div className="section-label" variants={fadeUp}><CheckCircle size={15} /> FAQ</motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>Common Questions</motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          Quick answers to the most frequently asked questions about renting with us.
        </motion.p>

        <div className="faq-list">
          {config.faq.map((item, i) => (
            <motion.div
              key={i}
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <button
                className={`faq-question ${openIndex === i ? 'open' : ''}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {item.q}
                <ChevronDown size={20} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta-section">
      <motion.div
        className="cta-box"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2>Ready to Explore Montenegro?</h2>
        <p>
          Book your car in under two minutes and pick up at the airport. It really is that simple.
        </p>
        <div className="cta-buttons">
          <a href="#fleet" className="cta-btn-primary">
            Browse Cars <ArrowRight size={18} />
          </a>
          <a href={`tel:${config.phone}`} className="cta-btn-secondary">
            <Phone size={18} /> {config.phone}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="nav-logo">
              <div className="nav-logo-icon"><Car size={20} /></div>
              {config.name}
            </a>
            <p>
              Premium car rentals across Montenegro. Airport pickup, full insurance, and
              24/7 support as standard.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link" aria-label="Website"><Globe size={18} /></a>
              <a href="#" className="footer-social-link" aria-label="Video"><Video size={18} /></a>
              <a href="#" className="footer-social-link" aria-label="Mail"><Mail size={18} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
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
            <h4>Contact</h4>
            <div className="footer-contact-item">
              <Phone size={16} /> {config.phone}
            </div>
            <div className="footer-contact-item">
              <Mail size={16} /> {config.email}
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} /> {config.address}
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

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Fleet />
      <Features />
      <ImageBreak />
      <Reviews />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
