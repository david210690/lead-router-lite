# Lead Router Lite

API to collect, validate, score, and route leads.

## Flow
`/api/ingest` → validate (Zod) → enrich (webhook) → score → route to vendor → audit log

## Tables
- leads(id, payload jsonb, score int, source text, status text, created_at)
- routes(id, vendor text, match jsonb)
- audits(id, lead_id, message, created_at)
