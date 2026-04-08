'use client';
import ContentPage from '../../../ContentPage';
import useTranslation from '../../../i18n/useTranslation';

export default function KotorCityWallsHike() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage
      title={t('blogWalls.title')}
      subtitle={t('blogWalls.subtitle')}
      description={t('blogWalls.description')}
      image="/img/blog-kotor-walls.webp"
    >
      <h2>{t('blogWalls.h2Why')}</h2>
      <p>{t('blogWalls.whyP1')}</p>
      <p>{t('blogWalls.whyP2')}</p>

      <h2>{t('blogWalls.h2Start')}</h2>
      <p>{t('blogWalls.startP')}</p>

      <img src="/img/blog-walls-steps.webp" alt={t('blogWalls.altSteps')} loading="lazy" />

      <h2>{t('blogWalls.h2Sections')}</h2>
      <h3>{t('blogWalls.h3Lower')}</h3>
      <p>{t('blogWalls.lowerP')}</p>
      <h3>{t('blogWalls.h3Middle')}</h3>
      <p>{t('blogWalls.middleP')}</p>
      <h3>{t('blogWalls.h3Fortress')}</h3>
      <p>{t('blogWalls.fortressP')}</p>

      <h2>{t('blogWalls.h2When')}</h2>
      <p>{t('blogWalls.whenP')}</p>

      <h2>{t('blogWalls.h2Tips')}</h2>
      <ul>
        <li><strong>{t('blogWalls.tipWaterLabel')}</strong> {t('blogWalls.tipWaterVal')}</li>
        <li><strong>{t('blogWalls.tipShoesLabel')}</strong> {t('blogWalls.tipShoesVal')}</li>
        <li><strong>{t('blogWalls.tipTimeLabel')}</strong> {t('blogWalls.tipTimeVal')}</li>
        <li><strong>{t('blogWalls.tipSunLabel')}</strong> {t('blogWalls.tipSunVal')}</li>
        <li><strong>{t('blogWalls.tipCameraLabel')}</strong> {t('blogWalls.tipCameraVal')}</li>
      </ul>

      <h2>{t('blogWalls.h2After')}</h2>
      <p>{t('blogWalls.afterP')} <a href={localePath('/blog/kotor-nightlife-dining')}>{t('blogWalls.afterLink')}</a>.</p>

      <div className="route-info">
        <h3>{t('blogWalls.glanceTitle')}</h3>
        <div className="route-info__grid">
          <div className="route-info__item">
            <strong>{t('blogWalls.glanceElevation')}</strong>
            {t('blogWalls.glanceElevationVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogWalls.glanceSteps')}</strong>
            {t('blogWalls.glanceStepsVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogWalls.glanceDuration')}</strong>
            {t('blogWalls.glanceDurationVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogWalls.glanceEntry')}</strong>
            {t('blogWalls.glanceEntryVal')}
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
