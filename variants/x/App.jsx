import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Users, Fuel, Settings, Briefcase,
  ChevronRight, Star, ChevronDown, ArrowRight,
  Phone, Mail, MapPin, ShieldCheck, Clock,
  RefreshCw, CheckCircle, Search, Globe, Ban, Check, Calendar,
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

/* ---- helpers ---- */
const featureIconMap = {
  'map-pin':    <MapPin size={22} />,
  'shield-check': <ShieldCheck size={22} />,
  'clock':      <Clock size={22} />,
  'ban':        <Ban size={22} />,
  'refresh-cw': <RefreshCw size={22} />,
  'globe':      <Globe size={22} />,
};

const CATEGORIES = ['All', ...Array.from(new Set(config.cars.map(c => c.category)))];

/* ============================
   NAV
   ============================ */
function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon">
            <Car size={20} />
          </div>
          <div className="nav-logo-text">
            <span className="nav-logo-name">{config.name}</span>
            <span className="nav-logo-sub">Montenegro</span>
          </div>
        </a>

        <div className="nav-links">
          <a href="#fleet" className="nav-link">Fleet</a>
          <a href="#features" className="nav-link">Why Us</a>
          <a href="#reviews" className="nav-link">Reviews</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>

        <div className="nav-right">
          <a href={`tel:${config.phone}`} className="nav-phone">
            <Phone size={14} />
            {config.phone}
          </a>
          <button className="btn-nav-cta">Book Now</button>
        </div>
      </div>
    </nav>
  );
}

/* ============================
   BOOKING CARD
   ============================ */
function BookingCard() {
  return (
    <div className="booking-card">
      <div className="booking-card-title">
        <Search size={18} />
        Find your car
      </div>

      <div className="booking-fields full-width">
        <div className="booking-field">
          <label>Pick-up location</label>
          <div className="booking-field-inner">
            <MapPin size={16} />
            <select defaultValue="">
              <option value="" disabled>Select location</option>
              {config.locations.map(loc => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}{loc.tag ? ` — ${loc.tag}` : ''}
                </option>
              ))}
            </select>
            <ChevronDown size={14} style={{ color: 'var(--gray-400)' }} />
          </div>
        </div>
      </div>

      <div className="booking-fields">
        <div className="booking-field">
          <label>Pick-up date</label>
          <div className="booking-field-inner">
            <Calendar size={16} />
            <input type="date" />
          </div>
        </div>
        <div className="booking-field">
          <label>Return date</label>
          <div className="booking-field-inner">
            <Calendar size={16} />
            <input type="date" />
          </div>
        </div>
      </div>

      <button className="btn-search">
        <Search size={17} />
        Search Available Cars
      </button>

      <p className="booking-note">
        <CheckCircle size={13} />
        Free cancellation · No credit card fees
      </p>
    </div>
  );
}

/* ============================
   HERO
   ============================ */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-badge">
          <Star size={11} fill="currentColor" />
          #1 Rated in Montenegro
        </div>

        <h1 className="hero-headline">
          {config.hero.headline.split(' ').map((word, i) =>
            ['Pace', 'Own', 'Montenegro'].includes(word)
              ? <span key={i}>{word} </span>
              : word + ' '
          )}
        </h1>

        <p className="hero-subheadline">{config.hero.subheadline}</p>

        <BookingCard />
      </div>

      <div className="hero-right">
        <img
          src="https://images.pexels.com/photos/4940742/pexels-photo-4940742.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Montenegro coastal scenery"
        />
        <div className="hero-right-overlay" />

        <div className="hero-stats">
          <div className="hero-stat-pill">
            <div className="hero-stat-icon"><Car size={18} /></div>
            <div className="hero-stat-info">
              <span className="hero-stat-value">50+</span>
              <span className="hero-stat-label">Vehicles available</span>
            </div>
          </div>
          <div className="hero-stat-pill">
            <div className="hero-stat-icon"><Star size={18} /></div>
            <div className="hero-stat-info">
              <span className="hero-stat-value">4.9 / 5</span>
              <span className="hero-stat-label">Customer rating</span>
            </div>
          </div>
          <div className="hero-stat-pill">
            <div className="hero-stat-icon"><Users size={18} /></div>
            <div className="hero-stat-info">
              <span className="hero-stat-value">12,000+</span>
              <span className="hero-stat-label">Happy customers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   TRUST BAR
   ============================ */
const trustItems = [
  { icon: <RefreshCw size={20} />, title: 'Free Cancellation', desc: 'Cancel up to 24h before pickup' },
  { icon: <ShieldCheck size={20} />, title: 'Full Insurance', desc: 'CDW + theft, zero excess option' },
  { icon: <Clock size={20} />, title: '24/7 Support', desc: 'Roadside help around the clock' },
  { icon: <MapPin size={20} />, title: 'Airport Pickup', desc: 'Meet & greet at arrivals hall' },
];

