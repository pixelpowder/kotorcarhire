'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';
import RelatedDestinations from '../RelatedDestinations';

export default function Ulcinj() {
  const { t, localePath } = useTranslation();
  const faq = t('ulcinjBody.faq') || [];
  const table = t('ulcinjBody.table') || [];
  const faqSchema = Array.isArray(faq) && faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null;

  return (
    <ContentPage
      title={t('ulcinj.title')}
      subtitle={t('ulcinj.subtitle')}
      description={t('ulcinj.seoDesc')}
      image="/img/pexels-26753897.jpg"
    >
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <h2>{t('ulcinjBody.h1')}</h2>
      <p>{t('ulcinjBody.p1')}</p>
      <p>{t('ulcinjBody.p2')}</p>

      <h2>{t('ulcinjBody.whyRentTitle')}</h2>
      <p>{t('ulcinjBody.whyRentText')}</p>

      <h2>{t('ulcinjBody.pickupTitle')}</h2>
      <p>{t('ulcinjBody.pickupText')}</p>

      <h2>{t('ulcinjBody.fleetTitle')}</h2>
      <p>
        {t('ulcinjBody.fleetText')}{' '}
        <a href={localePath('/cars')}>{t('common.browseFullFleet') || 'Browse the full fleet'}</a>.
      </p>

      <h2>{t('ulcinjBody.beachesTitle')}</h2>
      <p>{t('ulcinjBody.beachesIntro')}</p>
      <ul>
        <li><strong>Velika Plaža:</strong> {t('ulcinjBody.beachVelika')}</li>
        <li><strong>Ada Bojana:</strong> {t('ulcinjBody.beachAda')}</li>
        <li><strong>Mala Plaža:</strong> {t('ulcinjBody.beachMalaPlaza')}</li>
        <li><strong>Valdanos:</strong> {t('ulcinjBody.beachValdanos')}</li>
      </ul>

      <h2>{t('ulcinjBody.landmarksTitle')}</h2>
      <p>{t('ulcinjBody.landmarksText')}</p>

      <h2>{t('ulcinjBody.drivingTitle')}</h2>
      <p>{t('ulcinjBody.drivingText')}</p>

      <h2>{t('ulcinjBody.dayTripsTitle')}</h2>
      <p>{t('ulcinjBody.dayTrip1')}</p>
      <p>{t('ulcinjBody.dayTrip2')}</p>
      <p>
        {t('ulcinjBody.dayTrip3')} {t('ulcinjBody.dayTrip3Prefix')}{' '}
        <a href={localePath('/bar')}>{t('ulcinjBody.dayTrip3Link')}</a> {t('ulcinjBody.dayTrip3Suffix')}
      </p>
      <p>{t('ulcinjBody.dayTrip4')}</p>

      <h2>{t('ulcinjBody.tableTitle')}</h2>
      {Array.isArray(table) && table.length > 1 && (
        <table className="data-table">
          <thead>
            <tr>{table[0].map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {table.slice(1).map((row, i) => (
              <tr key={i}>{row.map((c, j) => <td key={j}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 id="faq">{t('ulcinjBody.faqTitle')}</h2>
      {Array.isArray(faq) && faq.map(({ q, a }, i) => (
        <details key={i} className="faq-item">
          <summary><span className="faq-item__q">{q}</span></summary>
          <p>{a}</p>
        </details>
      ))}

      <RelatedDestinations slugs={['bar', 'budva', 'kotor', 'niksic']} />
    </ContentPage>
  );
}
