export function unsubscribeEmailHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You've Been Unsubscribed – JayDev Games</title>
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
      background: #e2e2e2;
      color: #1b1b1b;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 10px;
      border: 2px solid #1b1b1b;
    }
    .hero-card {
      background: #1b1b1b;
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
      background: #e2e2e2;
      border: 4px solid #757688;
      transform: rotate(15deg);
      opacity: 0.15;
    }
    .hero-card::after {
      content: '+';
      position: absolute;
      bottom: 16px; right: 32px;
      font-size: 80px;
      font-weight: 900;
      color: rgba(255,255,255,0.05);
      line-height: 1;
    }
    .hero-eyebrow {
      display: inline-block;
      background: #e2e2e2;
      color: #1b1b1b;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 12px;
      border: 2px solid #757688;
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
      background: #e2e2e2;
      color: #1b1b1b;
      padding: 0 8px;
      font-style: italic;
    }
    .hero-sub {
      font-size: 16px;
      font-weight: 500;
      color: rgba(255,255,255,0.6);
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
      margin-bottom: 28px;
    }
    .info-block {
      background: #e2e2e2;
      border: 2px solid #1b1b1b;
      padding: 14px 18px;
      margin-bottom: 28px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .info-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
    .info-text { font-size: 13px; font-weight: 500; line-height: 1.5; color: #1b1b1b; }
    .info-text strong { font-weight: 800; }
    .divider { border: none; border-top: 2px solid #1b1b1b; margin: 24px 0; opacity: 0.15; }
    .cta-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #1b1b1b;
      opacity: 0.5;
      margin-bottom: 10px;
    }
    .cta-btn {
      display: inline-block;
      background: #1b1b1b;
      color: #ffffff;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      text-decoration: none;
      padding: 14px 32px;
      border: 4px solid #1b1b1b;
      box-shadow: 6px 6px 0px 0px rgba(0,0,0,1);
    }
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
      <div class="topbar-badge">Unsubscribed</div>
    </div>
    <div class="hero-card">
      <div class="hero-eyebrow">See You Around</div>
      <div class="hero-headline">
        You're<br/>
        <span>Unsubscribed</span>
      </div>
      <div class="hero-sub">No hard feelings. You won't hear from us again.</div>
    </div>
    <div class="body-card">
      <div class="greeting">Hey there!</div>
      <div class="body-text">
        You've been successfully removed from the JayDev Games mailing list.
        You won't receive any more emails from us — no game updates, no beta codes, nothing.
        <br/><br/>
        If you unsubscribed by accident or change your mind, you're always welcome back.
      </div>
      <div class="info-block">
        <div class="info-icon">ℹ</div>
        <div class="info-text">
          <strong>Still seeing emails?</strong> It can take up to 24 hours to fully process.
          If it continues after that, reach out to us on Discord.
        </div>
      </div>
      <hr class="divider"/>
      <div class="cta-label">Changed your mind?</div>
      <a href="https://jaydev.games/#newsletter-section" class="cta-btn">Sign Up Again</a>
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
        <a href="https://jaydev.games/privacy">Privacy Policy</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}