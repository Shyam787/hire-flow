import { Job } from "@/types/job";

export const featuredJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    description:
      "Build polished product experiences and scalable frontend systems for teams shipping on the web.",
    company: {
      id: "c1",
      name: "Vercel",
      logo: null,
    },
    location: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$140k - $180k",
    skills: ["React", "Next.js", "TypeScript"],
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Backend Engineer",
    description:
      "Design and maintain reliable backend services for payments, data workflows, and internal platforms.",
    company: {
      id: "c2",
      name: "Stripe",
      logo: null,
    },
    location: "Bengaluru",
    employmentType: "Full-time",
    experienceLevel: "Mid-level",
    salary: "$120k - $165k",
    skills: ["Node.js", "Prisma", "PostgreSQL"],
    postedAt: "1 day ago",
  },
  {
    id: "3",
    title: "Product Designer",
    description:
      "Shape thoughtful product workflows with strong systems thinking, interaction design, and research.",
    company: {
      id: "c3",
      name: "Linear",
      logo: null,
    },
    location: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Mid-level",
    salary: "$110k - $150k",
    skills: ["Figma", "Design Systems", "UX"],
    postedAt: "5 hours ago",
  },
];
