import '@/src/index.css';
import '@/src/App.css';
import '@/src/ContentPage.css';
import '@/src/BookPage.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { headers } from 'next/headers';
import DynamicLanguageProvider from '@/src/i18n/DynamicLanguageProvider';
import { SUPPORTED_LANGS, DEFAULT_LANG, LANG_HREFLANG } from '@/src/i18n/languages';
import LocaleAwareSchema from '@/src/components/LocaleAwareSchema';
import ClickIdCapture from '@/src/components/ClickIdCapture';
import { getHeroIdx, getHeroVariant } from '@/src/lib/heroRotation';

const SITE_TITLE = 'Kotor Car Hire, Bay of Kotor & Old Town Rentals';
const SITE_DESC = 'Explore Kotor\'s walled city and the fjord-like bay by car. Collect at Tivat Airport, just 8 km away, or right outside the medieval gates. From €13/day, with insurance options at checkout.';
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
  // x-pathname is set by src/middleware.js. Note: in Next.js 16 with the
  // `src/` directory, middleware MUST live at src/middleware.js — the
  // project-root location used in earlier versions is silently ignored.
  const pathname = h.get('x-pathname') || '';
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
  // Same index the homepage <img> uses (computed per request, homepage is
  // dynamically rendered) so the preload and the rendered hero image match.
  const heroVariant = getHeroVariant(getHeroIdx());

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
        {/* Hero image preload (homepage only). imagesrcset/imagesizes mirror
            the <img srcset/sizes> in App.jsx so the browser picks the SAME
            variant for both preload and consumer: phones get the 1600w mobile
            file, desktop + retina get the 3000w desktop file. One fetch, no
            race, and it's the LCP element so it's worth the early hint. */}
        {isHomepage && (
          <link
            rel="preload"
            as="image"
            href={heroVariant.mobile}
            imageSrcSet={`${heroVariant.mobile} 1600w, ${heroVariant.desktop} 3000w`}
            imageSizes="100vw"
            fetchPriority="high"
          />
        )}
        {/* Warm the connection to LocalRent's CDN ahead of /book.
            preconnect does DNS + TCP + TLS handshake upfront; the
            iframe's app.js (and the CSS/JS chunks it pulls) all live
            on this origin, so one preconnect saves 200-500ms on the
            first request when the user clicks Search Cars / Book.
            dns-prefetch is a fallback for browsers that ignore
            preconnect under resource pressure. */}
        <link rel="preconnect" href="https://static.localrent.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://static.localrent.com" />
        <LocaleAwareSchema lang={lang} isHomepage={isHomepage} />
      </head>
      <body>
        <DynamicLanguageProvider initialLang={lang}>
          <ClickIdCapture />
          {children}
          <Analytics />
          <SpeedInsights />
        </DynamicLanguageProvider>
      </body>
    </html>
  );
}