function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-bar-inner">
        {trustItems.map(item => (
          <div className="trust-item" key={item.title}>
            <div className="trust-icon">{item.icon}</div>
            <div className="trust-text">
              <div className="trust-title">{item.title}</div>
              <div className="trust-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================
   FLEET
   ============================ */
function CarCard({ car }) {
  return (
    <motion.div
      className="car-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22 }}
    >
      <div className="car-card-image">
        <img src={car.image} alt={car.name} loading="lazy" />
        {car.popular && <span className="car-badge-popular">Most Popular</span>}
        <span className="car-badge-category">{car.category}</span>
      </div>

      <div className="car-card-body">
        <h3 className="car-name">{car.name}</h3>

        <div className="car-specs">
          <div className="car-spec"><Users size={14} />{car.seats} seats</div>
          <div className="car-spec"><Settings size={14} />{car.transmission}</div>
          <div className="car-spec"><Fuel size={14} />{car.fuel}</div>
          <div className="car-spec"><Briefcase size={14} />{car.luggage} bags</div>
        </div>

        <div className="car-card-footer">
          <div className="car-price">
            <span className="car-price-from">from</span>
            <span className="car-price-value">
              €{car.price}
              <span className="car-price-unit"> /day</span>
            </span>
          </div>
          <button className="btn-book">
            Book <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Fleet() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? config.cars
    : config.cars.filter(c => c.category === activeFilter);

  return (
    <section className="section fleet-section" id="fleet">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-tag"><Car size={13} />Our Fleet</div>
          <h2 className="section-title">Choose Your Perfect Car</h2>
          <p className="section-desc">
            From city runabouts to premium SUVs — every vehicle is fully insured, freshly serviced, and ready for Montenegro's roads.
          </p>
        </div>

        <div className="fleet-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn${activeFilter === cat ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div className="fleet-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================
   FEATURES
   ============================ */
function Features() {
  return (
    <section className="section features-section" id="features">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-tag"><ShieldCheck size={13} />Why Choose Us</div>
          <h2 className="section-title">Everything Included, No Surprises</h2>
          <p className="section-desc">
            We've stripped out every hidden fee and packed in everything you actually need for a stress-free drive across Montenegro.
          </p>
        </div>

        <div className="features-grid">
          {config.features.map(feat => (
            <div className="feature-card" key={feat.title}>
              <div className="feature-icon">
                {featureIconMap[feat.icon] ?? <CheckCircle size={22} />}
              </div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   REVIEWS
   ============================ */
function Reviews() {
  return (
    <section className="section reviews-section" id="reviews">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-tag"><Star size={13} />Customer Reviews</div>
          <h2 className="section-title">Trusted by Thousands of Travellers</h2>
          <p className="section-desc">
            Real stories from real customers who explored Montenegro behind the wheel of one of our cars.
          </p>
        </div>

        <div className="reviews-grid">
          {config.testimonials.map(review => (
            <div className="review-card" key={review.name}>
              <div className="review-stars">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={16} className="review-star" fill="currentColor" />
                ))}
              </div>
              <p className="review-text">{review.text}</p>
              <div className="review-author">
                <div className="review-avatar">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="review-name">{review.name}</div>
                  <div className="review-location">
                    <MapPin size={11} />
                    {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   FAQ
   ============================ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section faq-section" id="faq">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-tag"><CheckCircle size={13} />FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Everything you need to know before you pick up the keys.
          </p>
        </div>

        <div className="faq-list">
          {config.faq.map((item, i) => (
            <div
              className={`faq-item${openIndex === i ? ' open' : ''}`}
              key={i}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {item.q}
                <ChevronDown className="faq-chevron" />
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   CTA
   ============================ */
function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-inner">
        <div className="cta-tag">
          <Car size={12} />
          Ready to Drive?
        </div>
        <h2 className="cta-title">
          Your Montenegro Adventure<br />
          <span>Starts Here</span>
        </h2>
        <p className="cta-desc">
          Book online in 2 minutes. Pick up at the airport. Drive the entire Adriatic coast with full insurance and zero hidden fees.
        </p>
        <div className="cta-buttons">
          <button className="btn-cta-primary">
            Browse the Fleet <ArrowRight size={17} />
          </button>
          <a href={`tel:${config.phone}`} className="btn-cta-secondary">
            <Phone size={17} />
            Call {config.phone}
          </a>
        </div>
        <div className="cta-trust">
          <div className="cta-trust-item"><Check size={14} />Free cancellation</div>
          <div className="cta-trust-item"><Check size={14} />Full insurance included</div>
          <div className="cta-trust-item"><Check size={14} />Airport meet &amp; greet</div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   FOOTER
   ============================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon"><Car size={20} /></div>
              <span className="footer-logo-name">{config.name}</span>
            </div>
            <p className="footer-tagline">
              Premium car hire across Montenegro. Airport pickup, full insurance, and a fleet for every journey — from the Bay of Kotor to the Albanian border.
            </p>
            <div className="footer-contact">
              <a href={`tel:${config.phone}`} className="footer-contact-item">
                <Phone size={14} />{config.phone}
              </a>
              <a href={`mailto:${config.email}`} className="footer-contact-item">
                <Mail size={14} />{config.email}
              </a>
              <div className="footer-contact-item">
                <MapPin size={14} />{config.address}
              </div>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Our Fleet</div>
            <div className="footer-links">
              {['Economy Cars', 'Mid-Size', 'Premium', 'SUVs', 'Vans', 'City Cars'].map(l => (
                <a key={l} href="#fleet" className="footer-link">
                  <ChevronRight size={13} />{l}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Locations</div>
            <div className="footer-links">
              {config.locations.map(loc => (
                <a key={loc.name} href="#" className="footer-link">
                  <MapPin size={12} />{loc.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <div className="footer-links">
              {['About Us', 'How It Works', 'Insurance Policy', 'Terms & Conditions', 'Privacy Policy', 'Contact Us'].map(l => (
                <a key={l} href="#" className="footer-link">
                  <ChevronRight size={13} />{l}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} {config.name}. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy</a>
            <a href="#" className="footer-bottom-link">Terms</a>
            <a href="#" className="footer-bottom-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================
   ROOT
   ============================ */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustBar />
      <Fleet />
      <Features />
      <Reviews />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
