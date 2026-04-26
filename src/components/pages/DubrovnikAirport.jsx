'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';

export default function DubrovnikAirport() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage
      title={t("dubrovnik-airport.title")}
      subtitle={t("dubrovnik-airport.subtitle")}
      description={t("dubrovnik-airport.seoDesc")}
      image="/img/tivat-airport.webp"
    >
      <img src="/img/pexels-12049132.jpg" alt={t('imageAlts.dubrovnikAerial')} loading="lazy" />
      <h2>{t('dubrovnikAirportBody.h1')}</h2>
      <p>{t('dubrovnikAirportBody.p1')}</p>
      <p>{t('dubrovnikAirportBody.p2')}</p>
      <p>{t('dubrovnikAirportBody.p3')}</p>
      <h2>{t('dubrovnikAirportBody.borderTitle')}</h2>
      <p>{t('dubrovnikAirportBody.borderText')} {t('dubrovnikAirportBody.borderGuideBefore')} <a href={localePath('/border-crossing-guide')}>{t('dubrovnikAirportBody.borderGuideText')}</a> {t('dubrovnikAirportBody.borderGuideAfter')}</p>
      <h2>{t('dubrovnikAirportBody.facilitiesTitle')}</h2>
      <p>{t('dubrovnikAirportBody.facilitiesText1')}</p>
      <p>{t('dubrovnikAirportBody.facilitiesText2')}</p>
      <img src="/img/pexels-30238159.jpg" alt={t('imageAlts.dubrovnikHarbour')} loading="lazy" />
      <h2>{t('dubrovnikAirportBody.gettingTitle')}</h2>
      <p>{t('dubrovnikAirportBody.gettingText1')}</p>
      <p>{t('dubrovnikAirportBody.gettingText2')}</p>
    </ContentPage>
  );
}
