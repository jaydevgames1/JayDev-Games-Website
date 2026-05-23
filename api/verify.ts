import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import jwt from 'jsonwebtoken';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.query.token as string;
  
  console.log('Verify endpoint called with token:', token ? 'present' : 'missing');
  
  if (!token) return res.status(400).send('Token required');

  let payload: { email: string; type: string };

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as typeof payload;
    console.log('Token verified successfully for email:', payload.email);
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(400).send('Invalid or expired token');
  }

  if (payload.type !== 'verify') {
    console.error('Invalid token type:', payload.type);
    return res.status(400).send('Invalid token type');
  }

  // Add contact to Resend
  console.log('Attempting to add contact to Resend:', payload.email);
  
  const { data, error } = await resend.contacts.create({
    email: payload.email,
    unsubscribed: false,
  });

  if (error) {
    console.error('Resend error:', error);
    return res.status(500).send('Failed to add contact');
  }

  console.log('Contact added successfully:', data);

  // Send notification email
  try {
    await resend.emails.send({
      from: 'JayDev Games <noreply@jaydev.games>',
      to: ['gamesjaydev@gmail.com'],
      subject: 'New verified subscriber!',
      html: `<p><strong>${payload.email}</strong> just verified and joined the JayDev Games mailing list.</p>`,
    });
    console.log('Notification email sent');
  } catch (emailError) {
    console.error('Failed to send notification email:', emailError);
    // Don't fail the request if notification fails
  }

  return res.status(200).json({ message: 'Email verified successfully' });
}