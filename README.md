🛠 Lead Router Lite

A lightweight lead intake + routing MVP: validate → score → route to vendor → audit log.
Built with Next.js + Supabase, designed for B2B lead marketplaces, CRMs, and SaaS integrations.

✨ Features

✅ Lead intake API (JSON-based)

🔍 Validation pipeline (basic checks)

📊 Scoring model placeholder (extendable)

🔄 Vendor routing (to orgs)

📜 Audit log (Supabase table)

📂 Structure

/app → API routes (intake, validate, route)

/lib → Supabase client utilities

/sql → schema: leads, orgs, routes, logs

.env.example → environment template

🚀 Quickstart
pnpm i
cp .env.example .env.local
pnpm dev

📝 Notes

This is a starter scaffold, not a full lead engine.

Add your scoring model logic in /app/api/score.

Extend vendor routing by populating the orgs table in Supabase.
