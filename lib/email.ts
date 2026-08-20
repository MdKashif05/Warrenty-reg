import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface WarrantyEmailData {
  customerName: string;
  customerEmail: string;
  productName: string;
  serialNumber: string;
  registrationId: string;
  warrantyStatus: string;
  warrantyEndDate: string;
  certificateUrl: string;
}

export async function sendWarrantyConfirmationEmail(
  data: WarrantyEmailData
): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Arial', sans-serif; background: #0a0a0a; color: #e5e5e5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #111; border: 1px solid #1a1a2e; }
        .header { background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #06b6d4; }
        .logo { font-size: 24px; font-weight: 900; color: #fff; letter-spacing: 4px; }
        .logo span { color: #06b6d4; }
        .tagline { font-size: 11px; color: #6b7280; letter-spacing: 3px; margin-top: 4px; }
        .content { padding: 40px; }
        .title { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .subtitle { color: #9ca3af; font-size: 14px; margin-bottom: 32px; }
        .card { background: #1a1a2e; border: 1px solid #1e3a5f; border-radius: 8px; padding: 24px; margin-bottom: 24px; }
        .card-title { font-size: 11px; color: #06b6d4; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; }
        .field { display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #1e293b; }
        .field:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .field-label { color: #6b7280; font-size: 13px; }
        .field-value { color: #fff; font-size: 13px; font-weight: 600; }
        .status-badge { display: inline-block; background: #064e3b; color: #34d399; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .reg-id { background: #0c1929; border: 1px solid #06b6d4; border-radius: 6px; padding: 16px; text-align: center; margin-bottom: 24px; }
        .reg-id-label { font-size: 11px; color: #6b7280; letter-spacing: 2px; margin-bottom: 8px; }
        .reg-id-value { font-size: 20px; font-weight: 700; color: #06b6d4; letter-spacing: 2px; }
        .btn { display: block; text-align: center; background: #06b6d4; color: #000; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px; letter-spacing: 1px; margin-bottom: 24px; }
        .footer { background: #0a0a0a; padding: 24px 40px; text-align: center; border-top: 1px solid #1a1a2e; }
        .footer-text { color: #4b5563; font-size: 12px; line-height: 1.6; }
        .footer-contact { color: #6b7280; font-size: 12px; margin-top: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">THERMAL <span>LEXUM</span></div>
          <div class="tagline">EXTREME THERMAL PERFORMANCE</div>
        </div>
        <div class="content">
          <div class="title">Warranty Registration Confirmed</div>
          <div class="subtitle">Dear ${data.customerName}, your product warranty has been successfully registered.</div>
          
          <div class="reg-id">
            <div class="reg-id-label">REGISTRATION ID</div>
            <div class="reg-id-value">${data.registrationId}</div>
          </div>

          <div class="card">
            <div class="card-title">Product Details</div>
            <div class="field">
              <span class="field-label">Product</span>
              <span class="field-value">${data.productName}</span>
            </div>
            <div class="field">
              <span class="field-label">Serial Number</span>
              <span class="field-value">${data.serialNumber}</span>
            </div>
            <div class="field">
              <span class="field-label">Warranty Status</span>
              <span class="field-value"><span class="status-badge">${data.warrantyStatus}</span></span>
            </div>
            <div class="field">
              <span class="field-label">Valid Until</span>
              <span class="field-value">${data.warrantyEndDate}</span>
            </div>
          </div>

          <a href="${data.certificateUrl}" class="btn">VIEW WARRANTY CERTIFICATE</a>
          
          <p style="color:#6b7280;font-size:13px;line-height:1.6;">
            Keep this email for your records. Your Registration ID is required for any warranty claims or support requests.
          </p>
        </div>
        <div class="footer">
          <div class="footer-text">© 2026 Thermal Lexum. All Rights Reserved.</div>
          <div class="footer-contact">
            info@thermallexum.com | +91 8864-817544<br>
            6th Floor, Southblock, Manipal Center, Dickenson Road, MG Road, Bengaluru - 560042
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: data.customerEmail,
    subject: `Thermal Lexum Warranty Registration Confirmed — ${data.registrationId}`,
    html,
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `[Contact Form] ${data.subject}`,
    html: `
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
}
