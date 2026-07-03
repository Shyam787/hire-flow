import {
  Code2,
  Palette,
  BarChart3,
  Megaphone,
  Briefcase,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  jobCount: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Engineering",
    icon: Code2,
    jobCount: 320,
  },
  {
    id: "2",
    name: "Design",
    icon: Palette,
    jobCount: 180,
  },
  {
    id: "3",
    name: "Product",
    icon: Briefcase,
    jobCount: 140,
  },
  {
    id: "4",
    name: "Marketing",
    icon: Megaphone,
    jobCount: 210,
  },
  {
    id: "5",
    name: "Data & Analytics",
    icon: BarChart3,
    jobCount: 95,
  },
  {
    id: "6",
    name: "Security",
    icon: Shield,
    jobCount: 60,
  },
];
