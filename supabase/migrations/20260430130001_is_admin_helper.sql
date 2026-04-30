-- is_admin() — used by middleware and server components to gate /admin/*
-- routes. SECURITY DEFINER so authenticated users can check their own admin
-- status without needing direct RLS read access on admin_users (which is
-- service-role only).

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth, pg_temp
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, service_role;
