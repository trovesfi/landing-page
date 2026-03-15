import Image from "next/image";

import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import HeadingTag from "@/components/common/header-tag";
import MainHeading from "@/components/common/main-heading";
import FeatureCard from "@/components/ui/feature-card";
import { FadeIn } from "@/components/ui/fade-in";
import StatBadge from "@/components/ui/stat-badge";

const WhyChooseTroves = () => {
  const features = [
    {
      icon: "/why-choose-section/auto-compounding.svg",
      iconAlt: "Auto-Compounding",
      title: "Auto-Compounding",
      description:
        "Starknet DeFi yield, auto-compounded for you. Rewards get harvested, reinvested, and stacked. You do nothing.",
    },
    {
      icon: "/why-choose-section/audited.svg",
      iconAlt: "Audited",
      title: "Audited & Secure",
      description: "Audit reports and security details are fully transparent.",
    },
    {
      icon: "/why-choose-section/low-fees.svg",
      iconAlt: "Low Fees",
      title: "Low Fees",
      description:
        "Capital-efficient vault execution on Starknet. Lower costs. Higher retained yield.",
    },
    {
      icon: "/why-choose-section/non-custodial.svg",
      iconAlt: "Non-Custodial",
      title: "Non-Custodial",
      description: "You always maintain full control of your assets.",
    },
  ];

  return (
    <section
      id="why-choose"
      aria-label="Why choose Troves"
      className="bg-app-section-purple-gradient bg-app-section-bg-dark w-full lg:py-[120px] py-[40px] lg:px-[71.5px]"
    >
      <MaxWidthWrapper className="flex flex-col items-center justify-center">
        <FadeIn>
          <HeadingTag text="ZK-Secured Infrastructure" />
        </FadeIn>
        <FadeIn>
          <MainHeading
            title="Why choose Troves?"
            as="h2"
            className="mt-3 gap-2 lg:mt-7 lg:gap-5"
            description={
              <span className="text-app-text-feature">
                Curated Starknet yield strategies built for liquid staking,
                lending loops and auto-compounding vaults.
              </span>
            }
          />
        </FadeIn>

        <div className="flex w-full flex-col gap-5">
          <div className="mt-12 grid w-full gap-5 lg:grid-cols-12">
            <FadeIn
              as="article"
              className="border-app-border-feature bg-app-card-feature from-app-card-gradient-start to-app-card-gradient-end col-span-6 flex flex-col justify-between gap-5 rounded-3xl border bg-linear-to-b p-6 lg:p-8"
            >
              <div className="relative flex w-full items-start justify-end">
                <Image
                  src="/why-choose-section/robot.svg"
                  className="absolute -top-[3.3rem] -left-[3.3rem] h-[150px] w-[150px] lg:-top-[5.2rem] lg:-left-[5.2rem] lg:h-[250px] lg:w-[250px]"
                  alt="Robot"
                  width={250}
                  height={250}
                />

                <div className="relative">
                  <Image
                    src="/why-choose-section/curated.svg"
                    className="-mt-1 h-[80px] w-[150px] lg:h-[208px] lg:w-[326px]"
                    alt="Stacked Container"
                    width={326}
                    height={208}
                  />
                </div>
              </div>

              <article className="space-y-1 lg:space-y-2">
                <h3 className="text-app-text-primary text-base font-medium lg:text-xl">
                  Curated, Transparent & Risk managed
                </h3>
                <p className="text-app-text-feature-alt text-[11px] lg:text-[13px]">
                  Troves curates and transparently discloses strategies for BTC,
                  ETH, STRK and USDC. Strategies are built by teams like RE7
                  Labs and Unwrap Labs, then deployed across trusted Starknet
                  protocols. Several risks like liquidation risk, APY volatility
                  and liquidity risk are managed by curators automatically.
                </p>
              </article>
            </FadeIn>

            <ul
              aria-label="Troves feature highlights"
              className="col-span-6 grid gap-5 lg:grid-cols-2"
            >
              {features.map((feature, index) => (
                <FadeIn
                  as="li"
                  key={feature.title}
                  delay={index * 0.08}
                  className="h-full list-none"
                >
                  <FeatureCard
                    icon={feature.icon}
                    iconAlt={feature.iconAlt}
                    title={feature.title}
                    description={feature.description}
                    className="h-full"
                    imageClassName="h-[40px] w-[40px] lg:h-[48px] lg:w-[48px]"
                  />
                </FadeIn>
              ))}
            </ul>
          </div>

          <FadeIn
            as="article"
            className="bg-app-card-feature border-app-border-feature from-app-card-gradient-end-alt to-app-card-gradient-end flex w-full items-center justify-between rounded-3xl border bg-linear-to-r px-6 py-6 lg:py-0 lg:pr-9 lg:pl-0"
          >
            <div className="flex w-full flex-col items-start -space-x-14 lg:flex-row lg:items-center">
              <Image
                src="/why-choose-section/stonks.svg"
                className="hidden lg:block"
                alt="stonks"
                width={168}
                height={200}
              />

              <div className="relative flex w-full items-center justify-between lg:hidden">
                <div className="">
                  <Image
                    src="/why-choose-section/stonks.svg"
                    className="absolute -top-[54px] -left-[24px]"
                    alt="stonks"
                    width={128}
                    height={200}
                  />
                </div>
                <StatBadge label="UP TO" value="40%+" unit="APY" />
              </div>

              <article className="space-y-2">
                <h3 className="text-app-text-primary text-base font-medium lg:text-lg">
                  High-Yield Strategies
                </h3>
                <p className="text-app-text-feature-alt text-[11px] lg:text-[13px]">
                  Yield generated through liquid staking, lending loops and
                  auto-compounding across Starknet. Structured strategies. Not
                  random farms.
                </p>
              </article>
            </div>

            <StatBadge
              label="UP TO"
              value="40%+"
              unit="APY"
              className="hidden lg:flex"
            />
          </FadeIn>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default WhyChooseTroves;
