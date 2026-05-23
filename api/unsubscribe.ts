import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import jwt from 'jsonwebtoken';

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
    console.error(error);
    return res.status(500).send('Failed to unsubscribe');
  }

  return res.status(200).json({ message: 'Unsubscribed successfully' });
}