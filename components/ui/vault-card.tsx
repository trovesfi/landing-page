import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ANCHOR_LINKS } from "@/constants/links";
import type { VaultCardProps } from "@/types";

const VaultCard = ({
  tokens,
  pairName,
  curator,
  description,
  riskLabel = "Medium Risk",
  stats,
  ctaLabel,
  ctaIcon,
  className,
  ctaLink,
}: VaultCardProps) => {
  return (
    <article
      className={cn(
        "border-app-card-border-strong bg-app-card-feature from-app-card-gradient-mid to-app-card-gradient-deep flex h-full w-full max-w-[412px] flex-col space-y-5 rounded-2xl border bg-linear-to-b px-5 py-4 xl:rounded-4xl xl:px-7 xl:py-5",
        className
      )}
      itemScope
      itemType="https://schema.org/FinancialProduct"
    >
      <header className="flex w-full flex-nowrap items-center justify-between gap-3 xl:gap-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className="flex shrink-0 items-center -space-x-3"
            aria-label={`${pairName} token pair`}
          >
            {tokens.map((token) => (
              <Image
                key={token.src}
                src={token.src}
                alt={`${token.alt} token icon`}
                width={32}
                height={32}
                className="border-app-section-solid bg-app-section-solid size-[24px] shrink-0 rounded-full border xl:size-[32px]"
              />
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <h3
              className="text-app-text-primary w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium xl:text-base"
              itemProp="name"
            >
              {pairName}
            </h3>
            <p className="text-app-card-text-muted flex shrink-0 items-center gap-1 text-nowrap text-[10px] xl:text-xs">
              Curated by:
              {curator.logo ? (
                <Image
                  src={curator.logo}
                  alt={`${curator.name} curator logo`}
                  width={16}
                  height={16}
                />
              ) : null}
              {curator.name}
            </p>
          </div>
        </div>

        <div
          className="border-app-risk-border bg-app-risk-bg text-app-risk-text rounded-full border px-2 py-1 text-[10px] xl:px-4 xl:py-2 xl:text-xs"
          role="status"
          aria-label={`Risk level: ${riskLabel}`}
        >
          {riskLabel}
        </div>
      </header>

      <p
        className="text-app-text-description-muted line-clamp-3 min-h-0 flex-1 text-xs xl:text-sm"
        itemProp="description"
      >
        Vault Type: <span className="text-app-text-primary">{description}</span>
      </p>

      <div className="flex w-full flex-wrap items-center gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-app-border-stat flex w-full flex-1 flex-col items-center justify-center gap-1 rounded-2xl border py-2"
          >
            <p className="text-app-text-stat text-sm font-semibold xl:text-base">
              {stat.label}
            </p>
            <span className="text-app-text-primary text-sm font-bold xl:text-base">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {ctaLabel && (
        <Link
          href={ctaLink ?? ANCHOR_LINKS.DEFAULT}
          target={ctaLink ? "_blank" : "_self"}
          rel={ctaLink ? "noopener noreferrer" : undefined}
          className="w-full"
        >
          <Button
            variant="primaryFaded"
            className="group w-full text-sm font-semibold xl:text-base"
            rightIcon={ctaIcon}
            aria-label={`${ctaLabel} to ${pairName} vault`}
          >
            {ctaLabel}
          </Button>
        </Link>
      )}
    </article>
  );
};

export default VaultCard;
