import { prisma } from "@/lib/prisma";

interface SupabaseUser {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    firstName?: string;
    lastName?: string;
    role?: "CANDIDATE" | "EMPLOYER";
    avatar_url?: string;
  };
}

export async function upsertUser(supabaseUser: SupabaseUser) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: supabaseUser.email!,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const newUser = await prisma.user.create({
    data: {
      id: supabaseUser.id,
      email: supabaseUser.email!,
      name: supabaseUser.user_metadata?.name ?? null,
      firstName: supabaseUser.user_metadata?.firstName ?? null,
      lastName: supabaseUser.user_metadata?.lastName ?? null,
      role:
        supabaseUser.user_metadata?.role === "EMPLOYER"
          ? "EMPLOYER"
          : "CANDIDATE",
      image: supabaseUser.user_metadata?.avatar_url ?? null,
    },
  });

  return newUser;
}
