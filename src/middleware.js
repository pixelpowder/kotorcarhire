// Expose the request pathname via a custom header so the root layout
// (which has no access to route params) can derive the active locale for
// <html lang="..."> and JSON-LD schema markup.
//
// Also handles 301 redirects for any retired car slugs that were previously
// linked or indexed — points visitors to a live car of similar character.

import { NextResponse } from 'next/server';

// Old slug → new slug mapping. The lookup is lang-aware so
// /de/cars/skoda-octavia → /de/cars/vw-golf rather than /cars/vw-golf.
const RETIRED_CARS = {
  'skoda-octavia':   'vw-golf',
  'toyota-corolla':  'toyota-yaris',
  'mercedes-c-class':'vw-golf',
  'jeep-renegade':   'kia-stonic',
  'bmw-x3':          'kia-stonic',
  'dacia-duster':    'kia-stonic',
  // vw-transporter → send to the fleet index (no van in the cruise-day set)
  'vw-transporter':  null,
};

const LANGS = ['en', 'de', 'ru', 'it', 'fr', 'me'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Expect either /cars/{slug} or /{lang}/cars/{slug}
  const parts = pathname.split('/').filter(Boolean);
  let langPrefix = '';
  let rest = parts;
  if (parts[0] && LANGS.includes(parts[0]) && parts[0] !== 'en') {
    langPrefix = `/${parts[0]}`;
    rest = parts.slice(1);
  }
  if (rest[0] === 'cars' && rest[1] && RETIRED_CARS.hasOwnProperty(rest[1])) {
    const replacement = RETIRED_CARS[rest[1]];
    const dest = replacement
      ? `${langPrefix}/cars/${replacement}`
      : `${langPrefix}/cars`;
    const url = request.nextUrl.clone();
    url.pathname = dest;
    return NextResponse.redirect(url, 301);
  }

  const res = NextResponse.next();
  res.headers.set('x-pathname', pathname);
  return res;
}

export const config = {
  matcher: [
    // Skip static assets, API routes, and internal Next paths
    '/((?!api|_next|favicon|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
