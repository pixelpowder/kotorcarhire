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
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  RefreshCw,
  Car,
  CheckCircle,
  Search,
  Globe,
  Video,
  Calendar,
  Check,
  Ban,
} from 'lucide-react';
import config from './siteConfig';
import './App.css';

/* ── animation presets ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const iconMap = {
  'map-pin':    MapPin,
  'shield-check': ShieldCheck,
  'clock':      Clock,
  'ban':        Ban,
  'refresh-cw': RefreshCw,
  'globe':      Globe,
  'car':        Car,
  'check-circle': CheckCircle,
};

/* ════════════════════════════════════════
   NAV
   ════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav__inner">
        <a href="#" className="nav__logo" aria-label={config.name}>
          Montenegro<span>Car</span>Hire
        </a>

        <ul className="nav__links" role="list">
          <li><a href="#fleet">Fleet</a></li>
          <li><a href="#features">Why Us</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li>
            <a href={`tel:${config.phone}`} className="nav__cta">
              Book Now
            </a>
          </li>
        </ul>

        <button
          className="nav__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}

/* ════════════════════════════════════════
   HERO
   ════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero" aria-label="Hero section">
      {/* Full-bleed background image */}
      <div className="hero__bg" aria-hidden="true">
        <img
          src="https://images.pexels.com/photos/4940742/pexels-photo-4940742.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Montenegro coastal road scenery"
          loading="eager"
        />
      </div>

      <div className="hero__content">
        {/* Headline */}
        <motion.div
          className="hero__headline"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 variants={fadeUp}>
            {config.hero.headline}
          </motion.h1>
          <motion.p variants={fadeUp} custom={1}>
            {config.hero.subheadline}
          </motion.p>
        </motion.div>

        {/* Floating pill search bar */}
        <motion.div
          className="hero__search"
          role="search"
          aria-label="Search cars"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Location */}
          <div className="hero__search-field">
            <MapPin size={18} aria-hidden="true" />
            <div className="hero__search-field-inner">
              <label htmlFor="ys-location">Location</label>
              <select id="ys-location" defaultValue="" aria-label="Pick-up location">
                <option value="" disabled>Where to?</option>
                {config.locations.map((loc) => (
                  <option key={loc.name} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Pick-up date */}
          <div className="hero__search-field">
            <Calendar size={18} aria-hidden="true" />
            <div className="hero__search-field-inner">
              <label htmlFor="ys-pickup">Pick-up</label>
              <input type="date" id="ys-pickup" aria-label="Pick-up date" />
            </div>
          </div>

          {/* Return date */}
          <div className="hero__search-field">
            <Calendar size={18} aria-hidden="true" />
            <div className="hero__search-field-inner">
              <label htmlFor="ys-return">Return</label>
              <input type="date" id="ys-return" aria-label="Return date" />
            </div>
          </div>

          {/* Search button */}
          <button className="hero__search-btn" aria-label="Search available cars">
            <Search size={17} aria-hidden="true" />
            Search
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   STATS BAR
   ════════════════════════════════════════ */
function StatsBar() {
  const stats = [
    { value: '2,400+', label: 'Happy customers' },
    { value: '35+',   label: 'Vehicles in fleet' },
    { value: '4',     label: 'Pickup locations' },
    { value: '4.9',   label: 'Average rating' },
  ];

  return (
    <section className="stats" aria-label="Key statistics">
      <motion.div
        className="stats__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger}
      >
        {stats.map((s, i) => (
          <motion.div key={i} className="stats__item" variants={fadeUp} custom={i}>
            <div className="stats__value">
              {s.value.replace(/[0-9,.]+/, '')}
              <span>{s.value.match(/[0-9,.]+/)?.[0]}</span>
              {s.value.includes('+') ? '+' : ''}
            </div>
            <div className="stats__label">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════
   LOCATIONS
   ════════════════════════════════════════ */
function Locations() {
  return (
    <section className="locations" aria-labelledby="locations-title">
      <motion.div
        className="locations__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger}
      >
        <motion.span className="section-eyebrow" variants={fadeUp}>Where we operate</motion.span>
        <motion.h2 className="section-title" id="locations-title" variants={fadeUp}>
          Popular pickup locations
        </motion.h2>

        <motion.div className="locations__grid" variants={stagger}>
          {config.locations.map((loc, i) => (
            <motion.a
              key={loc.name}
              href="#fleet"
              className="locations__card"
              variants={fadeUp}
              custom={i}
              aria-label={`Browse cars in ${loc.name}`}
            >
              <div className="locations__card-icon" aria-hidden="true">
                <MapPin size={18} />
              </div>
              <div>
                <div className="locations__card-name">{loc.name}</div>
                <div className="locations__card-tag">{loc.tag}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════
   FLEET
   ════════════════════════════════════════ */
function Fleet() {
  const categories = ['All', ...new Set(config.cars.map((c) => c.category))];
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All'
      ? config.cars.slice(0, 6)
      : config.cars.filter((c) => c.category === active).slice(0, 6);

  return (
    <section className="fleet" id="fleet" aria-labelledby="fleet-title">
      <div className="fleet__inner">
        <motion.div
          className="fleet__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <div>
            <motion.span className="section-eyebrow" variants={fadeUp}>Vehicles</motion.span>
            <motion.h2 className="section-title" id="fleet-title" style={{ marginBottom: 0 }} variants={fadeUp}>
              Our fleet
            </motion.h2>
          </div>

          <motion.div className="fleet__filters" role="tablist" aria-label="Filter by category" variants={fadeUp}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`fleet__filter-btn${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
                role="tab"
                aria-selected={active === cat}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="fleet__grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.map((car, i) => (
              <motion.article
                key={car.id}
                className="fleet__card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                aria-label={car.name}
              >
                <div className="fleet__card-img">
                  <img src={car.image} alt={car.name} loading="lazy" />
                  <span className="fleet__card-badge">{car.category}</span>
                </div>

                <div className="fleet__card-body">
                  <div className="fleet__card-name">{car.name}</div>

                  <div className="fleet__card-specs" aria-label="Vehicle specifications">
                    <span className="fleet__card-spec">
                      <Users size={14} aria-hidden="true" /> {car.seats} seats
                    </span>
                    <span className="fleet__card-spec">
                      <Settings size={14} aria-hidden="true" /> {car.transmission}
                    </span>
                    <span className="fleet__card-spec">
                      <Fuel size={14} aria-hidden="true" /> {car.fuel}
                    </span>
                  </div>

                  <div className="fleet__card-footer">
                    <div className="fleet__card-price" aria-label={`Price: €${car.price} per day`}>
                      <span className="fleet__card-price-amount">€{car.price}</span>
                      <span className="fleet__card-price-unit">/day</span>
                    </div>
                    <a href="#" className="fleet__card-book">
                      Book <ChevronRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   FEATURES — alternating 2-col rows
   ════════════════════════════════════════ */
function Features() {
  const featureRows = config.features.slice(0, 4).map((feat, i) => {
    const Icon = iconMap[feat.icon] || ShieldCheck;
    return { ...feat, Icon, reverse: i % 2 !== 0 };
  });

  /* Pick 2 stock images that feel "Montenegro / car rental" */
  const visuals = [
    'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=900',
  ];

  return (
    <section className="features" id="features" aria-labelledby="features-title">
      <div className="features__inner">
        <motion.div
          className="features__intro"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.span className="section-eyebrow" variants={fadeUp}>Why choose us</motion.span>
          <motion.h2 className="section-title" id="features-title" style={{ marginBottom: 0 }} variants={fadeUp}>
            Everything you need,<br />nothing you don't
          </motion.h2>
        </motion.div>

        <div className="features__rows">
          {featureRows.map((feat, i) => (
            <motion.div
              key={i}
              className={`features__row${feat.reverse ? ' reverse' : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
            >
              {/* Text side */}
              <motion.div variants={fadeUp}>
                <div className="features__row-icon-wrap" aria-hidden="true">
                  <feat.Icon size={30} strokeWidth={1.75} />
                </div>
                <h3 className="features__row-title">{feat.title}</h3>
                <p className="features__row-text">{feat.description}</p>
                <ul className="features__row-checklist" aria-label="Key points">
                  {['No hidden fees', 'Full support included', 'Flexible booking'].map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Visual side */}
              <motion.div
                className="features__row-visual"
                variants={fadeUp}
                custom={1}
              >
                <img
                  src={visuals[i]}
                  alt={feat.title}
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   REVIEWS
   ════════════════════════════════════════ */
function Reviews() {
  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="reviews__inner">
        <motion.div
          className="reviews__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.span className="section-eyebrow" variants={fadeUp}>Testimonials</motion.span>
          <motion.h2 className="section-title" id="reviews-title" style={{ marginBottom: 0 }} variants={fadeUp}>
            What drivers say
          </motion.h2>
        </motion.div>

        <motion.div
          className="reviews__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {config.testimonials.map((t, i) => (
            <motion.article
              key={i}
              className="reviews__card"
              variants={fadeUp}
              custom={i}
              aria-label={`Review by ${t.name}`}
            >
              <div className="reviews__stars" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={15} fill="#ff385c" stroke="none" aria-hidden="true" />
                ))}
              </div>

              <p className="reviews__text">"{t.text}"</p>

              <div className="reviews__author">
                <div className="reviews__author-avatar" aria-hidden="true">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="reviews__author-name">{t.name}</div>
                  <div className="reviews__author-loc">{t.location}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   FAQ
   ════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="faq__inner">
        <motion.div
          className="faq__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.span className="section-eyebrow" variants={fadeUp}>FAQ</motion.span>
          <motion.h2 className="section-title" id="faq-title" style={{ marginBottom: 0 }} variants={fadeUp}>
            Common questions
          </motion.h2>
        </motion.div>

        <div role="list">
          {config.faq.map((item, i) => (
            <motion.div
              key={i}
              className="faq__item"
              role="listitem"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className={`faq__question${openIndex === i ? ' open' : ''}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                {item.q}
                <ChevronDown size={20} aria-hidden="true" />
              </button>
              <div
                id={`faq-answer-${i}`}
                className={`faq__answer${openIndex === i ? ' open' : ''}`}
                role="region"
                aria-hidden={openIndex !== i}
              >
                <p>{item.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   CTA BANNER
   ════════════════════════════════════════ */
function CTABanner() {
  return (
    <section className="cta-banner" aria-label="Call to action">
      <motion.div
        className="cta-banner__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <h2 className="cta-banner__title">
            Ready to explore<br /><em>Montenegro?</em>
          </h2>
          <p className="cta-banner__sub">
            Pick up at the airport, drop off when you're done. It really is that simple.
          </p>
        </motion.div>

        <motion.div className="cta-banner__actions" variants={fadeUp} custom={1}>
          <a href="#fleet" className="cta-banner__btn-primary">
            Browse cars <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a href={`tel:${config.phone}`} className="cta-banner__btn-secondary">
            <Phone size={17} aria-hidden="true" /> Call us
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          {/* Brand */}
          <div>
            <div className="footer__brand-logo">
              Montenegro<span>Car</span>Hire
            </div>
            <p className="footer__brand-desc">
              Premium car rentals across Montenegro. Airport pickup, full insurance, zero hassle.
            </p>
          </div>

          {/* Links */}
          <div className="footer__col">
            <h4>Quick links</h4>
            <ul>
              <li><a href="#fleet">Our Fleet</a></li>
              <li><a href="#features">Why Us</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="footer__col">
            <h4>Locations</h4>
            <ul>
              {config.locations.slice(0, 5).map((loc) => (
                <li key={loc.name}>
                  <a href="#fleet">{loc.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li>
                <div className="footer__contact-item">
                  <Phone size={14} aria-hidden="true" />
                  <span>{config.phone}</span>
                </div>
              </li>
              <li>
                <div className="footer__contact-item">
                  <Mail size={14} aria-hidden="true" />
                  <span>{config.email}</span>
                </div>
              </li>
              <li>
                <div className="footer__contact-item">
                  <MapPin size={14} aria-hidden="true" />
                  <span>{config.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
          </span>
          <div className="footer__socials">
            <a href="#" aria-label="Website"><Globe size={16} /></a>
            <a href="#" aria-label="Video"><Video size={16} /></a>
            <a href={`tel:${config.phone}`} aria-label="Phone"><Phone size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════
   APP ROOT
   ════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Locations />
        <Fleet />
        <Features />
        <Reviews />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
