-- Auto-create a public.signups row whenever a new auth.users row is inserted.
-- This means: as soon as a user signs up via Supabase Auth, their HayPlusbot
-- product-state row exists too. Disclosure signing later UPDATEs the same row;
-- HFM verification UPDATEs it again; HFcopy subscription syncs UPDATE it.
--
-- SECURITY DEFINER bypasses RLS on public.signups (which has no INSERT policy).
-- Only the auth.users INSERT trigger calls it; no other code path has reach.

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
begin
  insert into public.signups (user_id, email, signed_up_at)
  values (new.id, new.email, now())
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();
