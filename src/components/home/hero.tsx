import { Briefcase, Building2, Users } from "lucide-react";

import { JobSearchBar } from "@/components/jobs/job-search-bar";
import { PageContainer } from "@/components/shared/page-container";

const statistics = [
  {
    value: "12K+",
    label: "Active Jobs",
    icon: Briefcase,
  },
  {
    value: "500+",
    label: "Hiring Companies",
    icon: Building2,
  },
  {
    value: "25K+",
    label: "Job Seekers",
    icon: Users,
  },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden py-20">
      {/* Background Decorations */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
      />

      <PageContainer className="relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <span>✨</span>
            <span>Connecting Talent with Opportunity</span>
          </div>

          {/* Heading */}
          <h1 className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Find Your Next
            <br />
            <span className="text-primary">
              Career Opportunity
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Discover exciting opportunities from startups and leading
            companies. Search smarter, apply faster, and take the next
            step in your career—all from one place.
          </p>

          {/* Search */}
          <div className="mt-10 w-full max-w-5xl">
            <JobSearchBar />
          </div>

          {/* Statistics */}
          <ul className="mt-14 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
            {statistics.map((stat) => {
              const Icon = stat.icon;

              return (
                <li
                  key={stat.label}
                  className="rounded-2xl border bg-card p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Icon className="mx-auto mb-4 h-8 w-8 text-primary" />

                  <p className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </PageContainer>
    </section>
  );
}