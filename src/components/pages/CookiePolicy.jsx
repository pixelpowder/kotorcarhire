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
      image="/img/pexels-2437291.jpg"
    >
      <p><strong>Last updated:</strong> April 2026</p>

      <h2>What Are Cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you use it.</p>

      <h2>Cookies We Use</h2>

      <h3>Essential Cookies</h3>
      <p>These are necessary for the website to function. They cannot be disabled.</p>
      <ul>
        <li><strong>Session cookies:</strong> maintain your browsing session while you navigate the site</li>
        <li><strong>Preference cookies:</strong> remember your language and location selections</li>
      </ul>

      <h3>Third-Party Cookies</h3>
      <p>Our car rental booking widget (provided by LocalRent) may set cookies to:</p>
      <ul>
        <li>Remember your search preferences (dates, location)</li>
        <li>Maintain your session during the booking process</li>
        <li>Track affiliate referrals</li>
      </ul>
      <p>These cookies are set by LocalRent and are governed by their privacy policy.</p>

      <h2>Managing Cookies</h2>
      <p>You can control cookies through your browser settings. Most browsers allow you to:</p>
      <ul>
        <li>View what cookies are stored</li>
        <li>Delete individual or all cookies</li>
        <li>Block cookies from specific sites</li>
        <li>Block all third-party cookies</li>
      </ul>
      <p>Note that blocking essential cookies may affect the functionality of the booking widget.</p>

      <h2>Contact</h2>
      <p>Questions about our use of cookies? Contact us at info@montenegrocarhire.com.</p>
    </ContentPage>
  );
}
