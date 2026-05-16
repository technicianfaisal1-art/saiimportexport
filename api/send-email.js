export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not found in env');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const { to, name, email, phone, company, country, products, message, subject, source } = req.body;

    console.log('send-email called with:', { to, name, email: email?.substring(0, 5) + '...', source });

    if (!to || !name || !email) {
      console.error('Missing required fields:', { to: !!to, name: !!name, email: !!email });
      return res.status(400).json({ error: 'Missing required fields: to, name, email' });
    }

    // Build beautiful HTML email for admin
    const adminHtml = `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#2d5a3c,#1a3a2a);padding:30px;text-align:center;">
          <h1 style="color:#c87533;margin:0;font-size:22px;">🌾 New Inquiry Received</h1>
          <p style="color:#aacfb6;margin:8px 0 0;font-size:14px;">${source || 'Website Contact Form'}</p>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 12px;background:#fff;border:1px solid #e5e7eb;font-weight:600;width:140px;color:#2d5a3c;">Name</td><td style="padding:10px 12px;background:#fff;border:1px solid #e5e7eb;">${name}</td></tr>
            <tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;color:#2d5a3c;">Email</td><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:10px 12px;background:#fff;border:1px solid #e5e7eb;font-weight:600;color:#2d5a3c;">Phone</td><td style="padding:10px 12px;background:#fff;border:1px solid #e5e7eb;">${phone}</td></tr>` : ''}
            ${company ? `<tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;color:#2d5a3c;">Company</td><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;">${company}</td></tr>` : ''}
            ${country ? `<tr><td style="padding:10px 12px;background:#fff;border:1px solid #e5e7eb;font-weight:600;color:#2d5a3c;">Country</td><td style="padding:10px 12px;background:#fff;border:1px solid #e5e7eb;">${country}</td></tr>` : ''}
            ${products ? `<tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;color:#2d5a3c;">Products</td><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;">${products}</td></tr>` : ''}
            ${message ? `<tr><td style="padding:10px 12px;background:#fff;border:1px solid #e5e7eb;font-weight:600;color:#2d5a3c;">Message</td><td style="padding:10px 12px;background:#fff;border:1px solid #e5e7eb;">${message}</td></tr>` : ''}
          </table>
          <p style="margin-top:20px;font-size:13px;color:#888;text-align:center;">Sent from saiimportexport.vercel.app</p>
        </div>
      </div>
    `;

    // Build auto-response email for buyer
    const buyerHtml = `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#2d5a3c,#1a3a2a);padding:30px;text-align:center;border-radius:16px 16px 0 0;">
          <h1 style="color:#c87533;margin:0;font-size:22px;">🌾 SAI Import Export Agro</h1>
          <p style="color:#aacfb6;margin:8px 0 0;">Premium Indian Rice Exporter</p>
        </div>
        <div style="padding:24px;background:#fff;border-radius:0 0 16px 16px;border:1px solid #e5e7eb;border-top:0;">
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for your interest in our products! 🍚</p>
          <p>We have received your inquiry and our export team is reviewing your requirements. You will receive a detailed Proforma Invoice (PI) within <strong>24 hours</strong> with:</p>
          <ul>
            <li>✅ FOB / CIF pricing for your destination port</li>
            <li>✅ Product specifications &amp; packaging options</li>
            <li>✅ Payment terms (LC / T/T)</li>
            <li>✅ Estimated shipping schedule</li>
          </ul>
          <p>For urgent inquiries, contact us directly:</p>
          <p>📧 <a href="mailto:saiimportexportagro0@gmail.com">saiimportexportagro0@gmail.com</a><br>📞 <a href="https://wa.me/918595827184">+91 85958 27184 (WhatsApp)</a></p>
          <p style="margin-top:20px;">Warm regards,<br><strong>SAI Import Export Agro Export Team</strong></p>
        </div>
      </div>
    `;

    // Send email to admin
    console.log('Sending admin email to:', to);
    const adminPayload = {
      from: 'SAI Import Export Agro <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      subject: subject || `🍚 New Inquiry from ${name}`,
      html: adminHtml
    };

    const adminResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(adminPayload)
    });

    const adminResult = await adminResponse.json();
    console.log('Admin email response:', adminResponse.status, JSON.stringify(adminResult));

    if (!adminResponse.ok) {
      return res.status(500).json({ error: 'Failed to send admin email', details: adminResult });
    }

    // Send auto-response to buyer (non-blocking, don't fail if this errors)
    try {
      const buyerPayload = {
        from: 'SAI Import Export Agro <onboarding@resend.dev>',
        to: [email],
        subject: `Thank you for contacting SAI Import Export Agro! 🌾`,
        html: buyerHtml
      };

      const buyerResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(buyerPayload)
      });
      const buyerResult = await buyerResponse.json();
      console.log('Buyer email response:', buyerResponse.status, JSON.stringify(buyerResult));
    } catch (buyerErr) {
      console.error('Buyer auto-response failed (non-critical):', buyerErr.message);
    }

    return res.status(200).json({ success: true, message: 'Inquiry sent successfully' });
  } catch (error) {
    console.error('Email error:', error.message || error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
