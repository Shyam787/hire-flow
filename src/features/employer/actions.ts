"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { JobStatus, ApplicationStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-user";

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
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

export async function saveCompany(formData: FormData): Promise<void> {
  const user = await requireUser();

  if (user.role !== "EMPLOYER") {
    redirect("/dashboard");
  }

  const companyId = readString(formData, "companyId");
  const name = readString(formData, "name");
  const logo = readString(formData, "logo");
  const industry = readString(formData, "industry");
  const size = readString(formData, "size");
  const country = readString(formData, "country");
  const state = readString(formData, "state");
  const city = readString(formData, "city");
  const address = readString(formData, "address");
  const email = readString(formData, "email");
  const phone = readString(formData, "phone");
  const linkedinUrl = normalizeUrl(readString(formData, "linkedinUrl"));
  const website = normalizeUrl(readString(formData, "website"));
  const description = readString(formData, "description");
  const location = [city, state, country].filter(Boolean).join(", ");

  if (!name) {
    return;
  }

  if (companyId) {
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        ownerId: user.id,
      },
    });

    if (!company) {
      return;
    }

    await prisma.company.update({
      where: {
        id: company.id,
      },
      data: {
        name,
        logo: logo || "logo-1",
        industry: industry || null,
        size: size || null,
        country: country || null,
        state: state || null,
        city: city || null,
        address: address || null,
        email: email || null,
        phone: phone || null,
        linkedinUrl,
        location: location || null,
        website,
        description: description || null,
      },
    });
  } else {
    await prisma.company.create({
      data: {
        name,
        logo: logo || "logo-1",
        industry: industry || null,
        size: size || null,
        country: country || null,
        state: state || null,
        city: city || null,
        address: address || null,
        email: email || null,
        phone: phone || null,
        linkedinUrl,
        location: location || null,
        website,
        description: description || null,
        ownerId: user.id,
      },
    });
  }

  revalidatePath("/companies");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/employer");
  redirect("/dashboard/employer");
}

export async function saveJob(formData: FormData): Promise<void> {
  const user = await requireUser();

  if (user.role !== "EMPLOYER") {
    redirect("/dashboard");
  }

  const jobId = readString(formData, "jobId");
  const companyId = readString(formData, "companyId");
  const title = readString(formData, "title");
  const location = readString(formData, "location");
  const employmentType = readString(formData, "employmentType");
  const experienceLevel = readString(formData, "experienceLevel");
  const salary = readString(formData, "salary");
  const description = readString(formData, "description");
  const skills = readSkills(readString(formData, "skills"));
  const status = readString(formData, "status") || "PUBLISHED";

  if (!companyId || !title || !location || !employmentType || !description) {
    return;
  }

  const company = await prisma.company.findFirst({
    where: {
      id: companyId,
      ownerId: user.id,
    },
  });

  if (!company) {
    return;
  }

  const jobStatus =
    status === JobStatus.DRAFT || status === JobStatus.CLOSED
      ? status
      : JobStatus.PUBLISHED;

  const data = {
    companyId,
    title,
    location,
    employmentType,
    experienceLevel: experienceLevel || "Mid-level",
    salary: salary || null,
    description,
    skills,
    status: jobStatus,
  };

  if (jobId) {
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        company: {
          ownerId: user.id,
        },
      },
    });

    if (!job) {
      return;
    }

    await prisma.job.update({
      where: {
        id: job.id,
      },
      data,
    });
  } else {
    await prisma.job.create({
      data,
    });
  }

  revalidatePath("/");
  revalidatePath("/jobs");
  revalidatePath("/companies");
  revalidatePath("/dashboard/employer");
  redirect("/dashboard/employer");
}

export async function deleteJob(formData: FormData): Promise<void> {
  const user = await requireUser();

  if (user.role !== "EMPLOYER") {
    redirect("/dashboard");
  }

  const jobId = readString(formData, "jobId");

  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      company: {
        ownerId: user.id,
      },
    },
  });

  if (!job) {
    return;
  }

  await prisma.job.delete({
    where: {
      id: job.id,
    },
  });

  revalidatePath("/");
  revalidatePath("/jobs");
  revalidatePath("/dashboard/employer");
  revalidatePath(`/dashboard/employer/jobs/${job.id}/applicants`);
}

export async function updateApplicationStatus(formData: FormData): Promise<void> {
  const user = await requireUser();

  if (user.role !== "EMPLOYER") {
    redirect("/dashboard");
  }

  const applicationId = readString(formData, "applicationId");
  const status = readString(formData, "status");

  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      status: {
        not: ApplicationStatus.WITHDRAWN,
      },
      job: {
        company: {
          ownerId: user.id,
        },
      },
    },
  });

  if (!application) {
    return;
  }

  const applicationStatus =
    status === ApplicationStatus.REVIEWING ||
    status === ApplicationStatus.SHORTLISTED ||
    status === ApplicationStatus.REJECTED ||
    status === ApplicationStatus.HIRED
      ? status
      : ApplicationStatus.PENDING;

  await prisma.application.update({
    where: {
      id: application.id,
    },
    data: {
      status: applicationStatus,
    },
  });

  revalidatePath("/dashboard/employer");
  revalidatePath(`/dashboard/employer/jobs/${application.jobId}/applicants`);
}
