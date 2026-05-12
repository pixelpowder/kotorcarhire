import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 3;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown';
}

function isValidIsoDate(s) {
  if (!s) return true;
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return Response.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const {
      email,
      locale = 'en',
      pickupLocation = null,
      dropoffLocation = null,
      pickupDate = null,
      dropoffDate = null,
      pagePath = null,
      website, // honeypot
    } = body || {};

    if (website) return Response.json({ success: true });

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return Response.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (!isValidIsoDate(pickupDate) || !isValidIsoDate(dropoffDate)) {
      return Response.json({ error: 'Invalid date' }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    const site = process.env.SITE_DOMAIN || 'kotorcarhire.com';

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase env not configured');
      return Response.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const normalizedEmail = email.toLowerCase().trim();

    const { error: insertError } = await supabase.from('price_alerts').insert({
      email: normalizedEmail,
      site,
      locale,
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      pickup_date: pickupDate,
      dropoff_date: dropoffDate,
      page_path: pagePath,
    });

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return Response.json({ error: 'Failed to save' }, { status: 500 });
    }

    // Optional admin notification
    const resendKey = process.env.RESEND_API_KEY;
    const notifyTo = process.env.CONTACT_TO_EMAIL;
    if (resendKey && notifyTo) {
      try {
        const resend = new Resend(resendKey);
        const fromName = process.env.MAIL_FROM_NAME || 'Car Hire';
        const fromAddr = process.env.MAIL_FROM || 'noreply@kotorcarhire.com';
        const sitePrefix = process.env.SITE_PREFIX || 'KCH';
        await resend.emails.send({
          from: `${fromName} <${fromAddr}>`,
          to: [notifyTo],
          subject: `[${sitePrefix}] New price alert: ${normalizedEmail}`,
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;">
              <h2 style="color:#05203c;">New price alert signup</h2>
              <table style="border-collapse:collapse;">
                <tr><td style="padding:6px;color:#666;">Email</td><td style="padding:6px;font-weight:600;">${normalizedEmail}</td></tr>
                <tr><td style="padding:6px;color:#666;">Site</td><td style="padding:6px;">${site}</td></tr>
                <tr><td style="padding:6px;color:#666;">Locale</td><td style="padding:6px;">${locale}</td></tr>
                <tr><td style="padding:6px;color:#666;">Pickup</td><td style="padding:6px;">${pickupLocation || '—'} ${pickupDate ? `· ${pickupDate}` : ''}</td></tr>
                <tr><td style="padding:6px;color:#666;">Dropoff</td><td style="padding:6px;">${dropoffLocation || '—'} ${dropoffDate ? `· ${dropoffDate}` : ''}</td></tr>
                <tr><td style="padding:6px;color:#666;">Page</td><td style="padding:6px;">${pagePath || '—'}</td></tr>
              </table>
            </div>`,
        });
      } catch (err) {
        console.error('Notification email failed:', err);
      }
    }

    return Response.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Price alert API error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
