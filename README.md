# JayDev Games Homepage

A modern, neobrutalist-styled homepage for JayDev Games built with Astro and deployed on Vercel.

## 🚀 Features

- Email newsletter subscription with verification
- Responsive neobrutalist design
- Community showcase with animated ticker
- Project carousel
- Vercel serverless API functions for email handling

## 📋 Prerequisites

- Node.js >= 22.12.0
- A [Resend](https://resend.com) account for email functionality
- A [Vercel](https://vercel.com) account for deployment

## 🔧 Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   
   Copy `.env.example` to `.env.local`:
   ```sh
   cp .env.example .env.local
   ```

   Then fill in the required values:
   
   - `RESEND_API_KEY`: Get from [Resend API Keys](https://resend.com/api-keys)
   - `JWT_SECRET`: Generate a random secret key:
     ```sh
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```

3. **Configure Resend:**
   - Create an account at [resend.com](https://resend.com)
   - Verify your domain (jaydev.games) in the Resend dashboard
   - Get your API key from the dashboard

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚢 Deployment to Vercel

1. **Connect your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel will auto-detect the Astro framework

2. **Add environment variables in Vercel:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add both variables from your `.env.local`:
     - `RESEND_API_KEY`
     - `JWT_SECRET`

3. **Deploy:**
   - Push to your main branch or click "Deploy" in Vercel
   - Your API endpoints will be available at `/api/*`

## 📁 Project Structure

```text
/
├── api/                    # Vercel serverless functions
│   ├── emails/            # Email templates
│   ├── subscribe.ts       # Newsletter subscription endpoint
│   ├── verify.ts          # Email verification endpoint
│   └── unsubscribe.ts     # Unsubscribe endpoint
├── public/                # Static assets
├── src/
│   ├── pages/             # Astro pages
│   ├── scripts/           # Client-side TypeScript
│   └── styles/            # Global CSS
└── package.json
```

## 🔍 API Endpoints

- `POST /api/subscribe` - Subscribe to newsletter (sends verification email)
- `GET /api/verify?token=xxx` - Verify email address
- `GET /api/unsubscribe?token=xxx` - Unsubscribe from newsletter

## 🎨 Design System

The site uses a custom neobrutalist design system with:
- Bold borders and shadows
- High contrast colors
- Geometric shapes and patterns
- Playful animations

## 📝 License

©2026 JAYDEV GAMES

## 👀 Want to learn more about Astro?

Feel free to check [Astro documentation](https://docs.astro.build) or jump into the [Astro Discord server](https://astro.build/chat).
