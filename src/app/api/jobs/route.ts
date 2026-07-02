import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/jobs → fetch all jobs (for now)
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
      },
      orderBy: {
        postedAt: "desc",
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}