"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-user";
import { createSupabaseServerClient } from "@/lib/supabase-server";

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readOptionalNumber(formData: FormData, key: string) {
  const value = readString(formData, key);
  return value ? Number(value) : null;
}

function readSkills(value: string) {
  return value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function normalizeUrl(value: string) {
  if (!value) {
    return null;
  }

  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export async function updateProfile(formData: FormData): Promise<void> {
  const user = await requireUser();

  const firstName = readString(formData, "firstName");
  const lastName = readString(formData, "lastName");

  if (!firstName || !lastName) {
    return;
  }

  const name = `${firstName} ${lastName}`.trim();

  if (user.role === "EMPLOYER") {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName,
        lastName,
        name,
        phone: readString(formData, "phone") || null,
        designation: readString(formData, "designation") || null,
        bio: readString(formData, "bio") || null,
      },
    });
  } else {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName,
        lastName,
        name,
        phone: readString(formData, "phone") || null,
        location: readString(formData, "location") || null,
        headline: readString(formData, "headline") || null,
        currentJobTitle: readString(formData, "currentJobTitle") || null,
        yearsExperience: readOptionalNumber(formData, "yearsExperience"),
        preferredJobRole: readString(formData, "preferredJobRole") || null,
        preferredWorkType: readString(formData, "preferredWorkType") || null,
        preferredEmploymentType:
          readString(formData, "preferredEmploymentType") || null,
        expectedSalary: readString(formData, "expectedSalary") || null,
        lookingForJob: formData.get("lookingForJob") === "on",
        skills: readSkills(readString(formData, "skills")),
        bio: readString(formData, "bio") || null,
        college: readString(formData, "college") || null,
        degree: readString(formData, "degree") || null,
        fieldOfStudy: readString(formData, "fieldOfStudy") || null,
        graduationYear: readString(formData, "graduationYear") || null,
        resumeUrl: readString(formData, "resumeUrl") || null,
        linkedinUrl: normalizeUrl(readString(formData, "linkedinUrl")),
        githubUrl: normalizeUrl(readString(formData, "githubUrl")),
        portfolioUrl: normalizeUrl(readString(formData, "portfolioUrl")),
      },
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/profile");
  redirect("/dashboard/profile");
}

export async function updateSettings(formData: FormData): Promise<void> {
  const user = await requireUser();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      applicationUpdates: formData.get("applicationUpdates") === "on",
      newJobAlerts: formData.get("newJobAlerts") === "on",
    },
  });

  revalidatePath("/dashboard/settings");
}

export type PasswordState = {
  error?: string;
  success?: string;
};

export async function changePassword(
  _previousState: PasswordState,
  formData: FormData
): Promise<PasswordState> {
  const user = await requireUser();
  const currentPassword = readString(formData, "currentPassword");
  const newPassword = readString(formData, "newPassword");
  const confirmPassword = readString(formData, "confirmPassword");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "Please fill in all password fields." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New password and re-entered password must match." };
  }

  if (newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }

  const supabase = await createSupabaseServerClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    return { error: "Current password is incorrect." };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { error: updateError.message };
  }

  return { success: "Password updated successfully." };
}
