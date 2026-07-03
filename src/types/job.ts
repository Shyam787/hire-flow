export interface CompanySummary {
  id: string;
  name: string;
  logo: string | null;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: CompanySummary;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salary: string | null;
  skills: string[];
  postedAt: string;
}
