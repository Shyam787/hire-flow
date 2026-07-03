import { requireUser } from "@/lib/auth-user";
import { PageContainer } from "@/components/shared/page-container";
import { ChangePasswordForm } from "@/components/settings/change-password-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireUser();

  return (
    <PageContainer className="py-10">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary">Settings</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Account preferences
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage account-level preferences. Profile details live separately on
          your profile page.
        </p>
      </div>

      <div className="mt-8 max-w-2xl">
        <ChangePasswordForm />
      </div>
    </PageContainer>
  );
}
