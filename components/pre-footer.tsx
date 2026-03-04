import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { APP_ROUTES, DOCS_ROUTES } from "@/constants/links";

const STATS = [
  { label: "Distributed to Users", value: "$2.5M+" },
  { label: "Active Strategies", value: "50+" },
  { label: "Uptime", value: "99.9%" },
] as const;

const PreFooter = () => {
  return (
    <section
      aria-label="Call to action"
      className="w-full lg:py-[48px] lg:px-[120px] py-[40px]"
    >
      <MaxWidthWrapper className="flex flex-col items-center justify-center">
        <FadeIn className="bg-pre-footer-gradient flex h-[450px] w-full flex-col items-center justify-center rounded-3xl px-6 text-center lg:px-0">
          <h2 className="text-app-text-primary text-xl font-medium lg:text-5xl">
            Why are you still farming manually?
          </h2>
          <p className="text-app-text-primary mt-5 text-xs lg:text-base">
            Don&apos;t let manual lending loops, constant LP rebalancing and
            liquidation risks kill your gains. Bring your native assets or LSTs
            to Troves. Higher automated yield on Starknet, no liquidation risk,
            zero position management.
          </p>

          <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 lg:flex-row">
            <FadeIn>
              <Link
                href={APP_ROUTES.LAUNCH_DAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="secondary"
                  className="group border-app-prefooter-btn-primary-border bg-app-prefooter-btn-primary-bg text-app-prefooter-btn-primary-text hover:bg-app-prefooter-btn-primary-bg/90 h-10 w-fit max-w-[150px] rounded-xl border px-8 text-sm font-medium lg:h-14 lg:max-w-none lg:text-lg"
                  rightIcon={
                    <ArrowRightIcon className="text-app-prefooter-btn-primary-text mt-1 size-4 transition-all duration-300 group-hover:translate-x-1 lg:size-5" />
                  }
                >
                  Start Earning
                </Button>
              </Link>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Link
                href={DOCS_ROUTES.LEARN_MORE}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="secondary"
                  className="group border-app-prefooter-btn-secondary-border bg-app-prefooter-btn-secondary-bg hover:bg-app-prefooter-btn-secondary-bg/90 text-app-text-primary h-10 w-fit max-w-[150px] rounded-xl border px-8 text-sm font-medium shadow-md lg:h-14 lg:max-w-none lg:text-lg"
                >
                  Learn more
                </Button>
              </Link>
            </FadeIn>
          </div>

          {/* <div className="mt-10 flex flex-wrap items-center justify-center gap-7">
            {STATS.map((stat, index) => (
              <FadeIn
                key={stat.label}
                delay={index * 0.08}
                className="flex flex-col items-center gap-0.5"
              >
                <p className="text-app-text-primary text-lg font-bold lg:text-2xl">
                  {stat.value}
                </p>
                <span className="text-app-prefooter-stat-text text-[10px] font-medium lg:text-xs">
                  {stat.label}
                </span>
              </FadeIn>
            ))}
          </div> */}
        </FadeIn>
      </MaxWidthWrapper>
    </section>
  );
};

export default PreFooter;
