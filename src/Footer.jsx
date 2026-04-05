'use client';
import { useState } from 'react';
import { Car, Phone, Mail, MapPin, ChevronRight, ChevronDown } from 'lucide-react';
import config from './siteConfig';
import useTranslation from './i18n/useTranslation';
import './App.css';

function FooterAccordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`footer__accordion${open ? ' footer__accordion--open' : ''}`}>
      <button className="footer__accordion-btn" onClick={() => setOpen(!open)}>
        <span className="footer__col-title">{title}</span>
        <ChevronDown size={16} className="footer__accordion-icon" />
      </button>
      <div className="footer__accordion-body">
        {children}
      </div>
    </div>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <div className="footer__col-title footer__col-title--desktop">{title}</div>
      <FooterAccordion title={title}>
        {children}
      </FooterAccordion>
      <div className="footer__links footer__links--desktop">
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const { t, localePath } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <div className="footer__brand-logo">
            <div className="footer__brand-icon">
              <Car size={16} />
            </div>
            <span className="footer__brand-name">{config.name}</span>
          </div>
          <p className="footer__brand-desc">{t('footer.brandDesc')}</p>
          <div className="footer__contact-list">
            <a href={`mailto:${config.email}`} className="footer__contact-item">
              <Mail size={13} /> {config.email}
            </a>
            <div className="footer__contact-item">
              <MapPin size={13} /> {config.address}
            </div>
          </div>
        </div>

        <FooterColumn title={t('footer.quickLinks')}>
          <a href={localePath('/book')} className="footer__link"><ChevronRight size={12} /> {t('footer.carHireBooking')}</a>
          <a href={localePath('/about')} className="footer__link"><ChevronRight size={12} /> {t('footer.aboutUs')}</a>
          <a href={localePath('/#faq')} className="footer__link"><ChevronRight size={12} /> {t('footer.faqLink')}</a>
          <a href={localePath('/#reviews')} className="footer__link"><ChevronRight size={12} /> Testimonials</a>
        </FooterColumn>

        <FooterColumn title={t('footer.guides')}>
          <a href={localePath('/montenegro')} className="footer__link"><ChevronRight size={12} /> {t('footer.montenegroGuide')}</a>
          <a href={localePath('/border-crossing-guide')} className="footer__link"><ChevronRight size={12} /> {t('footer.borderGuide')}</a>
          <a href={localePath('/#destinations')} className="footer__link"><ChevronRight size={12} /> {t('footer.destinations')}</a>
        </FooterColumn>

        <FooterColumn title={t('footer.locations')}>
          {[
            { name: 'Tivat Airport', slug: 'tivat-airport' },
            { name: 'Podgorica Airport', slug: 'podgorica-airport' },
            { name: 'Kotor', slug: 'kotor' },
            { name: 'Budva', slug: 'budva' },
          ].map(dest => (
            <a key={dest.slug} href={localePath(`/${dest.slug}`)} className="footer__link">
              <MapPin size={12} /> {dest.name}
            </a>
          ))}
        </FooterColumn>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">
          &copy; 2007–{new Date().getFullYear()} {config.name}. All rights reserved.
        </span>
        <div className="footer__bottom-links">
          <a href={localePath('/privacy')} className="footer__bottom-link">{t('footer.privacyPolicy')}</a>
          <a href={localePath('/terms')} className="footer__bottom-link">{t('footer.terms')}</a>
          <a href={localePath('/cookie-policy')} className="footer__bottom-link">{t('footer.cookiePolicy')}</a>
          <a href="/sitemap.xml" className="footer__bottom-link">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
