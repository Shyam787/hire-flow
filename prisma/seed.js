import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.create({
    data: {
      name: "Vercel",
      industry: "Developer Tools",
    },
  });

  await prisma.job.createMany({
    data: [
      {
        title: "Frontend Engineer",
        description: "Build UI systems",
        location: "Remote",
        employmentType: "Full-time",
        skills: ["React", "Next.js"],
        companyId: company.id,
      },
      {
        title: "Backend Engineer",
        description: "Build APIs",
        location: "Bangalore",
        employmentType: "Full-time",
        skills: ["Node.js", "PostgreSQL"],
        companyId: company.id,
      },
    ],
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });