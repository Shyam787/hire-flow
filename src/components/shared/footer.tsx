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
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help", href: "/help" },
      { label: "FAQ", href: "/faq" },
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
              Connecting Talent with Opportunity.
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
          © 2026 HireFlow. All rights reserved.
        </div>
      </PageContainer>
    </footer>
  );
}y