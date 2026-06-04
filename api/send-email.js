import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, crNumber, serviceType, applyDate, username } = req.body;

  // Format dates
  const startDate = new Date(applyDate);
  const expiryDate = new Date(startDate);
  expiryDate.setFullYear(startDate.getFullYear() + 6);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedStartDate = startDate.toLocaleDateString('en-US', options);
  const formattedExpiryDate = expiryDate.toLocaleDateString('en-US', options);

  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: 'Your Starkx Warranty Certificate',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #000000; color: #ffffff; padding: 40px 20px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
          <!-- Header/Logo placeholder styling -->
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #00aeef; font-size: 32px; font-weight: 900; letter-spacing: -1px; margin: 0; text-transform: uppercase; font-style: italic;">STARKX <span style="color: #ffffff;">STUDIOS</span></h1>
            <p style="color: #666666; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; margin-top: 5px; font-weight: 700;">Official Warranty Certificate</p>
          </div>

          <div style="background-color: #0d0d0d; border: 1px solid #222222; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
            <p style="color: #888888; font-size: 14px; margin-top: 0;">Dear Customer,</p>
            <p style="color: #cccccc; font-size: 15px; line-height: 1.6;">
              Thank you for choosing Starkx protective films. Your official warranty has been successfully registered by our certified studio: 
              <strong style="color: #00aeef;">${username}</strong>.
            </p>

            <div style="margin: 30px 0; border-top: 1px solid #222222; pt-30px;">
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 10px 0; color: #666666; font-size: 12px; text-transform: uppercase; font-weight: 700; width: 40%;">CR Number</td>
                  <td style="padding: 10px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${crNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666666; font-size: 12px; text-transform: uppercase; font-weight: 700;">Applied Product</td>
                  <td style="padding: 10px 0; color: #00aeef; font-size: 14px; font-weight: 600;">${serviceType}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666666; font-size: 12px; text-transform: uppercase; font-weight: 700;">Warranty Start Date</td>
                  <td style="padding: 10px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${formattedStartDate}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666666; font-size: 12px; text-transform: uppercase; font-weight: 700;">Warranty Expiry Date</td>
                  <td style="padding: 10px 0; color: #00ff66; font-size: 14px; font-weight: 600;">${formattedExpiryDate} (6 Years)</td>
                </tr>
              </table>
            </div>
          </div>

          <div style="text-align: center; border-top: 1px solid #1a1a1a; padding-top: 30px; margin-top: 30px;">
            <p style="color: #444444; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">
              Securely issued via Starkx.Pro protection system
            </p>
          </div>
        </div>
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
