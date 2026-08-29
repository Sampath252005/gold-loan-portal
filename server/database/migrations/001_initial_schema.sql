-- Run this file in the Supabase SQL Editor before starting the API.
-- The application uses the service-role key only on the server.

create table if not exists public.loan_schemes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan_code text not null unique,
  interest_rate numeric(5, 2) not null check (interest_rate >= 0),
  max_ltv numeric(5, 2) not null check (max_ltv > 0 and max_ltv <= 75),
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null check (length(trim(customer_name)) >= 2),
  mobile_number varchar(10) not null check (mobile_number ~ '^[0-9]{10}$'),
  gross_weight_grams numeric(10, 2) not null check (gross_weight_grams > 0),
  net_weight_grams numeric(10, 2) not null check (net_weight_grams > 0 and net_weight_grams <= gross_weight_grams),
  purity_karat smallint not null check (purity_karat in (18, 22, 24)),
  pure_gold_weight numeric(10, 2) not null check (pure_gold_weight > 0),
  selected_plan_id text not null references public.loan_schemes(plan_code),
  calculated_loan_amount numeric(14, 2) not null check (calculated_loan_amount > 0),
  status text not null default 'SUBMITTED' check (status = 'SUBMITTED'),
  created_at timestamptz not null default now()
);

create index if not exists leads_mobile_created_at_idx
  on public.leads (mobile_number, created_at desc);

-- Serialise inserts for a given mobile number. The advisory lock and lookup run
-- in the same transaction as the insert, so simultaneous requests cannot both
-- pass the seven-day check.
create or replace function public.reject_recent_duplicate_lead()
returns trigger
language plpgsql
as $$
begin
  perform pg_advisory_xact_lock(hashtext(new.mobile_number));

  if exists (
    select 1
    from public.leads
    where mobile_number = new.mobile_number
      and created_at >= now() - interval '7 days'
  ) then
    raise exception using errcode = 'P0001', message = 'RECENT_LEAD_EXISTS';
  end if;

  return new;
end;
$$;

drop trigger if exists leads_reject_recent_duplicate on public.leads;
create trigger leads_reject_recent_duplicate
before insert on public.leads
for each row execute function public.reject_recent_duplicate_lead();

insert into public.loan_schemes (name, plan_code, interest_rate, max_ltv)
values
  ('Bullet Repayment Plan', 'PLAN_BULLET_01', 18.00, 75.00),
  ('Monthly EMI Plan', 'PLAN_EMI_01', 16.00, 75.00)
on conflict (plan_code) do update
set
  name = excluded.name,
  interest_rate = excluded.interest_rate,
  max_ltv = excluded.max_ltv;
