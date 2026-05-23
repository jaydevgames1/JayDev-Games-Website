import type { Context } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { email } = await req.json();
  if (!email) return new Response("Email required", { status: 400 });

  const { data, error } = await resend.contacts.create({ email });

  if (error) {
    console.error(error);
    return new Response("Failed to subscribe", { status: 500 });
  }

  await resend.emails.send({
    from: "JayDev Games <noreply@jaydev.games>",
    to: ["gamesjaydev@gmail.com"],
    subject: "New subscriber!",
    html: `<p><strong>${email}</strong> just joined the JayDev Games mailing list.</p>`,
  });

  return new Response(JSON.stringify(data), { status: 200 });
};