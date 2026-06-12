'use client';

// Thin wrapper over gtag('event', ...). window.gtag is set up by the GA4
// loader in layout.jsx (G-LP2CXJV7Z2). Never throws into product paths.
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', name, params);
  } catch {
    // swallow
  }
}
