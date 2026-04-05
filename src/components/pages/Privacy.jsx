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
      image="/img/pexels-2437291.jpg"
    >
      <p><strong>Last updated:</strong> April 2026</p>

      <h2>Who We Are</h2>
      <p>Montenegro Car Hire operates as an affiliate partner connecting travellers with car rental providers in Montenegro. Our website is located at montenegrocarhire.com. When you use our site, we may collect certain information as described below.</p>

      <h2>What Information We Collect</h2>
      <h3>Information you provide</h3>
      <p>When you use our booking search form, we collect the pickup location, dates, and times you enter in order to find available vehicles. This information is passed to our partner (LocalRent) to generate search results. We do not collect or store payment details — all payments are processed directly by the rental provider.</p>

      <h3>Information collected automatically</h3>
      <ul>
        <li><strong>Usage data:</strong> pages visited, time spent on site, referring website</li>
        <li><strong>Device information:</strong> browser type, operating system, screen resolution</li>
        <li><strong>IP address:</strong> used for approximate location and security purposes</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To connect you with car rental availability and pricing</li>
        <li>To improve our website and user experience</li>
        <li>To understand how visitors use our site (analytics)</li>
        <li>To respond to enquiries via WhatsApp, Viber, or email</li>
      </ul>

      <h2>Third-Party Services</h2>
      <p>Our website uses the following third-party services:</p>
      <ul>
        <li><strong>LocalRent:</strong> car rental booking widget — processes your search queries and handles all booking and payment</li>
        <li><strong>Vercel:</strong> website hosting</li>
        <li><strong>Pexels:</strong> stock photography</li>
      </ul>
      <p>Each of these services has their own privacy policy governing how they handle data.</p>

      <h2>Cookies</h2>
      <p>We use minimal cookies necessary for the website to function. The LocalRent booking widget may set its own cookies for session management and preferences. See our <a href={localePath("/cookie-policy")}>Cookie Policy</a> for details.</p>

      <h2>Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Request access to any personal data we hold about you</li>
        <li>Request correction or deletion of your data</li>
        <li>Withdraw consent for data processing</li>
        <li>Lodge a complaint with a data protection authority</li>
      </ul>

      <h2>Contact</h2>
      <p>For any privacy-related questions, contact us via email at info@montenegrocarhire.com.</p>
    </ContentPage>
  );
}
