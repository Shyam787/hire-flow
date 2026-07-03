import { Search, FileText, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const howItWorks: HowItWorksStep[] = [
  {
    id: "1",
    title: "Search Jobs",
    description:
      "Explore thousands of curated job listings from top companies worldwide.",
    icon: Search,
  },
  {
    id: "2",
    title: "Apply Easily",
    description:
      "Submit your application with a single click and track your progress.",
    icon: FileText,
  },
  {
    id: "3",
    title: "Get Hired",
    description:
      "Connect directly with hiring teams and land your dream job faster.",
    icon: Rocket,
  },
];
