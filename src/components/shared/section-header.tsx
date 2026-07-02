import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function SectionHeader({
  title,
  description,
  children,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children && (
        <div className="shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}