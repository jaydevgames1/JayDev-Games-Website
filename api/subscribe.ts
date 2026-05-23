import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import jwt from 'jsonwebtoken';
import { verifyEmailHtml } from './emails/verify';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { email } = req.body;
  if (!email) return res.status(400).send('Email required');

  const verifyToken = jwt.sign(
    { email, type: 'verify' },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );

  const unsubscribeToken = jwt.sign(
    { email, type: 'unsubscribe' },
    process.env.JWT_SECRET!
  );

  const verifyUrl = `https://jaydev.games/verify?token=${verifyToken}`;
  const unsubscribeUrl = `https://jaydev.games/unsubscribe?token=${unsubscribeToken}`;

  const { error } = await resend.emails.send({
    from: 'JayDev Games <noreply@jaydev.games>',
    to: [email],
    subject: 'Verify your email – JayDev Games',
    html: verifyEmailHtml(verifyUrl, unsubscribeUrl),
  });

  if (error) {
    console.error(error);
    return res.status(500).send('Failed to send verification email');
  }

  return res.status(200).json({ message: 'Verification email sent' });
}