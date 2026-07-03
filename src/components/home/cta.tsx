import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/page-container";
import { SECTION_PADDING, ICON_SIZE_SM } from "@/constants/design";

export function CTA() {
  return (
    <section className={SECTION_PADDING}>
      <PageContainer>
        <div
          className="
            relative overflow-hidden rounded-2xl border bg-card
            px-8 py-16 text-center shadow-sm
          "
        >
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to find your next opportunity?
            </h2>

            <p className="mt-4 text-muted-foreground">
              Join thousands of professionals discovering better career opportunities every day.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/login">
                  Get Started
                  <ArrowRight className={ICON_SIZE_SM} />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/jobs">
                  Browse Jobs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
