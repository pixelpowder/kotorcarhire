'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';

export default function DubrovnikAirport() {
  const { t } = useTranslation();
  return (
    <ContentPage
      title={t("dubrovnik-airport.title")}
      subtitle={t("dubrovnik-airport.subtitle")}
      description={t("dubrovnik-airport.seoDesc")}
      image="/img/pexels-30006498.jpg"
    >
      <img src="/img/pexels-12049132.jpg" alt="Dubrovnik aerial view" loading="lazy" />
      <h2>{t('dubrovnikAirportBody.h1')}</h2>
      <p>{t('dubrovnikAirportBody.p1')}</p>
      <p>{t('dubrovnikAirportBody.p2')}</p>
      <p>{t('dubrovnikAirportBody.p3')}</p>
      <h2>{t('dubrovnikAirportBody.borderTitle')}</h2>
      <p>{t('dubrovnikAirportBody.borderText')}</p>
      <h2>{t('dubrovnikAirportBody.facilitiesTitle')}</h2>
      <p>{t('dubrovnikAirportBody.facilitiesText1')}</p>
      <p>{t('dubrovnikAirportBody.facilitiesText2')}</p>
      <img src="/img/pexels-30238159.jpg" alt="Dubrovnik historic harbour" loading="lazy" />
      <h2>{t('dubrovnikAirportBody.gettingTitle')}</h2>
      <p>{t('dubrovnikAirportBody.gettingText1')}</p>
      <p>{t('dubrovnikAirportBody.gettingText2')}</p>
    </ContentPage>
  );
}
