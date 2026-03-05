import Image from "next/image";

import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";
import type { PlatformCardProps } from "@/types";
import Link from "next/link";

const PlatformCard = ({
  logo,
  name,
  href,
  alt,
  className,
  delay = 0,
}: PlatformCardProps) => {
  return (
    <FadeIn
      delay={delay}
      className={cn(
        "border-app-border-light bg-app-card-bg hover:bg-app-card-bg-light text-app-text-secondary flex w-[140px] cursor-pointer items-center justify-center gap-2 rounded-lg border py-2 text-center text-sm font-medium transition-colors",
        className
      )}
    >
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="flex flex-row items-center justify-center gap-2"
        >
          <Image
            className="rounded-full"
            src={logo}
            alt={`${name} ${alt}`}
            width={20}
            height={20}
          />
          {name}
        </Link>
      ) : (
        <span className="flex flex-row items-center justify-center gap-2">
          <Image
            className="rounded-full"
            src={logo}
            alt={`${name} ${alt}`}
            width={20}
            height={20}
          />
          {name}
        </span>
      )}
    </FadeIn>
  );
};

export default PlatformCard;
