import { Hero } from "@/components/home/hero";
import { FeaturedJobs } from "@/components/jobs/featured-jobs";
import { FeaturedCompanies } from "@/components/home/featured-companies";
import { HowItWorks } from "@/components/home/how-it-works";
import { CTA } from "@/components/home/cta";
import { getFeaturedJobs } from "@/features/jobs/queries";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [jobs, companies] = await Promise.all([
    getFeaturedJobs(6),
    prisma.company.findMany({
      include: {
        _count: {
          select: {
            jobs: {
              where: {
                status: "PUBLISHED",
              },
            },
          },
        },
      },
    }),
  ]);

  return (
    <>
      <Hero />
      <FeaturedJobs jobs={jobs} />
      <FeaturedCompanies
        companies={companies
          .map((company) => ({
            id: company.id,
            name: company.name,
            industry: company.industry,
            openJobs: company._count.jobs,
          }))
          .sort((a, b) => b.openJobs - a.openJobs)
          .slice(0, 6)}
      />
      <HowItWorks />
      <CTA />
    </>
  );
}
