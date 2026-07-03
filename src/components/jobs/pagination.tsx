import { CompactPagination } from "@/components/shared/compact-pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}

export function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  return (
    <div className="mt-12">
      <CompactPagination
        basePath="/jobs"
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={searchParams}
      />
    </div>
  );
}
