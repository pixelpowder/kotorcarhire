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
      image="/img/pexels-2437291.jpg"
    >
      <p><strong>Last updated:</strong> April 2026</p>

      <h2>About This Website</h2>
      <p>Montenegro Car Hire (montenegrocarhire.com) is an affiliate website that connects travellers with car rental services in Montenegro. We are not a car rental company — we partner with LocalRent to provide real-time availability and booking services.</p>

      <h2>Booking & Rental Terms</h2>
      <p>All car rental bookings made through our website are processed and fulfilled by our partner, LocalRent. When you complete a booking, you enter into a rental agreement directly with the vehicle supplier, not with Montenegro Car Hire.</p>
      <p>The rental terms, including cancellation policies, insurance coverage, age requirements, and payment conditions, are set by the vehicle supplier and displayed during the booking process. We recommend reading these terms carefully before confirming any booking.</p>

      <h2>Our Role</h2>
      <p>We provide:</p>
      <ul>
        <li>A search interface to browse available rental vehicles</li>
        <li>Destination and travel information about Montenegro</li>
        <li>Customer support to help with enquiries before booking</li>
      </ul>
      <p>We do not:</p>
      <ul>
        <li>Own, operate, or maintain any rental vehicles</li>
        <li>Process payments or handle refunds</li>
        <li>Set rental prices, insurance terms, or cancellation policies</li>
      </ul>

      <h2>Pricing</h2>
      <p>Prices displayed on our website are provided in real-time by our booking partner and are subject to change. The final price is confirmed at the time of booking. All prices include VAT and mandatory insurance unless otherwise stated.</p>

      <h2>Website Content</h2>
      <p>We make every effort to ensure that information on this website is accurate and up to date. However, travel information, driving regulations, and border crossing requirements can change. We recommend verifying critical details (especially border crossing documents and driving rules) with official sources before your trip.</p>

      <h2>Limitation of Liability</h2>
      <p>Montenegro Car Hire acts as an intermediary and is not liable for:</p>
      <ul>
        <li>The condition or availability of rental vehicles</li>
        <li>Actions or omissions by rental suppliers</li>
        <li>Losses arising from border crossing issues or documentation problems</li>
        <li>Changes to prices after booking confirmation</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>All content on this website, including text, design, and graphics, is owned by Montenegro Car Hire unless otherwise credited. Stock photography is used under licence from Pexels.</p>

      <h2>Contact</h2>
      <p>Questions about these terms? Contact us at info@montenegrocarhire.com.</p>
    </ContentPage>
  );
}
