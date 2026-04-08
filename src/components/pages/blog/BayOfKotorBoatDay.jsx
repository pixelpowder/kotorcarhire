'use client';
import ContentPage from '../../../ContentPage';
import useTranslation from '../../../i18n/useTranslation';

export default function BayOfKotorBoatDay() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage
      title={t('blogBoat.title')}
      subtitle={t('blogBoat.subtitle')}
      description={t('blogBoat.description')}
      image="/img/blog-bay-boat.webp"
    >
      <h2>{t('blogBoat.h2Combo')}</h2>
      <p>{t('blogBoat.comboP1')}</p>
      <p>{t('blogBoat.comboP2')}</p>

      <h2>{t('blogBoat.h2OurLady')}</h2>
      <p>{t('blogBoat.ourLadyP')}</p>

      <img src="/img/blog-our-lady-rocks.webp" alt={t('blogBoat.altOurLady')} loading="lazy" />

      <h2>{t('blogBoat.h2Perast')}</h2>
      <p>{t('blogBoat.perastP')}</p>

      <h2>{t('blogBoat.h2BlueCave')}</h2>
      <p>{t('blogBoat.blueCaveP')}</p>

      <h2>{t('blogBoat.h2Itinerary')}</h2>
      <ul>
        <li><strong>{t('blogBoat.itinMorningLabel')}</strong> {t('blogBoat.itinMorningVal')}</li>
        <li><strong>{t('blogBoat.itinMiddayLabel')}</strong> {t('blogBoat.itinMiddayVal')}</li>
        <li><strong>{t('blogBoat.itinAfternoonLabel')}</strong> {t('blogBoat.itinAfternoonVal')}</li>
        <li><strong>{t('blogBoat.itinEveningLabel')}</strong> {t('blogBoat.itinEveningVal')}</li>
      </ul>

      <h2>{t('blogBoat.h2Parking')}</h2>
      <p>{t('blogBoat.parkingP')}</p>

      <h2>{t('blogBoat.h2Combine')}</h2>
      <p>{t('blogBoat.combineP')} <a href={localePath('/blog/kotor-photography-spots')}>{t('blogBoat.combineLink')}</a>.</p>

      <div className="route-info">
        <h3>{t('blogBoat.glanceTitle')}</h3>
        <div className="route-info__grid">
          <div className="route-info__item">
            <strong>{t('blogBoat.glanceDrive')}</strong>
            {t('blogBoat.glanceDriveVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogBoat.glanceBoatCost')}</strong>
            {t('blogBoat.glanceBoatCostVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogBoat.glanceBestTime')}</strong>
            {t('blogBoat.glanceBestTimeVal')}
          </div>
          <div className="route-info__item">
            <strong>{t('blogBoat.glanceDuration')}</strong>
            {t('blogBoat.glanceDurationVal')}
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
