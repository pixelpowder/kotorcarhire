'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import useTranslation from '../i18n/useTranslation';
import { useLanguage } from '../i18n/LanguageContext';

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function PriceAlertForm({ pickupLocation = null }) {
  const { t, localePath } = useTranslation();
  const locale = useLanguage();
  const pathname = usePathname();

  // Derive a short location name from the URL slug (e.g. /kotor → "Kotor",
  // /en/herceg-novi → "Herceg Novi"). Falls back to the longer page title
  // (pickupLocation prop) only if no translation matches.
  const slug = pathname?.split('/').filter(Boolean).pop() || '';
  const slugName = slug ? t(`locations.${slug}`) : '';
  const shortLocation = slugName || pickupLocation;
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/price-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          locale,
          pickupLocation,
          pagePath: pathname,
          website,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMsg(data.error === 'Invalid email' ? t('priceAlert.invalidEmail') : t('priceAlert.error'));
        return;
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMsg(t('priceAlert.error'));
    }
  };

  return (
    <div className="sidebar-card sidebar-card--alert">
      <h3 className="sidebar-card__title">
        <BellIcon />
        {t('priceAlert.title').replace('{year}', new Date().getFullYear())}
      </h3>
      {status === 'success' ? (
        <p className="price-alert__success">
          <CheckIcon />
          <span>{t('priceAlert.success')}</span>
        </p>
      ) : (
        <>
          <p className="sidebar-card__text">
            {shortLocation
              ? t('priceAlert.textFor').replace('{location}', shortLocation)
              : t('priceAlert.text')}
          </p>
          <form onSubmit={onSubmit} noValidate>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('priceAlert.placeholder')}
              aria-label={t('priceAlert.placeholder')}
              className="price-alert__input"
            />
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="price-alert__honeypot"
              aria-hidden="true"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="sidebar-card__btn"
              style={{ width: '100%' }}
            >
              {status === 'loading' ? t('priceAlert.submitting') : t('priceAlert.submit')}
            </button>
            {status === 'error' && <p className="price-alert__error">{errorMsg}</p>}
            <p className="price-alert__consent">
              {t('priceAlert.consentShort')}{' '}
              <a href={localePath('/privacy')}>{t('priceAlert.privacyLink')}</a>
            </p>
          </form>
        </>
      )}
    </div>
  );
}
