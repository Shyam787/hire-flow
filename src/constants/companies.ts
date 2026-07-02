export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  openJobs: number;
}

export const featuredCompanies: Company[] = [
  {
    id: "c1",
    name: "Vercel",
    industry: "Developer Tools",
    openJobs: 12,
  },
  {
    id: "c2",
    name: "Stripe",
    industry: "Fintech",
    openJobs: 8,
  },
  {
    id: "c3",
    name: "Linear",
    industry: "Productivity",
    openJobs: 5,
  },
  {
    id: "c4",
    name: "Notion",
    industry: "Collaboration",
    openJobs: 10,
  },
  {
    id: "c5",
    name: "Figma",
    industry: "Design Tools",
    openJobs: 7,
  },
  {
    id: "c6",
    name: "Airbnb",
    industry: "Travel",
    openJobs: 15,
  },
];