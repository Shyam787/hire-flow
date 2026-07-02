import { Category } from "@/constants/categories";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <article
      className="
        flex flex-col rounded-2xl border bg-card p-6 shadow-sm
        transition-all duration-200 hover:-translate-y-1 hover:shadow-lg
        cursor-pointer
      "
    >
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      {/* Name */}
      <h3 className="mt-4 text-lg font-semibold">
        {category.name}
      </h3>

      {/* Job count */}
      <p className="mt-2 text-sm text-muted-foreground">
        {category.jobCount} open jobs
      </p>
    </article>
  );
}