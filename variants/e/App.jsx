import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Fuel,
  Settings,
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
  Calendar,
  Car,
  Search,
  Video,
  Globe2,
  ChevronRight,
  Zap,
  Menu,
  X,
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

/* ─── icon map ─── */
const iconMap = {
  'map-pin': MapPin,
  'shield-check': ShieldCheck,
  clock: Clock,
  ban: Ban,
  'refresh-cw': RefreshCw,
  globe: Globe,
};

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─────────────────────────────────────────────
   NAV
   ───────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__logo">
        Montenegro<span>Car</span>Hire
      </div>

      <ul className="nav__links">
        <li><a href="#fleet">Fleet</a></li>
        <li><a href="#features">Why Us</a></li>
        <li><a href="#reviews">Reviews</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>

      <a href="#fleet" className="nav__cta">
        Book Now <ArrowRight size={14} />
      </a>

      <button
        className="nav__mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO — split layout
   ───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero__left"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div className="hero__label" variants={fadeUp}>
          <Zap size={14} /> Premium Car Rental
        </motion.div>
        <motion.h1 className="hero__title" variants={fadeUp} custom={1}>
          Explore The<br />
          <span>Adriatic Coast.</span>
        </motion.h1>
        <motion.p className="hero__sub" variants={fadeUp} custom={2}>
          {config.hero.subheadline}
        </motion.p>
        <motion.a
          href="#fleet"
          className="hero__cta-btn"
          variants={fadeUp}
          custom={3}
        >
          Browse Our Fleet <ChevronRight size={18} />
        </motion.a>
      </motion.div>

      <motion.div
        className="hero__right"
        initial={{ opacity: 0, x: 60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="hero__image-wrap">
          <img
            src="https://images.pexels.com/photos/4940742/pexels-photo-4940742.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Montenegro coastal road"
            loading="eager"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BOOKING — floating dark card
   ───────────────────────────────────────────── */
function Booking() {
  return (
    <section className="booking">
      <motion.div
        className="booking__card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="booking__row">
          <div className="booking__group">
            <label>Pick-up Location</label>
            <select defaultValue="">
              <option value="" disabled>Select location</option>
              {config.locations.map((loc) => (
                <option key={loc.name} value={loc.name}>{loc.name}</option>
              ))}
            </select>
          </div>

          <div className="booking__group">
            <label>Pick-up Date</label>
            <input type="date" />
          </div>

          <div className="booking__group">
            <label>Return Date</label>
            <input type="date" />
          </div>

          <div className="booking__group">
            <label>Vehicle Type</label>
            <select defaultValue="">
              <option value="" disabled>Any category</option>
              {[...new Set(config.cars.map((c) => c.category))].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button className="booking__submit">
            <Search size={16} />
            Search Cars
          </button>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FLEET — dark card grid with gradient badges
   ───────────────────────────────────────────── */
function Fleet() {
  const categories = ['All', ...new Set(config.cars.map((c) => c.category))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? config.cars.slice(0, 6)
    : config.cars.filter((c) => c.category === active).slice(0, 6);

  return (
    <section className="fleet" id="fleet">
      <motion.div
        className="fleet__header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.p className="section-label" variants={fadeUp}>Our Fleet</motion.p>
        <motion.h2 className="section-title" variants={fadeUp}>
          Find your perfect ride.
        </motion.h2>
        <motion.p className="section-sub" variants={fadeUp} custom={1}>
          From nimble city cars to spacious SUVs, we have the vehicle for every Montenegrin adventure.
        </motion.p>
        <motion.div className="fleet__filters" variants={fadeUp} custom={2}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`fleet__filter-btn ${active === cat ? 'fleet__filter-btn--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </motion.div>

      <div className="fleet__grid">
        {filtered.map((car, i) => (
          <motion.div
            key={car.id}
            className="fleet__card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={i}
          >
            <div className="fleet__card-image">
              <img src={car.image} alt={car.name} loading="lazy" />
            </div>
            <div className="fleet__card-body">
              <span className="fleet__card-cat">{car.category}</span>
              <span className="fleet__card-name">{car.name}</span>
              <div className="fleet__card-specs">
                <span><Users size={14} /> {car.seats}</span>
                <span><Settings size={14} /> {car.transmission}</span>
                <span><Fuel size={14} /> {car.fuel}</span>
              </div>
              <div className="fleet__card-bottom">
                <div className="fleet__card-price">
                  &euro;{car.price} <span>/day</span>
                </div>
                <a href="#" className="fleet__card-book">
                  Book Now <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURES
   ───────────────────────────────────────────── */
function Features() {
  return (
    <section className="features" id="features">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="features__header">
          <motion.p className="section-label" variants={fadeUp}>Why Choose Us</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            Everything you need. Nothing you don't.
          </motion.h2>
          <motion.p className="section-sub" variants={fadeUp} custom={1}>
            We keep things simple so you can focus on enjoying the drive.
          </motion.p>
        </div>

        <motion.div className="features__grid" variants={stagger}>
          {config.features.map((feat, i) => {
            const Icon = iconMap[feat.icon] || Globe;
            return (
              <motion.div key={i} className="features__item" variants={fadeUp} custom={i}>
                <div className="features__item-icon">
                  <Icon size={24} strokeWidth={1.8} />
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   REVIEWS
   ───────────────────────────────────────────── */
function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="reviews__header">
          <motion.p className="section-label" variants={fadeUp}>Testimonials</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            What our drivers say.
          </motion.h2>
          <motion.p className="section-sub" variants={fadeUp} custom={1}>
            Hundreds of happy travellers have explored Montenegro with us.
          </motion.p>
        </div>

        <motion.div className="reviews__grid" variants={stagger}>
          {config.testimonials.map((t, i) => (
            <motion.div key={i} className="reviews__card" variants={fadeUp} custom={i}>
              <div className="reviews__stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="#f97316" stroke="none" />
                ))}
              </div>
              <p className="reviews__text">&ldquo;{t.text}&rdquo;</p>
              <div className="reviews__author">
                <div className="reviews__author-avatar">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="reviews__author-name">{t.name}</div>
                  <div className="reviews__author-loc">{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
    <section className="faq" id="faq">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="faq__header">
          <motion.p className="section-label" variants={fadeUp}>FAQ</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            Common questions.
          </motion.h2>
        </div>

        <div className="faq__list">
          {config.faq.map((item, i) => (
            <motion.div
              key={i}
              className="faq__item"
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <button
                className={`faq__question ${openIndex === i ? 'faq__question--open' : ''}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {item.q}
                <ChevronDown size={20} />
              </button>
              <div className={`faq__answer ${openIndex === i ? 'faq__answer--open' : ''}`}>
                <p>{item.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA — full gradient background
   ───────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="cta-section">
      <motion.div
        className="cta-section__inner"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="cta-section__title">
          Ready to hit the road?
        </h2>
        <p className="cta-section__sub">
          Pick up at the airport. Drop off when you're done. It really is that simple.
        </p>
        <a href="#fleet" className="cta-section__btn">
          Browse Cars <ArrowRight size={18} />
        </a>
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
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__brand-name">Montenegro<span>Car</span>Hire</div>
          <p>Premium car rentals across Montenegro. Airport pickup, full insurance, zero hassle.</p>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#fleet">Our Fleet</a></li>
            <li><a href="#features">Why Us</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Locations</h4>
          <ul>
            {config.locations.slice(0, 4).map((loc) => (
              <li key={loc.name}><a href="#fleet">{loc.name}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul>
            <li>
              <div className="footer__contact-item">
                <Phone size={15} /> {config.phone}
              </div>
            </li>
            <li>
              <div className="footer__contact-item">
                <Mail size={15} /> {config.email}
              </div>
            </li>
            <li>
              <div className="footer__contact-item">
                <MapPin size={15} /> {config.address}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__copy">
          &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
        </div>
        <div className="footer__socials">
          <a href="#" aria-label="Website"><Globe size={18} /></a>
          <a href="#" aria-label="Video"><Video size={18} /></a>
          <a href="#" aria-label="Phone"><Phone size={18} /></a>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   APP
   ───────────────────────────────────────────── */
export default function App() {
  return (
    <div className="app">
      {/* Animated gradient blobs */}
      <div className="blob blob--1" />
      <div className="blob blob--2" />
      <div className="blob blob--3" />

      <Nav />
      <Hero />
      <Booking />
      <div className="divider" />
      <Fleet />
      <div className="divider" />
      <Features />
      <div className="divider" />
      <Reviews />
      <div className="divider" />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
