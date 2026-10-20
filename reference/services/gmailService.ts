import { ChildRegistration } from '../types';

/**
 * Encodes a UTF-8 string into RFC 4648 Base64URL string (safe for Gmail API)
 */
function base64UrlEncode(str: string): string {
  // Convert utf-8 string to bytes then to base64
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Builds the HTML content for the TATI ChildSave welcome email
 */
export function buildWelcomeEmailHtml(reg: ChildRegistration): string {
  const pathwayNames = {
    flex: 'TATI Junior Flex (Self-Paced Learning)',
    virtual: 'TATI Academy Virtual (12 Weekly Live Facilitated Cohorts)',
    'in-person': 'TATI Academy In-Person (Saturday Workshops & Market Simulation)',
  };

  const pathwayTitle = pathwayNames[reg.pathway] || 'TATI Junior Experience';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; background-color: #fbf9f6; margin: 0; padding: 24px; color: #1b1c1a; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid #eae8e5; }
    .header { background: linear-gradient(135deg, #003289 0%, #1048b4 100%); color: #ffffff; padding: 36px 32px; text-align: center; }
    .badge { display: inline-block; background: rgba(255,255,255,0.18); color: #6ffbbe; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
    .title { font-size: 26px; font-weight: 800; margin: 0; line-height: 1.3; }
    .subtitle { font-size: 16px; opacity: 0.9; margin-top: 8px; margin-bottom: 0; }
    .content { padding: 32px; }
    .greeting { font-size: 18px; font-weight: 700; color: #003289; margin-bottom: 16px; }
    .paragraph { font-size: 15px; line-height: 1.6; color: #434653; margin-bottom: 16px; }
    .highlight-box { background: #f5f3f0; border-left: 4px solid #fea619; padding: 18px; border-radius: 8px; margin: 24px 0; }
    .info-grid { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .info-grid td { padding: 8px 0; font-size: 14px; border-bottom: 1px solid #efeeeb; }
    .info-label { color: #747684; font-weight: 600; width: 38%; }
    .info-val { color: #1b1c1a; font-weight: 700; }
    .steps-card { background: #eef3ff; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .step-item { display: flex; margin-bottom: 12px; font-size: 14px; line-height: 1.5; color: #1b1c1a; }
    .step-num { background: #1048b4; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: inline-block; text-align: center; line-height: 22px; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0; }
    .cta-btn { display: inline-block; background: #1048b4; color: #ffffff !important; padding: 14px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 15px; margin: 16px 0; }
    .footer { background: #f5f3f0; padding: 24px; text-align: center; font-size: 12px; color: #747684; border-top: 1px solid #eae8e5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">Welcome to the TATI Family</div>
      <h1 class="title">Excited to Have You Join Our Growing Community!</h1>
      <p class="subtitle">Smart money habits start young.</p>
    </div>
    
    <div class="content">
      <p class="greeting">Dear ${reg.parentName},</p>
      
      <p class="paragraph">
        We are absolutely delighted to welcome <strong>${reg.childName}</strong> to <strong>TATI ChildSave</strong>! We are deeply excited to have you join our growing community of forward-thinking African families who believe that practical money capability is one of the greatest gifts we can provide our children.
      </p>

      <div class="highlight-box">
        <strong style="color: #855300; font-size: 15px;">Registration Summary</strong>
        <table class="info-grid">
          <tr>
            <td class="info-label">Learner Name:</td>
            <td class="info-val">${reg.childName} (Age ${reg.childAge})</td>
          </tr>
          <tr>
            <td class="info-label">Selected Pathway:</td>
            <td class="info-val">${pathwayTitle}</td>
          </tr>
          <tr>
            <td class="info-label">Location:</td>
            <td class="info-val">${reg.city}, ${reg.country}</td>
          </tr>
          <tr>
            <td class="info-label">Target Savings Goal:</td>
            <td class="info-val">${reg.savingsGoal || 'First Savings Milestone'}</td>
          </tr>
          <tr>
            <td class="info-label">Kit Delivery Address:</td>
            <td class="info-val">${reg.kitDeliveryAddress || 'Digital enrolment on file'}</td>
          </tr>
        </table>
      </div>

      <div class="steps-card">
        <strong style="color: #003289; font-size: 15px; display: block; margin-bottom: 12px;">What Happens Next:</strong>
        <div class="step-item">
          <span class="step-num">1</span>
          <span><strong>Physical Kit Assembly:</strong> Your child's TATI Junior Kit (Workbook, Money Passport, Wallet & Mission Cards) is being queued for packaging.</span>
        </div>
        <div class="step-item">
          <span class="step-num">2</span>
          <span><strong>Zero Parent Stress:</strong> Remember, you do not have to become the teacher! TATI guides ${reg.childName} through stories and fun choices.</span>
        </div>
        <div class="step-item">
          <span class="step-num">3</span>
          <span><strong>Your Role:</strong> All we ask is 5 to 10 minutes of casual, meaningful conversation during weekly "TATI Talks" over dinner or car rides.</span>
        </div>
      </div>

      <p class="paragraph">
        If you have any questions or would like to connect with fellow parents across our community, our team is always just a message away.
      </p>

      <p class="paragraph" style="margin-top: 24px; font-weight: 600; color: #1b1c1a;">
        Warm regards,<br/>
        <strong style="color: #003289;">The TATI ChildSave Community Team</strong><br/>
        <span style="font-size: 13px; color: #747684;">Accra • Lagos • Nairobi • London</span>
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0 0 6px 0;">© 2024–2026 TATI ChildSave. All rights reserved.</p>
      <p style="margin: 0;">Building Africa's next generation of financially smart and life-ready children.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Sends a personalized welcome email to the registered parent via Gmail API
 */
export async function sendWelcomeEmail(
  accessToken: string,
  reg: ChildRegistration
): Promise<{ id: string; threadId: string }> {
  const htmlBody = buildWelcomeEmailHtml(reg);
  const subject = `Welcome to TATI ChildSave! 🌟 Excited to have ${reg.childName} join our community`;

  const emailLines = [
    `To: ${reg.parentEmail}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    htmlBody,
  ];

  const rawMessage = emailLines.join('\r\n');
  const encodedRaw = base64UrlEncode(rawMessage);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: encodedRaw,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to send welcome email via Gmail API');
  }

  const data = await res.json();
  return data;
}
