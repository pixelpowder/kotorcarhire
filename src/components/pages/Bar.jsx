'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';
import RelatedDestinations from '../RelatedDestinations';

export default function Bar() {
  const { t, localePath } = useTranslation();
  const faq = t('barBody.faq') || [];
  const table = t('barBody.table') || [];
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
      title={t('bar.title')}
      subtitle={t('bar.subtitle')}
      description={t('bar.seoDesc')}
      image="/img/pexels-28674522.jpg"
    >
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <h2>{t('barBody.h1')}</h2>
      <p>{t('barBody.p1')}</p>
      <p>{t('barBody.p2')}</p>

      <h2>{t('barBody.whyRentTitle')}</h2>
      <p>{t('barBody.whyRentText')}</p>

      <h2>{t('barBody.pickupTitle')}</h2>
      <p>{t('barBody.pickupText')}</p>

      <h2>{t('barBody.fleetTitle')}</h2>
      <p>
        {t('barBody.fleetText')}{' '}
        <a href={localePath('/cars')}>{t('barBody.fleetLink')}</a>.
      </p>

      <h2>{t('barBody.landmarksTitle')}</h2>
      <p>{t('barBody.landmarksText')}</p>

      <h2>{t('barBody.oliveTitle')}</h2>
      <p>{t('barBody.oliveText')}</p>

      <h2>{t('barBody.ferryTitle')}</h2>
      <p>{t('barBody.ferryText')}</p>

      <h2>{t('barBody.drivingTitle')}</h2>
      <p>{t('barBody.drivingText')}</p>

      <h2>{t('barBody.dayTripsTitle')}</h2>
      <p>{t('barBody.dayTrip1')}</p>
      <p>{t('barBody.dayTrip2')}</p>
      <p>
        {t('barBody.dayTrip3')} {t('barBody.dayTrip3Prefix')}{' '}
        <a href={localePath('/ulcinj')}>{t('barBody.dayTrip3Link')}</a>{t('barBody.dayTrip3Suffix')}
      </p>
      <p>{t('barBody.dayTrip4')}</p>

      <h2>{t('barBody.tableTitle')}</h2>
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

      <h2 id="faq">{t('barBody.faqTitle')}</h2>
      {Array.isArray(faq) && faq.map(({ q, a }, i) => (
        <details key={i} className="faq-item">
          <summary><span className="faq-item__q">{q}</span></summary>
          <p>{a}</p>
        </details>
      ))}

      <RelatedDestinations slugs={['ulcinj', 'budva', 'niksic', 'podgorica']} />
    </ContentPage>
  );
}
