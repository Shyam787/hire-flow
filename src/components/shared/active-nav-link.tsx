"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function ActiveNavLink({
  href,
  children,
  mobile = false,
  exact = false,
}: {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const path = href.split("?")[0];
  const active = exact
    ? pathname === path
    : path === "/"
      ? pathname === "/"
      : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Link
      href={href}
      className={cn(
        mobile && "shrink-0",
        "border-b-2 px-0.5 py-1 text-sm font-medium transition-colors",
        active
          ? "border-primary text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}
