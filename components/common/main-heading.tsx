import { cn } from "@/lib/utils";
import type { MainHeadingProps } from "@/types";

const MainHeading = ({
  title,
  description,
  className,
  as = "h2",
}: MainHeadingProps) => {
  const HeadingTag = as;

  return (
    <div className={cn("flex w-full min-w-0 flex-col items-center gap-5", className)}>
      <HeadingTag className="text-app-text-primary w-full break-words text-center text-3xl font-normal lg:text-7xl">
        {title}
      </HeadingTag>
      {description && (
        <p className="text-app-text-description mt-1.5 w-full max-w-full text-center text-sm font-normal lg:max-w-none lg:text-base">
          {description}
        </p>
      )}
    </div>
  );
};

export default MainHeading;
