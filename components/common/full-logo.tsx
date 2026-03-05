import Image from "next/image";

import { cn } from "@/lib/utils";
import type { FullLogoProps } from "@/types";

const FullLogo = ({ className }: FullLogoProps) => {
  return (
    <div className={cn("", className)}>
      <Image
        src="/logos/full-logo.svg"
        alt="Troves - The Starknet Yield Engine"
        width={86}
        height={10}
        priority
      />
    </div>
  );
};

export default FullLogo;
