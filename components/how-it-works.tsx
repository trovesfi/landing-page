"use client";

import Image from "next/image";

import HeadingTag from "@/components/common/header-tag";
import MainHeading from "@/components/common/main-heading";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import { FadeIn } from "@/components/ui/fade-in";
import HowItWorksAnimation from "@/components/ui/how-it-works-animation";
import { useStrategies } from "@/hooks/use-strategies";

const TOKENS = [
  {
    src: "/tokens/strk-outline.svg",
    token: "STRK",
    icon: "/tokens/strk-outline.svg",
    alt: "STRK",
  },
  { src: "/tokens/btc.svg", token: "BTC", icon: "/tokens/btc.svg", alt: "BTC" },
  {
    src: "/tokens/eth-black.svg",
    token: "ETH",
    icon: "/tokens/eth-black.svg",
    alt: "ETH",
  },
  {
    src: "/tokens/usdc.svg",
    token: "USDC",
    icon: "/tokens/usdc.svg",
    alt: "USDC",
  },
  {
    src: "/tokens/usdt.svg",
    token: "USDT",
    icon: "/tokens/usdt.svg",
    alt: "USDT",
  },
];

const FEATURE_CARDS = [
  {
    title: "Automated Rebalancing",
    description:
      "Your positions stay optimised around the clock. No babysitting required.",
    icon: "/how-it-works-section/refresh.svg",
    alt: "Automated rebalancing icon",
  },
  {
    title: "Risk Management",
    description:
      "Every strategy is risk-assessed and curated. You choose your level. We manage the rest.",
    icon: "/how-it-works-section/shield.svg",
    alt: "Shield icon",
  },
  {
    title: "Up to 62% APY",
    description: "Structured compounding",
    icon: "/how-it-works-section/stonks.svg",
    alt: "Growth arrow icon",
  },
] as const;

const HowItWorks = () => {
  const { data: strategiesData } = useStrategies();
  const vaults = strategiesData?.strategies?.slice(0, 12) ?? [];

  return (
    <section
      aria-label="How it works"
      className="bg-app-section-bg h-full min-h-screen w-full overflow-x-hidden py-[40px] lg:py-[64px] lg:px-[120px]"
    >
      <MaxWidthWrapper className="flex flex-col items-center justify-center">
        <FadeIn>
          <HeadingTag text="How it works" />
        </FadeIn>

        <FadeIn className="w-full px-6">
          <MainHeading
            className="mt-3 w-full gap-2 lg:mt-7 lg:gap-5"
            title="How Automated Yield Works on Troves"
            as="h2"
            description={
              <>
                Pick your asset. Drop it in. Troves routes it across
                Starknet&apos;s top protocols, auto-compounds the returns, and
                sends yield back to your wallet. No manual moves. Just yield.
              </>
            }
          />
        </FadeIn>

        <div className="mt-8 w-full max-w-[763px] lg:mt-12">
          <HowItWorksAnimation
            tokens={TOKENS}
            vaults={vaults}
            className="max-w-[763px]"
          />
          <FadeIn
            delay={0.1}
            className="border-app-flow-feature-border bg-app-flow-feature-bg relative z-0 mt-4 flex h-full w-full flex-col items-start justify-between gap-10 overflow-hidden rounded-xl border px-7 py-8 shadow-md md:mt-9 md:flex-row md:items-center md:gap-0 md:py-0 lg:h-[150px]"
          >
            {FEATURE_CARDS.map((card) => (
              <article
                key={card.title}
                className="flex min-w-0 items-center gap-3 text-left md:flex-1"
                aria-label={card.title}
              >
                <span className="border-app-flow-feature-border/40 bg-app-flow-feature-chip-bg rounded-[12px] border p-2">
                  <Image
                    src={card.icon}
                    className="shrink-0"
                    alt={card.alt}
                    width={20}
                    height={20}
                  />
                </span>
                <span className="flex flex-col">
                  <h3 className="text-app-text-primary text-base leading-6 font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-app-flow-feature-chip-text text-xs">
                    {card.description}
                  </p>
                </span>
              </article>
            ))}
          </FadeIn>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default HowItWorks;
