'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';

export default function Privacy() {
  const { t, localePath } = useTranslation();
  return (
    <ContentPage
      title={t("privacy.title")}
      subtitle={t("privacy.subtitle")}
      description={t("privacy.seoDesc")}
      image="/img/kotor-bay-aerial.webp"
    >
      <p><strong>{t('privacyBody.lastUpdated')}</strong> {t('privacyBody.lastUpdatedDate')}</p>

      <h2>{t('privacyBody.whoWeAreTitle')}</h2>
      <p>{t('privacyBody.whoWeAreText')}</p>

      <h2>{t('privacyBody.whatWeCollectTitle')}</h2>
      <h3>{t('privacyBody.infoYouProvideTitle')}</h3>
      <p>{t('privacyBody.infoYouProvideText')}</p>

      <h3>{t('privacyBody.autoCollectedTitle')}</h3>
      <ul>
        <li><strong>{t('privacyBody.autoCollected1')}</strong></li>
        <li><strong>{t('privacyBody.autoCollected2')}</strong></li>
        <li><strong>{t('privacyBody.autoCollected3')}</strong></li>
      </ul>

      <h2>{t('privacyBody.howWeUseTitle')}</h2>
      <ul>
        <li>{t('privacyBody.howWeUse1')}</li>
        <li>{t('privacyBody.howWeUse2')}</li>
        <li>{t('privacyBody.howWeUse3')}</li>
        <li>{t('privacyBody.howWeUse4')}</li>
      </ul>

      <h2>{t('privacyBody.thirdPartyTitle')}</h2>
      <p>{t('privacyBody.thirdPartyIntro')}</p>
      <ul>
        <li><strong>{t('privacyBody.thirdParty1')}</strong></li>
        <li><strong>{t('privacyBody.thirdParty2')}</strong></li>
        <li><strong>{t('privacyBody.thirdParty3')}</strong></li>
      </ul>
      <p>{t('privacyBody.thirdPartyNote')}</p>

      <h2>{t('privacyBody.cookiesTitle')}</h2>
      <p>{t('privacyBody.cookiesText')} <a href={localePath("/cookie-policy")}>{t('privacyBody.cookiesLink')}</a> {t('privacyBody.cookiesAfter')}</p>

      <h2>{t('privacyBody.yourRightsTitle')}</h2>
      <p>{t('privacyBody.yourRightsIntro')}</p>
      <ul>
        <li>{t('privacyBody.right1')}</li>
        <li>{t('privacyBody.right2')}</li>
        <li>{t('privacyBody.right3')}</li>
        <li>{t('privacyBody.right4')}</li>
      </ul>

      <h2>{t('privacyBody.contactTitle')}</h2>
      <p>{t('privacyBody.contactText')}</p>
    </ContentPage>
  );
}
