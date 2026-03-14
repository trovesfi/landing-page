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
import { formatCurrency, formatPercentage, getNumericApy } from "@/lib/format";
import type { Strategy } from "@/types";

/** Strategy types inferred from id - order defines display priority */
const STRATEGY_TYPES = [
  "ekubo",
  "hyper-lst",
  "yolo-vault",
  "evergreen",
  "vesu-rebalance",
  "sensei",
] as const;

const getStrategyType = (
  id: string
): (typeof STRATEGY_TYPES)[number] | null => {
  if (id.startsWith("ekubo_cl_")) return "ekubo";
  if (id.startsWith("hyper_")) return "hyper-lst";
  if (id.startsWith("vesu_")) return "vesu-rebalance";
  if (id.startsWith("evergreen_")) return "evergreen";
  if (id.startsWith("xstrk_sensei")) return "sensei";
  if (id.includes("yolo")) return "yolo-vault";
  return null;
};

const getRiskLabel = (riskFactor?: number): string => {
  if (riskFactor === undefined || riskFactor === null) return "Medium Risk";
  if (riskFactor < 1) return "Low Risk";
  if (riskFactor < 2) return "Balanced Risk";
  if (riskFactor < 3) return "Medium Risk";
  return "High Risk";
};

const createVaultDescription = (strategy: Strategy): React.ReactNode => {
  const vaultType = strategy.vaultType?.type;
  return vaultType ? <>{vaultType}</> : null;
};

const StartEarningToday = () => {
  const { data: strategiesData, isLoading } = useStrategies();

  const { topVaults, activeVaultsCount } = React.useMemo(() => {
    const strategies = strategiesData?.strategies ?? [];

    const isRetired = (s: Strategy) =>
      s.isRetired ?? s.status?.value?.toLowerCase() === "retired";
    const isDeprecated = (s: Strategy) =>
      s.isDeprecated ?? s.status?.value?.toLowerCase() === "deprecated";

    const activeStrategies = strategies.filter(
      (s) => !isRetired(s) && !isDeprecated(s) && (s.tvlUsd ?? 0) > 0
    );

    // Pick one strategy per type (highest numeric APY within each type)
    const byType = new Map<string, Strategy>();
    for (const strategy of activeStrategies) {
      const type = getStrategyType(strategy.id);
      if (!type) continue;
      const apy = getNumericApy(strategy.apy);
      const existing = byType.get(type);
      if (!existing || apy > getNumericApy(existing.apy)) {
        byType.set(type, strategy);
      }
    }

    // Build list: one per type in STRATEGY_TYPES order, then fill remaining slots by APY
    const featured: Strategy[] = [];
    for (const type of STRATEGY_TYPES) {
      const strategy = byType.get(type);
      if (strategy) featured.push(strategy);
    }
    const featuredIds = new Set(featured.map((s) => s.id));
    const remaining = activeStrategies
      .filter((s) => !featuredIds.has(s.id))
      .sort((a, b) => getNumericApy(b.apy) - getNumericApy(a.apy));
    const topVaults = [...featured, ...remaining].slice(0, 3);

    return {
      topVaults,
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

        <div className="mt-10 grid w-full items-stretch justify-center gap-5 lg:grid-cols-3">
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
                        value: formatPercentage(strategy.apy),
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
