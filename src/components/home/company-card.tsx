import { Building2 } from "lucide-react";
import Link from "next/link";

export interface CompanyCardData {
  id: string;
  name: string;
  industry: string | null;
  openJobs: number;
}

interface CompanyCardProps {
  company: CompanyCardData;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link
      href={`/companies/${company.id}`}
      className="
        flex flex-col rounded-2xl border bg-card p-6 shadow-sm
        transition-all duration-200 hover:-translate-y-1 hover:shadow-lg
      "
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Building2 className="h-6 w-6" aria-hidden="true" />
      </div>

      <h3 className="mt-4 text-lg font-semibold">
        {company.name}
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        {company.industry ?? "Company"}
      </p>

      <div className="mt-6 text-sm font-medium text-foreground">
        {company.openJobs} open roles
      </div>
    </Link>
  );
}
