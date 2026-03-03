"use client";

import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

import HeadingTag from "@/components/common/header-tag";
import MainHeading from "@/components/common/main-heading";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import PlatformCard from "@/components/common/platform-card";
import StatCard from "@/components/stat-card";

import { Button } from "@/components/ui/button";
import { INTEGRATIONS } from "@/constants";
import { APP_ROUTES } from "@/constants/links";
import { useStats } from "@/hooks/use-stats";
import { useStrategies } from "@/hooks/use-strategies";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/format";
import { InteractiveNebulaShader } from "./ui/liquid-shader";

const heroEase = [0.25, 0.1, 0.25, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: heroEase },
  },
};

const subtleFade = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const AVATARS = Array.from({ length: 6 }, (_, i) => i + 1);

const HeroSection = () => {
  const { data: statsData, isLoading: statsLoading } = useStats();
  const { data: strategiesData, isLoading: strategiesLoading } =
    useStrategies();

  const { weightedApy, activeVaults } = React.useMemo(() => {
    const strategies = strategiesData?.strategies ?? [];
    const active = strategies.filter(
      (strategy) =>
        strategy.status?.value.toLowerCase() !== "retired" &&
        (strategy.tvlUsd ?? 0) > 0
    );

    const totalTvl = active.reduce(
      (sum, strategy) => sum + (strategy.tvlUsd ?? 0),
      0
    );
    const weightedAverage =
      totalTvl > 0
        ? active.reduce(
            (sum, strategy) =>
              sum + (strategy.apy ?? 0) * (strategy.tvlUsd ?? 0),
            0
          ) / totalTvl
        : null;

    return {
      weightedApy: weightedAverage,
      activeVaults: active.length,
    };
  }, [strategiesData]);

  const heroStats = [
    {
      value: statsLoading ? "—" : formatCurrency(statsData?.tvl ?? 0),
      label: "Total value locked",
    },
    {
      value: strategiesLoading ? "—" : formatPercentage(weightedApy),
      label: "Average APY",
    },
    {
      value: strategiesLoading ? "—" : formatNumber(activeVaults ?? 0),
      label: "Active vaults",
    },
  ];

  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative overflow-hidden"
      style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
    >
      <InteractiveNebulaShader
        interactive
        contained
        scale={2}
        className="pointer-events-none z-0 opacity-60 mix-blend-screen"
      />
      <MaxWidthWrapper className="relative z-10">
        <motion.div
          className="flex flex-col items-center gap-3 pt-[128px] pb-[64px] lg:gap-5"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={fadeUp}>
            <HeadingTag
              text="Powered by"
              icon="/tokens/strk.svg"
              text2="Starknet"
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <MainHeading title="The Yield Powerhouse" as="h1" />
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="text-app-text-muted mt-1.5 w-full max-w-md text-center text-sm font-medium lg:max-w-none lg:text-lg"
          >
            Maximise your crypto returns with automated yield strategies.{" "}
            <br className="hidden lg:block" />
            Troves optimises your assets across Starknet&apos;s top protocols
            while you sleep.
          </motion.p>

          <motion.div
            variants={subtleFade}
            className="mt-5 flex flex-col items-center gap-4 md:flex-row"
          >
            <Link
              href={APP_ROUTES.LAUNCH_DAPP}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="primary"
                className="group w-[260px] lg:w-fit lg:px-20"
                rightIcon={
                  <Image
                    src="/icons/arrow-right.svg"
                    className="mt-0.5 transition-all group-hover:translate-x-1"
                    alt="arrow-right"
                    width={13}
                    height={13}
                  />
                }
              >
                Start Earning
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={subtleFade}
            className="mt-10 flex flex-col items-center gap-2 lg:flex-row"
          >
            <div className="flex items-center -space-x-2">
              {AVATARS.map((num) => (
                <Image
                  key={num}
                  src={`/avatars/${num}.svg`}
                  alt={`avatar-${num}`}
                  width={20}
                  height={20}
                />
              ))}
            </div>

            <p className="text-app-text-muted-dark text-sm font-semibold">
              Trusted by{" "}
              <span className="text-app-text-muted-light font-bold">
                {" "}
                15000+{" "}
              </span>{" "}
              DeFi users
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="mt-10 flex flex-col items-center justify-center gap-5 lg:flex-row"
          >
            {heroStats.map((stat) => (
              <motion.div key={stat.label} variants={subtleFade}>
                <StatCard value={stat.value} label={stat.label} />
              </motion.div>
            ))}
          </motion.div>

          <motion.section
            variants={subtleFade}
            aria-label="Supported integrations"
            className="mt-10 flex flex-col items-center gap-4 lg:gap-7"
          >
            <motion.h2
              variants={fadeUp}
              className="text-app-text-primary text-base font-medium lg:text-2xl"
            >
              Supported Integration
            </motion.h2>

            <motion.div
              variants={containerVariants}
              className="flex flex-wrap items-center justify-center gap-3 lg:flex-nowrap lg:gap-5 lg:py-[32px] w-full"
            >
              {INTEGRATIONS.map((integration) => (
                <motion.div key={integration.name} variants={subtleFade}>
                  <PlatformCard
                    logo={integration.logo}
                    name={integration.name}
                    href={integration.href}
                    alt={integration.alt}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
};

export default HeroSection;
