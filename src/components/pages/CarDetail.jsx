'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';
import config from '../../siteConfig';
import { carArticles as carArticlesEn } from '../../data/carArticles';
import { carArticles as carArticlesDe } from '../../data/carArticles.de';
import { carArticles as carArticlesRu } from '../../data/carArticles.ru';
import { carArticles as carArticlesIt } from '../../data/carArticles.it';
import { carArticles as carArticlesFr } from '../../data/carArticles.fr';
import { carArticles as carArticlesMe } from '../../data/carArticles.me';
import { carImages } from '../../data/carImages';
import { FLEET_SLUG_TO_CAR_IDS } from '../../data/fleetCars';
import CarGallery from '../CarGallery';

const CAR_ARTICLES_BY_LANG = {
  en: carArticlesEn,
  de: carArticlesDe,
  ru: carArticlesRu,
  it: carArticlesIt,
  fr: carArticlesFr,
  me: carArticlesMe,
};
import {
  Users, Fuel, Settings, Briefcase, CheckCircle, ArrowRight,
  Droplet, Package,
} from 'lucide-react';

// Per-car inline Kotor-road photo, chosen to fit each car's character.
const INLINE_PHOTOS = {
  'vw-polo':      { src: '/img/fleet-inline/village-trees.jpg' },
  'fiat-500':     { src: '/img/fleet-inline/seashore-hills.jpg' },
  'peugeot-208':  { src: '/img/fleet-inline/road-mountains.jpg' },
  'citroen-c3':   { src: '/img/fleet-inline/seaside-road.jpg' },
  'toyota-yaris': { src: '/img/fleet-inline/kotor-bay.jpg' },
  'kia-stonic':   { src: '/img/fleet-inline/rocky-road.jpg' },
  'vw-golf':      { src: '/img/fleet-inline/forest-road.jpg' },
  _default:       { src: '/img/fleet-inline/sunset-montenegro.jpg' },
};

// Related image-link cards at the end of each car detail page, pointed
// at actual kotorcarhire routes only (kotor, perast, tivat-airport,
// dubrovnik-airport, and the existing blog posts).
const RELATED = {
  'vw-polo': [
    { href: '/kotor',                              img: '/img/kotor-old-town.webp',         titleKey: 'kotor' },
    { href: '/perast',                             img: '/img/perast-village.webp',         titleKey: 'perast' },
    { href: '/tivat-airport',                      img: '/img/tivat-airport.webp',          titleKey: 'tivatAirport' },
  ],
  'fiat-500': [
    { href: '/kotor',                              img: '/img/kotor-old-town.webp',         titleKey: 'kotor' },
    { href: '/perast',                             img: '/img/perast-village.webp',         titleKey: 'perast' },
    { href: '/blog/kotor-photography-spots',       img: '/img/blog-kotor-photo.webp',       titleKey: 'kotorPhoto' },
  ],
  'peugeot-208': [
    { href: '/blog/kotor-to-lovcen-drive',         img: '/img/blog-lovcen-road.webp',       titleKey: 'lovcenDrive' },
    { href: '/kotor',                              img: '/img/kotor-old-town.webp',         titleKey: 'kotor' },
    { href: '/perast',                             img: '/img/perast-village.webp',         titleKey: 'perast' },
  ],
  'citroen-c3': [
    { href: '/blog/risan-mosaics-drive',           img: '/img/blog-risan-mosaics.webp',     titleKey: 'risanMosaics' },
    { href: '/perast',                             img: '/img/perast-village.webp',         titleKey: 'perast' },
    { href: '/kotor',                              img: '/img/kotor-old-town.webp',         titleKey: 'kotor' },
  ],
  'toyota-yaris': [
    { href: '/blog/bay-of-kotor-boat-day',         img: '/img/blog-bay-boat.webp',          titleKey: 'bayBoat' },
    { href: '/blog/kotor-cruise-shore-excursion',  img: '/img/blog-cruise-port.webp',       titleKey: 'cruiseShore' },
    { href: '/kotor',                              img: '/img/kotor-old-town.webp',         titleKey: 'kotor' },
  ],
  'kia-stonic': [
    { href: '/blog/kotor-to-lovcen-drive',         img: '/img/blog-lovcen-hairpins.webp',   titleKey: 'lovcen' },
    { href: '/blog/risan-mosaics-drive',           img: '/img/blog-risan-mosaics.webp',     titleKey: 'risanMosaics' },
    { href: '/perast',                             img: '/img/perast-village.webp',         titleKey: 'perast' },
  ],
  'vw-golf': [
    { href: '/blog/kotor-to-lovcen-drive',         img: '/img/blog-lovcen-road.webp',       titleKey: 'lovcenDrive' },
    { href: '/dubrovnik-airport',                  img: '/img/dubrovnik-nearby.webp',       titleKey: 'dubrovnikAirport' },
    { href: '/budva',                              img: '/img/budva-from-kotor.webp',       titleKey: 'budva' },
  ],
};

