import { createSupabaseServerClient } from "@/lib/supabase-server";
import { upsertUser } from "@/lib/user";

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const dbUser = await upsertUser(user);

  return dbUser;
}