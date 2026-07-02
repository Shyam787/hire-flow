import { Hero } from "@/components/home/hero";
import { FeaturedJobs } from "@/components/jobs/featured-jobs";
import { FeaturedCompanies } from "@/components/home/featured-companies";
import { Categories } from "@/components/home/categories";
import { HowItWorks } from "@/components/home/how-it-works";
import { CTA } from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedJobs />
      <FeaturedCompanies />
      <Categories />
      <HowItWorks />
      <CTA />
    </>
  );
}