ALTER TABLE "User"
  ADD COLUMN "firstName" TEXT,
  ADD COLUMN "lastName" TEXT,
  ADD COLUMN "phone" TEXT,
  ADD COLUMN "currentJobTitle" TEXT,
  ADD COLUMN "yearsExperience" INTEGER,
  ADD COLUMN "preferredJobRole" TEXT,
  ADD COLUMN "preferredWorkType" TEXT,
  ADD COLUMN "preferredEmploymentType" TEXT,
  ADD COLUMN "expectedSalary" TEXT,
  ADD COLUMN "lookingForJob" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "college" TEXT,
  ADD COLUMN "degree" TEXT,
  ADD COLUMN "fieldOfStudy" TEXT,
  ADD COLUMN "graduationYear" TEXT,
  ADD COLUMN "resumeUrl" TEXT,
  ADD COLUMN "linkedinUrl" TEXT,
  ADD COLUMN "githubUrl" TEXT,
  ADD COLUMN "portfolioUrl" TEXT,
  ADD COLUMN "designation" TEXT,
  ADD COLUMN "profileAvatar" TEXT DEFAULT 'avatar-1',
  ADD COLUMN "applicationUpdates" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "newJobAlerts" BOOLEAN NOT NULL DEFAULT true;

UPDATE "User"
SET
  "firstName" = COALESCE(NULLIF(split_part(COALESCE("name", ''), ' ', 1), ''), "name"),
  "lastName" = NULLIF(trim(substr(COALESCE("name", ''), length(split_part(COALESCE("name", ''), ' ', 1)) + 1)), '');

ALTER TABLE "Company"
  ADD COLUMN "size" TEXT,
  ADD COLUMN "country" TEXT,
  ADD COLUMN "state" TEXT,
  ADD COLUMN "city" TEXT,
  ADD COLUMN "address" TEXT,
  ADD COLUMN "email" TEXT,
  ADD COLUMN "phone" TEXT,
  ADD COLUMN "linkedinUrl" TEXT;
