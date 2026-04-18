-- Forum posts table
create table if not exists public.forum_posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  author_name text not null,
  author_avatar text default '😊',
  title text not null,
  body text not null,
  pinned boolean default false,
  likes integer default 0,
  created_at timestamptz default now()
);

-- Forum replies table
create table if not exists public.forum_replies (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.forum_posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  author_name text not null,
  author_avatar text default '😊',
  body text not null,
  likes integer default 0,
  created_at timestamptz default now()
);

-- Profiles table (for avatar/emoji)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  first_name text,
  last_name text,
  phone text,
  avatar text default '😊',
  avatar_type text default 'emoji',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS policies
alter table public.forum_posts enable row level security;
alter table public.forum_replies enable row level security;
alter table public.profiles enable row level security;

-- Anyone authenticated can read posts/replies
create policy "Authenticated users can read posts" on public.forum_posts for select using (auth.role() = 'authenticated');
create policy "Authenticated users can insert posts" on public.forum_posts for insert with check (auth.uid() = user_id);
create policy "Users can update their own posts" on public.forum_posts for update using (auth.uid() = user_id);

create policy "Authenticated users can read replies" on public.forum_replies for select using (auth.role() = 'authenticated');
create policy "Authenticated users can insert replies" on public.forum_replies for insert with check (auth.uid() = user_id);

create policy "Users can read any profile" on public.profiles for select using (auth.role() = 'authenticated');
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
