'use client';
import ContentPage from '../../../ContentPage';
import useTranslation from '../../../i18n/useTranslation';

export default function RisanMosaicsDrive() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage
      title={t('blogRisan.title')}
      subtitle={t('blogRisan.subtitle')}
      description={t('blogRisan.description')}
      image="/img/blog-risan-mosaics.webp"
    >
      <h2>{t('blogRisan.h2Forgotten')}</h2>
      <p>{t('blogRisan.forgottenP1')}</p>
      <p>{t('blogRisan.forgottenP2')}</p>

      <h2>{t('blogRisan.h2Mosaics')}</h2>
      <p>{t('blogRisan.mosaicsP')}</p>

      <img src="/img/blog-risan-hypnos.webp" alt={t('blogRisan.altHypnos')} loading="lazy" />

      <h2>{t('blogRisan.h2Drive')}</h2>
      <p>{t('blogRisan.driveP')}</p>

      <h2>{t('blogRisan.h2Town')}</h2>
      <p>{t('blogRisan.townP')}</p>

      <h2>{t('blogRisan.h2Lunch')}</h2>
      <p>{t('blogRisan.lunchP')}</p>

      <h2>{t('blogRisan.h2Continue')}</h2>
      <p>{t('blogRisan.continueP')} <a href={localePath('/perast')}>{t('blogRisan.continueLink')}</a>.</p>

      <div className="route-info">
        <h3>{t('blogRisan.glanceTitle')}</h3>
        <div className="route-info__grid">
          <div className="route-info__item">
            <strong>{t('blogRisan.glanceDistance')}</strong>
            {t('blogRisan.glanceDistanceVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogRisan.glanceDrive')}</strong>
            {t('blogRisan.glanceDriveVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogRisan.glanceEntry')}</strong>
            {t('blogRisan.glanceEntryVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogRisan.glancePeriod')}</strong>
            {t('blogRisan.glancePeriodVal')}
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
