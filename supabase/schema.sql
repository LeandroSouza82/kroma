create table if not exists public.leads_kroma (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  contato text not null,
  tipo_projeto text not null,
  escopo text,
  estimativa numeric,
  mensagem text not null,
  created_at timestamptz not null default now()
);

alter table public.leads_kroma enable row level security;

create policy "leads_insert_anon" on public.leads_kroma
  for insert to anon with check (true);
