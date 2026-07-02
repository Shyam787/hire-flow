import { ArrowRight } from "lucide-react";

import { categories } from "@/constants/categories";
import { CategoryCard } from "@/components/home/category-card";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { SECTION_PADDING, ICON_SIZE_SM } from "@/constants/design";

export function Categories() {
  return (
    <section className={SECTION_PADDING}>
      <PageContainer>
        <SectionHeader
          title="Explore by Category"
          description="Find jobs that match your skills and interests across top domains."
        >
          <Button variant="outline" className="hidden md:flex">
            View All Categories
            <ArrowRight className={ICON_SIZE_SM} />
          </Button>
        </SectionHeader>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Button variant="outline">
            View All Categories
            <ArrowRight className={ICON_SIZE_SM} />
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}