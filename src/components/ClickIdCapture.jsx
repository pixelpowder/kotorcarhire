'use client';
import { useEffect } from 'react';
import { captureClickIds } from '@/src/lib/clickId';

// Mounts in the root layout so it runs on every landing. Captures ?gclid= from
// the URL into localStorage (key kch_clickid_v1) so the booking iframe
// (same-origin /widget.html) can read it and bake it into LocalRent's
// data-marker for Google Ads offline-conversion attribution. Renders nothing.
export default function ClickIdCapture() {
  useEffect(() => {
    captureClickIds();
  }, []);
  return null;
}
