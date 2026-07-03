import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, ExternalLink, Factory, Landmark, Layers3, MapPin, Network } from "lucide-react";

import { PageContainer } from "@/components/shared/page-container";
import { PendingLink } from "@/components/shared/pending-link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface CompanyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CompanyDetailsPage({ params }: CompanyDetailsPageProps) {
  const { id } = await params;

  const company = await prisma.company.findUnique({
    where: {
      id,
    },
    include: {
      jobs: {
        where: {
          status: "PUBLISHED",
        },
        orderBy: {
          postedAt: "desc",
        },
        take: 2,
      },
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
  });

  if (!company) {
    notFound();
  }

  return (
    <PageContainer className="py-12">
      <section className="rounded-lg border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-5">
            <CompanyLogo logo={company.logo} />
            <div>
              <p className="text-sm font-medium text-primary">
                {company.industry ?? "Company"}
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                {company.name}
              </h1>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                {company.size && <span>{company.size} employees</span>}
                {company.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {company.location}
                  </span>
                )}
                <span>{company._count.jobs} active jobs</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-4xl whitespace-pre-line leading-8 text-muted-foreground">
          {company.description ??
            `${company.name} is actively hiring through HireFlow.`}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Info label="Website" value={company.website} href={company.website} />
          <Info label="Email" value={company.email} />
          <Info label="Phone" value={company.phone} />
          <Info label="LinkedIn" value={company.linkedinUrl} href={company.linkedinUrl} />
        </div>
      </section>

      <section className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Latest roles</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing the two most recent openings from {company.name}.
            </p>
          </div>
          <Button variant="outline" asChild>
            <PendingLink href={`/jobs?q=${encodeURIComponent(company.name)}&sort=latest`}>
              Explore All Jobs
            </PendingLink>
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {company.jobs.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center md:col-span-2">
              <p className="font-medium">No active jobs right now</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Check back later or explore other companies.
              </p>
            </div>
          ) : (
            company.jobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="rounded-lg border p-5 transition-colors hover:bg-muted"
              >
                <h3 className="font-semibold">{job.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {job.location} - {job.employmentType} - {job.experienceLevel}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="rounded-full border bg-background px-2.5 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </PageContainer>
  );
}

function CompanyLogo({ logo }: { logo: string | null }) {
  const Icon =
    logo === "logo-2"
      ? Factory
      : logo === "logo-3"
      ? Landmark
      : logo === "logo-4"
      ? Layers3
      : logo === "logo-5"
      ? Network
      : Building2;

  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Icon className="h-8 w-8" aria-hidden="true" />
    </div>
  );
}

function Info({
  label,
  value,
  href,
}: {
  label: string;
  value: string | null;
  href?: string | null;
}) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      {href && value ? (
        <Link href={href} className="mt-1 flex items-center gap-1 font-medium text-primary hover:underline">
          Visit
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      ) : (
        <p className="mt-1 font-medium">{value ?? "Not listed"}</p>
      )}
    </div>
  );
}
