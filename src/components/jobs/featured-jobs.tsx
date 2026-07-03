import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { JobCard } from "@/components/jobs/job-card";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { SECTION_PADDING, ICON_SIZE_SM } from "@/constants/design";
import type { Job } from "@/types/job";

interface FeaturedJobsProps {
  jobs: Job[];
}

export function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  return (
    <section className={SECTION_PADDING}>
      <PageContainer>
        <SectionHeader
          title="Opportunities from top companies"
          description="Explore hand-picked openings from startups and industry leaders hiring talented professionals."
        >
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link href="/jobs">
              View All Jobs
              <ArrowRight className={ICON_SIZE_SM} />
            </Link>
          </Button>
        </SectionHeader>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/jobs">
              View All Jobs
              <ArrowRight className={ICON_SIZE_SM} />
            </Link>
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}
