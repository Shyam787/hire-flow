"use client";

import { signOut } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SignOutButton({ className }: { className?: string }) {
  return (
    <Button
      variant="outline"
      className={cn(className)}
      onClick={async () => {
        await signOut();
      }}
    >
      Sign Out
    </Button>
  );
}
