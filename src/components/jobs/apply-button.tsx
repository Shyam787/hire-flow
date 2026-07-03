"use client";

import Link from "next/link";

import { applyToJob } from "@/features/jobs/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ApplyButtonProps {
  jobId: string;
  isAuthenticated: boolean;
  userRole?: "CANDIDATE" | "EMPLOYER" | null;
  hasApplied: boolean;
  isAcceptingApplications: boolean;
  cooldownUntil?: string | null;
}

export function ApplyButton({
  jobId,
  isAuthenticated,
  userRole,
  hasApplied,
  isAcceptingApplications,
  cooldownUntil,
}: ApplyButtonProps) {
  if (!isAuthenticated) {
    return (
      <Button className="w-full" size="lg" asChild>
        <Link href="/login">Log in to apply</Link>
      </Button>
    );
  }

  if (userRole === "EMPLOYER") {
    return (
      <div className="rounded-lg border bg-muted p-4 text-sm">
        <p className="font-medium">Employer view only</p>
        <p className="mt-1 text-muted-foreground">
          Employers can browse jobs for market research, but candidate
          applications are disabled.
        </p>
      </div>
    );
  }

  if (hasApplied) {
    return (
      <div className="rounded-lg border bg-muted p-4 text-sm">
        <p className="font-medium">Application Submitted</p>
        <p className="mt-1 text-muted-foreground">
          You can track this role from your dashboard.
        </p>
      </div>
    );
  }

  if (cooldownUntil) {
    const applyTime = new Date(cooldownUntil).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" size="lg" type="button">
            Submit application
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application cooldown active</DialogTitle>
            <DialogDescription>
              You withdrew your application for this job. You can apply again at {applyTime}.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  if (!isAcceptingApplications) {
    return (
      <div className="rounded-lg border bg-muted p-4 text-sm">
        <p className="font-medium">Applications closed</p>
        <p className="mt-1 text-muted-foreground">
          This employer is no longer accepting applications for this role.
        </p>
      </div>
    );
  }

  return (
    <form action={applyToJob} className="space-y-4">
      <input type="hidden" name="jobId" value={jobId} />

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="coverLetter">
          Cover letter
        </label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          placeholder="Share why you are a strong fit for this role."
          className="min-h-28"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="resumeUrl">
          Resume or portfolio URL
        </label>
        <Input
          id="resumeUrl"
          name="resumeUrl"
          type="url"
          placeholder="https://..."
        />
      </div>

      <Button className="w-full" size="lg" type="submit">
        Submit application
      </Button>
    </form>
  );
}
