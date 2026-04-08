'use client';
import ContentPage from '../../../ContentPage';
import useTranslation from '../../../i18n/useTranslation';

export default function KotorToLovcenDrive() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage
      title={t('blogLovcen.title')}
      subtitle={t('blogLovcen.subtitle')}
      description={t('blogLovcen.description')}
      image="/img/blog-lovcen-road.webp"
    >
      <h2>{t('blogLovcen.h2Road')}</h2>
      <p>{t('blogLovcen.roadP1')}</p>
      <p>{t('blogLovcen.roadP2')}</p>

      <h2>{t('blogLovcen.h2Hairpins')}</h2>
      <p>{t('blogLovcen.hairpinsP')}</p>

      <img src="/img/blog-lovcen-hairpins.webp" alt={t('blogLovcen.altHairpins')} loading="lazy" />

      <h2>{t('blogLovcen.h2Mausoleum')}</h2>
      <p>{t('blogLovcen.mausoleumP')}</p>

      <h2>{t('blogLovcen.h2Njegos')}</h2>
      <p>{t('blogLovcen.njegosP')}</p>

      <h2>{t('blogLovcen.h2Cetinje')}</h2>
      <p>{t('blogLovcen.cetinjeP')}</p>

      <h2>{t('blogLovcen.h2CarChoice')}</h2>
      <p>{t('blogLovcen.carChoiceP')}</p>

      <h2>{t('blogLovcen.h2Stops')}</h2>
      <ul>
        <li><strong>{t('blogLovcen.stopViewLabel')}</strong> {t('blogLovcen.stopViewVal')}</li>
        <li><strong>{t('blogLovcen.stopVillageLabel')}</strong> {t('blogLovcen.stopVillageVal')}</li>
        <li><strong>{t('blogLovcen.stopPeakLabel')}</strong> {t('blogLovcen.stopPeakVal')}</li>
        <li><strong>{t('blogLovcen.stopCetinjeLabel')}</strong> {t('blogLovcen.stopCetinjeVal')}</li>
      </ul>

      <h2>{t('blogLovcen.h2Return')}</h2>
      <p>{t('blogLovcen.returnP')} <a href={localePath('/blog/risan-mosaics-drive')}>{t('blogLovcen.returnLink')}</a>.</p>

      <div className="route-info">
        <h3>{t('blogLovcen.glanceTitle')}</h3>
        <div className="route-info__grid">
          <div className="route-info__item">
            <strong>{t('blogLovcen.glanceDistance')}</strong>
            {t('blogLovcen.glanceDistanceVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogLovcen.glanceElevation')}</strong>
            {t('blogLovcen.glanceElevationVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogLovcen.glanceDrive')}</strong>
            {t('blogLovcen.glanceDriveVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogLovcen.glanceBestCar')}</strong>
            {t('blogLovcen.glanceBestCarVal')}
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
