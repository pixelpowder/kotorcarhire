'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';

export default function TivatAirport() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage title={t("tivat-airport.title")} subtitle={t("tivat-airport.subtitle")} description={t("tivat-airport.seoDesc")} image="/img/tivat-airport.webp">
      <img src="/img/pexels-28609588.jpg" alt={t('imageAlts.tivatAirportRunway')} loading="lazy" />
      <h2>{t('tivatAirportBody.h1')}</h2>
      <p>{t('tivatAirportBody.p1')}</p>
      <p>{t('tivatAirportBody.p2')}</p>
      <h2>{t('tivatAirportBody.distancesTitle')}</h2>
      <ul>
        <li>{t('tivatAirportBody.dist1')}</li>
        <li>{t('tivatAirportBody.dist2')}</li>
        <li>{t('tivatAirportBody.dist3')}</li>
        <li>{t('tivatAirportBody.dist4')}</li>
      </ul>
      <h2>{t('tivatAirportBody.facilitiesTitle')}</h2>
      <p>{t('tivatAirportBody.facilitiesText')}</p>
      <h2>{t('tivatAirportBody.whyTitle')}</h2>
      <p>{t('tivatAirportBody.whyText')} <a href={localePath('/budva')}>{t('tivatAirportBody.budvaLinkText')}</a> {t('tivatAirportBody.budvaLinkAfter')}</p>
      <p>{t('tivatAirportBody.meetText')}</p>
    </ContentPage>
  );
}
