"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [spin, setSpin] = useState(false);

  function refresh() {
    setSpin(true);
    startTransition(() => router.refresh());
    window.setTimeout(() => setSpin(false), 700);
  }

  return (
    <Button type="button" variant="outline" size="icon" onClick={refresh} disabled={isPending} title="Refresh dashboard" aria-label="Refresh dashboard">
      <RefreshCw className={cn("h-4 w-4", spin && "animate-spin")} />
    </Button>
  );
}
