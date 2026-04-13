'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';

export default function Terms() {
  const { t } = useTranslation();
  return (
    <ContentPage
      title={t("terms.title")}
      subtitle={t("terms.subtitle")}
      description={t("terms.seoDesc")}
      image="/img/kotor-bay-aerial.webp"
    >
      <p><strong>{t('termsBody.lastUpdated')}</strong> {t('termsBody.lastUpdatedDate')}</p>

      <h2>{t('termsBody.aboutTitle')}</h2>
      <p>{t('termsBody.aboutText')}</p>

      <h2>{t('termsBody.bookingTitle')}</h2>
      <p>{t('termsBody.bookingText1')}</p>
      <p>{t('termsBody.bookingText2')}</p>

      <h2>{t('termsBody.roleTitle')}</h2>
      <p>{t('termsBody.roleProvide')}</p>
      <ul>
        <li>{t('termsBody.provide1')}</li>
        <li>{t('termsBody.provide2')}</li>
        <li>{t('termsBody.provide3')}</li>
      </ul>
      <p>{t('termsBody.roleDoNot')}</p>
      <ul>
        <li>{t('termsBody.doNot1')}</li>
        <li>{t('termsBody.doNot2')}</li>
        <li>{t('termsBody.doNot3')}</li>
      </ul>

      <h2>{t('termsBody.pricingTitle')}</h2>
      <p>{t('termsBody.pricingText')}</p>

      <h2>{t('termsBody.contentTitle')}</h2>
      <p>{t('termsBody.contentText')}</p>

      <h2>{t('termsBody.liabilityTitle')}</h2>
      <p>{t('termsBody.liabilityIntro')}</p>
      <ul>
        <li>{t('termsBody.liability1')}</li>
        <li>{t('termsBody.liability2')}</li>
        <li>{t('termsBody.liability3')}</li>
        <li>{t('termsBody.liability4')}</li>
      </ul>

      <h2>{t('termsBody.ipTitle')}</h2>
      <p>{t('termsBody.ipText')}</p>

      <h2>{t('termsBody.contactTitle')}</h2>
      <p>{t('termsBody.contactText')}</p>
    </ContentPage>
  );
}
