-- Add membership_id to profiles
alter table public.profiles add column if not exists membership_id text unique;

-- Function to generate a membership ID
create or replace function generate_membership_id()
returns text as $$
declare
  new_id text;
  exists_check integer;
begin
  loop
    new_id := 'TSSC-' || lpad(floor(random() * 999999)::text, 6, '0');
    select count(*) into exists_check from public.profiles where membership_id = new_id;
    exit when exists_check = 0;
  end loop;
  return new_id;
end;
$$ language plpgsql;

-- Assign IDs to all existing members who don't have one
update public.profiles
set membership_id = generate_membership_id()
where membership_id is null;

-- Auto-assign on new profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, membership_id)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    generate_membership_id()
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;
