import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function JobFields({
  companies,
  job,
}: {
  companies: { id: string; name: string }[];
  job?: {
    companyId: string;
    title: string;
    location: string;
    employmentType: string;
    experienceLevel: string;
    salary: string | null;
    description: string;
    skills: string[];
    status: string;
  };
}) {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="companyId" className="text-sm font-medium">
          Company
        </label>
        <select
          id="companyId"
          name="companyId"
          defaultValue={job?.companyId ?? companies[0]?.id ?? ""}
          className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
          required
        >
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Job title
          </label>
          <Input
            id="title"
            name="title"
            defaultValue={job?.title ?? ""}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <Input
            id="location"
            name="location"
            defaultValue={job?.location ?? ""}
            placeholder="Remote, Hybrid, Bengaluru..."
            required
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="employmentType" className="text-sm font-medium">
            Employment type
          </label>
          <select
            id="employmentType"
            name="employmentType"
            defaultValue={job?.employmentType ?? "Full-time"}
            className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="experienceLevel" className="text-sm font-medium">
            Experience
          </label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            defaultValue={job?.experienceLevel ?? "Mid-level"}
            className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
          >
            <option>Entry-level</option>
            <option>Mid-level</option>
            <option>Senior</option>
            <option>Lead</option>
            <option>Executive</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={job?.status ?? "PUBLISHED"}
            className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
          >
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="salary" className="text-sm font-medium">
            Salary
          </label>
          <Input
            id="salary"
            name="salary"
            defaultValue={job?.salary ?? ""}
            placeholder="$120k - $160k"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="skills" className="text-sm font-medium">
            Skills
          </label>
          <Input
            id="skills"
            name="skills"
            defaultValue={job?.skills.join(", ") ?? ""}
            placeholder="React, Next.js, TypeScript"
          />
          <p className="text-xs text-muted-foreground">
            Enter skills comma separated. Each skill will display separately on job cards.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          defaultValue={job?.description ?? ""}
          className="min-h-48"
          required
        />
      </div>
    </>
  );
}
