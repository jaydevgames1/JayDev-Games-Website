export function verifiedEmailHtml(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You're All Set – JayDev Games</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
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

    /* ── Top bar ── */
    .topbar {
      background: #1b1b1b;
      border: 4px solid #1b1b1b;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .topbar-logo {
      font-size: 20px; font-weight: 900; font-style: italic;
      letter-spacing: -0.04em; text-transform: uppercase; color: #c1f100;
    }
    .topbar-badge {
      background: #c1f100; color: #1b1b1b;
      font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; padding: 4px 10px; border: 2px solid #1b1b1b;
    }

    /* ── Hero – lime green ── */
    .hero-card {
      background: #c1f100;
      border: 4px solid #1b1b1b; border-top: 0;
      box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
      padding: 40px 32px 32px;
      position: relative; overflow: hidden;
    }
    .hero-card::before {
      content: '';
      position: absolute; top: -16px; right: -16px;
      width: 100px; height: 100px;
      background: #3b4bff; border: 4px solid #1b1b1b;
      transform: rotate(12deg); opacity: 0.4;
    }
    .hero-card::after {
      content: '✓';
      position: absolute; bottom: 10px; right: 28px;
      font-size: 96px; font-weight: 900;
      color: rgba(0,0,0,0.06); line-height: 1;
    }
    .hero-eyebrow {
      display: inline-block;
      background: #1b1b1b; color: #c1f100;
      font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; padding: 4px 12px;
      border: 2px solid #1b1b1b; margin-bottom: 20px;
    }
    .hero-headline {
      font-size: 48px; font-weight: 900; line-height: 1.05;
      letter-spacing: -0.04em; text-transform: uppercase; color: #1b1b1b;
      margin-bottom: 8px;
    }
    .hero-headline span {
      display: inline-block;
      background: #1728e8; color: #fff;
      padding: 0 8px; font-style: italic;
    }
    .hero-sub {
      font-size: 16px; font-weight: 600;
      color: rgba(0,0,0,0.7); line-height: 1.5;
      margin-top: 12px; max-width: 380px;
    }

    /* ── Body card ── */
    .body-card {
      background: #f9f9f9;
      border: 4px solid #1b1b1b; border-top: 0;
      padding: 32px;
    }
    .greeting { font-size: 18px; font-weight: 700; margin-bottom: 12px; }
    .body-text {
      font-size: 15px; font-weight: 400; line-height: 1.7;
      color: #1b1b1b; opacity: 0.85; margin-bottom: 28px;
    }

    /* ── Stat pills ── */
    .stats-row {
      display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px;
    }
    .stat-pill {
      flex: 1; min-width: 120px;
      border: 3px solid #1b1b1b;
      box-shadow: 3px 3px 0 #1b1b1b;
      padding: 12px 14px; text-align: center;
    }
    .stat-pill.blue { background: #1728e8; }
    .stat-pill.lime { background: #c1f100; }
    .stat-pill.pink { background: #ffd7f6; }
    .stat-number { font-size: 24px; font-weight: 900; color: #1b1b1b; display: block; }
    .stat-pill.blue .stat-number { color: #fff; }
    .stat-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #1b1b1b; }
    .stat-pill.blue .stat-label { color: rgba(255,255,255,0.75); }

    /* ── CTA Button ── */
    .cta-wrap { margin-bottom: 28px; }
    .cta-btn {
      display: inline-block;
      background: #1b1b1b; color: #c1f100;
      font-family: 'DM Sans', sans-serif;
      font-size: 18px; font-weight: 800;
      letter-spacing: 0.04em; text-transform: uppercase; text-decoration: none;
      padding: 16px 40px; border: 4px solid #1b1b1b;
      box-shadow: 6px 6px 0px 0px rgba(0,0,0,1);
    }

    /* ── Links block ── */
    .links-block {
      background: #e2e2e2; border: 2px solid #1b1b1b;
      padding: 16px 18px; margin-bottom: 4px;
    }
    .links-label {
      font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; margin-bottom: 10px; opacity: 0.5;
    }
    .links-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .link-chip {
      display: inline-block;
      background: #1b1b1b; color: #fff;
      font-size: 12px; font-weight: 700; letter-spacing: 0.06em;
      text-transform: uppercase; text-decoration: none;
      padding: 6px 14px; border: 2px solid #1b1b1b;
    }

    /* ── Footer ── */
    .footer-card {
      background: #1b1b1b; border: 4px solid #1b1b1b; border-top: 0;
      padding: 24px 32px;
    }
    .footer-logo {
      font-size: 16px; font-weight: 900; font-style: italic;
      letter-spacing: -0.03em; text-transform: uppercase;
      color: #c1f100; margin-bottom: 12px;
    }
    .footer-links { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 16px; }
    .footer-links a {
      font-size: 13px; font-weight: 600; color: #e2e2e2;
      text-decoration: none; text-transform: uppercase; letter-spacing: 0.06em;
    }
    .footer-divider { border: none; border-top: 1px solid #303030; margin: 14px 0; }
    .footer-legal {
      font-size: 11px; font-weight: 400; color: #757688;
      line-height: 1.7; text-transform: uppercase; letter-spacing: 0.04em;
    }
    .footer-legal a { color: #757688; text-decoration: underline; }
    .unsub-link { color: #c1f100 !important; font-weight: 700; }
  </style>
</head>
<body>
  <div class="email-wrapper">

    <div class="topbar">
      <div class="topbar-logo">JayDev Games</div>
      <div class="topbar-badge">Welcome Aboard</div>
    </div>

    <div class="hero-card">
      <div class="hero-eyebrow">Account Confirmed</div>
      <div class="hero-headline">
        You're<br/><span>All Set!</span>
      </div>
      <div class="hero-sub">Your account is verified and ready to roll. Welcome to the crew.</div>
    </div>

    <div class="body-card">
      <div class="greeting">Hey Player</div>
      <div class="body-text">
        You're officially part of the JayDev Games community. That means early access, secret beta
        codes, dev updates before anyone else — and first dibs on whatever we cook up next.
        Head to the site and get exploring.
      </div>

      <div class="stats-row">
        <div class="stat-pill blue">
          <span class="stat-number">1</span>
          <span class="stat-label">Game Live</span>
        </div>
        <div class="stat-pill lime">
          <span class="stat-number">2+</span>
          <span class="stat-label">In Dev</span>
        </div>
        <div class="stat-pill pink">
          <span class="stat-number">∞</span>
          <span class="stat-label">Vibes</span>
        </div>
      </div>

      <div class="cta-wrap">
        <a href="https://jaydev.games" class="cta-btn">→ &nbsp;Go to JayDev Games</a>
      </div>

      <div class="links-block">
        <div class="links-label">Join the Community</div>
        <div class="links-row">
          <a href="https://discord.gg/eaE7CrWvsW" class="link-chip">Discord</a>
          <a href="https://youtube.com/@JayDevGames1" class="link-chip">YouTube</a>
          <a href="https://www.tiktok.com/@jaydevgames" class="link-chip">TikTok</a>
          <a href="https://www.instagram.com/jaydev_games" class="link-chip">Instagram</a>
        </div>
      </div>
    </div>

    <div class="footer-card">
      <div class="footer-logo">JayDev Games</div>
      <div class="footer-links">
        <a href="https://discord.gg/eaE7CrWvsW">Discord</a>
        <a href="https://youtube.com/@JayDevGames1">YouTube</a>
        <a href="https://www.tiktok.com/@jaydevgames">TikTok</a>
        <a href="https://www.instagram.com/jaydev_games">Instagram</a>
      </div>
      <hr class="footer-divider"/>
      <div class="footer-legal">
        © 2026 JayDev Games &nbsp;·&nbsp; Australia<br/>
        You're receiving this because you signed up at jaydev.games.<br/>
        <a href="${unsubscribeUrl}" class="unsub-link">Unsubscribe</a>
        &nbsp;·&nbsp; <a href="#">Privacy Policy</a>
      </div>
    </div>

  </div>
</body>
</html>`;
}
