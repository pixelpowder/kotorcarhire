import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Fuel,
  Settings,
  ChevronRight,
  Star,
  ChevronDown,
  ArrowRight,
  Search,
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
  Check,
  Globe2,
  Video,
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
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
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
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''} ${mobileOpen ? 'nav--mobile-open' : ''}`}>
      <div className="nav__logo">
        Montenegro<span>Car</span>Hire
      </div>

      <ul className="nav__links">
        <li><a href="#fleet" onClick={() => setMobileOpen(false)}>Fleet</a></li>
        <li><a href="#features" onClick={() => setMobileOpen(false)}>Why Us</a></li>
        <li><a href="#reviews" onClick={() => setMobileOpen(false)}>Reviews</a></li>
        <li><a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a></li>
      </ul>

      <a href="#fleet" className="nav__cta">
        Book Now <ArrowRight size={15} />
      </a>

      <button
        className="nav__mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
        )}
      </button>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero__content"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div className="hero__badge" variants={fadeUp}>
          <Car size={14} /> Trusted by 10,000+ travellers
        </motion.div>

        <motion.h1 variants={fadeUp} custom={1}>
          Explore Montenegro <span>Your Way</span>
        </motion.h1>

        <motion.p className="hero__sub" variants={fadeUp} custom={2}>
          {config.hero.subheadline}
        </motion.p>
      </motion.div>

      <motion.div
        className="hero__image"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img src={config.hero.image} alt="Montenegro coast road" loading="eager" />
      </motion.div>

      <BookingForm />
    </section>
  );
}

/* ─────────────────────────────────────────────
   BOOKING FORM
   ───────────────────────────────────────────── */
function BookingForm() {
  return (
    <motion.div
      className="booking"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="booking__grid">
        <div className="booking__field">
          <label>Pick-up Location</label>
          <select defaultValue="">
            <option value="" disabled>Select location</option>
            {config.locations.map((loc) => (
              <option key={loc.name} value={loc.name}>{loc.name}</option>
            ))}
          </select>
        </div>

        <div className="booking__field">
          <label>Pick-up Date</label>
          <input type="date" />
        </div>

        <div className="booking__field">
          <label>Return Date</label>
          <input type="date" />
        </div>

        <div className="booking__field">
          <button className="booking__submit">
            <Search size={16} />
            Search Cars
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   FLEET
   ───────────────────────────────────────────── */
function Fleet() {
  const categories = ['All', ...new Set(config.cars.map((c) => c.category))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? config.cars
    : config.cars.filter((c) => c.category === active);

  return (
    <section className="fleet" id="fleet">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div className="section-label" variants={fadeUp}>
          <Car size={14} /> Our Fleet
        </motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>
          Find your perfect ride
        </motion.h2>
        <motion.p className="section-sub" variants={fadeUp}>
          From compact city cars to spacious SUVs, we have the right vehicle for your Montenegrin adventure.
        </motion.p>

        <motion.div className="fleet__filters" variants={fadeUp}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`fleet__filter ${active === cat ? 'fleet__filter--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="fleet__grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={stagger}
      >
        <AnimatePresence mode="wait">
          {filtered.map((car, i) => (
            <motion.div
              key={car.id}
              className="fleet__card"
              variants={fadeUp}
              custom={i}
              layout
            >
              <div className="fleet__card-img">
                <img src={car.image} alt={car.name} loading="lazy" />
                <span className="fleet__card-badge">{car.category}</span>
              </div>
              <div className="fleet__card-body">
                <div className="fleet__card-name">{car.name}</div>
                <div className="fleet__card-specs">
                  <span className="fleet__card-spec"><Users size={14} /> {car.seats}</span>
                  <span className="fleet__card-spec"><Settings size={14} /> {car.transmission}</span>
                  <span className="fleet__card-spec"><Fuel size={14} /> {car.fuel}</span>
                </div>
                <div className="fleet__card-footer">
                  <div className="fleet__card-price">
                    &euro;{car.price}<span>/day</span>
                  </div>
                  <button className="fleet__card-book">
                    Book <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
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
        <motion.div className="section-label" variants={fadeUp}>
          <Check size={14} /> Why Choose Us
        </motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>
          Everything included, no surprises
        </motion.h2>
        <motion.p className="section-sub" variants={fadeUp}>
          Transparent pricing, full insurance, and 24/7 support come standard with every rental.
        </motion.p>

        <motion.div className="features__grid" variants={stagger}>
          {config.features.map((feat, i) => {
            const Icon = iconMap[feat.icon] || Globe;
            return (
              <motion.div key={i} className="features__card" variants={fadeUp} custom={i}>
                <div className="features__icon">
                  <Icon size={24} strokeWidth={1.5} />
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
        <motion.div className="section-label" variants={fadeUp}>
          <Star size={14} /> Testimonials
        </motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>
          Loved by travellers
        </motion.h2>
        <motion.p className="section-sub" variants={fadeUp}>
          Don't just take our word for it. Here's what our customers have to say.
        </motion.p>

        <motion.div className="reviews__grid" variants={stagger}>
          {config.testimonials.map((t, i) => (
            <motion.div key={i} className="reviews__card" variants={fadeUp} custom={i}>
              <div className="reviews__stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="#6366f1" stroke="none" />
                ))}
              </div>
              <p className="reviews__text">&ldquo;{t.text}&rdquo;</p>
              <div className="reviews__author">
                <div className="reviews__avatar">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="reviews__author-info">
                  <h4>{t.name}</h4>
                  <p>{t.location}</p>
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
        <motion.div className="section-label" variants={fadeUp}>
          <ChevronDown size={14} /> FAQ
        </motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>
          Got questions? We've got answers
        </motion.h2>
        <motion.p className="section-sub" variants={fadeUp}>
          Everything you need to know about renting a car in Montenegro.
        </motion.p>

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
                <ChevronDown size={18} />
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
   CTA
   ───────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="cta">
      <motion.div
        className="cta__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={scaleIn}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Ready to hit the road?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Pick up at the airport, drop off when you're done. It really is that simple.
        </motion.p>
        <motion.a
          href="#fleet"
          className="cta__btn"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Browse Cars <ArrowRight size={16} />
        </motion.a>
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
      <div className="footer__inner">
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

        <div className="footer__divider" />

        <div className="footer__bottom">
          <div className="footer__copy">
            &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
          </div>
          <div className="footer__socials">
            <a href="#" aria-label="Website"><Globe size={16} /></a>
            <a href="#" aria-label="Video"><Video size={16} /></a>
            <a href="#" aria-label="Phone"><Phone size={16} /></a>
          </div>
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
    <>
      <div className="blob-bg" />
      <Nav />
      <Hero />
      <Fleet />
      <Features />
      <Reviews />
      <FAQ />
      <CTASection />
      <Footer />
    </>
  );
}
