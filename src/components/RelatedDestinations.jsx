'use client';
import useTranslation from '../i18n/useTranslation';
import config from '../siteConfig';

export default function RelatedDestinations({ slugs, title }) {
  const { t, localePath } = useTranslation();
  const cards = slugs
    .map(slug => config.destinations.find(d => d.slug === slug))
    .filter(Boolean);

  if (cards.length === 0) return null;

  return (
    <section className="related-dests">
      {title !== false && (
        <h2 className="related-dests__title">{title || (t('destCards.relatedTitle') !== 'destCards.relatedTitle' ? t('destCards.relatedTitle') : 'Related destinations')}</h2>
      )}
      <div className="related-dests__grid">
        {cards.map(dest => (
          (() => {
            const dt = (k, fb) => { const v = t(`destCards.${dest.slug}.${k}`); return v && v !== `destCards.${dest.slug}.${k}` ? v : fb; };
            return (
              <a
                key={dest.slug}
                href={localePath(`/${dest.slug}`)}
                className="related-dest-card"
              >
                <div
                  className="related-dest-card__img"
                  style={{ backgroundImage: `url(${dest.image})` }}
                  role="img"
                  aria-label={dt('name', dest.name)}
                />
                <div className="related-dest-card__body">
                  <span className="related-dest-card__tag">{dt('tag', dest.tag)}</span>
                  <h3 className="related-dest-card__name">{dt('name', dest.name)}</h3>
                  <p className="related-dest-card__desc">{dt('desc', dest.desc)}</p>
                </div>
              </a>
            );
          })()
        ))}
      </div>
    </section>
  );
}
