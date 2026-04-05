'use client';
import Nav from '../../Nav';
import Footer from '../../Footer';
import { ArrowRight, MapPin } from 'lucide-react';
import useTranslation from '../../i18n/useTranslation';
import '../../App.css';

export default function NotFound() {
  const { t, localePath } = useTranslation();

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <div className="not-found">
        <div className="not-found__code">404</div>
        <h1 className="not-found__title">{t('notFound.title')}</h1>
        <p className="not-found__text">{t('notFound.text')}</p>
        <div className="not-found__actions">
          <a href={localePath('/')} className="cta-btn--primary" style={{ textDecoration: 'none' }}>
            <MapPin size={16} /> {t('notFound.backHome')}
          </a>
          <a href={localePath('/book')} className="not-found__link">
            {t('notFound.searchCars')} <ArrowRight size={14} />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
