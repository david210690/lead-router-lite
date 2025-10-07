import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  return NextResponse.json({ ok: true, message: "POST to this endpoint to send a test email." });
}

export async function POST(req: Request) {
  try {
    const { to, subject, text } = await req.json();

    const data = await resend.emails.send({
      from: "Your Name <onboarding@resend.dev>",
      to: to || "your@email.com", // default for testing
      subject: subject || "Test Email",
      text: text || "Hello world!"
    });

    return NextResponse.json({ ok: true, result: data });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
