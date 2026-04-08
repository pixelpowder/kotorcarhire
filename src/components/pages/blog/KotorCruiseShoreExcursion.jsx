'use client';
import ContentPage from '../../../ContentPage';
import useTranslation from '../../../i18n/useTranslation';

export default function KotorCruiseShoreExcursion() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage
      title={t('blogCruise.title')}
      subtitle={t('blogCruise.subtitle')}
      description={t('blogCruise.description')}
      image="/img/blog-cruise-port.webp"
    >
      <h2>{t('blogCruise.h2WhyRent')}</h2>
      <p>{t('blogCruise.whyRentP1')}</p>
      <p>{t('blogCruise.whyRentP2')}</p>

      <h2>{t('blogCruise.h2Timing')}</h2>
      <p>{t('blogCruise.timingP')}</p>

      <h2>{t('blogCruise.h2Route4')}</h2>
      <p>{t('blogCruise.route4P')}</p>
      <ul>
        <li><strong>{t('blogCruise.r4Stop1Label')}</strong> {t('blogCruise.r4Stop1Val')}</li>
        <li><strong>{t('blogCruise.r4Stop2Label')}</strong> {t('blogCruise.r4Stop2Val')}</li>
        <li><strong>{t('blogCruise.r4Stop3Label')}</strong> {t('blogCruise.r4Stop3Val')}</li>
      </ul>

      <img src="/img/blog-perast-from-car.webp" alt={t('blogCruise.altPerast')} loading="lazy" />

      <h2>{t('blogCruise.h2Route6')}</h2>
      <p>{t('blogCruise.route6P')}</p>
      <ul>
        <li><strong>{t('blogCruise.r6Stop1Label')}</strong> {t('blogCruise.r6Stop1Val')}</li>
        <li><strong>{t('blogCruise.r6Stop2Label')}</strong> {t('blogCruise.r6Stop2Val')}</li>
        <li><strong>{t('blogCruise.r6Stop3Label')}</strong> {t('blogCruise.r6Stop3Val')}</li>
        <li><strong>{t('blogCruise.r6Stop4Label')}</strong> {t('blogCruise.r6Stop4Val')}</li>
      </ul>

      <h2>{t('blogCruise.h2Pickup')}</h2>
      <p>{t('blogCruise.pickupP')}</p>

      <h2>{t('blogCruise.h2Back')}</h2>
      <p>{t('blogCruise.backP')} <a href={localePath('/blog/bay-of-kotor-boat-day')}>{t('blogCruise.backLink')}</a>.</p>

      <div className="route-info">
        <h3>{t('blogCruise.glanceTitle')}</h3>
        <div className="route-info__grid">
          <div className="route-info__item">
            <strong>{t('blogCruise.glancePickup')}</strong>
            {t('blogCruise.glancePickupVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogCruise.glanceWindow')}</strong>
            {t('blogCruise.glanceWindowVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogCruise.glanceReturn')}</strong>
            {t('blogCruise.glanceReturnVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogCruise.glanceTip')}</strong>
            {t('blogCruise.glanceTipVal')}
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
