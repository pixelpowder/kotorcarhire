import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Fuel,
  Settings,
  Briefcase,
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
  Check,
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

/* ─── icon map ─── */
const iconMap = {
  'map-pin':     MapPin,
  'shield-check': ShieldCheck,
  clock:         Clock,
  ban:           Ban,
  'refresh-cw':  RefreshCw,
  globe:         Globe,
  check:         Check,
  car:           Car,
  phone:         Phone,
  mail:          Mail,
};

/* ─── animation variants ─── */
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

/* ─────────────────────────────────────────────
   NAV
   ───────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
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
        <Car size={22} />
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
      {/* Full-bleed Montenegro scenery */}
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop"
          alt="Montenegro coastline scenery"
          loading="eager"
          fetchpriority="high"
        />
      </div>

      <div className="hero__content">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}
        >
          {/* Eyebrow */}
          <motion.div className="hero__eyebrow" variants={fadeUp}>
            <MapPin size={13} />
            Tivat
            <span className="hero__eyebrow-dot" />
            Podgorica
            <span className="hero__eyebrow-dot" />
            Budva
            <span className="hero__eyebrow-dot" />
            Kotor
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} custom={1}>
            Explore Montenegro<br />
            <em>at your own pace.</em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={fadeUp} custom={2}>
            {config.hero.subheadline}
          </motion.p>

          {/* Booking card anchored at bottom of hero */}
          <motion.div className="hero__booking-wrap" variants={fadeUp} custom={3}>
            <Booking />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BOOKING CARD
   ───────────────────────────────────────────── */
function Booking() {
  return (
    <div className="booking">
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

      <button className="booking__submit">
        <Search size={15} />
        Search Cars
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLEET
   ───────────────────────────────────────────── */
function Fleet() {
  const categories = ['All', ...new Set(config.cars.map((c) => c.category))];
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All'
      ? config.cars.slice(0, 6)
      : config.cars.filter((c) => c.category === active).slice(0, 6);

  return (
    <section className="fleet" id="fleet">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.p className="section-label" variants={fadeUp}>Our Fleet</motion.p>
        <motion.div className="fleet__header" variants={fadeUp}>
          <h2>Choose your<br />perfect ride.</h2>
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
      </motion.div>

      <div className="fleet__grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((car, i) => (
            <motion.div
              key={car.id}
              className="fleet__card"
              initial="hidden"
              animate="visible"
              exit="exit"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              custom={i}
              layout
            >
              <div className="fleet__card-image">
                <img src={car.image} alt={car.name} loading="lazy" />
              </div>
              <div className="fleet__card-body">
                <span className="fleet__card-cat">{car.category}</span>
                <span className="fleet__card-name">{car.name}</span>
                <div className="fleet__card-specs">
                  <span><Users size={13} /> {car.seats}</span>
                  <span><Settings size={13} /> {car.transmission}</span>
                  <span><Fuel size={13} /> {car.fuel}</span>
                  <span><Briefcase size={13} /> {car.luggage}</span>
                </div>
                <div className="fleet__card-footer">
                  <div className="fleet__card-price">
                    &euro;{car.price} <span>/day</span>
                  </div>
                  <button className="fleet__card-book">
                    Book <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURES — numbered steps, warm beige bg
   ───────────────────────────────────────────── */
function Features() {
  return (
    <section className="features" id="features">
      <div className="features__inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p className="section-label" variants={fadeUp}>Why Choose Us</motion.p>
          <motion.div className="features__intro" variants={fadeUp} custom={1}>
            <h2 className="features__title">
              Built for the<br />discerning traveller.
            </h2>
            <p className="features__subtitle">
              Everything you need for a seamless, worry-free drive through Montenegro's mountains, coast, and countryside.
            </p>
          </motion.div>

          <motion.div className="features__grid" variants={stagger}>
            {config.features.map((feat, i) => {
              const Icon = iconMap[feat.icon] || Globe;
              return (
                <motion.div
                  key={i}
                  className="features__item"
                  variants={fadeUp}
                  custom={i}
                >
                  <div className="features__item-number">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="features__item-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3>{feat.title}</h3>
                  <p>{feat.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   REVIEWS
   ───────────────────────────────────────────── */
function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="reviews__inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p className="section-label" variants={fadeUp}>Testimonials</motion.p>
          <motion.h2 className="reviews__title" variants={fadeUp} custom={1}>
            Loved by<br />travellers.
          </motion.h2>

          <motion.div className="reviews__grid" variants={stagger}>
            {config.testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="reviews__card"
                variants={fadeUp}
                custom={i}
              >
                <div className="reviews__stars">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={15} fill="#2d5a27" stroke="none" />
                  ))}
                </div>
                <div className="reviews__quote-mark">&ldquo;</div>
                <p className="reviews__text">{t.text}</p>
                <div className="reviews__author">
                  <div className="reviews__author-name">{t.name}</div>
                  <div className="reviews__author-loc">{t.location}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FAQ — two-column editorial layout
   ───────────────────────────────────────────── */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq" id="faq">
      <div className="faq__inner">
        {/* Aside */}
        <motion.div
          className="faq__aside"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p className="section-label" variants={fadeUp}>FAQ</motion.p>
          <motion.h2 className="faq__title" variants={fadeUp} custom={1}>
            Common<br />questions.
          </motion.h2>
          <motion.p className="faq__desc" variants={fadeUp} custom={2}>
            Can't find what you're looking for? Our team is always happy to help.
          </motion.p>
          <motion.a href={`tel:${config.phone}`} className="faq__contact-link" variants={fadeUp} custom={3}>
            <Phone size={13} />
            Call us directly
          </motion.a>
        </motion.div>

        {/* Accordion */}
        <div className="faq__list">
          {config.faq.map((item, i) => (
            <motion.div
              key={i}
              className="faq__item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
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
      </div>
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
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}
      >
        <motion.h2 className="cta__heading" variants={fadeUp}>
          Ready to explore<br />
          <em>Montenegro?</em>
        </motion.h2>
        <motion.p className="cta__sub" variants={fadeUp} custom={1}>
          Pick up at the airport. Drop off when you're done. It really is that simple.
        </motion.p>
        <motion.a href="#fleet" className="cta__btn" variants={fadeUp} custom={2}>
          Browse Our Fleet <ArrowRight size={16} />
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
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__brand-name">
            Montenegro<span>Car</span>Hire
          </div>
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
                <Phone size={14} />
                {config.phone}
              </div>
            </li>
            <li>
              <div className="footer__contact-item">
                <Mail size={14} />
                {config.email}
              </div>
            </li>
            <li>
              <div className="footer__contact-item">
                <MapPin size={14} />
                {config.address}
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
          <a href="#" aria-label="Website"><Globe size={17} /></a>
          <a href="#" aria-label="Video"><Video size={17} /></a>
          <a href="#" aria-label="Phone"><Phone size={17} /></a>
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
      <Fleet />
      <Features />
      <Reviews />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
