import Link from "next/link";

import { PageContainer } from "./page-container";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Jobs", href: "/jobs" },
      { label: "Companies", href: "/companies" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Profile", href: "/dashboard/profile" },
      { label: "Sign up", href: "/signup" },
    ],
  },
  {
    title: "Hiring",
    links: [
      { label: "Login", href: "/login" },
      { label: "Post a job", href: "/dashboard/employer/jobs/new" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <PageContainer>
        <div className="grid gap-10 py-12 md:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight">
              HireFlow
            </Link>

            <p className="mt-4 text-sm text-muted-foreground">
              Connecting talent with opportunity.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold">
                {section.title}
              </h3>

              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          Copyright 2026 HireFlow. All rights reserved.
        </div>
      </PageContainer>
    </footer>
  );
}
