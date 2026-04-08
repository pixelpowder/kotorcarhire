'use client';
import ContentPage from '../../../ContentPage';
import useTranslation from '../../../i18n/useTranslation';

export default function KotorPhotographySpots() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage
      title={t('blogPhoto.title')}
      subtitle={t('blogPhoto.subtitle')}
      description={t('blogPhoto.description')}
      image="/img/blog-kotor-photo.webp"
    >
      <h2>{t('blogPhoto.h2Intro')}</h2>
      <p>{t('blogPhoto.introP')}</p>

      <h2>{t('blogPhoto.h2Spot1')}</h2>
      <p>{t('blogPhoto.spot1P')}</p>

      <h2>{t('blogPhoto.h2Spot2')}</h2>
      <p>{t('blogPhoto.spot2P')}</p>

      <img src="/img/blog-kotor-aerial.webp" alt={t('blogPhoto.altAerial')} loading="lazy" />

      <h2>{t('blogPhoto.h2Spot3')}</h2>
      <p>{t('blogPhoto.spot3P')}</p>

      <h2>{t('blogPhoto.h2Spot4')}</h2>
      <p>{t('blogPhoto.spot4P')}</p>

      <h2>{t('blogPhoto.h2Spot5')}</h2>
      <p>{t('blogPhoto.spot5P')}</p>

      <h2>{t('blogPhoto.h2Spot6')}</h2>
      <p>{t('blogPhoto.spot6P')}</p>

      <h2>{t('blogPhoto.h2Spot7')}</h2>
      <p>{t('blogPhoto.spot7P')}</p>

      <h2>{t('blogPhoto.h2Spot8')}</h2>
      <p>{t('blogPhoto.spot8P')}</p>

      <h2>{t('blogPhoto.h2Spot9')}</h2>
      <p>{t('blogPhoto.spot9P')}</p>

      <h2>{t('blogPhoto.h2Gear')}</h2>
      <ul>
        <li><strong>{t('blogPhoto.gearWideLabel')}</strong> {t('blogPhoto.gearWideVal')}</li>
        <li><strong>{t('blogPhoto.gearTripodLabel')}</strong> {t('blogPhoto.gearTripodVal')}</li>
        <li><strong>{t('blogPhoto.gearDroneLabel')}</strong> {t('blogPhoto.gearDroneVal')}</li>
        <li><strong>{t('blogPhoto.gearGoldenLabel')}</strong> {t('blogPhoto.gearGoldenVal')}</li>
      </ul>

      <h2>{t('blogPhoto.h2Access')}</h2>
      <p>{t('blogPhoto.accessP')} <a href={localePath('/blog/kotor-cruise-shore-excursion')}>{t('blogPhoto.accessLink')}</a>.</p>
    </ContentPage>
  );
}
