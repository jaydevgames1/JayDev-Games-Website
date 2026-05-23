export function verifyEmailHtml(verifyUrl: string, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email – JayDev Games</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'DM Sans', Arial, sans-serif;
      background-color: #e2e2e2;
      background-image:
        linear-gradient(to right, #c5c5d9 1px, transparent 1px),
        linear-gradient(to bottom, #c5c5d9 1px, transparent 1px);
      background-size: 24px 24px;
      padding: 40px 16px;
      color: #1b1b1b;
    }
    .email-wrapper { max-width: 580px; margin: 0 auto; }
    .topbar {
      background: #1b1b1b;
      border: 4px solid #1b1b1b;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .topbar-logo {
      font-family: 'DM Sans', sans-serif;
      font-size: 20px;
      font-weight: 900;
      font-style: italic;
      letter-spacing: -0.04em;
      text-transform: uppercase;
      color: #c1f100;
    }
    .topbar-badge {
      background: #c1f100;
      color: #1b1b1b;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 10px;
      border: 2px solid #1b1b1b;
    }
    .hero-card {
      background: #1728e8;
      border: 4px solid #1b1b1b;
      border-top: 0;
      box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
      padding: 40px 32px 32px;
      position: relative;
      overflow: hidden;
    }
    .hero-card::before {
      content: '';
      position: absolute;
      top: -20px; right: -20px;
      width: 120px; height: 120px;
      background: #ffd7f6;
      border: 4px solid #1b1b1b;
      transform: rotate(15deg);
      opacity: 0.5;
    }
    .hero-card::after {
      content: '+';
      position: absolute;
      bottom: 16px; right: 32px;
      font-size: 80px;
      font-weight: 900;
      color: rgba(255,255,255,0.08);
      line-height: 1;
    }
    .hero-eyebrow {
      display: inline-block;
      background: #c1f100;
      color: #1b1b1b;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 12px;
      border: 2px solid #1b1b1b;
      margin-bottom: 20px;
    }
    .hero-headline {
      font-size: 48px;
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.04em;
      text-transform: uppercase;
      color: #ffffff;
      margin-bottom: 8px;
    }
    .hero-headline span {
      display: inline-block;
      background: #c1f100;
      color: #1b1b1b;
      padding: 0 8px;
      font-style: italic;
    }
    .hero-sub {
      font-size: 16px;
      font-weight: 500;
      color: rgba(255,255,255,0.75);
      line-height: 1.5;
      margin-top: 12px;
      max-width: 380px;
    }
    .body-card {
      background: #f9f9f9;
      border: 4px solid #1b1b1b;
      border-top: 0;
      padding: 32px;
    }
    .greeting { font-size: 18px; font-weight: 700; color: #1b1b1b; margin-bottom: 12px; }
    .body-text {
      font-size: 15px;
      font-weight: 400;
      line-height: 1.7;
      color: #1b1b1b;
      opacity: 0.85;
      margin-bottom: 32px;
    }
    .cta-wrap { margin-bottom: 32px; }
    .cta-btn {
      display: inline-block;
      background: #1728e8;
      color: #ffffff;
      font-family: 'DM Sans', sans-serif;
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      text-decoration: none;
      padding: 16px 40px;
      border: 4px solid #1b1b1b;
      box-shadow: 6px 6px 0px 0px rgba(0,0,0,1);
    }
    .divider { border: none; border-top: 2px solid #1b1b1b; margin: 24px 0; opacity: 0.15; }
    .fallback-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #1b1b1b;
      opacity: 0.5;
      margin-bottom: 6px;
    }
    .fallback-link { font-size: 12px; color: #1728e8; word-break: break-all; line-height: 1.5; }
    .expiry-block {
      background: #ffd7f6;
      border: 2px solid #1b1b1b;
      padding: 14px 18px;
      margin-top: 28px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .expiry-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
    .expiry-text { font-size: 13px; font-weight: 500; line-height: 1.5; color: #1b1b1b; }
    .expiry-text strong { font-weight: 800; }
    .footer-card {
      background: #1b1b1b;
      border: 4px solid #1b1b1b;
      border-top: 0;
      padding: 24px 32px;
    }
    .footer-logo {
      font-size: 16px;
      font-weight: 900;
      font-style: italic;
      letter-spacing: -0.03em;
      text-transform: uppercase;
      color: #c1f100;
      margin-bottom: 12px;
    }
    .footer-links { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 16px; }
    .footer-links a {
      font-size: 13px;
      font-weight: 600;
      color: #e2e2e2;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .footer-legal {
      font-size: 11px;
      font-weight: 400;
      color: #757688;
      line-height: 1.6;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .footer-legal a { color: #757688; }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="topbar">
      <div class="topbar-logo">JayDev Games</div>
      <div class="topbar-badge">Email Verification</div>
    </div>
    <div class="hero-card">
      <div class="hero-eyebrow">Almost There</div>
      <div class="hero-headline">
        Verify<br/>
        <span>Your Email</span>
      </div>
      <div class="hero-sub">One click and you're in. Let's get you set up.</div>
    </div>
    <div class="body-card">
      <div class="greeting">Hey there, Player!</div>
      <div class="body-text">
        Thanks for signing up to JayDev Games. We just need to confirm you're actually you
        (you know how it is). Click the button below to verify your email address and unlock
        your account — then you're all set for game updates, secret beta codes, and community shenanigans.
      </div>
      <div class="cta-wrap">
        <a href="${verifyUrl}" class="cta-btn">✓ &nbsp;Verify My Email</a>
      </div>
      <div class="expiry-block">
        <div class="expiry-icon">⏱</div>
        <div class="expiry-text">
          <strong>This link expires in 24 hours.</strong> If you didn't sign up,
          you can safely ignore this email — nothing will change.
        </div>
      </div>
      <hr class="divider"/>
      <div class="fallback-label">Button not working? Copy &amp; paste this link:</div>
      <div class="fallback-link">${verifyUrl}</div>
    </div>
    <div class="footer-card">
      <div class="footer-logo">JayDev Games</div>
      <div class="footer-links">
        <a href="https://discord.gg/eaE7CrWvsW">Discord</a>
        <a href="https://youtube.com/@JayDevGames1">YouTube</a>
        <a href="https://www.tiktok.com/@jaydevgames">TikTok</a>
        <a href="https://www.instagram.com/jaydev_games">Instagram</a>
      </div>
      <div class="footer-legal">
        © 2026 JayDev Games &nbsp;·&nbsp; Australia &nbsp;·&nbsp;
        <a href="${unsubscribeUrl}">Unsubscribe</a> &nbsp;·&nbsp; <a href="https://jaydev.games/privacy">Privacy Policy</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}