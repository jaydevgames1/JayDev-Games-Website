import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import jwt from 'jsonwebtoken';
import { unsubscribeEmailHtml } from './emails/unsubscribe.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.query.token as string;
  if (!token) return res.status(400).send('Token required');

  let payload: { email: string; type: string };

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as typeof payload;
  } catch {
    return res.status(400).send('Invalid token');
  }

  if (payload.type !== 'unsubscribe') return res.status(400).send('Invalid token type');

  const { error } = await resend.contacts.update({
    email: payload.email,
    unsubscribed: true,
  });

  if (error) {
    console.error('Resend error:', error);
    return res.status(500).send('Failed to unsubscribe');
  }

  try {
    await resend.emails.send({
      from: 'JayDev Games <noreply@jaydev.games>',
      to: [payload.email],
      subject: "You've Been Unsubscribed - JayDev Games",
      html: unsubscribeEmailHtml(),
    });
    console.log('Unsubscribe confirmation email sent successfully to:', payload.email);
  } catch (emailError) {
    console.error('Failed to send unsubscribe confirmation email:', emailError);
  }

  return res.status(200).json({ message: 'Unsubscribed successfully' });
}