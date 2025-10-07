// app/api/test-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  // Handy for quick health checks in the browser
  return NextResponse.json({
    ok: true,
    message: "POST to this endpoint to send a test email.",
  });
}

export async function POST() {
  try {
    const to = process.env.LEAD_EMAIL_TO!;
    const from = process.env.LEAD_EMAIL_FROM!;
    if (!process.env.RESEND_API_KEY || !to || !from) {
      return NextResponse.json(
        { ok: false, error: "Missing env: RESEND_API_KEY / LEAD_EMAIL_TO / LEAD_EMAIL_FROM" },
        { status: 500 }
      );
    }

    const result = await resend.emails.send({
      from,
      to,
      subject: "Lead Router — Test Email",
      text: "Hello! This is a test email sent from the Lead Router API route.",
    });

    return NextResponse.json({ ok: true, result });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
