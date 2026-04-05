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
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ═════════════════════════════════════════════════
   NAV
   ═════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
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
          Reserve Now
        </a>

        <button
          className="nav__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <ArrowRight size={24} /> : <Car size={24} />}
        </button>
      </nav>

      <div className={`nav__mobile-menu ${mobileOpen ? 'nav__mobile-menu--open' : ''}`}>
        <a href="#fleet" onClick={() => setMobileOpen(false)}>Fleet</a>
        <a href="#features" onClick={() => setMobileOpen(false)}>Why Us</a>
        <a href="#reviews" onClick={() => setMobileOpen(false)}>Reviews</a>
        <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
        <a href="#fleet" className="nav__cta" onClick={() => setMobileOpen(false)}>
          Reserve Now
        </a>
      </div>
    </>
  );
}

/* ═════════════════════════════════════════════════
   HERO
   ═════════════════════════════════════════════════ */
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
          <motion.div className="hero__gold-line" variants={fadeUp} />
          <motion.h1 variants={fadeUp}>
            The Art of<br />
            <span>Driving.</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={1}>
            {config.hero.subheadline}
          </motion.p>
        </motion.div>

        <motion.div
          className="hero__form"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="hero__form-title">Book Your Vehicle</div>
          <div className="hero__form-subtitle">Luxury begins at reservation</div>

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
            <label>Vehicle Class</label>
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

/* ═════════════════════════════════════════════════
   FLEET
   ═════════════════════════════════════════════════ */
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
        <motion.p className="section-label" variants={fadeUp}>Our Collection</motion.p>
        <motion.h2 className="section-title" variants={fadeUp}>
          Select Your <span>Vehicle</span>
        </motion.h2>
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
              <div className="fleet__card-divider" />
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

/* ═════════════════════════════════════════════════
   FEATURES
   ═════════════════════════════════════════════════ */
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
          <motion.p className="section-label" variants={fadeUp}>The Difference</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            Why Choose <span>Us</span>
          </motion.h2>
        </div>

        <motion.div className="features__grid" variants={stagger}>
          {config.features.map((feat, i) => {
            const Icon = iconMap[feat.icon] || Globe;
            return (
              <motion.div key={i} className="features__item" variants={fadeUp} custom={i}>
                <div className="features__item-icon">
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

/* ═════════════════════════════════════════════════
   REVIEWS
   ═════════════════════════════════════════════════ */
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
            Guest <span>Experiences</span>
          </motion.h2>
        </div>

        <motion.div className="reviews__grid" variants={stagger}>
          {config.testimonials.map((t, i) => (
            <motion.div key={i} className="reviews__card" variants={fadeUp} custom={i}>
              <div className="reviews__stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#d4a853" stroke="none" />
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

/* ═════════════════════════════════════════════════
   FAQ
   ═════════════════════════════════════════════════ */
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
            Common <span>Questions</span>
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

/* ═════════════════════════════════════════════════
   CTA
   ═════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="cta">
      <div className="cta__content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <motion.div className="gold-line" variants={fadeUp} />
          <motion.h2 className="cta__heading" variants={fadeUp}>
            Ready to<br /><span>Drive?</span>
          </motion.h2>
          <motion.p className="cta__sub" variants={fadeUp} custom={1}>
            Pick up at the airport. Drop off when you're done. Effortless luxury, start to finish.
          </motion.p>
          <motion.a href="#fleet" className="cta__btn" variants={fadeUp} custom={2}>
            Browse Collection <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════
   FOOTER
   ═════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="divider" style={{ marginBottom: '0' }} />

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

/* ═════════════════════════════════════════════════
   APP
   ═════════════════════════════════════════════════ */
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
