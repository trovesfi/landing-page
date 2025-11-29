import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";
import type { StatCardProps } from "@/types";

const StatCard = ({ value, label, className, delay }: StatCardProps) => {
  return (
    <FadeIn
      delay={delay}
      className={cn(
        "border-app-border-light from-app-card-bg-light to-app-card-bg w-[250px] space-y-1 rounded-3xl border bg-linear-to-b py-6",
        className,
      )}
    >
      <p className="text-app-text-primary text-center text-xl font-bold">
        {value}
      </p>
      <p className="text-app-text-muted-darker text-center text-sm font-normal">
        {label}
      </p>
    </FadeIn>
  );
};

export default StatCard;
