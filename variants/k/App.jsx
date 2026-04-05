import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Fuel,
  Settings,
  Briefcase,
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
  Globe2,
  Phone,
  Mail,
  Zap,
  Check,
  Car,
  Shield,
  Globe,
  Calendar,
  CreditCard,
  CheckCircle,
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

/* ─── animation presets ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08 },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ═══════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════ */
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

        <a href="#fleet" className="nav__cta">Book Now</a>

        <button
          className="nav__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {['fleet', 'features', 'reviews', 'faq'].map((id) => (
              <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)}>
                {id === 'features' ? 'Why Us' : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero">
      {/* Top-left: headline */}
      <motion.div
        className="hero__headline"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="hero__label">
          <MapPin /> {config.address}
        </div>
        <h1>
          {config.hero.headline.split(' ').slice(0, 2).join(' ')}{' '}
          <em>{config.hero.headline.split(' ').slice(2, 4).join(' ')}</em>{' '}
          {config.hero.headline.split(' ').slice(4).join(' ')}
        </h1>
      </motion.div>

      {/* Top-right: image */}
      <motion.div
        className="hero__image"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img
          src="https://images.pexels.com/photos/4940742/pexels-photo-4940742.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Montenegro coastline"
        />
      </motion.div>

      {/* Bottom-left: description + stats */}
      <motion.div
        className="hero__description"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
      >
        <p>{config.hero.subheadline}</p>
        <div className="hero__stats">
          <div>
            <div className="hero__stat-number">500+</div>
            <div className="hero__stat-label">Happy Drivers</div>
          </div>
          <div>
            <div className="hero__stat-number">8</div>
            <div className="hero__stat-label">Vehicle Models</div>
          </div>
          <div>
            <div className="hero__stat-number">6</div>
            <div className="hero__stat-label">Pickup Locations</div>
          </div>
        </div>
      </motion.div>

      {/* Bottom-right: booking form */}
      <motion.div
        className="hero__booking"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={3}
      >
        <h3>Quick Booking</h3>
        <div className="hero__booking-fields">
          <div className="hero__booking-field full-width">
            <label>Pickup Location</label>
            <select defaultValue="">
              <option value="" disabled>Select location</option>
              {config.locations.map((loc) => (
                <option key={loc.name} value={loc.name}>{loc.name}</option>
              ))}
            </select>
          </div>
          <div className="hero__booking-field">
            <label>Pick-up Date</label>
            <input type="date" />
          </div>
          <div className="hero__booking-field">
            <label>Return Date</label>
            <input type="date" />
          </div>
          <button className="hero__booking-btn">
            <Search size={18} /> Search Available Cars
          </button>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FLEET
   ═══════════════════════════════════════════ */
function Fleet() {
  const categories = ['All', ...new Set(config.cars.map((c) => c.category))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? config.cars
    : config.cars.filter((c) => c.category === active);

  return (
    <section id="fleet" className="section section--gray">
      <div className="section__inner">
        <div className="section__header">
          <div className="section__eyebrow">Our Fleet</div>
          <h2 className="section__title">Choose Your Perfect Ride</h2>
          <p className="section__subtitle">
            From compact city cars to premium SUVs, find the ideal vehicle for your Montenegrin adventure.
          </p>
        </div>

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

        <motion.div
          className="fleet__masonry"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((car, i) => (
              <FleetCard key={car.id} car={car} index={i} wide={car.popular} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function FleetCard({ car, index, wide }) {
  return (
    <motion.div
      className={`fleet__card ${wide ? 'fleet__card--wide' : ''}`}
      variants={fadeUp}
      custom={index}
      layout
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div className="fleet__card-img">
        <img src={car.image} alt={car.name} loading="lazy" />
        {car.popular && <div className="fleet__card-badge">Popular</div>}
      </div>
      <div className="fleet__card-body">
        <div className="fleet__card-category">{car.category}</div>
        <h3 className="fleet__card-name">{car.name}</h3>
        <div className="fleet__card-specs">
          <span className="fleet__card-spec"><Users size={15} /> {car.seats}</span>
          <span className="fleet__card-spec"><Settings size={15} /> {car.transmission}</span>
          <span className="fleet__card-spec"><Fuel size={15} /> {car.fuel}</span>
          <span className="fleet__card-spec"><Briefcase size={15} /> {car.luggage} bags</span>
        </div>
        <div className="fleet__card-footer">
          <div className="fleet__card-price">
            &euro;{car.price} <span>/day</span>
          </div>
          <button className="fleet__card-book">
            Book Now <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   FEATURES
   ═══════════════════════════════════════════ */
function Features() {
  return (
    <section id="features" className="section">
      <div className="section__header">
        <div className="section__eyebrow">Why Choose Us</div>
        <h2 className="section__title">Six Reasons to Drive with Us</h2>
        <p className="section__subtitle">
          Transparent pricing, premium service, and the freedom to explore every corner of Montenegro.
        </p>
      </div>

      <motion.div
        className="features__grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {config.features.map((feat, i) => {
          const Icon = iconMap[feat.icon] || CheckCircle;
          return (
            <motion.div key={i} className="features__item" variants={fadeUp} custom={i}>
              <div className="features__number">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="features__content">
                <div className="features__icon">
                  <Icon size={20} />
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   REVIEWS
   ═══════════════════════════════════════════ */
function Reviews() {
  return (
    <section id="reviews" className="section section--gray">
      <div className="section__inner">
        <div className="section__header section__header--center">
          <div className="section__eyebrow">Testimonials</div>
          <h2 className="section__title">What Our Guests Say</h2>
          <p className="section__subtitle">
            Real stories from travellers who explored Montenegro with our cars.
          </p>
        </div>

        <motion.div
          className="reviews__grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {config.testimonials.map((review, i) => (
            <motion.div
              key={i}
              className={`reviews__card ${i === 0 ? 'reviews__card--featured' : ''}`}
              variants={fadeUp}
              custom={i}
            >
              <div className="reviews__pullquote">&ldquo;</div>
              <div className="reviews__stars">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={16} />
                ))}
              </div>
              <p className="reviews__text">{review.text}</p>
              <div className="reviews__author">
                <div className="reviews__avatar">
                  {review.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="reviews__author-info">
                  <h4>{review.name}</h4>
                  <p>{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════ */
function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq__item">
      <button
        className={`faq__question ${open ? 'faq__question--open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        {item.q}
        <ChevronDown />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="faq__answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="faq__layout">
        <div className="faq__intro">
          <div className="section__eyebrow">FAQ</div>
          <h2 className="section__title">Common Questions</h2>
          <p className="section__subtitle">
            Everything you need to know before renting a car in Montenegro.
          </p>
        </div>
        <div className="faq__list">
          {config.faq.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════ */
function CTA() {
  return (
    <section className="cta">
      <motion.div
        className="cta__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
      >
        <div className="cta__text">
          <h2>
            Ready to <em>Explore</em> Montenegro?
          </h2>
          <p>
            Book your car in under two minutes. Free cancellation, full insurance,
            and airport pickup included with every rental.
          </p>
        </div>
        <div className="cta__actions">
          <a href="#fleet" className="cta__btn cta__btn--primary">
            Browse Our Fleet <ArrowRight size={18} />
          </a>
          <a href={`tel:${config.phone}`} className="cta__btn cta__btn--outline">
            <Phone size={18} /> {config.phone}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <h3>Montenegro<span>Car</span>Hire</h3>
          <p>
            Premium car rentals across Montenegro. Airport pickup, full insurance, and the freedom to explore at your own pace.
          </p>
          <div className="footer__contact-item">
            <Phone size={16} /> {config.phone}
          </div>
          <div className="footer__contact-item">
            <Mail size={16} /> {config.email}
          </div>
          <div className="footer__contact-item">
            <MapPin size={16} /> {config.address}
          </div>
        </div>

        <div className="footer__col">
          <h4>Fleet</h4>
          {config.cars.slice(0, 5).map((car) => (
            <a key={car.id} href="#fleet">{car.name}</a>
          ))}
        </div>

        <div className="footer__col">
          <h4>Locations</h4>
          {config.locations.map((loc) => (
            <a key={loc.name} href="#fleet">{loc.name}</a>
          ))}
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <a href="#features">Why Choose Us</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
          <a href={`mailto:${config.email}`}>Contact</a>
        </div>
      </div>

      <div className="footer__bottom">
        <span>&copy; {new Date().getFullYear()} {config.name}. All rights reserved.</span>
        <span>{config.domain}</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
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
