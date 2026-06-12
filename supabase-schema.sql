-- Run this in your Supabase SQL editor

create table plaid_items (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  item_id text not null unique,
  access_token text not null,
  institution_name text,
  institution_id text,
  created_at timestamptz default now()
);

create table accounts (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  item_id text references plaid_items(item_id) on delete cascade,
  account_id text not null unique,
  name text not null,
  official_name text,
  type text not null,
  subtype text,
  mask text,
  current_balance numeric(12,2) default 0,
  available_balance numeric(12,2),
  credit_limit numeric(12,2),
  institution_name text,
  institution_color text,
  institution_logo text,
  updated_at timestamptz default now()
);

create table transactions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  account_id text references accounts(account_id) on delete cascade,
  transaction_id text not null unique,
  amount numeric(12,2) not null,
  date date not null,
  name text not null,
  merchant_name text,
  category text[],
  primary_category text,
  detailed_category text,
  logo_url text,
  pending boolean default false,
  payment_channel text,
  created_at timestamptz default now()
);

create table budgets (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  category text not null,
  limit_amount numeric(12,2) not null,
  period text default 'monthly',
  color text,
  icon text,
  created_at timestamptz default now(),
  unique(user_id, category, period)
);

-- Indexes for fast queries
create index on transactions(user_id, date desc);
create index on transactions(account_id);
create index on accounts(user_id);
create index on budgets(user_id);

-- Row Level Security
alter table plaid_items enable row level security;
alter table accounts enable row level security;
alter table transactions enable row level security;
alter table budgets enable row level security;
