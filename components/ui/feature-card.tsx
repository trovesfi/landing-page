import Image from "next/image";

import { cn } from "@/lib/utils";
import type { FeatureCardProps } from "@/types";

const FeatureCard = ({
  icon,
  iconAlt,
  iconWidth = 48,
  iconHeight = 48,
  title,
  description,
  className,
  imageClassName,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "border-app-border-feature bg-app-card-feature from-app-card-gradient-start to-app-card-gradient-end flex flex-col gap-5 rounded-3xl border bg-linear-to-b p-6 lg:p-8",
        className,
      )}
    >
      <Image
        src={icon}
        alt={iconAlt}
        width={iconWidth}
        height={iconHeight}
        className={imageClassName}
      />
      <div className="space-y-1 lg:space-y-2">
        <h3
          className={cn(
            "text-app-text-primary font-medium",
            "text-base lg:text-xl",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-app-text-feature-alt",
            "mt-2 text-[11px] lg:text-[13px]",
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
