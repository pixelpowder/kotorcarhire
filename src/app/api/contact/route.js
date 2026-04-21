import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, message, website } = await request.json();

    // Honeypot — bots fill hidden "website" field, humans don't see it
    if (website) {
      return Response.json({ success: true });
    }

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email' }, { status: 400 });
    }

    if (message.length > 5000) {
      return Response.json({ error: 'Message too long' }, { status: 400 });
    }

    const sitePrefix = process.env.SITE_PREFIX || 'MNE';
    const fromName = process.env.MAIL_FROM_NAME || 'Montenegro Car Hire';
    const fromAddress = process.env.MAIL_FROM || 'noreply@montenegrocarhire.com';
    const to = process.env.CONTACT_TO_EMAIL;

    if (!to) {
      console.error('CONTACT_TO_EMAIL env var not set');
      return Response.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    const escape = (s) =>
      String(s).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }[c]));

    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromAddress}>`,
      to: [to],
      replyTo: email,
      subject: `[${sitePrefix}] New enquiry from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #05203c; border-bottom: 2px solid #0062e3; padding-bottom: 8px;">New contact form submission</h2>
          <p style="background: #f8f9fa; padding: 12px; border-radius: 6px; color: #495057; font-size: 13px;">
            <strong>Site:</strong> ${escape(sitePrefix)}<br>
            <strong>Name:</strong> ${escape(name)}<br>
            <strong>Email:</strong> <a href="mailto:${escape(email)}">${escape(email)}</a>
          </p>
          <h3 style="color: #05203c; margin-top: 24px;">Message</h3>
          <div style="background: #fff; padding: 16px; border-left: 3px solid #0062e3; color: #212529; line-height: 1.6;">
            ${escape(message).replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 24px; color: #6c757d; font-size: 12px;">
            Reply directly to this email to respond to the customer.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact form error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
