import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import PlatformCard from "@/components/common/platform-card";
import { PARTNERS } from "@/constants";
import { FadeIn } from "@/components/ui/fade-in";

const PartnersAndTestimonials = () => {
  return (
    <section
      aria-label="Partners"
      className="bg-app-testimonial-bg w-full py-[40px] lg:pt[24px] lg:pb-[48px] lg:px-[120px]"
    >
      <MaxWidthWrapper className="flex flex-col items-center justify-center">
        <FadeIn className="flex w-full flex-col items-center justify-center text-center">
          <h2 className="text-app-text-primary text-2xl font-semibold">
            Built with Starknet&apos;s Best
          </h2>
          <p className="text-app-text-muted mt-3 text-sm lg:text-base">
            Every Troves strategy runs through protocols curated, secured and
            trusted by the Starknet ecosystem.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            {PARTNERS.map((partner, index) => (
              <PlatformCard
                className="text-base font-semibold"
                key={partner.name}
                logo={partner.logo}
                name={partner.name}
                alt={partner.alt}
                delay={index * 0.05}
              />
            ))}
          </div>
        </FadeIn>
      </MaxWidthWrapper>
    </section>
  );
};

export default PartnersAndTestimonials;
