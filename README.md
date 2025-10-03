# Lead Router Lite

Collect → validate → score → route leads to vendors, with an audit trail.

## Flow
`/api/ingest` → validate (Zod-like) → enrich (webhook) → score → choose vendor → write audit

## Tables
- leads(id, payload jsonb, score int, source text, status text, created_at)
- routes(id, vendor text, match jsonb)
- audits(id, lead_id, message, created_at)

## Setup
- Run `/sql/lead.sql` in Supabase.
- (Optional) deploy `supabase/functions/route-lead`.