// One inline link per article, injected mid-paragraph. `paraIndex` is 0-based.
const ARTICLE_LINKS = {
  'vw-polo':      { paraIndex: 1, candidates: ['bay road to Perast', 'Perast', 'Tabacina'],            href: '/perast' },
  'fiat-500':     { paraIndex: 1, candidates: ['Perast', 'Sea Gate', 'Stoliv'],                        href: '/perast' },
  'peugeot-208':  { paraIndex: 1, candidates: ['Lovćen', 'hairpins', 'Austrian route'],                href: '/blog/kotor-to-lovcen-drive' },
  'citroen-c3':   { paraIndex: 1, candidates: ['Risan', 'Kamenari', 'Morinj'],                         href: '/blog/risan-mosaics-drive' },
  'toyota-yaris': { paraIndex: 1, candidates: ['Perast', 'Škaljari', 'Kotor port'],                    href: '/blog/bay-of-kotor-boat-day' },
  'kia-stonic':   { paraIndex: 1, candidates: ['Njeguši', 'Krstac', 'Banja'],                          href: '/blog/kotor-to-lovcen-drive' },
  'vw-golf':      { paraIndex: 1, candidates: ['Lovćen', 'Vrmac tunnel', 'Sozina'],                    href: '/blog/kotor-to-lovcen-drive' },
};

function renderParagraphWithLink(paragraph, rule, localePath, linkLabel) {
  if (!rule) return paragraph;
  for (const phrase of rule.candidates) {
    const idx = paragraph.indexOf(phrase);
    if (idx === -1) continue;
    const before = paragraph.slice(0, idx);
    const linkText = paragraph.slice(idx, idx + phrase.length);
    const after = paragraph.slice(idx + phrase.length);
    return (
      <>
        {before}
        <a href={localePath(rule.href)} title={linkLabel}>{linkText}</a>
        {after}
      </>
    );
  }
  return paragraph;
}

