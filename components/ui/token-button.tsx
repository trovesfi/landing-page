import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TokenButtonProps } from "@/types";

const TokenButton = ({
  token,
  icon,
  alt,
  className,
  iconClassName,
  showToken = true,
}: TokenButtonProps) => {
  return (
    <Button
      variant="secondary"
      className={cn("text-app-text-secondary rounded-[12px]", className)}
    >
      <Image
        src={icon}
        alt={`${alt} token icon`}
        width={18}
        height={18}
        className={iconClassName}
      />
      {showToken && token}
    </Button>
  );
};

export default TokenButton;
