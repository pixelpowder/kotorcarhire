'use client';
import ContentPage from '../../../ContentPage';
import useTranslation from '../../../i18n/useTranslation';

export default function KotorOldTownCats() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage
      title={t('blogCats.title')}
      subtitle={t('blogCats.subtitle')}
      description={t('blogCats.description')}
      image="/img/blog-kotor-cats.webp"
    >
      <h2>{t('blogCats.h2History')}</h2>
      <p>{t('blogCats.historyP1')}</p>
      <p>{t('blogCats.historyP2')}</p>

      <h2>{t('blogCats.h2Museum')}</h2>
      <p>{t('blogCats.museumP')}</p>

      <img src="/img/blog-cat-alley.webp" alt={t('blogCats.altAlley')} loading="lazy" />

      <h2>{t('blogCats.h2Spots')}</h2>
      <h3>{t('blogCats.h3Flour')}</h3>
      <p>{t('blogCats.flourP')}</p>
      <h3>{t('blogCats.h3Trg')}</h3>
      <p>{t('blogCats.trgP')}</p>
      <h3>{t('blogCats.h3Walls')}</h3>
      <p>{t('blogCats.wallsP')}</p>
      <h3>{t('blogCats.h3Bastion')}</h3>
      <p>{t('blogCats.bastionP')}</p>

      <h2>{t('blogCats.h2Shop')}</h2>
      <p>{t('blogCats.shopP')}</p>

      <h2>{t('blogCats.h2Etiquette')}</h2>
      <ul>
        <li>{t('blogCats.etiq1')}</li>
        <li>{t('blogCats.etiq2')}</li>
        <li>{t('blogCats.etiq3')}</li>
        <li>{t('blogCats.etiq4')}</li>
      </ul>

      <h2>{t('blogCats.h2Combine')}</h2>
      <p>{t('blogCats.combineP')} <a href={localePath('/blog/kotor-city-walls-hike')}>{t('blogCats.combineLink')}</a>.</p>
    </ContentPage>
  );
}
