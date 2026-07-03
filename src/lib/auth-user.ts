import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function requireUser() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return prisma.user.upsert({
    where: {
      id: user.id,
    },
    update: {
      email: user.email ?? "",
      name: user.user_metadata?.name ?? undefined,
      firstName: user.user_metadata?.firstName ?? undefined,
      lastName: user.user_metadata?.lastName ?? undefined,
      image: user.user_metadata?.avatar_url ?? undefined,
    },
    create: {
      id: user.id,
      email: user.email ?? "",
      name: user.user_metadata?.name ?? user.email ?? "HireFlow user",
      firstName: user.user_metadata?.firstName ?? null,
      lastName: user.user_metadata?.lastName ?? null,
      image: user.user_metadata?.avatar_url ?? null,
      role:
        user.user_metadata?.role === "EMPLOYER"
          ? "EMPLOYER"
          : "CANDIDATE",
    },
  });
}
