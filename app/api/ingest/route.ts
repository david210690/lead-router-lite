import { z } from "zod";
import pino from "pino";
import { RateLimiterMemory } from "rate-limiter-flexible";

const log = pino({ level: process.env.LOG_LEVEL ?? "info" });
const limiter = new RateLimiterMemory({ points: 30, duration: 60 }); // 30/min per IP

const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  source: z.string().optional(),
  phone: z.string().optional(),
  meta: z.record(z.any()).optional()
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "anon";
    await limiter.consume(ip);

    const body = await req.json();
    const lead = leadSchema.parse(body);

    // TODO: forward to CRM/webhook using fetch/undici if ROUTING_TARGET set
    if (process.env.ROUTING_TARGET) {
      await fetch(process.env.ROUTING_TARGET, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.ROUTING_TOKEN ? { authorization: `Bearer ${process.env.ROUTING_TOKEN}` } : {})
        },
        body: JSON.stringify(lead)
      });
    }

    log.info({ lead }, "lead_ingested");
    return Response.json({ ok: true });
  } catch (err: any) {
    if (err?.remainingPoints !== undefined) {
      return new Response("Too Many Requests", { status: 429 });
    }
    if (err?.issues) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_payload", issues: err.issues }), {
        status: 400,
        headers: { "content-type": "application/json" }
      });
    }
    log.error({ err }, "lead_ingest_failed");
    return new Response(JSON.stringify({ ok: false, error: "internal_error" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
}
