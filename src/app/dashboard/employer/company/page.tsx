import { redirect } from "next/navigation";
import { Building2, Factory, Landmark, Layers3, Network } from "lucide-react";

import { saveCompany } from "@/features/employer/actions";
import { requireUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";
import { PageContainer } from "@/components/shared/page-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UnsavedChangesGuard } from "@/components/shared/unsaved-changes-guard";

export const dynamic = "force-dynamic";

const companyLogos = [
  { id: "logo-1", label: "Outline Building", icon: Building2 },
  { id: "logo-2", label: "Industry", icon: Factory },
  { id: "logo-3", label: "Institution", icon: Landmark },
  { id: "logo-4", label: "Layers", icon: Layers3 },
  { id: "logo-5", label: "Network", icon: Network },
];

export default async function CompanyProfilePage() {
  const user = await requireUser();

  if (user.role !== "EMPLOYER") {
    redirect("/dashboard");
  }

  const company = await prisma.company.findFirst({
    where: {
      ownerId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <PageContainer className="py-10">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary">Company Profile</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Manage your organization
        </h1>
        <p className="mt-2 text-muted-foreground">
          This profile appears on company discovery, job cards, and job detail
          pages.
        </p>
      </div>

      <UnsavedChangesGuard
        action={saveCompany}
        className="mt-8 max-w-5xl space-y-8 rounded-lg border bg-card p-6 shadow-sm"
      >
        {company && <input type="hidden" name="companyId" value={company.id} />}

        <section>
          <h2 className="mb-4 text-lg font-semibold">Company Logo</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {companyLogos.map((logo) => {
              const Icon = logo.icon;

              return (
                <label
                  key={logo.id}
                  className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border p-4 text-center"
                >
                  <input
                    type="radio"
                    name="logo"
                    value={logo.id}
                    defaultChecked={(company?.logo ?? "logo-1") === logo.id}
                  />
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-medium">{logo.label}</span>
                </label>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Company Name" id="name" defaultValue={company?.name ?? ""} required />
            <Field label="Website" id="website" defaultValue={company?.website ?? ""} placeholder="company.com" />
            <Field label="Industry" id="industry" defaultValue={company?.industry ?? ""} />
            <Field label="Company Size" id="size" defaultValue={company?.size ?? ""} placeholder="11-50, 51-200..." />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Company Description</h2>
          <Textarea
            id="description"
            name="description"
            defaultValue={company?.description ?? ""}
            className="min-h-36"
            placeholder="Describe your company, product, culture, and mission."
          />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Location</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Country" id="country" defaultValue={company?.country ?? ""} />
            <Field label="State" id="state" defaultValue={company?.state ?? ""} />
            <Field label="City" id="city" defaultValue={company?.city ?? ""} />
          </div>
          <div className="mt-5">
            <Field label="Address" id="address" defaultValue={company?.address ?? ""} />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Contact and Social Links</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Company Email" id="email" type="email" defaultValue={company?.email ?? ""} />
            <Field label="Company Phone" id="phone" defaultValue={company?.phone ?? ""} />
            <Field label="LinkedIn" id="linkedinUrl" defaultValue={company?.linkedinUrl ?? ""} placeholder="linkedin.com/company/name" />
            <Field label="Company Website" id="websiteMirror" defaultValue={company?.website ?? ""} disabled />
          </div>
        </section>

        <Button type="submit">Save company</Button>
      </UnsavedChangesGuard>
    </PageContainer>
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
