"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function signUp(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: "CANDIDATE" | "EMPLOYER" = "CANDIDATE"
) {
  const supabase = await createSupabaseServerClient();
  const name = `${firstName} ${lastName}`.trim();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        firstName,
        lastName,
        role,
      },
    },
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  if (!data.user) {
    return {
      error: "Unable to create account.",
    };
  }

  await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      name,
      firstName,
      lastName,
      role,
    },
    create: {
      id: data.user.id,
      email,
      name,
      firstName,
      lastName,
      role,
    },
  });

  redirect(role === "EMPLOYER" ? "/dashboard/employer/company" : "/dashboard");
}

export async function signIn(
  email: string,
  password: string
) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect("/");
}
