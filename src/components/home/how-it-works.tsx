import { howItWorks } from "@/constants/how-it-works";
import { HowItWorksCard } from "@/components/home/how-it-works-card";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { SECTION_PADDING } from "@/constants/design";

export function HowItWorks() {
  return (
    <section className={SECTION_PADDING}>
      <PageContainer>
        <SectionHeader
          title="How It Works"
          description="Get started in minutes with a simple 3-step process."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {howItWorks.map((step) => (
            <HowItWorksCard key={step.id} step={step} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}