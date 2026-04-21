'use client';
import { useState } from 'react';
import useTranslation from '@/src/i18n/useTranslation';
import Nav from '@/src/Nav';
import Footer from '@/src/Footer';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import config from '@/src/siteConfig';

export default function Contact() {
  const { t, localePath } = useTranslation();
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      website: formData.get('website'), // honeypot
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please email us directly.');
        return;
      }

      setStatus('success');
      e.target.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please try again or email us directly.');
    }
  };

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <div className="content-page" style={{ paddingTop: '120px', flex: 1 }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 0' }}>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>{t('contact.heading')}</h1>
            <p style={{ fontSize: '16px', color: 'var(--gray-600)', marginBottom: '40px', lineHeight: 1.6 }}>{t('contact.intro')}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <a href={`mailto:${config.email}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px', background: 'var(--gray-50)', borderRadius: '12px', textDecoration: 'none', color: 'var(--navy)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '2px' }}>{t('contact.emailLabel')}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{config.email}</div>
                </div>
              </a>

              <a href={`https://wa.me/38269000000?text=Hi!%20I%27d%20like%20to%20enquire%20about%20renting%20a%20car%20in%20Montenegro.`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px', background: 'var(--gray-50)', borderRadius: '12px', textDecoration: 'none', color: 'var(--navy)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '2px' }}>{t('contact.whatsappLabel')}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{t('contact.chatCta')}</div>
                </div>
              </a>
            </div>

            <div style={{ padding: '32px', background: 'var(--gray-50)', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', marginBottom: '20px' }}>{t('contact.formHeading')}</h2>

              {status === 'success' ? (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '20px', background: '#e8f6ef', border: '1px solid #a8d8bd', borderRadius: '12px' }}>
                  <CheckCircle2 size={24} style={{ color: '#0f7a3c', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f7a3c', marginBottom: '4px' }}>Message sent!</div>
                    <div style={{ fontSize: '14px', color: '#495057', lineHeight: 1.5 }}>Thanks for getting in touch — we'll reply within a few hours.</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input type="text" name="name" placeholder={t('contact.nameLabel')} required disabled={status === 'sending'} style={{ padding: '14px 16px', border: '1px solid var(--gray-200)', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit' }} />
                  <input type="email" name="email" placeholder={t('contact.emailFieldLabel')} required disabled={status === 'sending'} style={{ padding: '14px 16px', border: '1px solid var(--gray-200)', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit' }} />
                  <textarea name="message" placeholder={t('contact.messagePlaceholder')} rows={4} required disabled={status === 'sending'} style={{ padding: '14px 16px', border: '1px solid var(--gray-200)', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', resize: 'vertical' }} />
                  {/* Honeypot field — hidden from humans, bots fill it */}
                  <input type="text" name="website" tabIndex="-1" autoComplete="off" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} aria-hidden="true" />

                  {status === 'error' && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: '#fde8e8', border: '1px solid #f5a6a6', borderRadius: '8px', color: '#9b1c1c', fontSize: '14px' }}>
                      <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button type="submit" disabled={status === 'sending'} style={{ padding: '14px 28px', background: status === 'sending' ? 'var(--gray-500)' : 'var(--blue)', color: '#fff', border: 'none', borderRadius: 'var(--radius-pill)', fontSize: '15px', fontWeight: 700, cursor: status === 'sending' ? 'wait' : 'pointer', alignSelf: 'flex-start', transition: 'background 0.2s' }}>
                    {status === 'sending' ? 'Sending…' : t('contact.sendButton')}
                  </button>
                </form>
              )}
            </div>

            <div style={{ marginTop: '32px', textAlign: 'center', color: 'var(--gray-500)', fontSize: '14px' }}>
              <MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> {config.address}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
