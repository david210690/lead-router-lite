create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  payload jsonb,
  score int,
  source text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists public.routes (
  id uuid primary key default gen_random_uuid(),
  vendor text not null,
  match jsonb  -- e.g. {"country":"IN","min_pax":10}
);

create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  message text,
  created_at timestamptz default now()
);

alter table public.leads enable row level security;
alter table public.routes enable row level security;
alter table public.audits enable row level security;

-- simple open policies for demo (tighten later)
create policy "read leads" on public.leads for select using (true);
create policy "insert leads" on public.leads for insert with check (true);

create policy "read routes" on public.routes for select using (true);
create policy "read audits" on public.audits for select using (true);
create policy "insert audits" on public.audits for insert with check (true);
