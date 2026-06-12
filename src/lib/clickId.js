'use client';

// Capture and persist paid-traffic click IDs so they survive the journey from
// landing page -> /book -> LocalRent iframe submission. The ID is later read
// from localStorage on /book and forwarded into the widget iframe, which sets
// it as `data-marker` so LocalRent's booking record carries the gclid. Weekly
// dashboard export -> Google Ads Offline Conversion upload then reconciles
// real bookings to the ad click that drove them.
//
// 90-day TTL matches Google Ads' default attribution window; older click IDs
// are dropped so a stale localStorage entry can't credit a fresh booking to a
// long-dead ad click.

const KEY = 'kch_clickid_v1';
const TTL_MS = 90 * 24 * 60 * 60 * 1000;

export function captureClickIds() {
  if (typeof window === 'undefined') return;
  let gclid = null;
  try {
    gclid = new URL(window.location.href).searchParams.get('gclid');
  } catch {
    return;
  }
  if (!gclid) return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ gclid, ts: Date.now() }));
  } catch {
    // Storage quota / private mode — silently skip. Worst case is we lose
    // attribution for this click; the booking still happens.
  }
}

export function getStoredGclid() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const { gclid, ts } = parsed;
    if (!gclid || typeof gclid !== 'string' || typeof ts !== 'number') return null;
    if (Date.now() - ts > TTL_MS) {
      try { localStorage.removeItem(KEY); } catch {}
      return null;
    }
    return gclid;
  } catch {
    return null;
  }
}
