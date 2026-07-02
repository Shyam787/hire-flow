import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-background p-8 shadow-lg">
      {children}
    </div>
  );
}