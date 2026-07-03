import Link from "next/link";
import { BriefcaseBusiness, Menu, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/page-container";
import { SignOutButton } from "@/components/shared/sign-out-button";
import { ActiveNavLink } from "@/components/shared/active-nav-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { prisma } from "@/lib/prisma";

const baseNavigation = [
  { name: "Home", href: "/" },
  { name: "Jobs", href: "/jobs" },
  { name: "Companies", href: "/companies" },
];

export async function Navbar() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const dbUser = user
    ? await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      })
    : null;

  const isEmployer = dbUser?.role === "EMPLOYER";
  const firstName =
    dbUser?.firstName ?? dbUser?.name?.split(" ")[0] ?? user?.email ?? "User";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <PageContainer>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            HireFlow
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {baseNavigation.map((item) => (
              <ActiveNavLink key={item.name} href={item.href}>
                {item.name}
              </ActiveNavLink>
            ))}

            {dbUser && (
              <ActiveNavLink href={isEmployer ? "/dashboard/employer" : "/dashboard"} exact>
                Dashboard
              </ActiveNavLink>
            )}

            {isEmployer && (
              <ActiveNavLink href="/dashboard/employer/jobs/new">
                Post Job
              </ActiveNavLink>
            )}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {!dbUser ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>

                <Button variant="outline" asChild>
                  <Link href="/signup">Sign up</Link>
                </Button>

                <Button asChild>
                  <Link href="/signup?role=EMPLOYER">
                    <BriefcaseBusiness className="h-4 w-4" />
                    Post a Job
                  </Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {firstName.charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-28 truncate">{firstName}</span>
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  {isEmployer && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/employer/company">Company Profile</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <SignOutButton className="w-full justify-start" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex gap-4 overflow-x-auto border-t py-3 text-sm md:hidden">
          {baseNavigation.map((item) => (
            <ActiveNavLink key={item.name} href={item.href} mobile>
              {item.name}
            </ActiveNavLink>
          ))}
          {dbUser ? (
            <>
              <ActiveNavLink href={isEmployer ? "/dashboard/employer" : "/dashboard"} mobile exact>
                Dashboard
              </ActiveNavLink>
              {isEmployer && (
                <ActiveNavLink href="/dashboard/employer/jobs/new" mobile>
                  Post Job
                </ActiveNavLink>
              )}
              <ActiveNavLink href="/dashboard/profile" mobile>
                Profile
              </ActiveNavLink>
              <ActiveNavLink href="/dashboard/settings" mobile>
                Settings
              </ActiveNavLink>
            </>
          ) : (
            <>
              <ActiveNavLink href="/login" mobile>
                Login
              </ActiveNavLink>
              <ActiveNavLink href="/signup" mobile>
                Sign Up
              </ActiveNavLink>
              <ActiveNavLink href="/signup?role=EMPLOYER" mobile>
                Post a Job
              </ActiveNavLink>
            </>
          )}
        </nav>
      </PageContainer>
    </header>
  );
}
