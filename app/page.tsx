import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import WhyChooseTroves from "@/components/why-choose-troves";
import StartEarningToday from "@/components/start-earning-today";
import PartnersAndTestimonials from "@/components/partners-and-testimonials";
import PreFooter from "@/components/pre-footer";
import { InteractiveNebulaShader } from "@/components/ui/liquid-shader";

export default function Home() {
  return (
    <main className="bg-app-bg relative min-h-screen w-full overflow-hidden">
      <InteractiveNebulaShader
        interactive
        className="pointer-events-none z-0 opacity-60 mix-blend-screen"
      />
      <div className="relative z-10 flex flex-col items-center justify-center overflow-x-hidden">
        <HeroSection />
        <HowItWorks />
        <WhyChooseTroves />
        <StartEarningToday />
        <PartnersAndTestimonials />
        <PreFooter />
      </div>
    </main>
  );
}
