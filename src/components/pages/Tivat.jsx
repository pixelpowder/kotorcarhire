'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';
export default function Tivat() {
  const { t } = useTranslation();
  return (
    <ContentPage title={t("tivat.title")} subtitle={t("tivat.subtitle")} description={t("tivat.seoDesc")} image="/img/pexels-6216512.jpg">
      <img src="/img/pexels-6216520.jpg" alt="Porto Montenegro marina" loading="lazy" />
      <h2>{t('tivatBody.h1')}</h2>
      <p>{t('tivatBody.p1')}</p>
      <p>{t('tivatBody.p2')}</p>
      <h2>{t('tivatBody.beachesTitle')}</h2>
      <p>{t('tivatBody.beachesText')}</p>
      <ul><li>{t('tivatBody.beach1')}</li><li>{t('tivatBody.beach2')}</li></ul>
      <h2>{t('tivatBody.portoTitle')}</h2>
      <p>{t('tivatBody.portoText')}</p>
      <img src="/img/pexels-28407768.jpg" alt="Tivat waterfront" loading="lazy" />
      <h2>{t('tivatBody.culturalTitle')}</h2>
      <h3>{t('tivatBody.monasteryTitle')}</h3>
      <p>{t('tivatBody.monasteryText')}</p>
      <h3>{t('tivatBody.churchTitle')}</h3>
      <p>{t('tivatBody.churchText')}</p>
      <p>{t('tivatBody.museumText')}</p>
    </ContentPage>
  );
}