import { redirect } from "next/navigation";
import { ApplicationStatus, JobStatus } from "@prisma/client";
import { Building2, Plus } from "lucide-react";

import { RefreshButton } from "@/components/dashboard/refresh-button";
import { CompactPagination } from "@/components/shared/compact-pagination";
import { PageContainer } from "@/components/shared/page-container";
import { PendingLink } from "@/components/shared/pending-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const pageSize = 10;

export default async function EmployerDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ jobStatus?: string; page?: string }>;
}) {
  const user = await requireUser();

  if (user.role !== "EMPLOYER") {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const status = normalizeStatus(params.jobStatus);
  const requestedPage = Math.max(Number(params.page) || 1, 1);
  const where = { company: { ownerId: user.id }, ...(status ? { status } : {}) };

  const [company, jobs, total, allJobs] = await Promise.all([
    prisma.company.findFirst({ where: { ownerId: user.id }, orderBy: { createdAt: "desc" } }),
    prisma.job.findMany({
      where,
      include: {
        _count: {
          select: {
            applications: { where: { status: { not: ApplicationStatus.WITHDRAWN } } },
          },
        },
      },
      orderBy: { postedAt: "desc" },
      skip: (requestedPage - 1) * pageSize,
      take: pageSize,
    }),
    prisma.job.count({ where }),
    prisma.job.findMany({ where: { company: { ownerId: user.id } }, select: { status: true } }),
  ]);

  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const page = Math.min(requestedPage, totalPages);
  const firstName = user.firstName ?? user.name?.split(" ")[0] ?? company?.name ?? "there";
  const counts = {
    ALL: allJobs.length,
    PUBLISHED: allJobs.filter((job) => job.status === JobStatus.PUBLISHED).length,
    DRAFT: allJobs.filter((job) => job.status === JobStatus.DRAFT).length,
    CLOSED: allJobs.filter((job) => job.status === JobStatus.CLOSED).length,
  };

  return (
    <PageContainer className="py-10">
      <header className="flex flex-col gap-5 border-b pb-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Hey {firstName} 👋</p>
          <h1 className="mt-2 text-3xl font-bold">{company?.name ?? user.firstName ?? "Your hiring workspace"}</h1>
          <p className="mt-2 text-muted-foreground">Manage job posts and open each role to review its applicants.</p>
        </div>
        <div className="flex gap-2">
          <RefreshButton />
          <Button asChild>
            <PendingLink href="/dashboard/employer/jobs/new">
              <Plus />
              Post job
            </PendingLink>
          </Button>
        </div>
      </header>

      {!company ? (
        <div className="mt-8 rounded-lg border border-dashed p-10 text-center">
          <Building2 className="mx-auto h-8 w-8" />
          <h2 className="mt-4 text-xl font-semibold">Create your company profile first</h2>
          <Button className="mt-5" asChild>
            <PendingLink href="/dashboard/employer/company">Create company</PendingLink>
          </Button>
        </div>
      ) : (
        <section className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Posted jobs</h2>
              <p className="mt-1 text-sm text-muted-foreground">Ten jobs per page, newest first.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {([null, JobStatus.PUBLISHED, JobStatus.DRAFT, JobStatus.CLOSED] as const).map((value) => (
                <Button key={value ?? "ALL"} size="sm" variant={status === value ? "default" : "outline"} asChild>
                  <PendingLink href={value ? `/dashboard/employer?jobStatus=${value}` : "/dashboard/employer"}>
                    {value ? `${title(value)} (${counts[value]})` : `All (${counts.ALL})`}
                  </PendingLink>
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-6 divide-y rounded-lg border bg-card">
            {jobs.length ? (
              jobs.map((job) => (
                <article key={job.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-semibold">{job.title}</h3>
                      <Badge variant="secondary">{title(job.status)}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Posted {job.postedAt.toLocaleDateString()} · {job._count.applications} applicants
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <PendingLink href={`/dashboard/employer/jobs/${job.id}/edit`}>Edit</PendingLink>
                    </Button>
                    <Button asChild>
                      <PendingLink href={`/dashboard/employer/jobs/${job.id}/applicants`}>View applicants</PendingLink>
                    </Button>
                  </div>
                </article>
              ))
            ) : (
              <div className="p-10 text-center text-muted-foreground">No jobs found for this filter.</div>
            )}
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
            <CompactPagination
              basePath="/dashboard/employer"
              currentPage={page}
              totalPages={totalPages}
              searchParams={{ jobStatus: status ?? undefined }}
            />
          </div>
        </section>
      )}
    </PageContainer>
  );
}

function normalizeStatus(value?: string) {
  return value === JobStatus.PUBLISHED || value === JobStatus.DRAFT || value === JobStatus.CLOSED ? value : null;
}

function title(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}
