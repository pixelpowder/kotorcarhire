import '@/src/index.css';
import '@/src/App.css';
import '@/src/ContentPage.css';
import '@/src/BookPage.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { headers } from 'next/headers';
import CookieBanner from '@/src/CookieBanner';
import DynamicLanguageProvider from '@/src/i18n/DynamicLanguageProvider';
import { SUPPORTED_LANGS, DEFAULT_LANG, LANG_HREFLANG } from '@/src/i18n/languages';
import LocaleAwareSchema from '@/src/components/LocaleAwareSchema';

const SITE_TITLE = 'Kotor Car Hire, Bay of Kotor & Old Town Rentals';
const SITE_DESC = 'Explore Kotor\'s walled city and the fjord-like bay by car. Collect at Tivat Airport, just 8 km away, or right outside the medieval gates. From €13/day with full insurance.';
const SITE_URL = 'https://www.kotorcarhire.com';
const SITE_NAME = 'Kotor Car Hire';

export const metadata = {
  title: SITE_TITLE,
  description: SITE_DESC,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['de_DE', 'fr_FR', 'it_IT', 'ru_RU', 'sr_ME'],
    images: [{ url: `${SITE_URL}/hero-bg.webp`, width: 1200, height: 630, alt: SITE_NAME }],
  },
};

async function activeContext() {
  const h = await headers();
  const pathname = h.get('x-pathname') || h.get('x-invoke-path') || '';
  const segs = pathname.replace(/^\//, '').split('/').filter(Boolean);
  let lang = DEFAULT_LANG;
  let rest = segs;
  if (segs[0] && SUPPORTED_LANGS.includes(segs[0]) && segs[0] !== DEFAULT_LANG) {
    lang = segs[0];
    rest = segs.slice(1);
  }
  const isHomepage = rest.length === 0;
  return { lang, isHomepage };
}

export default async function RootLayout({ children }) {
  const { lang, isHomepage } = await activeContext();
  const htmlLang = LANG_HREFLANG[lang] || lang;

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KV9ELT3R9H" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-KV9ELT3R9H');`,
          }}
        />
        <link rel="preload" href="/hero-video.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" />
        <LocaleAwareSchema lang={lang} isHomepage={isHomepage} />
      </head>
      <body>
        <DynamicLanguageProvider initialLang={lang}>
          {children}
          <CookieBanner />
          <Analytics />
          <SpeedInsights />
        </DynamicLanguageProvider>
      </body>
    </html>
  );
}
