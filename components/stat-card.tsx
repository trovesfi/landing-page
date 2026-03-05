import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";
import type { StatCardProps } from "@/types";

const StatCard = ({
  value,
  label,
  size = "default",
  className,
  delay,
}: StatCardProps) => {
  return (
    <FadeIn
      delay={delay}
      className={cn(
        "border-app-border-light from-app-card-bg-light to-app-card-bg space-y-1 rounded-3xl border bg-linear-to-b py-6",
        size === "large"
          ? "w-full min-w-0 px-6 py-5 sm:px-8 md:py-5 md:px-6"
          : "min-w-[120px] w-full shrink-0 py-5 sm:min-w-[140px]",
        className,
      )}
    >
      <p
        className={cn(
          "text-app-text-primary text-center font-bold",
          size === "large" ? "text-2xl md:text-xl" : "text-xl"
        )}
      >
        {value}
      </p>
      <p className="text-app-text-muted-darker text-center text-sm font-normal">
        {label}
      </p>
    </FadeIn>
  );
};

export default StatCard;
