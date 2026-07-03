CREATE TYPE "Role" AS ENUM ('CANDIDATE', 'EMPLOYER');
CREATE TYPE "JobStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED');
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'HIRED');

ALTER TABLE "User"
  ADD COLUMN "role" "Role" NOT NULL DEFAULT 'CANDIDATE',
  ADD COLUMN "headline" TEXT,
  ADD COLUMN "location" TEXT,
  ADD COLUMN "bio" TEXT;

ALTER TABLE "Company"
  ADD COLUMN "description" TEXT,
  ADD COLUMN "location" TEXT,
  ADD COLUMN "website" TEXT,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "ownerId" TEXT;

ALTER TABLE "Job"
  ADD COLUMN "experienceLevel" TEXT NOT NULL DEFAULT 'Mid-level',
  ADD COLUMN "status" "JobStatus" NOT NULL DEFAULT 'PUBLISHED',
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "Application"
  ADD COLUMN "coverLetter" TEXT,
  ADD COLUMN "resumeUrl" TEXT,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "Application"
  ALTER COLUMN "status" DROP DEFAULT,
  ALTER COLUMN "status" TYPE "ApplicationStatus" USING UPPER("status")::"ApplicationStatus",
  ALTER COLUMN "status" SET DEFAULT 'PENDING';

DELETE FROM "Application" newer
USING "Application" older
WHERE newer."id" > older."id"
  AND newer."userId" = older."userId"
  AND newer."jobId" = older."jobId";

CREATE UNIQUE INDEX "Application_userId_jobId_key" ON "Application"("userId", "jobId");

ALTER TABLE "Company" ADD CONSTRAINT "Company_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Application" DROP CONSTRAINT "Application_jobId_fkey";
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
