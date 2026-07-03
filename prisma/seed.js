import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const companies = [
  {
    name: "Vercel",
    industry: "Developer Tools",
    location: "Remote",
    website: "https://vercel.com",
    description:
      "Vercel helps teams build, preview, and ship exceptional web experiences.",
    jobs: [
      {
        title: "Frontend Engineer",
        description:
          "Build production-grade interfaces, improve design systems, and collaborate with product teams on developer-facing workflows.",
        location: "Remote",
        employmentType: "Full-time",
        experienceLevel: "Mid-level",
        salary: "$120k - $160k",
        skills: ["React", "Next.js", "TypeScript"],
      },
      {
        title: "Developer Advocate",
        description:
          "Create technical content, support community education, and help developers adopt modern frontend infrastructure.",
        location: "Remote",
        employmentType: "Full-time",
        experienceLevel: "Senior",
        salary: "$130k - $170k",
        skills: ["Next.js", "DX", "Content"],
      },
    ],
  },
  {
    name: "Stripe",
    industry: "Fintech",
    location: "Bengaluru",
    website: "https://stripe.com",
    description:
      "Stripe builds economic infrastructure for businesses of every size.",
    jobs: [
      {
        title: "Backend Engineer",
        description:
          "Design reliable services for payments, risk workflows, and high-volume financial data systems.",
        location: "Bengaluru",
        employmentType: "Full-time",
        experienceLevel: "Senior",
        salary: "$140k - $190k",
        skills: ["Node.js", "PostgreSQL", "Distributed Systems"],
      },
    ],
  },
  {
    name: "Linear",
    industry: "Productivity",
    location: "Remote",
    website: "https://linear.app",
    description:
      "Linear builds focused planning and execution tools for modern product teams.",
    jobs: [
      {
        title: "Product Designer",
        description:
          "Design elegant product workflows, systems, and interaction patterns for teams that move quickly.",
        location: "Remote",
        employmentType: "Full-time",
        experienceLevel: "Mid-level",
        salary: "$110k - $150k",
        skills: ["Figma", "UX", "Design Systems"],
      },
    ],
  },
];

async function main() {
  for (const companyData of companies) {
    const { jobs, ...company } = companyData;

    const existingCompany = await prisma.company.findFirst({
      where: {
        name: company.name,
      },
    });

    const savedCompany = existingCompany
      ? await prisma.company.update({
          where: {
            id: existingCompany.id,
          },
          data: company,
        })
      : await prisma.company.create({
          data: company,
        });

    for (const job of jobs) {
      const existingJob = await prisma.job.findFirst({
        where: {
          title: job.title,
          companyId: savedCompany.id,
        },
      });

      if (existingJob) {
        await prisma.job.update({
          where: {
            id: existingJob.id,
          },
          data: job,
        });
      } else {
        await prisma.job.create({
          data: {
            ...job,
            companyId: savedCompany.id,
          },
        });
      }
    }
  }

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
