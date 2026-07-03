import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, Clock3, FileText, Search, UserRound, XCircle } from "lucide-react";
import { ApplicationStatus } from "@prisma/client";

import { requireUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";
import { PageContainer } from "@/components/shared/page-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobCard } from "@/components/jobs/job-card";
import { RecentApplicationsDialog } from "@/components/dashboard/recent-applications-dialog";
import { RefreshButton } from "@/components/dashboard/refresh-button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();

  if (user.role === "EMPLOYER") {
    redirect("/dashboard/employer");
  }

  const [applications, applicationCount, activeApplicationCount, latestJobs] =
    await Promise.all([
    prisma.application.findMany({
      where: {
        userId: user.id,
        status: {
          not: ApplicationStatus.WITHDRAWN,
        },
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.application.count({
      where: {
        userId: user.id,
        status: {
          not: ApplicationStatus.WITHDRAWN,
        },
      },
    }),
    prisma.application.count({
      where: {
        userId: user.id,
        status: {
          in: ["PENDING", "REVIEWING", "SHORTLISTED"],
        },
      },
    }),
    prisma.job.findMany({
      where: {
        status: "PUBLISHED",
      },
      include: {
        company: true,
      },
      orderBy: {
        postedAt: "desc",
      },
      take: 4,
    }),
  ]);

  const completion = getProfileCompletion(user);
  const firstName = user.firstName ?? user.name?.split(" ")[0] ?? "there";
  const visibleApplications = applications.slice(0, 3);
  const applicationDialogItems = applications.map((application) => ({
    id: application.id,
    status: application.status,
    createdAt: application.createdAt.toLocaleDateString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    job: {
      id: application.job.id,
      title: application.job.title,
      companyName: application.job.company.name,
    },
  }));

  return (
    <PageContainer className="py-10">
      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-semibold text-primary">
              Hey {firstName} 👋
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Ready to find your next opportunity?
            </h1>
            <p className="mt-2 text-muted-foreground">
              Track applications, discover fresh roles, and keep your profile
              sharp for hiring teams.
            </p>
          </div>
          <div className="flex gap-2">
            <RefreshButton />
            <Button asChild><Link href="/jobs"><Search className="h-4 w-4" />Browse jobs</Link></Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <SummaryCard label="Total Applications" value={applicationCount} />
          <SummaryCard label="Active Applications" value={activeApplicationCount} />
        </div>
      </section>

      <section className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <UserRound className="mt-1 h-6 w-6 text-primary" />
            <div>
              <h2 className="text-xl font-semibold">Profile completion</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Complete the important details employers check first.
              </p>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-4xl font-bold">{completion.percent}%</p>
            <p className="pb-1 text-sm text-muted-foreground">complete</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {completion.items.map((item) => (
            <div key={item.label} className="rounded-lg border bg-background p-4">
              <div className="flex items-center gap-2">
                {item.done ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Latest jobs</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The newest published roles on HireFlow.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/jobs?sort=latest">View all</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {latestJobs.map((job) => (
            <JobCard
              key={job.id}
              job={{
                id: job.id,
                title: job.title,
                description: job.description,
                company: {
                  id: job.company.id,
                  name: job.company.name,
                  logo: job.company.logo,
                },
                location: job.location,
                employmentType: job.employmentType,
                experienceLevel: job.experienceLevel,
                salary: job.salary,
                skills: job.skills,
                postedAt: job.postedAt.toLocaleDateString(),
              }}
            />
          ))}
        </div>
      </section>

      <div className="mt-8">
        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Recent applications</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Showing your latest applications. Open the full list to manage them.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <RecentApplicationsDialog applications={applicationDialogItems} />
            </div>
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            {visibleApplications.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="font-medium">No applications yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Apply to a role and it will appear here.
                </p>
              </div>
            ) : (
              visibleApplications.map((application) => (
                <Link
                  key={application.id}
                  href={`/jobs/${application.job.id}`}
                  className="block rounded-lg border p-4 transition-colors hover:bg-muted"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold">{application.job.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {application.job.company.name}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {formatStatus(application.status)}
                    </Badge>
                  </div>
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock3 className="h-4 w-4" aria-hidden="true" />
                    Applied{" "}
                    {application.createdAt.toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-lg border bg-background p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
    </article>
  );
}

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function getProfileCompletion(user: {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  location: string | null;
  resumeUrl: string | null;
  skills: string[];
  currentJobTitle: string | null;
  portfolioUrl: string | null;
}) {
  const items = [
    {
      label: "Personal Information",
      done: Boolean(user.firstName && user.lastName && user.phone && user.location),
    },
    {
      label: "Resume",
      done: Boolean(user.resumeUrl),
    },
    {
      label: "Skills",
      done: user.skills.length > 0,
    },
    {
      label: "Experience",
      done: Boolean(user.currentJobTitle),
    },
    {
      label: "Portfolio",
      done: Boolean(user.portfolioUrl),
    },
  ];

  return {
    items,
    percent: Math.round(
      (items.filter((item) => item.done).length / items.length) * 100
    ),
  };
}
