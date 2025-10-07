import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "POST to this endpoint to send a test email.",
  });
}

export async function POST(req: Request) {
  try {
    const { to, subject, text } = await req.json().catch(() => ({}));

    const result = await resend.emails.send({
      from: process.env.LEAD_EMAIL_FROM || "Lead Router <onboarding@resend.dev>",
      to: to || process.env.LEAD_EMAIL_TO || "kumar@feelivacation.com",
      subject: subject || "Lead Router Test",
      text: text || "Hello! This is a test email sent via Resend + Next.js 🚀",
    });

    if ((result as any)?.error) {
      return NextResponse.json({ ok: false, error: (result as any).error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, result }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 });
  }
}
