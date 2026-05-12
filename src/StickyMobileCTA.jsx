'use client';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import useTranslation from './i18n/useTranslation';

export default function StickyMobileCTA() {
  const { t, localePath } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`sticky-cta${visible ? ' sticky-cta--visible' : ''}`}>
      <a href={localePath('/book')} className="sticky-cta__btn">
        {t('common.bookNow')} <ArrowRight size={16} />
      </a>
    </div>
  );
}
