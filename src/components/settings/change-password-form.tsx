"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";

import { changePassword, type PasswordState } from "@/features/profile/actions";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/shared/password-input";

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState<PasswordState, FormData>(
    changePassword,
    {}
  );

  return (
    <form action={formAction} className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <Lock className="mt-0.5 h-5 w-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Change password</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Confirm your current password before setting a new one.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <Field label="Current password" id="currentPassword" autoComplete="current-password" />
        <Field label="New password" id="newPassword" autoComplete="new-password" />
        <Field label="Re-enter new password" id="confirmPassword" autoComplete="new-password" />
      </div>

      {state.error && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          {state.success}
        </p>
      )}

      <Button type="submit" className="mt-6" disabled={isPending}>
        {isPending ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}

function Field({
  label,
  id,
  autoComplete,
}: {
  label: string;
  id: string;
  autoComplete: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <PasswordInput id={id} name={id} autoComplete={autoComplete} />
    </div>
  );
}
