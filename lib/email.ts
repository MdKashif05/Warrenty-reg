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

// ─── Shared HTML helpers ───────────────────────────────────────────────────────

function emailShell(body: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body{font-family:'Arial',sans-serif;background:#f1f5f9;color:#0f172a;margin:0;padding:20px}
    .wrapper{max-width:600px;margin:0 auto}
    .container{background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)}
    .header{background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);padding:36px 40px 28px;text-align:center;border-bottom:3px solid #0284c7}
    .logo{font-size:22px;font-weight:900;color:#fff;letter-spacing:4px}
    .logo span{color:#38bdf8}
    .tagline{font-size:10px;color:#64748b;letter-spacing:3px;margin-top:4px;text-transform:uppercase}
    .content{padding:36px 40px}
    .title{font-size:20px;font-weight:700;color:#0f172a;margin-bottom:6px}
    .subtitle{color:#64748b;font-size:14px;margin-bottom:28px;line-height:1.5}
    .card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:20px}
    .card-title{font-size:10px;color:#0284c7;letter-spacing:2px;text-transform:uppercase;font-weight:700;margin-bottom:14px}
    .field{display:flex;justify-content:space-between;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #e2e8f0;flex-wrap:wrap;gap:4px}
    .field:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
    .field-label{color:#64748b;font-size:13px}
    .field-value{color:#0f172a;font-size:13px;font-weight:600;text-align:right}
    .id-box{background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;text-align:center;margin-bottom:20px}
    .id-label{font-size:10px;color:#64748b;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px}
    .id-value{font-size:22px;font-weight:900;color:#0284c7;letter-spacing:2px;font-family:monospace}
    .btn{display:block;text-align:center;background:linear-gradient(135deg,#0284c7,#2563eb);color:#fff!important;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:1px;margin-bottom:20px}
    .badge-active{background:#dcfce7;color:#15803d;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600}
    .badge-pending{background:#fef9c3;color:#92400e;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600}
    .footer{background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0}
    .footer-text{color:#94a3b8;font-size:12px;line-height:1.6}
    @media(max-width:600px){.content{padding:24px 20px}.header{padding:24px 20px}.footer{padding:16px 20px}.field{flex-direction:column}.field-value{text-align:left}}
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo">THERMAL <span>LEXUM</span></div>
        <div class="tagline">Extreme Thermal Performance</div>
      </div>
      ${body}
      <div class="footer">
        <div class="footer-text">
          © ${new Date().getFullYear()} Thermal Lexum. All Rights Reserved.<br>
          info@thermallexum.com | +91 8864-817544<br>
          6th Floor, Southblock, Manipal Center, Dickenson Road, MG Road, Bengaluru - 560042
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ─── 1. Warranty Registration Confirmed ───────────────────────────────────────

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
  const body = `
    <div class="content">
      <div class="title">Warranty Registration Confirmed ✅</div>
      <div class="subtitle">Dear ${data.customerName}, your product warranty has been successfully registered.</div>
      <div class="id-box">
        <div class="id-label">Registration ID</div>
        <div class="id-value">${data.registrationId}</div>
      </div>
      <div class="card">
        <div class="card-title">Product Details</div>
        <div class="field"><span class="field-label">Product</span><span class="field-value">${data.productName}</span></div>
        <div class="field"><span class="field-label">Serial Number</span><span class="field-value">${data.serialNumber}</span></div>
        <div class="field"><span class="field-label">Warranty Status</span><span class="field-value"><span class="badge-active">${data.warrantyStatus}</span></span></div>
        <div class="field"><span class="field-label">Valid Until</span><span class="field-value">${data.warrantyEndDate}</span></div>
      </div>
      <a href="${data.certificateUrl}" class="btn">VIEW WARRANTY CERTIFICATE</a>
      <p style="color:#64748b;font-size:13px;line-height:1.6;">Keep this email for your records. Your Registration ID is required for any warranty claims or support requests.</p>
    </div>`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: data.customerEmail,
    subject: `Thermal Lexum Warranty Registration Confirmed — ${data.registrationId}`,
    html: emailShell(body),
  });
}

// ─── 2. Order Confirmation ─────────────────────────────────────────────────────

interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  orderId: string;
  items: { name: string; variant?: string; qty: number; price: number }[];
  totalAmount: number;
  shippingAddress: string;
  warrantyRegUrl: string;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData): Promise<void> {
  const itemsHtml = data.items
    .map(
      (item) => `
      <div class="field">
        <span class="field-label">${item.name}${item.variant ? ` (${item.variant})` : ""} × ${item.qty}</span>
        <span class="field-value">₹${((item.price * item.qty) / 100).toLocaleString("en-IN")}</span>
      </div>`
    )
    .join("");

  const body = `
    <div class="content">
      <div class="title">Order Confirmed! 🎉</div>
      <div class="subtitle">Thank you ${data.customerName}! Your order has been placed and will be processed shortly.</div>
      <div class="id-box">
        <div class="id-label">Order ID</div>
        <div class="id-value">${data.orderId}</div>
      </div>
      <div class="card">
        <div class="card-title">Order Summary</div>
        ${itemsHtml}
        <div class="field" style="border-top:2px solid #0284c7;margin-top:10px;padding-top:10px">
          <span class="field-label" style="font-weight:700;color:#0f172a">Total Paid</span>
          <span class="field-value" style="font-size:16px;color:#0284c7">₹${(data.totalAmount / 100).toLocaleString("en-IN")}</span>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Shipping To</div>
        <p style="color:#0f172a;font-size:13px;line-height:1.6;margin:0">${data.shippingAddress}</p>
      </div>
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:20px;margin-bottom:20px">
        <div style="font-weight:700;color:#1e40af;margin-bottom:8px;font-size:14px">🛡️ Register Your Warranty</div>
        <p style="color:#64748b;font-size:13px;margin:0 0 12px">Your product comes with a warranty. Click below to register it — all fields are pre-filled for you!</p>
        <a href="${data.warrantyRegUrl}" class="btn" style="margin-bottom:0">REGISTER WARRANTY NOW</a>
      </div>
      <p style="color:#64748b;font-size:13px;line-height:1.6;">You can also register your warranty later from your account at <a href="${process.env.NEXT_PUBLIC_SITE_URL}/account" style="color:#0284c7">My Account</a>.</p>
    </div>`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: data.customerEmail,
    subject: `Order Confirmed: ${data.orderId} — Thermal Lexum`,
    html: emailShell(body),
  });
}

// ─── 3. Post-Purchase Warranty Registration Reminder ─────────────────────────

interface PostPurchaseEmailData {
  customerName: string;
  customerEmail: string;
  orderId: string;
  productName: string;
  warrantyRegUrl: string;
}

export async function sendPostPurchaseWarrantyEmail(data: PostPurchaseEmailData): Promise<void> {
  const body = `
    <div class="content">
      <div class="title">Register Your Warranty 🛡️</div>
      <div class="subtitle">Hi ${data.customerName}! Thank you for purchasing <strong>${data.productName}</strong>. Register your warranty in seconds — we've pre-filled everything for you!</div>
      <div class="card">
        <div class="card-title">Your Order</div>
        <div class="field"><span class="field-label">Order ID</span><span class="field-value" style="color:#0284c7;font-family:monospace">${data.orderId}</span></div>
        <div class="field"><span class="field-label">Product</span><span class="field-value">${data.productName}</span></div>
      </div>
      <div style="text-align:center;margin:24px 0 8px">
        <div style="font-size:13px;color:#64748b;margin-bottom:12px">Takes less than 30 seconds ⚡</div>
        <a href="${data.warrantyRegUrl}" class="btn">ACTIVATE MY WARRANTY</a>
      </div>
      <p style="color:#64748b;font-size:13px;line-height:1.6;">All your details are already filled in — just verify and confirm. Your warranty will be activated instantly!</p>
    </div>`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: data.customerEmail,
    subject: `Activate Your Warranty — ${data.orderId} | Thermal Lexum`,
    html: emailShell(body),
  });
}

// ─── 4. Warranty Claim Confirmation ───────────────────────────────────────────

interface ClaimEmailData {
  customerName: string;
  customerEmail: string;
  claimId: string;
  registrationId: string;
  productName: string;
  issueType: string;
}

export async function sendWarrantyClaimEmail(data: ClaimEmailData): Promise<void> {
  const body = `
    <div class="content">
      <div class="title">Warranty Claim Received 📋</div>
      <div class="subtitle">Dear ${data.customerName}, we have received your warranty claim and will review it within 24–48 hours.</div>
      <div class="id-box">
        <div class="id-label">Claim ID</div>
        <div class="id-value">${data.claimId}</div>
      </div>
      <div class="card">
        <div class="card-title">Claim Details</div>
        <div class="field"><span class="field-label">Registration ID</span><span class="field-value">${data.registrationId}</span></div>
        <div class="field"><span class="field-label">Product</span><span class="field-value">${data.productName}</span></div>
        <div class="field"><span class="field-label">Issue Type</span><span class="field-value">${data.issueType}</span></div>
        <div class="field"><span class="field-label">Status</span><span class="field-value"><span class="badge-pending">UNDER REVIEW</span></span></div>
      </div>
      <p style="color:#64748b;font-size:13px;line-height:1.6;">Our team will review your claim and get back to you via email. Please keep your Claim ID handy for future reference.</p>
    </div>`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: data.customerEmail,
    subject: `Warranty Claim Received: ${data.claimId} — Thermal Lexum`,
    html: emailShell(body),
  });
}

// ─── 5. Customer OTP Email ─────────────────────────────────────────────────────

export async function sendOTPEmail(
  email: string,
  name: string,
  otp: string
): Promise<void> {
  const body = `
    <div class="content">
      <div class="title">Your Login OTP 🔐</div>
      <div class="subtitle">Hi ${name}! Use the OTP below to log in to your Thermal Lexum account. It expires in 10 minutes.</div>
      <div class="id-box">
        <div class="id-label">One-Time Password</div>
        <div class="id-value" style="font-size:36px;letter-spacing:8px">${otp}</div>
      </div>
      <p style="color:#64748b;font-size:13px;line-height:1.6;">If you did not request this OTP, please ignore this email. Never share your OTP with anyone.</p>
    </div>`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Your Thermal Lexum OTP: ${otp}`,
    html: emailShell(body),
  });
}

// ─── 6. Contact Notification ──────────────────────────────────────────────────

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

// ─── 7. Bulk Campaign Email ────────────────────────────────────────────────────

export async function sendBulkCampaignEmail(
  emails: string[],
  subject: string,
  bodyHtml: string
): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;

  for (const email of emails) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject,
        html: emailShell(`<div class="content">${bodyHtml}</div>`),
      });
      sent++;
      // Small delay to avoid SMTP rate limits
      await new Promise((r) => setTimeout(r, 100));
    } catch {
      failed++;
    }
  }

  return { sent, failed };
}
