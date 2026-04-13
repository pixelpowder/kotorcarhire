'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';

export default function CookiePolicy() {
  const { t } = useTranslation();
  return (
    <ContentPage
      title={t("cookie-policy.title")}
      subtitle={t("cookie-policy.subtitle")}
      description={t("cookie-policy.seoDesc")}
      image="/img/kotor-bay-aerial.webp"
    >
      <p><strong>{t('cookieBody.lastUpdated')}</strong> {t('cookieBody.lastUpdatedDate')}</p>

      <h2>{t('cookieBody.whatAreCookiesTitle')}</h2>
      <p>{t('cookieBody.whatAreCookiesText')}</p>

      <h2>{t('cookieBody.cookiesWeUseTitle')}</h2>

      <h3>{t('cookieBody.essentialTitle')}</h3>
      <p>{t('cookieBody.essentialText')}</p>
      <ul>
        <li><strong>{t('cookieBody.essential1')}</strong></li>
        <li><strong>{t('cookieBody.essential2')}</strong></li>
      </ul>

      <h3>{t('cookieBody.thirdPartyTitle')}</h3>
      <p>{t('cookieBody.thirdPartyText')}</p>
      <ul>
        <li>{t('cookieBody.thirdParty1')}</li>
        <li>{t('cookieBody.thirdParty2')}</li>
        <li>{t('cookieBody.thirdParty3')}</li>
      </ul>
      <p>{t('cookieBody.thirdPartyNote')}</p>

      <h2>{t('cookieBody.managingTitle')}</h2>
      <p>{t('cookieBody.managingText')}</p>
      <ul>
        <li>{t('cookieBody.manage1')}</li>
        <li>{t('cookieBody.manage2')}</li>
        <li>{t('cookieBody.manage3')}</li>
        <li>{t('cookieBody.manage4')}</li>
      </ul>
      <p>{t('cookieBody.managingNote')}</p>

      <h2>{t('cookieBody.contactTitle')}</h2>
      <p>{t('cookieBody.contactText')}</p>
    </ContentPage>
  );
}
