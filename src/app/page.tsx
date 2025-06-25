import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LandingNav from "@/components/LandingNav";
import Partners from "@/components/Partners";
import Updates from "@/components/Updates";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <div>
      {/* <Image
        src="circular-bg.svg"
        width={1280}
        height={3813}
        className="absolute left-[50%] z-0 -translate-x-[50%]"
        alt="circular-bg"
      /> */}

      <LandingNav />

      <main className="flex bg-[black] min-h-[calc(100vh-3.5rem-1px)] flex-col overflow-x-hidden">
        <div className="z-40 flex h-full flex-1 flex-col">
          <HeroSection />
          <Partners />
          <Updates />
          <WhyUs />
          <Carousel />
          <Footer />
        </div>
      </main>
    </div>
  );
}
