import { notFound } from "next/navigation";

import { saveJob } from "@/features/employer/actions";
import { requireUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";
import { PageContainer } from "@/components/shared/page-container";
import { JobFields } from "@/components/employer/job-fields";
import { SubmitButton } from "@/components/shared/submit-button";
import { UnsavedChangesGuard } from "@/components/shared/unsaved-changes-guard";

export const dynamic = "force-dynamic";

interface EditJobPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const user = await requireUser();
  const { id } = await params;

  const [companies, job] = await Promise.all([
    prisma.company.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.job.findFirst({
      where: {
        id,
        company: {
          ownerId: user.id,
        },
      },
    }),
  ]);

  if (!job) {
    notFound();
  }

  return (
    <PageContainer className="py-10">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary">Employer</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Edit job
        </h1>
        <p className="mt-2 text-muted-foreground">
          Update role details, publishing status, or requirements.
        </p>
      </div>

      <UnsavedChangesGuard
        action={saveJob}
        className="mt-8 max-w-4xl space-y-6 rounded-lg border bg-card p-6"
      >
        <input type="hidden" name="jobId" value={job.id} />
        <JobFields companies={companies} job={job} />
        <SubmitButton>Save changes</SubmitButton>
      </UnsavedChangesGuard>
    </PageContainer>
  );
}
