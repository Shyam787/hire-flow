import { Briefcase, Building2, Users } from "lucide-react";

import { JobSearchBar } from "@/components/jobs/job-search-bar";
import { PageContainer } from "@/components/shared/page-container";

const statistics = [
  {
    label: "Jobs",
    value: "12K+",
    icon: Briefcase,
  },
  {
    label: "Companies",
    value: "500+",
    icon: Building2,
  },
  {
    label: "Candidates",
    value: "25K+",
    icon: Users,
  },
];

export function Hero() {
  return (
    <section className="py-20 lg:py-28">
      <PageContainer>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border bg-muted px-4 py-2 text-sm font-medium">
            🚀 New Opportunities Await
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Find Your Next Career Opportunity
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Discover thousands of jobs from startups and leading companies,
            all in one place. Search, apply, and take the next step in
            your career with confidence.
          </p>

          {/* Search */}
          <div className="mt-10 w-full">
            <JobSearchBar />
          </div>

          {/* Statistics */}
          <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
            {statistics.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <Icon className="mx-auto mb-3 h-8 w-8 text-primary" />

                  <p className="text-3xl font-bold">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}