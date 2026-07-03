import Link from "next/link";
import { ArrowRight, Briefcase, Clock3, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { CARD_STYLES, ICON_SIZE_SM } from "@/constants/design";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <article className={CARD_STYLES + " flex h-full flex-col"}>
      {/* Company */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
          {job.company.name.charAt(0)}
        </div>

        <div>
          <p className="font-medium">{job.company.name}</p>

          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" aria-hidden="true" />
            <span>{job.employmentType}</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-6 text-xl font-semibold tracking-tight">
        {job.title}
      </h3>

      {/* Meta */}
      <div className="mt-4 space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>{job.location}</span>
        </div>

        <p>{job.experienceLevel}</p>

        {job.salary && (
          <p className="font-medium text-foreground">{job.salary}</p>
        )}
      </div>

      {/* Skills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {job.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            +{job.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between pt-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4" aria-hidden="true" />
          <span>{job.postedAt}</span>
        </div>

        <Button size="sm" asChild>
          <Link href={`/jobs/${job.id}`}>
            Apply
            <ArrowRight className={ICON_SIZE_SM} />
          </Link>
        </Button>
      </div>
    </article>
  );
}
