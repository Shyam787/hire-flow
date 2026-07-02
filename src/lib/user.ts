import { prisma } from "@/lib/prisma";

interface SupabaseUser {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
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
      email: supabaseUser.email!,
      name: supabaseUser.user_metadata?.name ?? null,
      image: supabaseUser.user_metadata?.avatar_url ?? null,
    },
  });

  return newUser;
}