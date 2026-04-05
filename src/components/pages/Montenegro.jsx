'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';
export default function Montenegro() {
  const { t } = useTranslation();
  return (
    <ContentPage title={t("montenegro.title")} subtitle={t("montenegro.subtitle")} description={t("montenegro.seoDesc")} image="/img/pexels-29071814.jpg">
      <img src="/img/pexels-27151410.jpg" alt="Bay of Kotor aerial" loading="lazy" />
      <h2>{t('montenegroBody.h1')}</h2>
      <p>{t('montenegroBody.p1')}</p>
      <p>{t('montenegroBody.p2')}</p>
      <h2>{t('montenegroBody.startTitle')}</h2>
      <p>{t('montenegroBody.startText')}</p>
      <h2>{t('montenegroBody.timesTitle')}</h2>
      <p>{t('montenegroBody.timesText1')}</p>
      <p>{t('montenegroBody.timesText2')}</p>
      <h2>{t('montenegroBody.rulesTitle')}</h2>
      <p>{t('montenegroBody.rulesIntro')}</p>
      <ul><li>{t('montenegroBody.rule1')}</li><li>{t('montenegroBody.rule2')}</li><li>{t('montenegroBody.rule3')}</li><li>{t('montenegroBody.rule4')}</li></ul>
      <h3>{t('montenegroBody.keyRulesTitle')}</h3>
      <ul><li>{t('montenegroBody.keyRule1')}</li><li>{t('montenegroBody.keyRule2')}</li><li>{t('montenegroBody.keyRule3')}</li><li>{t('montenegroBody.keyRule4')}</li></ul>
      <img src="/img/pexels-26161092.jpg" alt="Montenegro coastal road" loading="lazy" />
      <h2>{t('montenegroBody.conditionsTitle')}</h2>
      <p>{t('montenegroBody.conditionsText')}</p>
      <h2>{t('montenegroBody.routesTitle')}</h2>
      <h3>{t('montenegroBody.e65Title')}</h3>
      <p>{t('montenegroBody.e65Text')}</p>
      <h3>{t('montenegroBody.e762Title')}</h3>
      <p>{t('montenegroBody.e762Text')}</p>
      <h2>{t('montenegroBody.borderTitle')}</h2>
      <p>{t('montenegroBody.borderText')}</p>
      <h2>{t('montenegroBody.nationTitle')}</h2>
      <p>{t('montenegroBody.nationText')}</p>
    </ContentPage>
  );
}