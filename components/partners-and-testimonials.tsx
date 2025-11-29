import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import HeadingTag from "@/components/common/header-tag";
import MainHeading from "@/components/common/main-heading";
import PlatformCard from "@/components/common/platform-card";
import { PARTNERS } from "@/constants";
import TestimonialCard from "@/components/ui/testimonial-card";
import { FadeIn } from "@/components/ui/fade-in";

const testimonials = [
  {
    quote:
      "Troves has completely transformed how I manage my crypto portfolio. The auto-compounding feature alone has increased my returns by 15%.",
    author: "Alex Chen",
    role: "DeFi Trader",
  },
  {
    quote:
      "Best yield aggregator on Starknet. The UI is clean, strategies are transparent, and the returns speak for themselves.",
    author: "Sarah Martinez",
    role: "Yield Farmer",
  },
  {
    quote:
      "Finally, a platform that makes DeFi accessible. I can earn competitive yields without worrying about complex strategies.",
    author: "Michael Wong",
    role: "Crypto Investor",
  },
];

const PartnersAndTestimonials = () => {
  return (
    <section
      aria-label="Partners and testimonials"
      className="bg-app-testimonial-bg w-full pt-12 pb-24"
    >
      <MaxWidthWrapper className="flex flex-col items-center justify-center">
        <FadeIn className="flex w-full flex-col items-center justify-center text-center">
          <h2 className="text-app-text-primary text-2xl font-semibold">
            Our Partners
          </h2>

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

        <FadeIn className="mt-32 flex w-full flex-col items-center justify-center">
          <HeadingTag text="Testimonials" />

          <MainHeading
            className="mt-3 gap-2 lg:mt-7 lg:gap-5"
            title="Trusted by thousands"
            as="h2"
            description={
              <>
                See what our community has to say about their experience with
                Troves
              </>
            }
          />
        </FadeIn>

        <div className="mt-16 grid w-full gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.author} delay={index * 0.08}>
              <TestimonialCard {...testimonial} />
            </FadeIn>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default PartnersAndTestimonials;
