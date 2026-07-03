"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ApplicationStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-user";

const WITHDRAW_COOLDOWN_HOURS = 12;

function getCooldownUntil(withdrawnAt: Date) {
  return new Date(withdrawnAt.getTime() + WITHDRAW_COOLDOWN_HOURS * 60 * 60 * 1000);
}

export async function applyToJob(formData: FormData): Promise<void> {
  const user = await requireUser();

  const jobId = String(formData.get("jobId") ?? "").trim();
  const coverLetter = String(formData.get("coverLetter") ?? "").trim();
  const resumeUrl = String(formData.get("resumeUrl") ?? "").trim();

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job || job.status !== "PUBLISHED") {
    return;
  }

  const existingApplication = await prisma.application.findUnique({
    where: {
      userId_jobId: {
        userId: user.id,
        jobId,
      },
    },
  });

  if (existingApplication?.status === ApplicationStatus.WITHDRAWN) {
    const withdrawnAt = existingApplication.withdrawnAt ?? existingApplication.updatedAt;
    const cooldownUntil = getCooldownUntil(withdrawnAt);

    if (cooldownUntil > new Date()) {
      redirect(`/jobs/${jobId}?cooldownUntil=${encodeURIComponent(cooldownUntil.toISOString())}`);
    }

    await prisma.application.update({
      where: {
        id: existingApplication.id,
      },
      data: {
        status: ApplicationStatus.PENDING,
        coverLetter: coverLetter || null,
        resumeUrl: resumeUrl || null,
        withdrawnAt: null,
      },
    });

    revalidatePath(`/jobs/${jobId}`);
    revalidatePath("/dashboard");
    redirect("/dashboard?applied=1");
  }

  if (existingApplication) {
    redirect("/dashboard");
  }

  await prisma.application.create({
    data: {
      jobId,
      userId: user.id,
      coverLetter: coverLetter || null,
      resumeUrl: resumeUrl || null,
    },
  });

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/dashboard");
  redirect("/dashboard?applied=1");
}

export async function withdrawApplication(formData: FormData): Promise<void> {
  const user = await requireUser();
  const applicationId = String(formData.get("applicationId") ?? "").trim();

  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      userId: user.id,
      status: {
        not: ApplicationStatus.WITHDRAWN,
      },
    },
    include: {
      job: true,
    },
  });

  if (!application) {
    return;
  }

  await prisma.application.update({
    where: {
      id: application.id,
    },
    data: {
      status: ApplicationStatus.WITHDRAWN,
      withdrawnAt: new Date(),
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/employer");
  revalidatePath(`/jobs/${application.jobId}`);
}
