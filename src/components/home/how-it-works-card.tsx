import { HowItWorksStep } from "@/constants/how-it-works";

interface HowItWorksCardProps {
  step: HowItWorksStep;
}

export function HowItWorksCard({ step }: HowItWorksCardProps) {
  const Icon = step.icon;

  return (
    <article
      className="
        flex flex-col items-start rounded-2xl border bg-card p-6 shadow-sm
        transition-all duration-200 hover:-translate-y-1 hover:shadow-lg
      "
    >
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="mt-5 text-lg font-semibold">
        {step.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {step.description}
      </p>
    </article>
  );
}