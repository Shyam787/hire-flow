import { notFound, redirect } from "next/navigation";
import { ApplicationStatus } from "@prisma/client";
import { ArrowLeft } from "lucide-react";

import { RefreshButton } from "@/components/dashboard/refresh-button";
import { CompactPagination } from "@/components/shared/compact-pagination";
import { PageContainer } from "@/components/shared/page-container";
import { PendingLink } from "@/components/shared/pending-link";
import { SubmitButton } from "@/components/shared/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateApplicationStatus } from "@/features/employer/actions";
import { requireUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const pageSize = 10;
const statuses: ApplicationStatus[] = [
  ApplicationStatus.PENDING,
  ApplicationStatus.REVIEWING,
  ApplicationStatus.SHORTLISTED,
  ApplicationStatus.REJECTED,
  ApplicationStatus.HIRED,
];

export default async function ApplicantsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const user = await requireUser();

  if (user.role !== "EMPLOYER") {
    redirect("/dashboard");
  }

  const { id } = await params;
  const query = await searchParams;
  const status = normalizeStatus(query.status);
  const requestedPage = Math.max(Number(query.page) || 1, 1);
  const job = await prisma.job.findFirst({ where: { id, company: { ownerId: user.id } }, include: { company: true } });

  if (!job) {
    notFound();
  }

  const where = { jobId: id, status: status ?? { not: ApplicationStatus.WITHDRAWN } };
  const [applications, total, allApplications] = await Promise.all([
    prisma.application.findMany({
      where,
      include: { user: true },
      orderBy: { createdAt: "desc" },
      skip: (requestedPage - 1) * pageSize,
      take: pageSize,
    }),
    prisma.application.count({ where }),
    prisma.application.findMany({
      where: { jobId: id, status: { not: ApplicationStatus.WITHDRAWN } },
      select: { status: true },
    }),
  ]);

  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const page = Math.min(requestedPage, totalPages);
  const counts: Record<ApplicationStatus | "ALL", number> = {
    ALL: allApplications.length,
    PENDING: allApplications.filter((application) => application.status === ApplicationStatus.PENDING).length,
    REVIEWING: allApplications.filter((application) => application.status === ApplicationStatus.REVIEWING).length,
    SHORTLISTED: allApplications.filter((application) => application.status === ApplicationStatus.SHORTLISTED).length,
    REJECTED: allApplications.filter((application) => application.status === ApplicationStatus.REJECTED).length,
    HIRED: allApplications.filter((application) => application.status === ApplicationStatus.HIRED).length,
    WITHDRAWN: 0,
  };

  return (
    <PageContainer className="py-10">
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" asChild>
          <PendingLink href="/dashboard/employer">
            <ArrowLeft />
            Back to posted jobs
          </PendingLink>
        </Button>
        <RefreshButton />
      </div>

      <header className="mt-5 border-b pb-7">
        <p className="text-sm font-medium text-primary">{job.company.name}</p>
        <h1 className="mt-2 text-3xl font-bold">Applicants for {job.title}</h1>
        <p className="mt-2 text-muted-foreground">Review candidates, open their profiles, and update hiring status.</p>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button size="sm" variant={status === null ? "default" : "outline"} asChild>
          <PendingLink href={`/dashboard/employer/jobs/${id}/applicants`}>All ({counts.ALL})</PendingLink>
        </Button>
        {statuses.map((value) => (
          <Button key={value} size="sm" variant={status === value ? "default" : "outline"} asChild>
            <PendingLink href={`/dashboard/employer/jobs/${id}/applicants?status=${value}`}>
              {title(value)} ({counts[value]})
            </PendingLink>
          </Button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="p-4">Applicant</th>
              <th className="p-4">Applied</th>
              <th className="p-4">Status</th>
              <th className="p-4">Update status</th>
              <th className="p-4">Profile</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {applications.map((application) => (
              <tr key={application.id}>
                <td className="p-4 font-medium">{application.user.name ?? application.user.email}</td>
                <td className="p-4 text-muted-foreground">{application.createdAt.toLocaleDateString()}</td>
                <td className="p-4">
                  <Badge variant="secondary">{title(application.status)}</Badge>
                </td>
                <td className="p-4">
                  <form action={updateApplicationStatus} className="flex gap-2">
                    <input type="hidden" name="applicationId" value={application.id} />
                    <select name="status" defaultValue={application.status} className="h-8 rounded-lg border bg-background px-2">
                      <option value="PENDING">Pending</option>
                      <option value="REVIEWING">Reviewing</option>
                      <option value="SHORTLISTED">Shortlisted</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="HIRED">Hired</option>
                    </select>
                    <SubmitButton size="sm">Update</SubmitButton>
                  </form>
                </td>
                <td className="p-4">
                  <Button variant="outline" size="sm" asChild>
                    <PendingLink href={`/dashboard/employer/jobs/${id}/applicants/${application.id}`}>View applicant</PendingLink>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!applications.length && <p className="p-10 text-center text-muted-foreground">No applicants found.</p>}
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
        <CompactPagination
          basePath={`/dashboard/employer/jobs/${id}/applicants`}
          currentPage={page}
          totalPages={totalPages}
          searchParams={{ status: status ?? undefined }}
        />
      </div>
    </PageContainer>
  );
}

function normalizeStatus(value?: string) {
  return statuses.includes(value as ApplicationStatus) ? (value as ApplicationStatus) : null;
}

function title(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}
