'use client';
import ContentPage from '../../../ContentPage';
import useTranslation from '../../../i18n/useTranslation';

export default function KotorNightlifeDining() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage
      title={t('blogDining.title')}
      subtitle={t('blogDining.subtitle')}
      description={t('blogDining.description')}
      image="/img/blog-kotor-dining.webp"
    >
      <h2>{t('blogDining.h2Scene')}</h2>
      <p>{t('blogDining.sceneP1')}</p>
      <p>{t('blogDining.sceneP2')}</p>

      <h2>{t('blogDining.h2OldTown')}</h2>
      <p>{t('blogDining.oldTownP')}</p>

      <h2>{t('blogDining.h2Seafood')}</h2>
      <p>{t('blogDining.seafoodP')}</p>

      <img src="/img/blog-kotor-seafood.webp" alt={t('blogDining.altSeafood')} loading="lazy" />

      <h2>{t('blogDining.h2Dobrota')}</h2>
      <p>{t('blogDining.dobrotaP')}</p>

      <h2>{t('blogDining.h2Bars')}</h2>
      <p>{t('blogDining.barsP')}</p>

      <h2>{t('blogDining.h2Late')}</h2>
      <p>{t('blogDining.lateP')}</p>

      <h2>{t('blogDining.h2Drive')}</h2>
      <p>{t('blogDining.driveP')} <a href={localePath('/blog/kotor-winter-visiting')}>{t('blogDining.driveLink')}</a>.</p>

      <h2>{t('blogDining.h2Tips')}</h2>
      <ul>
        <li><strong>{t('blogDining.tipBookLabel')}</strong> {t('blogDining.tipBookVal')}</li>
        <li><strong>{t('blogDining.tipCashLabel')}</strong> {t('blogDining.tipCashVal')}</li>
        <li><strong>{t('blogDining.tipTimeLabel')}</strong> {t('blogDining.tipTimeVal')}</li>
        <li><strong>{t('blogDining.tipParkLabel')}</strong> {t('blogDining.tipParkVal')}</li>
      </ul>
    </ContentPage>
  );
}
