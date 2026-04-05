import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Users, Fuel, Settings, Briefcase, ChevronRight, Star,
  ChevronDown, ArrowRight, Search, MapPin, ShieldCheck, Clock,
  Ban, RefreshCw, Globe, Phone, Mail, Check,
  Video, Calendar, CheckCircle, Menu, X
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
};

/* ─── Icon map for features ─── */
const iconMap = {
  'map-pin': MapPin,
  'shield-check': ShieldCheck,
  'clock': Clock,
  'ban': Ban,
  'refresh-cw': RefreshCw,
  'globe': Globe,
  'check-circle': CheckCircle,
  'check': Check,
};

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon"><Car size={19} /></div>
          {config.name}
        </a>

        <ul className="nav-links">
          <li><a href="#fleet">Fleet</a></li>
          <li><a href="#features">Why Us</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#fleet" className="nav-cta">Book Now</a></li>
        </ul>

        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  const featuredCar = config.cars.find(c => c.popular) || config.cars[0];

  return (
    <section className="hero">
      {/* Soft gradient blobs */}
      <div className="hero-blobs" aria-hidden="true">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
      </div>

      <div className="hero-content">
        {/* Left — headline + booking form */}
        <div className="hero-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div className="hero-label" variants={fadeUp} custom={0}>
              <MapPin size={12} /> Montenegro Car Hire
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1}>
              {config.hero.headline.split(' ').slice(0, 3).join(' ')}{' '}
              <span>{config.hero.headline.split(' ').slice(3).join(' ')}</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2}>
              {config.hero.subheadline}
            </motion.p>

            <motion.div className="hero-trust" variants={fadeUp} custom={3}>
              <div className="hero-trust-item">
                <CheckCircle size={15} /> Free cancellation
              </div>
              <div className="hero-trust-item">
                <ShieldCheck size={15} /> Full insurance included
              </div>
              <div className="hero-trust-item">
                <Clock size={15} /> Instant confirmation
              </div>
            </motion.div>

            {/* Booking form */}
            <motion.div
              className="booking-card"
              variants={fadeUp}
              custom={4}
            >
              <div className="booking-card-title">
                <Search size={17} /> Search Available Cars
              </div>

              <div className="booking-field">
                <label>Pick-up Location</label>
                <div className="booking-field-input">
                  <MapPin size={17} />
                  <select defaultValue="">
                    <option value="" disabled>Select location…</option>
                    {config.locations.map((loc, i) => (
                      <option
                        key={i}
                        value={loc.name.toLowerCase().replace(/\s+/g, '-')}
                      >
                        {loc.name}{loc.tag ? ` (${loc.tag})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="booking-dates">
                <div className="booking-field">
                  <label>Pick-up Date</label>
                  <div className="booking-field-input">
                    <Calendar size={17} />
                    <input type="date" />
                  </div>
                </div>
                <div className="booking-field">
                  <label>Return Date</label>
                  <div className="booking-field-input">
                    <Calendar size={17} />
                    <input type="date" />
                  </div>
                </div>
              </div>

              <button className="booking-btn">
                <Search size={17} /> Find My Car
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right — frosted glass car card */}
        <div className="hero-right">
          <motion.div
            className="hero-car-card"
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-car-img">
              <img
                src={featuredCar.image}
                alt={featuredCar.name}
                loading="eager"
              />
              <div className="hero-car-img-overlay" />
            </div>

            <div className="hero-car-info">
              <div className="hero-car-badge">
                <Star size={10} /> Featured Pick
              </div>
              <div className="hero-car-name">{featuredCar.name}</div>

              <div className="hero-car-specs">
                <div className="hero-car-spec">
                  <Users size={13} /> {featuredCar.seats} Seats
                </div>
                <div className="hero-car-spec">
                  <Settings size={13} /> {featuredCar.transmission}
                </div>
                <div className="hero-car-spec">
                  <Fuel size={13} /> {featuredCar.fuel}
                </div>
                <div className="hero-car-spec">
                  <Briefcase size={13} /> {featuredCar.luggage} Bags
                </div>
              </div>

              <div className="hero-car-footer">
                <div className="hero-car-price">
                  &euro;{featuredCar.price} <span>/day</span>
                </div>
                <button className="hero-car-book">Book Now</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STATS STRIP
───────────────────────────────────────────── */
function StatsStrip() {
  const stats = [
    { value: '4,800+', label: 'Happy Customers' },
    { value: '50+', label: 'Vehicles Available' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '8+', label: 'Years in Business' },
  ];

  return (
    <motion.div
      className="stats-strip"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="stats-inner">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="stat-item"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   FLEET
───────────────────────────────────────────── */
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
        <motion.div className="section-label" variants={fadeUp}>
          <Car size={13} /> Our Fleet
        </motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>
          Choose Your Perfect Ride
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          From nimble city cars to spacious SUVs — every vehicle is serviced, insured, and ready
          for your Montenegro adventure.
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
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {filtered.map((car, i) => (
            <motion.div
              key={car.id}
              className="fleet-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="fleet-card-img">
                <img src={car.image} alt={car.name} loading="lazy" />
                {car.popular && (
                  <div className="fleet-card-badge">Popular</div>
                )}
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
                    &euro;{car.price} <span>/day</span>
                  </div>
                  <button className="fleet-book-btn">Book Now</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────── */
function Features() {
  return (
    <section className="section" id="features">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div className="section-label" variants={fadeUp}>
          <ShieldCheck size={13} /> Why Choose Us
        </motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>
          Everything You Need, Included
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          No surprises. No hidden fees. Just a seamless, transparent rental experience from
          booking to drop-off.
        </motion.p>

        <div className="features-grid">
          {config.features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || ShieldCheck;
            return (
              <motion.div
                key={i}
                className="feature-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="feature-icon"><Icon size={22} /></div>
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

/* ─────────────────────────────────────────────
   SCENE BREAK
───────────────────────────────────────────── */
function SceneBreak() {
  return (
    <motion.div
      className="scene-break"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <img
        src="https://images.pexels.com/photos/18924402/pexels-photo-18924402.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Montenegro Adriatic coast"
        loading="lazy"
      />
      <div className="scene-break-overlay">
        <div className="scene-break-content">
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
            From the Bay of Kotor to the beaches of Ulcinj, drive through some of Europe's most
            spectacular coastal scenery at your own pace.
          </motion.p>
          <motion.a
            href="#fleet"
            className="scene-break-btn"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            View Our Fleet <ArrowRight size={17} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   REVIEWS
───────────────────────────────────────────── */
function Reviews() {
  return (
    <section className="section" id="reviews">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div className="section-label" variants={fadeUp}>
          <Star size={13} /> Reviews
        </motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>
          Loved by Travellers
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          Real experiences from drivers who explored Montenegro with us.
        </motion.p>

        <div className="reviews-grid">
          {config.testimonials.map((review, i) => (
            <motion.div
              key={i}
              className="review-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="review-stars">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={16} />
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

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
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
        <motion.div className="section-label" variants={fadeUp}>
          <CheckCircle size={13} /> FAQ
        </motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>
          Common Questions
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          Quick answers to the most frequently asked questions about renting with us.
        </motion.p>

        <div className="faq-list">
          {config.faq.map((item, i) => (
            <motion.div
              key={i}
              className="faq-item"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
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
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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

/* ─────────────────────────────────────────────
   CTA
───────────────────────────────────────────── */
function CTA() {
  return (
    <section className="cta-section">
      <motion.div
        className="cta-box"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2>Ready to Explore Montenegro?</h2>
        <p>
          Book your car in under two minutes and pick up directly at the airport.
          It really is that simple.
        </p>
        <div className="cta-buttons">
          <a href="#fleet" className="cta-btn-primary">
            Browse Cars <ArrowRight size={17} />
          </a>
          <a href={`tel:${config.phone}`} className="cta-btn-secondary">
            <Phone size={17} /> {config.phone}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
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
              Premium car rentals across Montenegro. Airport pickup, full insurance, and
              24/7 roadside assistance as standard.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link" aria-label="Website">
                <Globe size={16} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Video">
                <Video size={16} />
              </a>
              <a href={`mailto:${config.email}`} className="footer-social-link" aria-label="Email">
                <Mail size={16} />
              </a>
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
              <a key={i} href="#fleet">
                {loc.name}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
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

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsStrip />
      <Fleet />
      <Features />
      <SceneBreak />
      <Reviews />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