export default function CarDetail({ slug }) {
  const { t, lang, localePath } = useTranslation();
  const localisedArticles = CAR_ARTICLES_BY_LANG[lang] || CAR_ARTICLES_BY_LANG.en;
  const carArticles = localisedArticles[slug] ? localisedArticles : CAR_ARTICLES_BY_LANG.en;
  const car = config.cars.find(c => c.slug === slug);
  if (!car) return null;

  const k = (sub) => `cars.${slug}.${sub}`;
  const tk = (sub, fallback) => {
    const val = t(k(sub));
    return val && val !== k(sub) ? val : fallback;
  };
  const tf = (key, fallback) => {
    const val = t(key);
    return val && val !== key ? val : fallback;
  };

  const name = tk('name', car.name);
  const tagline = tk('tagline', car.tagline);
  const lede = tk('lede', car.lede);
  const suitability = tk('suitability', car.suitability);
  const regional = tk('regional', car.regional);
  const category = tk('category', car.category);
  const details = car.details || {};

  const idx = config.cars.findIndex(c => c.slug === slug);
  const next = config.cars[(idx + 1) % config.cars.length];

  const toMpg = (consumption) => {
    if (!consumption) return null;
    const m = consumption.match(/([\d.]+)\s*L\/100/);
    if (!m) return null;
    const l100 = parseFloat(m[1]);
    if (!l100) return null;
    return `${Math.round(282.48 / l100)} mpg`;
  };
  const mpg = toMpg(details.consumption);

  const quickRow = [
    { icon: <Users size={16} />,     label: tf('carSpecs.seats', 'Seats'),           value: car.seats },
    { icon: <Settings size={16} />,  label: tf('carSpecs.transmission', 'Gearbox'),  value: car.transmission },
    { icon: <Fuel size={16} />,      label: tf('carSpecs.fuel', 'Fuel'),             value: car.fuel },
    { icon: <Briefcase size={16} />, label: tf('carSpecs.luggage', 'Luggage'),       value: `${car.luggage} bags` },
    { icon: <Package size={16} />,   label: tf('carSpecs.bootSize', 'Boot'),         value: details.bootSize },
    { icon: <Droplet size={16} />,   label: tf('carSpecs.mpg', 'Economy'),           value: mpg || details.consumption },
  ].filter(r => r.value);
  const detailRow = [];

  return (
    <ContentPage
      title={name}
      subtitle={tagline}
      description={suitability}
      image={car.image}
      heroPosition="center"
      bookingHref={FLEET_SLUG_TO_CAR_IDS[slug] ? `/book?model=${slug}` : '/book'}
      bookingLabelKey="common.bookNow"
    >
      <div className="car-detail-hero-card">
        <div className="car-detail-category-tag">{category}</div>
        <p className="car-detail-lede">{lede}</p>
      </div>

      <CarGallery images={carImages[slug] || [car.image]} alt={name} />

      <h2>{tf('cars.overviewTitle', 'At a glance')}</h2>
      <div className="car-detail-specs car-detail-specs--quick">
        {quickRow.map((s) => (
          <div key={s.label} className="car-detail-spec">
            <div className="car-detail-spec__icon">{s.icon}</div>
            <div className="car-detail-spec__label">{s.label}</div>
            <div className="car-detail-spec__value">{s.value}</div>
          </div>
        ))}
      </div>

      <h2>{tf('cars.whoForTitle', `Who is the ${car.name} for?`)}</h2>
      <p>{suitability}</p>
      {Array.isArray(car.bestFor) && (
        <ul className="car-detail-bestfor">
          {car.bestFor.map((b, i) => (
            <li key={i}><CheckCircle size={14} /> {tk(`bestFor.${i}`, b)}</li>
          ))}
        </ul>
      )}

      <div className="car-detail-regional">
        <h2>{tf('cars.regionalTitle', 'Best regional use')}</h2>
        <p>{regional}</p>
      </div>

      {carArticles[slug] && (
        <div className="car-detail-article">
          <h2>{tf('cars.articleTitle', `The ${car.name} around the Bay of Kotor`)}</h2>
          {carArticles[slug].paragraphs.map((para, i) => {
            const rule = ARTICLE_LINKS[slug];
            const applyRuleHere = rule && rule.paraIndex === i;
            const sectionKeys = [
              'behindWheel', 'onRoads', 'spaceLoad', 'bestFor', 'practical', 'verdict',
            ];
            const sectionFallbacks = [
              'Behind the wheel',
              'On Kotor roads',
              'Space and load',
              'Best journeys for this car',
              'Practical notes',
              'The verdict',
            ];
            return (
              <>
                <section key={i} className="car-detail-article__section">
                  <h3>{tf(`cars.sections.${sectionKeys[i]}`, sectionFallbacks[i])}</h3>
                  <p>{applyRuleHere ? renderParagraphWithLink(para, rule, localePath, car.name) : para}</p>
                </section>
                {i === 2 && (() => {
                  const inline = INLINE_PHOTOS[slug] || INLINE_PHOTOS._default;
                    const inlineAlt = tf(`carInline.${slug}.alt`, '');
                    const inlineCaption = tf(`carInline.${slug}.caption`, '');
                    return (
                    <figure key={`inline-${i}`} className="car-detail-article__figure">
                      <img src={inline.src} alt={inlineAlt} loading="lazy" />
                      <figcaption>{inlineCaption}</figcaption>
                    </figure>
                  );
                })()}
              </>
            );
          })}
        </div>
      )}

      <h2>{tf('cars.featuresTitle', 'Inside the car')}</h2>
      <ul className="car-detail-feature-list">
        {car.features.map((f, i) => {
          const translated = tk(`features.${i}`, f);
          return <li key={i}><CheckCircle size={14} /> {translated}</li>;
        })}
      </ul>

      <div className="car-detail-cta">
        <a
          href={localePath(FLEET_SLUG_TO_CAR_IDS[slug] ? `/book?model=${slug}` : '/book')}
          className="car-detail-cta__btn"
        >
          {tf('cars.checkAvailability', 'Check availability & live pricing')} <ArrowRight size={16} />
        </a>
        <a href={localePath(`/cars/${next.slug}`)} className="car-detail-cta__next">
          {tf('cars.nextBtn', `Next in fleet: ${next.name}`)} →
        </a>
      </div>

      {RELATED[slug] && (
        <div className="car-detail-related">
          <h2>{tf('cars.relatedTitle', 'Where this car takes you')}</h2>
          <div className="car-detail-related__grid">
            {RELATED[slug].map((card) => (
              <a key={card.href} href={localePath(card.href)} className="car-detail-related__card">
                <div className="car-detail-related__img" style={{ backgroundImage: `url(${card.img})` }} />
                <div className="car-detail-related__body">
                  <span className="car-detail-related__title">{tf(`carRelated.${card.titleKey}`, card.titleKey)}</span>
                  <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </ContentPage>
  );
}
