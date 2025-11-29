import { cn } from "@/lib/utils";
import type { MaxWidthWrapperProps } from "@/types";

const MaxWidthWrapper = ({
  children,
  className,
  ...props
}: MaxWidthWrapperProps) => {
  return (
    <div
      {...props}
      className={cn("mx-auto w-[min(80rem,100%-2rem)]", className)}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
