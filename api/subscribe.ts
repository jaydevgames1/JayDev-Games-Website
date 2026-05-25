import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import { verifyEmailHtml } from "./emails/verify.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET not configured");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;

  try {
    // Check if email already exists in Resend Contacts
    const { data: contact } = await resend.contacts.get({
      email,
      ...(audienceId ? { audienceId } : {}),
    });

    if (contact) {
      if (contact.unsubscribed) {
        return res.status(400).json({
          error:
            "This email was previously unsubscribed. Please contact support to resubscribe.",
        });
      }
      return res.status(400).json({
        error: "You're already subscribed! Check your inbox for updates.",
      });
    }

    const verifyToken = jwt.sign(
      { email, type: "verify" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    const unsubscribeToken = jwt.sign(
      { email, type: "unsubscribe" },
      process.env.JWT_SECRET,
    );

    const verifyUrl = `https://jaydev.games/verify?token=${verifyToken}`;
    const unsubscribeUrl = `https://jaydev.games/unsubscribe?token=${unsubscribeToken}`;

    const { error } = await resend.emails.send({
      from: "JayDev Games <noreply@jaydev.games>",
      to: [email],
      subject: "Verify your email – JayDev Games",
      html: verifyEmailHtml(verifyUrl, unsubscribeUrl),
    });

    if (error) {
      console.error("Resend error:", error);
      return res
        .status(500)
        .json({ error: "Failed to send verification email" });
    }

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
}
