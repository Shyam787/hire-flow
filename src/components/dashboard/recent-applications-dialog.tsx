"use client";

import Link from "next/link";
import { Clock3 } from "lucide-react";

import { withdrawApplication } from "@/features/jobs/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Application = {
  id: string;
  status: string;
  createdAt: string;
  job: {
    id: string;
    title: string;
    companyName: string;
  };
};

export function RecentApplicationsDialog({
  applications,
}: {
  applications: Application[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View applications</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Your applications</DialogTitle>
          <DialogDescription>
            Review the roles you applied for and withdraw applications you no longer want to pursue.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {applications.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="font-medium">No applications yet</p>
              <p className="mt-1 text-muted-foreground">Apply to a role and it will appear here.</p>
            </div>
          ) : (
            applications.map((application) => (
              <article key={application.id} className="rounded-lg border p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <Link href={`/jobs/${application.job.id}`} className="font-semibold hover:underline">
                      {application.job.title}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {application.job.companyName}
                    </p>
                    <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock3 className="h-4 w-4" aria-hidden="true" />
                      Applied {application.createdAt}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{formatStatus(application.status)}</Badge>
                    <form action={withdrawApplication}>
                      <input type="hidden" name="applicationId" value={application.id} />
                      <Button type="submit" variant="destructive" size="sm">
                        Withdraw
                      </Button>
                    </form>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}
