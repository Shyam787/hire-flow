import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { Job } from "@/types/job";

interface GetJobsParams {
  q?: string;
  location?: string;
  employmentType?: string;
  experienceLevel?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function getJobs({
  q = "",
  location = "",
  employmentType = "all",
  experienceLevel = "all",
  sort = "latest",
  page = 1,
  limit = 12,
}: GetJobsParams) {
  const where: Prisma.JobWhereInput = {
    AND: [
      {
        status: "PUBLISHED",
      },
      q
        ? {
            OR: [
              {
                title: {
                  contains: q,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: q,
                  mode: "insensitive",
                },
              },
              {
                company: {
                  name: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
              },
              {
                skills: {
                  hasSome: [q],
                },
              },
            ],
          }
        : {},
      location
        ? {
            location: {
              contains: location,
              mode: "insensitive",
            },
          }
        : {},
      employmentType !== "all"
        ? {
            employmentType,
          }
        : {},
      experienceLevel !== "all"
        ? { experienceLevel }
        : {},
    ],
  };

  const orderBy: Prisma.JobOrderByWithRelationInput =
    sort === "oldest"
      ? { postedAt: "asc" }
      : sort === "title-asc"
      ? { title: "asc" }
      : sort === "title-desc"
      ? { title: "desc" }
      : { postedAt: "desc" };

  const [jobs, total] = await prisma.$transaction([
    prisma.job.findMany({
      where,
      include: {
        company: true,
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.job.count({
      where,
    }),
  ]);

  return {
    jobs,
    total,
    currentPage: page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    pageSize: limit,
  };
}

export async function getFeaturedJobs(limit = 6): Promise<Job[]> {
  const jobs = await prisma.job.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      company: true,
    },
    orderBy: {
      postedAt: "desc",
    },
    take: limit,
  });

  return jobs.map((job) => ({
    id: job.id,
    title: job.title,
    description: job.description,
    company: {
      id: job.company.id,
      name: job.company.name,
      logo: job.company.logo,
    },
    location: job.location,
    employmentType: job.employmentType,
    experienceLevel: job.experienceLevel,
    salary: job.salary,
    skills: job.skills,
    postedAt: job.postedAt.toLocaleDateString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));
}
