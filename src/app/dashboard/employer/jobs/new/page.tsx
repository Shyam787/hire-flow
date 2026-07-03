import { saveJob } from "@/features/employer/actions";
import { requireUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";
import { PageContainer } from "@/components/shared/page-container";
import { JobFields } from "@/components/employer/job-fields";
import { PendingLink } from "@/components/shared/pending-link";
import { SubmitButton } from "@/components/shared/submit-button";
import { UnsavedChangesGuard } from "@/components/shared/unsaved-changes-guard";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function NewJobPage() {
  const user = await requireUser();

  const companies = await prisma.company.findMany({
    where: {
      ownerId: user.id,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <PageContainer className="py-10">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary">Employer</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Post a job
        </h1>
        <p className="mt-2 text-muted-foreground">
          Publish a clear role that candidates can discover and apply to.
        </p>
      </div>

      {companies.length === 0 ? (
        <div className="mt-8 max-w-3xl rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-xl font-semibold">Company profile required</h2>
          <p className="mt-2 text-muted-foreground">
            Create your company profile before publishing your first role.
          </p>
          <Button className="mt-6" asChild>
            <PendingLink href="/dashboard/employer/company">Create company</PendingLink>
          </Button>
        </div>
      ) : (
        <JobForm companies={companies} />
      )}
    </PageContainer>
  );
}

function JobForm({
  companies,
}: {
  companies: { id: string; name: string }[];
}) {
  return (
    <UnsavedChangesGuard
      action={saveJob}
      className="mt-8 max-w-4xl space-y-6 rounded-lg border bg-card p-6"
    >
      <JobFields companies={companies} />
      <SubmitButton>Publish job</SubmitButton>
    </UnsavedChangesGuard>
  );
}
