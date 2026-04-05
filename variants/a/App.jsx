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
        Book Now
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
   HERO
   ───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <img src={config.hero.image} alt="Montenegro coast road" loading="eager" />
      </div>

      <div className="hero__content">
        <motion.div
          className="hero__text"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 variants={fadeUp}>
            Drive The<br />
            <span>Adriatic.</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={1}>
            {config.hero.subheadline}
          </motion.p>
        </motion.div>

        <motion.div
          className="hero__form"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="hero__form-group">
            <label>Pick-up Location</label>
            <select defaultValue="">
              <option value="" disabled>Select location</option>
              {config.locations.map((loc) => (
                <option key={loc.name} value={loc.name}>{loc.name}</option>
              ))}
            </select>
          </div>

          <div className="hero__form-row">
            <div className="hero__form-group">
              <label>Pick-up Date</label>
              <input type="date" />
            </div>
            <div className="hero__form-group">
              <label>Return Date</label>
              <input type="date" />
            </div>
          </div>

          <div className="hero__form-group">
            <label>Vehicle Type</label>
            <select defaultValue="">
              <option value="" disabled>Any category</option>
              {[...new Set(config.cars.map((c) => c.category))].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button className="hero__form-submit">
            <Search size={16} />
            Search Available Cars
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FLEET
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
        variants={fadeUp}
      >
        <h2>Our Fleet</h2>
        <div className="fleet__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`fleet__filter-btn ${active === cat ? 'fleet__filter-btn--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="fleet__scroll">
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
              <div className="fleet__card-price">
                &euro;{car.price} <span>/day</span>
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
        <motion.p className="features__label" variants={fadeUp}>Why choose us</motion.p>
        <motion.h2 className="features__title" variants={fadeUp}>
          Everything you need. Nothing you don't.
        </motion.h2>

        <motion.div className="features__grid" variants={stagger}>
          {config.features.map((feat, i) => {
            const Icon = iconMap[feat.icon] || Globe;
            return (
              <motion.div key={i} className="features__item" variants={fadeUp} custom={i}>
                <div className="features__item-icon">
                  <Icon size={28} strokeWidth={1.5} />
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
        <motion.p className="reviews__label" variants={fadeUp}>Testimonials</motion.p>
        <motion.h2 className="reviews__title" variants={fadeUp}>
          What drivers say.
        </motion.h2>

        <motion.div className="reviews__grid" variants={stagger}>
          {config.testimonials.map((t, i) => (
            <motion.div key={i} className="reviews__card" variants={fadeUp} custom={i}>
              <div className="reviews__stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="#ff6b00" stroke="none" />
                ))}
              </div>
              <p className="reviews__text">&ldquo;{t.text}&rdquo;</p>
              <div className="reviews__author">
                <div className="reviews__author-name">{t.name}</div>
                <div className="reviews__author-loc">{t.location}</div>
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
        <motion.p className="faq__label" variants={fadeUp}>FAQ</motion.p>
        <motion.h2 className="faq__title" variants={fadeUp}>
          Common questions.
        </motion.h2>

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
   CTA
   ───────────────────────────────────────────── */
function CTA() {
  return (
    <section className="cta">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <motion.h2 className="cta__heading" variants={fadeUp}>
          Ready to<br /><span>drive?</span>
        </motion.h2>
        <motion.p className="cta__sub" variants={fadeUp} custom={1}>
          Pick up at the airport. Drop off when you're done. It really is that simple.
        </motion.p>
        <motion.a href="#fleet" className="cta__btn" variants={fadeUp} custom={2}>
          Browse Cars <ArrowRight size={18} />
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
      <div className="divider" style={{ marginBottom: '4rem' }} />

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
    <>
      <Nav />
      <Hero />
      <div className="divider" />
      <Fleet />
      <div className="divider" />
      <Features />
      <div className="divider" />
      <Reviews />
      <div className="divider" />
      <FAQ />
      <div className="divider" />
      <CTA />
      <Footer />
    </>
  );
}
