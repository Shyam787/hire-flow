import { Job } from "@/types/job";

export const featuredJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: {
      id: "c1",
      name: "Vercel",
    },
    location: "Remote",
    employmentType: "Full-time",
    salary: "$140k – $180k",
    skills: ["React", "Next.js", "TypeScript"],
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: {
      id: "c2",
      name: "Stripe",
    },
    location: "Bengaluru",
    employmentType: "Full-time",
    salary: "$120k – $165k",
    skills: ["Node.js", "Prisma", "PostgreSQL"],
    postedAt: "1 day ago",
  },
  {
    id: "3",
    title: "Product Designer",
    company: {
      id: "c3",
      name: "Linear",
    },
    location: "Remote",
    employmentType: "Full-time",
    salary: "$110k – $150k",
    skills: ["Figma", "Design Systems", "UX"],
    postedAt: "5 hours ago",
  },
];