import { ArrowRight } from "lucide-react";

import { featuredJobs } from "@/constants/jobs";
import { JobCard } from "@/components/jobs/job-card";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { SECTION_PADDING, ICON_SIZE_SM } from "@/constants/design";

export function FeaturedJobs() {
  return (
    <section className={SECTION_PADDING}>
      <PageContainer>
        <SectionHeader
          title="Opportunities from top companies"
          description="Explore hand-picked openings from startups and industry leaders hiring talented professionals."
        >
          <Button variant="outline" className="hidden md:flex">
            View All Jobs
            <ArrowRight className={ICON_SIZE_SM} />
          </Button>
        </SectionHeader>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Button variant="outline">
            View All Jobs
            <ArrowRight className={ICON_SIZE_SM} />
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}