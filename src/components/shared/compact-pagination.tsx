"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PendingLink } from "@/components/shared/pending-link";

interface CompactPaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
  searchParams?: Record<string, string | null | undefined>;
}

export function CompactPagination({
  basePath,
  currentPage,
  totalPages,
  searchParams = {},
}: CompactPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  function createHref(page: number) {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    params.set("page", String(page));

    return `${basePath}?${params.toString()}`;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <Button variant="outline" size="icon" disabled={currentPage <= 1} asChild={currentPage > 1}>
        {currentPage > 1 ? (
          <PendingLink href={createHref(currentPage - 1)} aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" />
          </PendingLink>
        ) : (
          <span aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="icon"
          asChild={page !== currentPage}
        >
          {page === currentPage ? (
            <span aria-current="page">{page}</span>
          ) : (
            <PendingLink href={createHref(page)} aria-label={`Page ${page}`}>
              {page}
            </PendingLink>
          )}
        </Button>
      ))}

      <Button variant="outline" size="icon" disabled={currentPage >= totalPages} asChild={currentPage < totalPages}>
        {currentPage < totalPages ? (
          <PendingLink href={createHref(currentPage + 1)} aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </PendingLink>
        ) : (
          <span aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </nav>
  );
}
