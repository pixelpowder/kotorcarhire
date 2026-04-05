'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';

export default function About() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage
      title={t("about.title")}
      subtitle={t("about.subtitle")}
      description={t("about.seoDesc")}
      image="/img/kotor-bay-aerial.webp"
    >
      <img src="/img/kotor-bay-aerial.webp" alt="Bay of Kotor aerial view from above the fortress walls" loading="lazy" />
      <h2>{t('aboutBody.h1')}</h2>
      <p>{t('aboutBody.p1')}</p>

      <h2>{t('aboutBody.h2')}</h2>
      <p>{t('aboutBody.p2')}</p>

      <h2>{t('aboutBody.h3')}</h2>
      <p>{t('aboutBody.p3')}</p>

      <h3>{t('aboutBody.promiseTitle')}</h3>
      <ul>
        <li>{t('aboutBody.promise1')}</li>
        <li>{t('aboutBody.promise2')}</li>
        <li>{t('aboutBody.promise3')}</li>
        <li>{t('aboutBody.promise4')}</li>
        <li>{t('aboutBody.promise5')}</li>
        <li>{t('aboutBody.promise6')}</li>
      </ul>

      <h2>{t('aboutBody.h4')}</h2>
      <p>{t('aboutBody.p4')}</p>

      <h2>{t('aboutBody.h5')}</h2>
      <p>{t('aboutBody.p5')}</p>
    </ContentPage>
  );
}
