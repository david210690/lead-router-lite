import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

serve(async (req) => {
  const lead = await req.json().catch(() => ({}))
  // TODO: validation + enrichment
  const score = Math.floor(Math.random() * 100)
  const vendor = score > 50 ? "Vendor A" : "Vendor B"
  const summary = { ok: true, vendor, score, received: lead }
  return new Response(JSON.stringify(summary), { headers: { 'content-type': 'application/json' }})
});
