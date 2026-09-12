drop policy if exists "Members can view family activity" on public.family_activity;
create policy "Members can view family activity"
on public.family_activity for select
to authenticated
using (auth.uid() is not null);