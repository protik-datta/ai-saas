const BRAND = {
  name: "Creator Studio",
  color: "#f59e0b",
  colorDark: "#d97706",
  dark: "#111827",
  url: process.env.CLIENT_URL || "https://creatorstudio.com",
};

// shared shell
const shell = ({ preheader = "", title = "", body = "" }) => `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>${title} — Creator Studio</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
    table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}
    a[x-apple-data-detectors],u+#body a,#MessageViewBody a{
      color:inherit!important;text-decoration:none!important;
      font-size:inherit!important;font-family:inherit!important;
      font-weight:inherit!important;line-height:inherit!important
    }
  </style>
</head>
<body id="body" style="margin:0;padding:0;background-color:#f3f4f6;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- preheader -->
  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;color:#f3f4f6;mso-hide:all;">
    ${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f3f4f6;">
    <tr>
      <td align="center" style="padding:40px 16px 48px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-right:8px;vertical-align:middle;">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
                      <rect width="28" height="28" rx="8" fill="#111827"/>
                      <polygon points="10,8 20,14 10,20" fill="#f59e0b"/>
                    </svg>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:#111827;letter-spacing:-0.01em;">Creator Studio</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:12px;border:1px solid #e5e7eb;">
              <!-- Amber top accent -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="height:3px;background:#f59e0b;border-radius:12px 12px 0 0;"></td>
                </tr>
              </table>
              <!-- Card content slot -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding:36px 40px 40px;">
                    ${body}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;" align="center">
              <p style="margin:0 0 8px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;color:#9ca3af;">
                <a href="#" style="color:#9ca3af;text-decoration:none;margin:0 8px;">Privacy</a>
                <span style="color:#d1d5db;">·</span>
                <a href="#" style="color:#9ca3af;text-decoration:none;margin:0 8px;">Terms</a>
                <span style="color:#d1d5db;">·</span>
                <a href="#" style="color:#9ca3af;text-decoration:none;margin:0 8px;">Help</a>
              </p>
              <p style="margin:0;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#d1d5db;line-height:1.6;">
                © 2026 Creator Studio, Inc. · San Francisco, CA<br>
                You're receiving this because you signed up at creatorstudio.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// reuseable partials

/** Renders 6 OTP digit boxes */
const otpBoxes = (digits) => {
  const neutralStyle =
    "width:54px;height:64px;background:#f9fafb;border:1.5px solid #d1d5db;border-radius:10px;text-align:center;line-height:64px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:30px;font-weight:700;color:#111827;";
  const accentStyle =
    "width:54px;height:64px;background:#fffbeb;border:2px solid #f59e0b;border-radius:10px;text-align:center;line-height:64px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:30px;font-weight:700;color:#d97706;";

  return [
    '<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>',
    '<td style="padding-right:6px;"><div style="' +
      neutralStyle +
      '">' +
      digits[0] +
      "</div></td>",
    '<td style="padding-right:6px;"><div style="' +
      neutralStyle +
      '">' +
      digits[1] +
      "</div></td>",
    '<td style="padding-right:14px;"><div style="' +
      neutralStyle +
      '">' +
      digits[2] +
      "</div></td>",
    '<td style="padding-right:14px;vertical-align:middle;"><div style="width:10px;height:2px;background:#d1d5db;border-radius:2px;"></div></td>',
    '<td style="padding-right:6px;"><div style="' +
      accentStyle +
      '">' +
      digits[3] +
      "</div></td>",
    '<td style="padding-right:6px;"><div style="' +
      accentStyle +
      '">' +
      digits[4] +
      "</div></td>",
    '<td><div style="' + accentStyle + '">' + digits[5] + "</div></td>",
    "</tr></table>",
  ].join("\n");
};

/** Standard CTA button */
const ctaButton = (label, href) => `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td style="background:#111827;border-radius:8px;">
        <a href="${href}" target="_blank" style="display:inline-block;padding:13px 28px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;white-space:nowrap;letter-spacing:0.01em;">${label}</a>
      </td>
    </tr>
  </table>`;

/** Section divider */
const divider = `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr><td style="border-top:1px solid #f3f4f6;padding:24px 0 0;"></td></tr>
  </table>`;

/** Info / warning callout box */
const callout = (text, type = "info") => {
  const colors = {
    info: { bg: "#f9fafb", border: "#e5e7eb", text: "#6b7280" },
    warning: { bg: "#fffbeb", border: "#fde68a", text: "#92400e" },
    danger: { bg: "#fff1f2", border: "#fecdd3", text: "#9f1239" },
  };
  const c = colors[type] || colors.info;
  return `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
    style="background:${c.bg};border:1px solid ${c.border};border-radius:8px;margin-top:20px;">
    <tr>
      <td style="padding:14px 16px;">
        <p style="margin:0;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;line-height:1.6;color:${c.text};">${text}</p>
      </td>
    </tr>
  </table>`;
};

// verify registration
const verifyRegistration = ({ to, otp }) => {
  const digits = otp.toString().split("");
  const subject = "Verify your email — Creator Studio";
  const text = `Your Creator Studio verification code is ${otp}. Valid for 10 minutes.`;

  const body = `
    <h2 style="margin:0 0 6px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:#111827;letter-spacing:-0.02em;">Verify your email</h2>
    <p style="margin:0 0 28px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:1.65;color:#6b7280;">
      Enter the code below to confirm your email address and activate your Creator Studio account.
    </p>

    <p style="margin:0 0 10px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Verification code</p>

    ${otpBoxes(digits)}

    <p style="margin:12px 0 0;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12.5px;color:#9ca3af;">
      ⏱ Expires in <strong style="color:#6b7280;">10 minutes</strong>
    </p>

    ${divider}

    ${callout("Didn't create an account? You can safely ignore this email — nothing has changed.", "info")}
  `;

  const html = shell({
    preheader: `Your code is ${otp}. Valid for 10 minutes.`,
    title: "Verify your email",
    body,
  });
  return { to, subject, text, html };
};

// resend code
const resendCode = ({ to, otp }) => {
  const digits = otp.toString().split("");
  const subject = "New verification code — Creator Studio";
  const text = `Your new Creator Studio verification code is ${otp}. Valid for 10 minutes. All previous codes are now invalid.`;

  const body = `
    <h2 style="margin:0 0 6px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:#111827;letter-spacing:-0.02em;">New verification code</h2>
    <p style="margin:0 0 28px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:1.65;color:#6b7280;">
      You requested a new code. Use the one below — your previous code is now invalid.
    </p>

    <p style="margin:0 0 10px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">New verification code</p>

    ${otpBoxes(digits)}

    <p style="margin:12px 0 0;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12.5px;color:#9ca3af;">
      ⏱ Expires in <strong style="color:#6b7280;">10 minutes</strong>
    </p>

    ${divider}

    ${callout("If you keep having trouble receiving codes, please check your spam folder or contact support.", "info")}
  `;

  const html = shell({
    preheader: `Your new code is ${otp}. Previous code is no longer valid.`,
    title: "New verification code",
    body,
  });
  return { to, subject, text, html };
};

// forget password
const forgotPassword = ({ to, resetUrl, expiresInMinutes = 30 }) => {
  const subject = "Reset your password — Creator Studio";
  const text = `Reset your Creator Studio password here: ${resetUrl}\n\nThis link expires in ${expiresInMinutes} minutes. If you didn't request this, ignore this email.`;

  const body = `
    <h2 style="margin:0 0 6px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:#111827;letter-spacing:-0.02em;">Reset your password</h2>
    <p style="margin:0 0 28px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:1.65;color:#6b7280;">
      We received a request to reset the password for your Creator Studio account. Click the button below to set a new one.
    </p>

    ${ctaButton("Reset password", resetUrl)}

    <p style="margin:16px 0 0;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12.5px;color:#9ca3af;">
      ⏱ This link expires in <strong style="color:#6b7280;">${expiresInMinutes}min's</strong>
    </p>

    ${divider}

    <p style="margin:0 0 6px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12.5px;color:#6b7280;">
      If the button doesn't work, copy and paste this link:
    </p>
    <p style="margin:0;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;word-break:break-all;">
      <a href="${resetUrl}" style="color:#f59e0b;text-decoration:none;">${resetUrl}</a>
    </p>

    ${callout("If you didn't request a password reset, you can safely ignore this. Your password will not change.", "warning")}
  `;

  const html = shell({
    preheader:
      "Reset your Creator Studio password. Link expires in 30 minutes.",
    title: "Reset your password",
    body,
  });
  return { to, subject, text, html };
};

