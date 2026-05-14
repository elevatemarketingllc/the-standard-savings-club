-- Business Events table
create table if not exists public.business_events (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references public.businesses(id) on delete cascade not null,
  title text not null,
  description text,
  event_date date not null,
  start_time text,
  end_time text,
  location text,
  address text,
  event_url text,
  image_url text,
  is_free boolean default true,
  price text,
  category text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.business_events enable row level security;

-- Anyone can read events
create policy "Events are publicly readable"
  on public.business_events for select using (true);

-- Business users can manage their own events
create policy "Business users can manage their events"
  on public.business_events for all
  using (
    business_id in (
      select business_id from public.business_users where user_id = auth.uid()
    )
  );

-- Index for fast date-ordered queries
create index if not exists business_events_date_idx on public.business_events(event_date);
create index if not exists business_events_business_idx on public.business_events(business_id);
