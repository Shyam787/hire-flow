import Link from "next/link";
import { BriefcaseBusiness, Download, LinkIcon, Pencil } from "lucide-react";

import { updateProfile } from "@/features/profile/actions";
import { requireUser } from "@/lib/auth-user";
import { PageContainer } from "@/components/shared/page-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UnsavedChangesGuard } from "@/components/shared/unsaved-changes-guard";

export const dynamic = "force-dynamic";

interface ProfilePageProps {
  searchParams: Promise<{
    edit?: string;
  }>;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const user = await requireUser();
  const { edit } = await searchParams;
  const isEditMode = edit === "1";
  const isEmployer = user.role === "EMPLOYER";

  if (!isEditMode) {
    return (
      <PageContainer className="py-10">
        <div className="flex flex-col gap-5 border-b pb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <InitialAvatar name={user.firstName ?? user.name ?? user.email} />
            <div>
              <p className="text-sm font-medium text-primary">
                {isEmployer ? "Employer Profile" : "Candidate Profile"}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                {user.name ?? user.email}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {isEmployer
                  ? user.designation ?? "Hiring team member"
                  : user.headline ?? "Professional profile"}
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/dashboard/profile?edit=1">
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        </div>

        {isEmployer ? <EmployerProfileView user={user} /> : <CandidateProfileView user={user} />}
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-10">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary">
          {isEmployer ? "Employer Profile" : "Candidate Profile"}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Edit your profile
        </h1>
        <p className="mt-2 text-muted-foreground">
          Update the information people see when interacting with you on
          HireFlow.
        </p>
      </div>

      <UnsavedChangesGuard
        action={updateProfile}
        className="mt-8 max-w-5xl space-y-8 rounded-lg border bg-card p-6 shadow-sm"
      >
        {isEmployer ? <EmployerProfileForm user={user} /> : <CandidateProfileForm user={user} />}

        <div className="flex flex-wrap gap-3 border-t pt-6">
          <Button type="submit">Save profile</Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/profile">Cancel</Link>
          </Button>
        </div>
      </UnsavedChangesGuard>
    </PageContainer>
  );
}

function CandidateProfileView({ user }: { user: ProfileUser }) {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Professional Summary</h2>
        <p className="mt-4 whitespace-pre-line leading-7 text-muted-foreground">
          {user.bio ?? "Add a short summary about your work, strengths, and goals."}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {user.skills.length > 0 ? (
            user.skills.map((skill) => (
              <span key={skill} className="rounded-full border bg-muted px-3 py-1 text-sm">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No skills added yet.</p>
          )}
        </div>
      </section>

      <aside className="space-y-6">
        <InfoCard
          title="Personal Information"
          items={[
            ["Email", user.email],
            ["Phone", user.phone],
            ["Location", user.location],
          ]}
        />
        <InfoCard
          title="Career Preferences"
          items={[
            ["Current Title", user.currentJobTitle],
            ["Experience", user.yearsExperience ? `${user.yearsExperience} years` : null],
            ["Preferred Role", user.preferredJobRole],
            ["Work Type", user.preferredWorkType],
            ["Employment", user.preferredEmploymentType],
            ["Expected Salary", user.expectedSalary],
            ["Looking for Job", user.lookingForJob ? "Yes" : "No"],
          ]}
        />
        <InfoCard
          title="Education"
          items={[
            ["College", user.college],
            ["Degree", user.degree],
            ["Field", user.fieldOfStudy],
            ["Graduation", user.graduationYear],
          ]}
        />
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Links</h2>
          <div className="mt-4 space-y-3 text-sm">
            <ProfileLink href={user.resumeUrl} label="Download Resume" icon={Download} />
            <ProfileLink href={user.linkedinUrl} label="LinkedIn" icon={LinkIcon} />
            <ProfileLink href={user.githubUrl} label="GitHub" icon={LinkIcon} />
            <ProfileLink href={user.portfolioUrl} label="Portfolio Website" icon={BriefcaseBusiness} />
          </div>
        </div>
      </aside>
    </div>
  );
}

function EmployerProfileView({ user }: { user: ProfileUser }) {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Hiring Bio</h2>
        <p className="mt-4 whitespace-pre-line leading-7 text-muted-foreground">
          {user.bio ?? "Add a short bio so candidates know who is reviewing their application."}
        </p>
      </section>
      <InfoCard
        title="Contact"
        items={[
          ["Email", user.email],
          ["Phone", user.phone],
          ["Designation", user.designation],
        ]}
      />
    </div>
  );
}

function CandidateProfileForm({ user }: { user: ProfileUser }) {
  return (
    <>
      <FormSection title="Personal Information">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First Name" id="firstName" defaultValue={user.firstName ?? ""} required />
          <Field label="Last Name" id="lastName" defaultValue={user.lastName ?? ""} required />
          <Field label="Email" id="email" defaultValue={user.email} readOnly />
          <Field label="Phone Number" id="phone" defaultValue={user.phone ?? ""} />
          <Field label="Current Location" id="location" defaultValue={user.location ?? ""} />
        </div>
      </FormSection>

      <FormSection title="Professional Information">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Professional Headline" id="headline" defaultValue={user.headline ?? ""} />
          <Field label="Current Job Title" id="currentJobTitle" defaultValue={user.currentJobTitle ?? ""} />
          <Field label="Years of Experience" id="yearsExperience" type="number" defaultValue={user.yearsExperience?.toString() ?? ""} />
          <Field label="Preferred Job Role" id="preferredJobRole" defaultValue={user.preferredJobRole ?? ""} />
          <Field label="Preferred Work Type" id="preferredWorkType" defaultValue={user.preferredWorkType ?? ""} placeholder="Remote, Hybrid, On-site" />
          <Field label="Preferred Employment Type" id="preferredEmploymentType" defaultValue={user.preferredEmploymentType ?? ""} placeholder="Full-time, Contract..." />
          <Field label="Expected Salary" id="expectedSalary" defaultValue={user.expectedSalary ?? ""} />
        </div>
        <label className="mt-5 flex items-center gap-2 text-sm">
          <input type="checkbox" name="lookingForJob" defaultChecked={user.lookingForJob} />
          Looking for a job
        </label>
      </FormSection>

      <FormSection title="Skills">
        <Field label="Skills" id="skills" defaultValue={user.skills.join(", ")} placeholder="React, Next.js, TypeScript" />
      </FormSection>

      <FormSection title="About">
        <Textarea id="bio" name="bio" defaultValue={user.bio ?? ""} className="min-h-36" />
      </FormSection>

      <FormSection title="Education">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="College" id="college" defaultValue={user.college ?? ""} />
          <Field label="Degree" id="degree" defaultValue={user.degree ?? ""} />
          <Field label="Field of Study" id="fieldOfStudy" defaultValue={user.fieldOfStudy ?? ""} />
          <Field label="Graduation Year" id="graduationYear" defaultValue={user.graduationYear ?? ""} />
        </div>
      </FormSection>

      <FormSection title="Resume and Social Links">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Resume URL" id="resumeUrl" defaultValue={user.resumeUrl ?? ""} placeholder="https://..." />
          <Field label="LinkedIn" id="linkedinUrl" defaultValue={user.linkedinUrl ?? ""} placeholder="linkedin.com/in/your-name" />
          <Field label="GitHub" id="githubUrl" defaultValue={user.githubUrl ?? ""} placeholder="github.com/your-name" />
          <Field label="Portfolio Website" id="portfolioUrl" defaultValue={user.portfolioUrl ?? ""} placeholder="yourportfolio.com" />
        </div>
      </FormSection>
    </>
  );
}

function EmployerProfileForm({ user }: { user: ProfileUser }) {
  return (
    <>
      <FormSection title="Hiring Person">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First Name" id="firstName" defaultValue={user.firstName ?? ""} required />
          <Field label="Last Name" id="lastName" defaultValue={user.lastName ?? ""} required />
          <Field label="Email" id="email" defaultValue={user.email} readOnly />
          <Field label="Phone Number" id="phone" defaultValue={user.phone ?? ""} />
          <Field label="Designation" id="designation" defaultValue={user.designation ?? ""} />
        </div>
      </FormSection>

      <FormSection title="Short Bio">
        <Textarea id="bio" name="bio" defaultValue={user.bio ?? ""} className="min-h-32" />
      </FormSection>
    </>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  id,
  ...props
}: {
  label: string;
  id: string;
} & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Input id={id} name={id} {...props} />
    </div>
  );
}

function InfoCard({
  title,
  items,
}: {
  title: string;
  items: Array<[string, string | null | undefined]>;
}) {
  return (
    <section className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <dl className="mt-4 space-y-3 text-sm">
        {items.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right font-medium">{value || "Not added"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ProfileLink({
  href,
  label,
  icon: Icon,
}: {
  href: string | null;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  if (!href) {
    return <p className="text-muted-foreground">{label}: Not added</p>;
  }

  return (
    <Link href={href} className="flex items-center gap-2 font-medium text-primary hover:underline">
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

function InitialAvatar({ name }: { name: string }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-muted text-lg font-bold">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

type ProfileUser = Awaited<ReturnType<typeof requireUser>>;
