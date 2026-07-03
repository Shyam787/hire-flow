import { Search } from "lucide-react";

import { CompanyCard } from "@/components/home/company-card";
import { PageContainer } from "@/components/shared/page-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface CompaniesPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function CompaniesPage({ searchParams }: CompaniesPageProps) {
  const { q = "" } = await searchParams;

  const companies = await prisma.company.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { industry: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
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
    orderBy: {
      name: "asc",
    },
  });

  const companyCards = companies
    .map((company) => ({
      id: company.id,
      name: company.name,
      industry: company.industry,
      openJobs: company._count.jobs,
    }))
    .sort((a, b) => b.openJobs - a.openJobs);

  return (
    <PageContainer className="py-12">
      <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_520px] lg:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Companies hiring on HireFlow</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Explore teams with active roles, clear hiring focus, and polished company profiles.
          </p>
        </div>

        <form action="/companies" className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input name="q" defaultValue={q} placeholder="Search companies or industries" className="pl-10" />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {companyCards.length === 0 ? (
        <div className="rounded-lg border border-dashed px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold">No companies found</h2>
          <p className="mt-2 text-muted-foreground">Try another company name or industry.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {companyCards.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
