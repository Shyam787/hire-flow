import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { CompanyCard, type CompanyCardData } from "@/components/home/company-card";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { SECTION_PADDING, ICON_SIZE_SM } from "@/constants/design";

interface FeaturedCompaniesProps {
  companies: CompanyCardData[];
}

export function FeaturedCompanies({ companies }: FeaturedCompaniesProps) {
  return (
    <section className={SECTION_PADDING}>
      <PageContainer>
        <SectionHeader
          title="Top Companies Hiring Now"
          description="Discover leading companies actively looking for talented professionals."
        >
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link href="/companies">
              View All Companies
              <ArrowRight className={ICON_SIZE_SM} />
            </Link>
          </Button>
        </SectionHeader>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/companies">
              View All Companies
              <ArrowRight className={ICON_SIZE_SM} />
            </Link>
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}
