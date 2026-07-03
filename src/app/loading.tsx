import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[45vh] items-center justify-center" role="status" aria-label="Loading page">
      <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
