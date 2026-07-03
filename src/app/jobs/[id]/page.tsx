import { notFound } from "next/navigation";
import {
  Briefcase,
  Building2,
  Clock3,
  DollarSign,
  MapPin,
} from "lucide-react";
import { ApplicationStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { ApplyButton } from "@/components/jobs/apply-button";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

interface JobPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobPage({
  params,
}: JobPageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const dbUser = user
    ? await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      })
    : null;

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
    include: {
      company: true,
    },
  });

  if (!job) {
    notFound();
  }

  const canPreviewUnpublished =
    user &&
    (await prisma.company.findFirst({
      where: {
        id: job.companyId,
        ownerId: user.id,
      },
      select: {
        id: true,
      },
    }));

  if (job.status !== "PUBLISHED" && !canPreviewUnpublished) {
    notFound();
  }

  const existingApplication = user
    ? await prisma.application.findUnique({
        where: {
          userId_jobId: {
            userId: user.id,
            jobId: job.id,
          },
        },
      })
    : null;
  const withdrawnAt =
    existingApplication?.status === ApplicationStatus.WITHDRAWN
      ? existingApplication.withdrawnAt ?? existingApplication.updatedAt
      : null;
  const cooldownUntil = withdrawnAt
    ? new Date(withdrawnAt.getTime() + 12 * 60 * 60 * 1000)
    : null;
  const isCooldownActive = Boolean(cooldownUntil && cooldownUntil > new Date());

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[2fr_380px]">
        <section>
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-2xl font-bold text-primary">
                {job.company.name.charAt(0)}
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  {job.title}
                </h1>

                <div className="mt-3 flex flex-wrap gap-5 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {job.company.name}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {job.employmentType} - {job.experienceLevel}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    {job.postedAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="my-8 border-t" />

            <h2 className="mb-4 text-2xl font-semibold">
              Job Description
            </h2>

            <p className="whitespace-pre-line leading-8 text-muted-foreground">
              {job.description}
            </p>

            <div className="mt-10">
              <h2 className="mb-4 text-2xl font-semibold">
                Required Skills
              </h2>

              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border bg-muted px-4 py-2 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-2xl border bg-card p-8 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-xl font-semibold">
            Job Overview
          </h2>

          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Experience
              </span>

              <span className="font-medium">
                {job.experienceLevel}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Employment
              </span>

              <span className="font-medium">
                {job.employmentType}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Location
              </span>

              <span className="font-medium">
                {job.location}
              </span>
            </div>

            {job.salary && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Salary
                </span>

                <span className="font-medium">
                  {job.salary}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Company
              </span>

              <span className="font-medium">
                {job.company.name}
              </span>
            </div>
          </div>

          <div className="mt-10">
            <ApplyButton
              jobId={job.id}
              isAuthenticated={Boolean(user)}
              userRole={dbUser?.role ?? null}
              hasApplied={Boolean(
                existingApplication &&
                  existingApplication.status !== ApplicationStatus.WITHDRAWN
              )}
              isAcceptingApplications={job.status === "PUBLISHED"}
              cooldownUntil={isCooldownActive ? cooldownUntil?.toISOString() : null}
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
