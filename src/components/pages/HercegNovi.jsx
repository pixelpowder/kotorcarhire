'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';
import RelatedDestinations from '../RelatedDestinations';

export default function HercegNovi() {
  const { t, localePath } = useTranslation();
  const faq = t('hercegNoviBody.faq') || [];
  const table = t('hercegNoviBody.table') || [];
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
      title={t('herceg-novi.title')}
      subtitle={t('herceg-novi.subtitle')}
      description={t('herceg-novi.seoDesc')}
      image="/img/pexels-29071814.jpg"
    >
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <h2>{t('hercegNoviBody.h1')}</h2>
      <p>{t('hercegNoviBody.p1')}</p>
      <p>{t('hercegNoviBody.p2')}</p>

      <h2>{t('hercegNoviBody.whyRentTitle')}</h2>
      <p>{t('hercegNoviBody.whyRentText')}</p>

      <h2>{t('hercegNoviBody.pickupTitle')}</h2>
      <p>{t('hercegNoviBody.pickupText')}</p>

      <h2>{t('hercegNoviBody.fleetTitle')}</h2>
      <p>
        {t('hercegNoviBody.fleetText')}{' '}
        <a href={localePath('/cars')}>{t('hercegNoviBody.fleetLink')}</a>.
      </p>

      <h2>{t('hercegNoviBody.beachesTitle')}</h2>
      <p>{t('hercegNoviBody.beachesIntro')}</p>
      <ul>
        <li><strong>Mirište:</strong> {t('hercegNoviBody.beachMirista')}</li>
        <li><strong>Rose:</strong> {t('hercegNoviBody.beachRose')}</li>
        <li><strong>Žanjic:</strong> {t('hercegNoviBody.beachZanjic')}</li>
        <li><strong>Igalo:</strong> {t('hercegNoviBody.beachIgalo')}</li>
      </ul>

      <h2>{t('hercegNoviBody.landmarksTitle')}</h2>
      <p>{t('hercegNoviBody.landmarksText')}</p>

      <h2>{t('hercegNoviBody.drivingTitle')}</h2>
      <p>{t('hercegNoviBody.drivingText')}</p>

      <h2>{t('hercegNoviBody.dayTripsTitle')}</h2>
      <p>
        {t('hercegNoviBody.dayTrip1')} {t('hercegNoviBody.dayTrip1Prefix')}{' '}
        <a href={localePath('/perast')}>{t('hercegNoviBody.dayTrip1Link')}</a> {t('hercegNoviBody.dayTrip1Suffix')}
      </p>
      <p>{t('hercegNoviBody.dayTrip2')}</p>
      <p>{t('hercegNoviBody.dayTrip3')}</p>
      <p>{t('hercegNoviBody.dayTrip4')}</p>

      <h2>{t('hercegNoviBody.tableTitle')}</h2>
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

      <h2 id="faq">{t('hercegNoviBody.faqTitle')}</h2>
      {Array.isArray(faq) && faq.map(({ q, a }, i) => (
        <details key={i} className="faq-item">
          <summary><span className="faq-item__q">{q}</span></summary>
          <p>{a}</p>
        </details>
      ))}

      <RelatedDestinations slugs={['kotor', 'perast', 'dubrovnik-airport', 'tivat']} />
    </ContentPage>
  );
}
