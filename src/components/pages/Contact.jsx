'use client';
import useTranslation from '@/src/i18n/useTranslation';
import Nav from '@/src/Nav';
import Footer from '@/src/Footer';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import config from '@/src/siteConfig';

export default function Contact() {
  const { t, localePath } = useTranslation();

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <div className="content-page" style={{ paddingTop: '120px', flex: 1 }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 0' }}>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>
              Contact Us
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--gray-600)', marginBottom: '40px', lineHeight: 1.6 }}>
              Have a question about renting a car in Montenegro? Get in touch and we'll help you find the perfect vehicle for your trip.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <a href={`mailto:${config.email}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px', background: 'var(--gray-50)', borderRadius: '12px', textDecoration: 'none', color: 'var(--navy)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '2px' }}>Email</div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{config.email}</div>
                </div>
              </a>

              <a href={`https://wa.me/38269000000?text=Hi!%20I%27d%20like%20to%20enquire%20about%20renting%20a%20car%20in%20Montenegro.`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px', background: 'var(--gray-50)', borderRadius: '12px', textDecoration: 'none', color: 'var(--navy)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '2px' }}>WhatsApp</div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Chat with us</div>
                </div>
              </a>
            </div>

            <div style={{ padding: '32px', background: 'var(--gray-50)', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', marginBottom: '20px' }}>Send us a message</h2>
              <form action={`mailto:${config.email}`} method="POST" encType="text/plain" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="text" name="name" placeholder="Your name" required style={{ padding: '14px 16px', border: '1px solid var(--gray-200)', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit' }} />
                <input type="email" name="email" placeholder="Your email" required style={{ padding: '14px 16px', border: '1px solid var(--gray-200)', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit' }} />
                <textarea name="message" placeholder="How can we help?" rows={4} required style={{ padding: '14px 16px', border: '1px solid var(--gray-200)', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', resize: 'vertical' }} />
                <button type="submit" style={{ padding: '14px 28px', background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 'var(--radius-pill)', fontSize: '15px', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start' }}>
                  Send Message
                </button>
              </form>
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
