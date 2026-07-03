"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = React.ComponentProps<typeof Button>;

export function SubmitButton({ children, disabled, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={disabled || pending} {...props}>
      {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}
