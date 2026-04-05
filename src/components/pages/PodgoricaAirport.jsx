'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';
export default function PodgoricaAirport() {
  const { t } = useTranslation();
  return (
    <ContentPage title={t("podgorica-airport.title")} subtitle={t("podgorica-airport.subtitle")} description={t("podgorica-airport.seoDesc")} image="/img/pexels-9526645.jpg">
      <img src="/img/pexels-4264818.jpg" alt="Podgorica" loading="lazy" />
      <h2>{t('podgoricaAirportBody.h1')}</h2>
      <p>{t('podgoricaAirportBody.p1')}</p>
      <p>{t('podgoricaAirportBody.p2')}</p>
      <h2>{t('podgoricaAirportBody.distancesTitle')}</h2>
      <p>{t('podgoricaAirportBody.distIntro')}</p>
      <ul><li>{t('podgoricaAirportBody.dist1')}</li><li>{t('podgoricaAirportBody.dist2')}</li><li>{t('podgoricaAirportBody.dist3')}</li><li>{t('podgoricaAirportBody.dist4')}</li></ul>
      <h2>{t('podgoricaAirportBody.flightsTitle')}</h2>
      <p>{t('podgoricaAirportBody.flightsText')}</p>
      <h2>{t('podgoricaAirportBody.facilitiesTitle')}</h2>
      <p>{t('podgoricaAirportBody.facilitiesText')}</p>
      <p>{t('podgoricaAirportBody.awardText')}</p>
      <h2>{t('podgoricaAirportBody.rentalTitle')}</h2>
      <p>{t('podgoricaAirportBody.rentalText')}</p>
    </ContentPage>
  );
}