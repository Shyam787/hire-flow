export interface CompanySummary {
  id: string;
  name: string;
  logo?: string;
}

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Freelance";

export interface Job {
  id: string;
  title: string;
  company: CompanySummary;
  location: string;
  employmentType: EmploymentType;
  salary?: string;
  skills: string[];
  postedAt: string;
}