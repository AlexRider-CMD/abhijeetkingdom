revoke all on table public.profiles from anon;
revoke all on table public.user_roles from anon;
revoke all on table public.profiles from public;
revoke all on table public.user_roles from public;
grant select, insert, update on public.profiles to authenticated;
grant select on public.user_roles to authenticated;
grant all on public.profiles to service_role;
grant all on public.user_roles to service_role;