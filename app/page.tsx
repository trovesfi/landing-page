import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import WhyChooseTroves from "@/components/why-choose-troves";
import StartEarningToday from "@/components/start-earning-today";
import PartnersAndTestimonials from "@/components/partners-and-testimonials";
import PreFooter from "@/components/pre-footer";

export default function Home() {
  return (
    <main className="bg-app-bg relative min-h-screen w-full overflow-hidden">
      <HeroSection />
      <div className="relative z-10 flex w-full flex-col items-center justify-center overflow-x-hidden">
        <HowItWorks />
        <WhyChooseTroves />
        <StartEarningToday />
        <PartnersAndTestimonials />
        <PreFooter />
      </div>
    </main>
  );
}
