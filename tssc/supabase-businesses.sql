-- Businesses table
create table if not exists public.businesses (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  tagline text,
  category text,
  description text,
  about text,
  deal text,
  deal_details text,
  website text,
  phone text,
  address text,
  instagram text,
  facebook text,
  logo_url text,
  cover_url text,
  photos text[] default '{}',
  active boolean default true,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Business users (portal logins)
create table if not exists public.business_users (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  role text default 'owner',
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.businesses enable row level security;
alter table public.business_users enable row level security;

-- Anyone can read active businesses
create policy "anyone_read_businesses" on public.businesses for select using (active = true);

-- Business owners can update their own business
create policy "owners_update_business" on public.businesses for update 
  using (id in (select business_id from public.business_users where user_id = auth.uid()));

-- Business users policies
create policy "read_own_business_user" on public.business_users for select using (user_id = auth.uid());

-- Insert seed businesses
insert into public.businesses (slug, name, tagline, category, description, about, deal, deal_details, website, phone, featured) values
(
  'uncle-bens-haircuts',
  'Uncle Ben''s Haircuts',
  'Boise''s Premier Barbershop',
  'Grooming',
  'Classic cuts, modern style. Uncle Ben''s is the home base of The Standard Savings Club.',
  'Uncle Ben''s Haircuts has been serving the Boise community with quality cuts and great vibes. Founded by Ben Galvan, the shop is built on community, craft, and making every customer feel like family.',
  '$10 off every haircut',
  'Automatically applied at checkout — just tell your barber you''re a Standard member. No code needed.',
  'https://unclebenshaircuts.com',
  '(208) 555-0101',
  true
),
(
  'cowboy-burger',
  'Cowboy Burger',
  'Smash Burgers Done Right',
  'Restaurant',
  'Boise''s best smash burger. Local ingredients, big flavor.',
  'Cowboy Burger brings the best smash burgers in the Treasure Valley. Made fresh to order with locally sourced ingredients.',
  'Members-only discount',
  'Show your Standard Savings Club membership at the counter for your exclusive discount.',
  null,
  '(208) 555-0102',
  false
),
(
  'opal-teeth-whitening',
  'Opal Teeth Whitening Studio',
  'Your Brightest Smile Starts Here',
  'Health & Beauty',
  'Professional teeth whitening treatments in a relaxing studio environment.',
  'Opal Teeth Whitening Studio offers professional-grade whitening treatments in a comfortable, spa-like setting. Get results in a single session.',
  'Exclusive member rate',
  'Mention The Standard Savings Club when booking your appointment to receive your member discount.',
  null,
  '(208) 555-0103',
  false
),
(
  'boise-bug-bombers',
  'Boise Bug Bombers Pest Control',
  'Protecting Treasure Valley Homes',
  'Home Services',
  'Local pest control you can trust. Serving Boise and surrounding areas.',
  'Boise Bug Bombers has been protecting Treasure Valley homes and businesses from pests for years. Family owned and operated, they treat your home like their own.',
  'Members-only pricing',
  'Reference your Standard Savings Club membership when calling to schedule service.',
  null,
  '(208) 555-0104',
  false
),
(
  'erick-butler-training',
  'Erick Butler Elite Basketball Training',
  'Elevate Your Game',
  'Sports Training',
  'Elite basketball training for youth and adult athletes in the Treasure Valley.',
  'Erick Butler brings professional-level training to Boise youth and adult athletes. With a focus on fundamentals, athleticism, and mindset, Erick develops players at every level.',
  'Member discount on sessions',
  'Mention your Standard Savings Club membership when signing up for training sessions.',
  null,
  '(208) 555-0105',
  false
),
(
  'elevate-marketing',
  'Elevate Marketing LLC',
  'Digital Marketing That Converts',
  'Marketing',
  'Boise-based digital marketing agency helping local businesses grow.',
  'Elevate Marketing LLC specializes in helping Treasure Valley businesses build their brand, grow their audience, and convert customers through smart digital marketing.',
  'Member consultation rate',
  'Contact Elevate Marketing and mention The Standard Savings Club for your exclusive member rate.',
  'https://elevatemarketingidaho.com',
  '(208) 555-0106',
  false
)
on conflict (slug) do nothing;
