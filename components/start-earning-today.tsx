"use client";

import React from "react";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import HeadingTag from "@/components/common/header-tag";
import MainHeading from "@/components/common/main-heading";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import VaultCard from "@/components/ui/vault-card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { APP_ROUTES } from "@/constants/links";
import { useStrategies } from "@/hooks/use-strategies";
import { formatCurrency, formatPercentage } from "@/lib/format";
import type { Strategy } from "@/types";

const getRiskLabel = (riskFactor?: number): string => {
  if (riskFactor === undefined || riskFactor === null) return "Medium Risk";
  if (riskFactor < 1) return "Low Risk";
  if (riskFactor < 2) return "Balanced Risk";
  if (riskFactor < 3) return "Medium Risk";
  return "High Risk";
};

const createVaultDescription = (strategy: Strategy) => {
  if (!strategy.apyMethodology) {
    return (
      <>
        Managed by {strategy.curator?.name ?? "Troves"} across Starknet&apos;s{" "}
        leading protocols.
      </>
    );
  }

  return (
    <>
      {strategy.apyMethodology} <br className="hidden lg:block" />
      {/* Curated by {strategy.curator?.name ?? "Troves"}. */}
    </>
  );
};

const StartEarningToday = () => {
  const { data: strategiesData, isLoading } = useStrategies();

  const { topVaults, activeVaultsCount } = React.useMemo(() => {
    const strategies = strategiesData?.strategies ?? [];

    const activeStrategies = strategies.filter(
      (strategy) => strategy.status?.value.toLowerCase() !== "retired"
    );

    const top = [...activeStrategies]
      .sort((a, b) => (b.apy ?? 0) - (a.apy ?? 0))
      .slice(0, 3);

    return {
      topVaults: top,
      activeVaultsCount: activeStrategies.length,
    };
  }, [strategiesData]);

  return (
    <section
      id="strategies"
      aria-label="Start earning today"
      className="bg-app-section-solid w-full py-[40px] lg:py-[48px] lg:px-[120px]"
    >
      <MaxWidthWrapper className="flex flex-col items-center justify-center">
        <FadeIn>
          <HeadingTag text="Featured vaults" />
        </FadeIn>

        <FadeIn>
          <MainHeading
            className="mt-3 gap-2 lg:mt-7 lg:gap-5"
            title="Start earning today"
            as="h2"
            description={
              <>
                Curated automated vaults across BTC, STRK, ETH and USDC on
                Starknet. Pick your risk level and let the strategy run.
              </>
            }
          />
        </FadeIn>

        <div className="mt-10 grid w-full items-center justify-center gap-5 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <FadeIn
                as="div"
                key={`skeleton-${index}`}
                className="border-app-border-light bg-app-card-bg h-[340px] w-full max-w-[412px] animate-pulse rounded-2xl border"
              >
                <div className="bg-app-card-bg h-full w-full animate-pulse rounded-2xl" />
              </FadeIn>
            ))}

          {!isLoading &&
            topVaults.map((strategy, index) => {
              const tokens =
                strategy.logos && strategy.logos.length > 0
                  ? strategy.logos.map((logo, index) => ({
                      src: logo,
                      alt:
                        strategy.depositToken?.[index]?.symbol ?? strategy.name,
                    }))
                  : (strategy.depositToken ?? []).map((token) => ({
                      src: `/tokens/${token.symbol.toLowerCase()}.svg`,
                      alt: token.symbol,
                    }));

              const normalizedTokens =
                tokens.length > 0
                  ? tokens
                  : [
                      {
                        src: "/logos/full-logo.svg",
                        alt: strategy.name,
                      },
                    ];

              return (
                <FadeIn key={strategy.id} delay={index * 0.08}>
                  <VaultCard
                    pairName={strategy.name}
                    tokens={normalizedTokens}
                    curator={{
                      name: strategy.curator?.name ?? "Troves",
                      logo: strategy.curator?.logo,
                    }}
                    riskLabel={getRiskLabel(strategy.riskFactor)}
                    stats={[
                      {
                        label: "APY",
                        value: formatPercentage(strategy.apy ?? 0),
                      },
                      {
                        label: "TVL",
                        value: formatCurrency(strategy.tvlUsd ?? 0),
                      },
                    ]}
                    description={createVaultDescription(strategy)}
                    ctaLabel="Deposit"
                    ctaIcon={
                      <ArrowRightIcon className="text-app-button-faded-text size-4 transition-all group-hover:translate-x-1" />
                    }
                    ctaLink={APP_ROUTES.STRATEGY(strategy.id)}
                  />
                </FadeIn>
              );
            })}
        </div>

        <FadeIn>
          <Link
            href={APP_ROUTES.STRATEGIES}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              className="group from-app-button-gradient-start to-app-button-gradient-end mt-12 h-10 bg-linear-to-b px-10 text-sm font-medium lg:mt-20 lg:h-12 lg:text-lg"
              rightIcon={
                <ArrowRight className="size-5 transition-all group-hover:translate-x-1" />
              }
            >
              View all {activeVaultsCount} vaults
            </Button>
          </Link>
        </FadeIn>
      </MaxWidthWrapper>
    </section>
  );
};

export default StartEarningToday;
