import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: process.env.LEAD_EMAIL_FROM!,     // e.g. sales@feelivacation.com
      to: process.env.LEAD_EMAIL_TO!,         // e.g. kumar@feelivacation.com
      subject: 'Lead Router Lite — Test Email',
      text: `Hello! This is a test sent at ${new Date().toISOString()}.`,
    });

    return Response.json({ ok: true, data });
  } catch (err: any) {
    return Response.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