// password change
const passwordChanged = ({ to }) => {
  const subject = "Your password was changed — Creator Studio";
  const text = `Your Creator Studio password was successfully changed. If this wasn't you, contact support immediately.`;

  const body = `
    <h2 style="margin:0 0 6px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:#111827;letter-spacing:-0.02em;">Password changed</h2>
    <p style="margin:0 0 28px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:1.65;color:#6b7280;">
      Your Creator Studio password was successfully updated. You can now log in with your new password.
    </p>

    ${ctaButton("Go to sign in", `${BRAND.url}/login`)}

    ${divider}

    ${callout("<strong>Wasn't you?</strong> If you didn't make this change, contact our support team immediately at support@creatorstudio.com.", "danger")}
  `;

  const html = shell({
    preheader: "Your Creator Studio password was successfully changed.",
    title: "Password changed",
    body,
  });
  return { to, subject, text, html };
};

// welcome email
const welcomeEmail = ({ to, name }) => {
  const subject = "Welcome to Creator Studio";
  const text = `Hey ${name || "there"}, welcome to Creator Studio! Your account is verified. Head to your dashboard: ${BRAND.url}/dashboard`;

  const body = `
    <h2 style="margin:0 0 6px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:#111827;letter-spacing:-0.02em;">You're verified ✓</h2>
    <p style="margin:0 0 28px;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:1.65;color:#6b7280;">
      Hey ${name || "there"}, your account is confirmed and your workspace is ready. Start creating.
    </p>

    ${ctaButton("Go to dashboard →", `${BRAND.url}/dashboard`)}

    ${divider}

    <p style="margin:0;font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#9ca3af;line-height:1.6;">
      Need help getting started? Visit our
      <a href="${BRAND.url}/docs" style="color:#f59e0b;text-decoration:none;font-weight:500;">documentation</a>
      or reply to this email.
    </p>
  `;

  const html = shell({
    preheader: `Welcome, ${name || ""}! Your Creator Studio account is ready.`,
    title: "Welcome",
    body,
  });
  return { to, subject, text, html };
};

module.exports = {
  verifyRegistration,
  resendCode,
  forgotPassword,
  passwordChanged,
  welcomeEmail,
};
