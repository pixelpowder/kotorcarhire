'use client';
import ContentPage from '../../../ContentPage';
import useTranslation from '../../../i18n/useTranslation';

export default function KotorWinterVisiting() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage
      title={t('blogWinter.title')}
      subtitle={t('blogWinter.subtitle')}
      description={t('blogWinter.description')}
      image="/img/blog-kotor-winter.webp"
    >
      <h2>{t('blogWinter.h2Why')}</h2>
      <p>{t('blogWinter.whyP1')}</p>
      <p>{t('blogWinter.whyP2')}</p>

      <h2>{t('blogWinter.h2Weather')}</h2>
      <p>{t('blogWinter.weatherP')}</p>

      <h2>{t('blogWinter.h2Driving')}</h2>
      <p>{t('blogWinter.drivingP')}</p>

      <img src="/img/blog-kotor-bay-winter.webp" alt={t('blogWinter.altBayWinter')} loading="lazy" />

      <h2>{t('blogWinter.h2Things')}</h2>
      <h3>{t('blogWinter.h3Walls')}</h3>
      <p>{t('blogWinter.wallsP')}</p>
      <h3>{t('blogWinter.h3Markets')}</h3>
      <p>{t('blogWinter.marketsP')}</p>
      <h3>{t('blogWinter.h3Carnival')}</h3>
      <p>{t('blogWinter.carnivalP')}</p>
      <h3>{t('blogWinter.h3DayTrips')}</h3>
      <p>{t('blogWinter.dayTripsP')}</p>

      <h2>{t('blogWinter.h2Prices')}</h2>
      <p>{t('blogWinter.pricesP')}</p>

      <h2>{t('blogWinter.h2Packing')}</h2>
      <ul>
        <li>{t('blogWinter.pack1')}</li>
        <li>{t('blogWinter.pack2')}</li>
        <li>{t('blogWinter.pack3')}</li>
        <li>{t('blogWinter.pack4')}</li>
        <li>{t('blogWinter.pack5')}</li>
      </ul>

      <h2>{t('blogWinter.h2Also')}</h2>
      <p>{t('blogWinter.alsoP')} <a href={localePath('/blog/kotor-to-lovcen-drive')}>{t('blogWinter.alsoLink')}</a>.</p>
    </ContentPage>
  );
}
