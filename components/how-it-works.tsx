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
    description: "Smart portfolio optimization",
    icon: "/how-it-works-section/refresh.svg",
    alt: "Automated rebalancing icon",
  },
  {
    title: "Risk Management",
    description: "Protected strategies",
    icon: "/how-it-works-section/shield.svg",
    alt: "Shield icon",
  },
  {
    title: "Up to 34% APY",
    description: "Optimized returns",
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
      className="bg-app-section-bg h-full min-h-screen w-full lg:py-[64px] lg:px-[120px] py-[40px]"
    >
      <MaxWidthWrapper className="flex flex-col items-center justify-center">
        <FadeIn>
          <HeadingTag text="How it works" />
        </FadeIn>

        <FadeIn>
          <MainHeading
            className="mt-3 gap-2 lg:mt-7 lg:gap-5"
            title="From Seed to Harvest"
            as="h2"
            description={
              <>
                Watch your assets transform through our yield optimisation
                system. Click on any asset to see the journey:{" "}
                <br className="hidden lg:block" /> Deposit → Vault Plants →
                Strategies Branch → Compounding Growth → Yield Returns
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
            className="border-app-flow-feature-border bg-app-flow-feature-bg relative z-0 mt-4 flex h-full w-full flex-col items-center justify-between gap-10 overflow-hidden rounded-xl border px-7 py-8 shadow-md md:mt-9 md:flex-row md:items-center md:gap-0 md:py-0 lg:h-[150px]"
          >
            {FEATURE_CARDS.map((card) => (
              <article
                key={card.title}
                className="flex items-center gap-3 text-left"
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
