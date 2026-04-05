'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';
export default function BorderCrossing() {
  const { t } = useTranslation();
  return (
    <ContentPage title={t("border-crossing.title")} subtitle={t("border-crossing.subtitle")} description={t("border-crossing.seoDesc")} image="/img/pexels-26161092.jpg">
      <img src="/img/pexels-30944550.jpg" alt="Mostar Bridge" loading="lazy" />
      <h2>{t('borderCrossingBody.h1')}</h2>
      <p>{t('borderCrossingBody.p1')}</p>
      <h2>{t('borderCrossingBody.greenCardTitle')}</h2>
      <p>{t('borderCrossingBody.greenCardText')}</p>
      <ul><li>{t('borderCrossingBody.greenCard1')}</li><li>{t('borderCrossingBody.greenCard2')}</li><li>{t('borderCrossingBody.greenCard3')}</li></ul>
      <p>{t('borderCrossingBody.greenCardWarn')}</p>
      <h2>{t('borderCrossingBody.docsTitle')}</h2>
      <ul><li>{t('borderCrossingBody.doc1')}</li><li>{t('borderCrossingBody.doc2')}</li><li>{t('borderCrossingBody.doc3')}</li><li>{t('borderCrossingBody.doc4')}</li><li>{t('borderCrossingBody.doc5')}</li></ul>
      <h2>{t('borderCrossingBody.crossingsTitle')}</h2>
      <h3>{t('borderCrossingBody.croatiaTitle')}</h3>
      <p>{t('borderCrossingBody.croatiaText')}</p>
      <p>{t('borderCrossingBody.croatiaTip')}</p>
      <p>{t('borderCrossingBody.croatiaFerry')}</p>
      <h3>{t('borderCrossingBody.albaniaTitle')}</h3>
      <p>{t('borderCrossingBody.albaniaText')}</p>
      <p>{t('borderCrossingBody.albaniaNote')}</p>
      <h3>{t('borderCrossingBody.bosniaTitle')}</h3>
      <p>{t('borderCrossingBody.bosniaText')}</p>
      <h3>{t('borderCrossingBody.serbiaTitle')}</h3>
      <p>{t('borderCrossingBody.serbiaText')}</p>
      <h3>{t('borderCrossingBody.kosovoTitle')}</h3>
      <p>{t('borderCrossingBody.kosovoText')}</p>
      <img src="/img/pexels-7499434.jpg" alt="Adriatic coast aerial" loading="lazy" />
      <h2>{t('borderCrossingBody.tipsTitle')}</h2>
      <ul><li>{t('borderCrossingBody.tip1')}</li><li>{t('borderCrossingBody.tip2')}</li><li>{t('borderCrossingBody.tip3')}</li><li>{t('borderCrossingBody.tip4')}</li><li>{t('borderCrossingBody.tip5')}</li><li>{t('borderCrossingBody.tip6')}</li></ul>
      <h2>{t('borderCrossingBody.lawsTitle')}</h2>
      <p>{t('borderCrossingBody.lawsIntro')}</p>
      <ul><li>{t('borderCrossingBody.law1')}</li><li>{t('borderCrossingBody.law2')}</li><li>{t('borderCrossingBody.law3')}</li><li>{t('borderCrossingBody.law4')}</li><li>{t('borderCrossingBody.law5')}</li></ul>
      <h2>{t('borderCrossingBody.popularTitle')}</h2>
      <ul><li>{t('borderCrossingBody.route1')}</li><li>{t('borderCrossingBody.route2')}</li><li>{t('borderCrossingBody.route3')}</li><li>{t('borderCrossingBody.route4')}</li></ul>
      <p>{t('borderCrossingBody.ctaText')}</p>
    </ContentPage>
  );
}