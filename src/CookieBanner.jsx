'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import useTranslation from './i18n/useTranslation';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { localePath } = useTranslation();

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p className="cookie-banner__text">
        We use cookies to improve your experience. By continuing to use this site you agree to our{' '}
        <a href={localePath('/cookie-policy')}>Cookie Policy</a>.
      </p>
      <div className="cookie-banner__actions">
        <button className="cookie-banner__accept" onClick={accept}>Accept</button>
        <button className="cookie-banner__decline" onClick={decline}>Decline</button>
      </div>
      <button className="cookie-banner__close" onClick={decline} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
}
