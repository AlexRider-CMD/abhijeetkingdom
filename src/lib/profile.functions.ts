import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const profileSchema = z.object({
  displayName: z.string().trim().min(1).max(80),
});

export const getCurrentProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("profiles")
      .select("id, display_name, avatar_url, status, about, notifications_enabled, last_seen_at")
      .eq("id", context.userId)
      .maybeSingle();

    if (error) throw new Error("Unable to load your family profile.");
    return data;
  });

export const saveCurrentProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) => profileSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { data: profile, error } = await context.supabase
      .from("profiles")
      .upsert({ id: context.userId, display_name: data.displayName }, { onConflict: "id" })
      .select("id, display_name, avatar_url, status, about, notifications_enabled, last_seen_at")
      .single();

    if (error) throw new Error("Unable to save your family profile.");
    return profile;
  });
