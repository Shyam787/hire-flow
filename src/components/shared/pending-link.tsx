"use client";

import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

type PendingLinkProps = React.ComponentProps<typeof Link>;

export function PendingLink({ children, onClick, ...props }: PendingLinkProps) {
  const [pending, setPending] = useState(false);

  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        setPending(true);
      }}
    >
      {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
      {children}
    </Link>
  );
}
