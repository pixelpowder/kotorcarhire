'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';
import RelatedDestinations from '../RelatedDestinations';

export default function Niksic() {
  const { t, localePath } = useTranslation();
  const faq = t('niksicBody.faq') || [];
  const table = t('niksicBody.table') || [];
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
      title={t('niksic.title')}
      subtitle={t('niksic.subtitle')}
      description={t('niksic.seoDesc')}
      image="/img/pexels-9526645.jpg"
    >
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <h2>{t('niksicBody.h1')}</h2>
      <p>{t('niksicBody.p1')}</p>
      <p>{t('niksicBody.p2')}</p>

      <h2>{t('niksicBody.whyRentTitle')}</h2>
      <p>{t('niksicBody.whyRentText')}</p>

      <h2>{t('niksicBody.pickupTitle')}</h2>
      <p>{t('niksicBody.pickupText')}</p>

      <h2>{t('niksicBody.fleetTitle')}</h2>
      <p>
        {t('niksicBody.fleetText')}{' '}
        <a href={localePath('/cars')}>{t('niksicBody.fleetLink')}</a>.
      </p>

      <h2>{t('niksicBody.landmarksTitle')}</h2>
      <p>{t('niksicBody.landmarksText')}</p>

      <h2>{t('niksicBody.lakesTitle')}</h2>
      <p>{t('niksicBody.lakesText')}</p>

      <h2>{t('niksicBody.drivingTitle')}</h2>
      <p>{t('niksicBody.drivingText')}</p>

      <h2>{t('niksicBody.dayTripsTitle')}</h2>
      <p>{t('niksicBody.dayTrip1')}</p>
      <p>
        {t('niksicBody.dayTrip2')} {t('niksicBody.parksSeeOurPrefix')}{' '}
        <a href={localePath('/blog/kotor-to-lovcen-drive')}>{t('niksicBody.parksLink')}</a>{' '}
        {t('niksicBody.parksSuffix')}
      </p>
      <p>{t('niksicBody.dayTrip3')}</p>
      <p>
        {t('niksicBody.dayTrip4')} {t('niksicBody.taraAlsoSeePrefix')}{' '}
        <a href={localePath('/blog/risan-mosaics-drive')}>{t('niksicBody.taraLink')}</a>.
      </p>

      <h2>{t('niksicBody.tableTitle')}</h2>
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

      <h2 id="faq">{t('niksicBody.faqTitle')}</h2>
      {Array.isArray(faq) && faq.map(({ q, a }, i) => (
        <details key={i} className="faq-item">
          <summary><span className="faq-item__q">{q}</span></summary>
          <p>{a}</p>
        </details>
      ))}

      <RelatedDestinations slugs={['podgorica', 'kotor', 'budva', 'herceg-novi']} />
    </ContentPage>
  );
}
