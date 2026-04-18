// Expose the request pathname via a custom header so the root layout
// (which has no access to route params) can derive the active locale for
// <html lang="..."> and JSON-LD schema markup.

import { NextResponse } from 'next/server';

export function middleware(request) {
  const res = NextResponse.next();
  res.headers.set('x-pathname', request.nextUrl.pathname);
  return res;
}

export const config = {
  matcher: [
    // Skip static assets, API routes, and internal Next paths
    '/((?!api|_next|favicon|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
