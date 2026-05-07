'use client';
import Nav from '../../Nav';
import Footer from '../../Footer';
import StickyMobileCTA from '../../StickyMobileCTA';
import LocationsMap from '../LocationsMap';
import useTranslation from '../../i18n/useTranslation';
import '../../ContentPage.css';

export default function Locations() {
  const { t, localePath } = useTranslation();
  return (
    <div className="content-page">
      <Nav />
      <div className="content-hero" style={{ background: 'linear-gradient(135deg, #05203c 0%, #0a3257 100%)' }}>
        <div className="content-hero__overlay" />
        <div className="content-hero__text">
          <nav className="breadcrumbs">
            <a href={localePath('/')}>{t('common.home')}</a>
            <span className="breadcrumbs__sep">/</span>
            <span>{t('locations.title')}</span>
          </nav>
          <h1 className="content-hero__title">{t('locations.title')}</h1>
          <p className="content-hero__subtitle">{t('locations.subtitle')}</p>
        </div>
      </div>
      <LocationsMap />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
