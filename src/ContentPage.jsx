'use client';
import { usePathname } from 'next/navigation';
import Nav from './Nav';
import Footer from './Footer';
import useTranslation from './i18n/useTranslation';
import './ContentPage.css';

export default function ContentPage({ title, subtitle, image, description, children }) {
  const pathname = usePathname();
  const { t, localePath } = useTranslation();

  return (
    <div className="content-page">
      <Nav />
      <div className="content-hero" style={{ backgroundImage: `url(${image})` }}>
        <div className="content-hero__overlay" />
        <div className="content-hero__text">
          <nav className="breadcrumbs">
            <a href={localePath('/')}>{t('common.home')}</a>
            <span className="breadcrumbs__sep">/</span>
            <span>{title}</span>
          </nav>
          <h1 className="content-hero__title">{title}</h1>
          {subtitle && <p className="content-hero__subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="content-body">
        <div className="content-body__inner">
          {children}
        </div>
        <aside className="content-sidebar">
          <div className="sidebar-card">
            <h3 className="sidebar-card__title">{t('sidebar.bookTitle')}</h3>
            <p className="sidebar-card__text">{t('sidebar.bookText')}</p>
            <a href={localePath('/book')} className="sidebar-card__btn">{t('common.searchCars')}</a>
          </div>
          <div className="sidebar-card">
            <h3 className="sidebar-card__title">{t('sidebar.helpTitle')}</h3>
            <p className="sidebar-card__text">{t('sidebar.helpText')}</p>
            <a href="mailto:info@montenegrocarhire.com" className="sidebar-card__btn sidebar-card__btn--outline">{t('common.emailUs') || 'Email Us'}</a>
          </div>
          <div className="sidebar-card">
            <h3 className="sidebar-card__title">{t('sidebar.popularDest')}</h3>
            <ul className="sidebar-links">
              <li><a href={localePath('/tivat-airport')}>Tivat Airport</a></li>
              <li><a href={localePath('/kotor')}>Kotor</a></li>
              <li><a href={localePath('/budva')}>Budva</a></li>
              <li><a href={localePath('/perast')}>Perast</a></li>
              <li><a href={localePath('/podgorica')}>Podgorica</a></li>
              <li><a href={localePath('/dubrovnik-airport')}>Dubrovnik Airport</a></li>
              <li><a href={localePath('/border-crossing-guide')}>{t('footer.borderGuide')}</a></li>
            </ul>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
