import { cn } from "@/lib/utils";
import type { StatBadgeProps } from "@/types";

const StatBadge = ({ label, value, unit, className }: StatBadgeProps) => {
  return (
    <div
      className={cn(
        "border-app-stat-badge-border bg-app-stat-badge-bg flex flex-col items-end gap-0.5 rounded-xl border px-4 py-2 lg:p-5!",
        className,
      )}
    >
      <span className="text-app-stat-badge-text text-[10px] lg:text-xs">
        {label}
      </span>
      <span className="text-app-stat-accent text-xl font-bold text-nowrap lg:text-3xl">
        {value}
      </span>
      {unit && (
        <span className="text-app-stat-badge-text text-[10px] lg:text-xs">
          {unit}
        </span>
      )}
    </div>
  );
};

export default StatBadge;
