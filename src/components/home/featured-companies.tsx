import { ArrowRight } from "lucide-react";

import { featuredCompanies } from "@/constants/companies";
import { CompanyCard } from "@/components/home/company-card";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { SECTION_PADDING, ICON_SIZE_SM } from "@/constants/design";

export function FeaturedCompanies() {
  return (
    <section className={SECTION_PADDING}>
      <PageContainer>
        <SectionHeader
          title="Top Companies Hiring Now"
          description="Discover leading companies actively looking for talented professionals."
        >
          <Button variant="outline" className="hidden md:flex">
            View All Companies
            <ArrowRight className={ICON_SIZE_SM} />
          </Button>
        </SectionHeader>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Button variant="outline">
            View All Companies
            <ArrowRight className={ICON_SIZE_SM} />
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}