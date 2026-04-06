'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';
export default function Perast() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage title={t("perast.title")} subtitle={t("perast.subtitle")} description={t("perast.seoDesc")} image="/img/perast-village.webp">
      <img src="/img/our-lady-rocks.webp" alt="Perast waterfront with the two islands in the bay beyond" loading="lazy" />
      <h2>{t('perastBody.h1')}</h2>
      <p>{t('perastBody.p1')}</p>
      <p>{t('perastBody.p2')}</p>

      <h2>{t('perastBody.islandsTitle')}</h2>
      <h3>{t('perastBody.stGeorgeTitle')}</h3>
      <p>{t('perastBody.stGeorgeText')}</p>

      <h3>{t('perastBody.ladyOfRocksTitle')}</h3>
      <p>{t('perastBody.ladyOfRocksText')}</p>

      <img src="/img/pexels-7510133.jpg" alt="Bay of Kotor landscape near Perast" loading="lazy" />

      <h2>{t('perastBody.historicTitle')}</h2>
      <p>{t('perastBody.historicText')}</p>

      <h3>{t('perastBody.monasteryTitle')}</h3>
      <p>{t('perastBody.monasteryText')} Plan your route with our <a href={localePath('/montenegro')}>Montenegro driving and routes guide</a>.</p>
    </ContentPage>
  );
}
