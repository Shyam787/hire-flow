import { JobCard } from "@/components/jobs/job-card";
import { JobFilters } from "@/components/jobs/job-filters";
import { Pagination } from "@/components/jobs/pagination";
import { PageContainer } from "@/components/shared/page-container";
import { getJobs } from "@/features/jobs/queries";

export const dynamic = "force-dynamic";

interface JobsPageProps {
  searchParams: Promise<{
    q?: string;
    location?: string;
    employmentType?: string;
    experienceLevel?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function JobsPage({
  searchParams,
}: JobsPageProps) {
  const {
    q = "",
    location = "",
    employmentType = "all",
    experienceLevel = "all",
    sort = "latest",
    page = "1",
  } = await searchParams;

  const {
    jobs,
    currentPage,
    totalPages,
  } = await getJobs({
    q,
    location,
    employmentType,
    experienceLevel,
    sort,
    page: Number(page),
  });

  return (
    <PageContainer className="py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Find Your Next Opportunity
        </h1>

        <p className="mt-2 text-muted-foreground">
          Browse jobs from companies hiring now.
        </p>
      </div>

      <div className="mb-10">
        <JobFilters
          defaultQuery={q}
          defaultLocation={location}
          defaultEmploymentType={employmentType}
          defaultExperienceLevel={experienceLevel}
          defaultSort={sort}
        />
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-16 text-center">
          <h2 className="text-2xl font-semibold">
            No jobs found
          </h2>

          <p className="mt-2 text-muted-foreground">
            Try changing your filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={{
                  ...job,
                  company: {
                    id: job.company.id,
                    name: job.company.name,
                    logo: job.company.logo ?? null,
                  },
                  salary: job.salary ?? null,
                  experienceLevel: job.experienceLevel,
                  postedAt:
                    job.postedAt.toLocaleDateString(),
                }}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={{
              q,
              location,
              employmentType,
              experienceLevel,
              sort,
            }}
          />
        </>
      )}
    </PageContainer>
  );
}
