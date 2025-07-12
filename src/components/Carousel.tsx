'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <MaxWidthWrapper className="relative z-20 mt-16 px-0 lg:mt-56">
      <div className="absolute -left-[25%] -top-[15%] -z-50 h-auto w-[793px] rounded-full bg-black blur-3xl" />

      <h5 className="mb-8 bg-[#D3D3D3] bg-clip-text text-center text-2xl font-medium text-transparent">
        What our community says?
      </h5>

      <div ref={sliderRef} className="keen-slider -z-50">
        <div className="keen-slider__slide number-slide1 flex items-center justify-center">
          <div className="relative h-[250px] w-[90%] rounded-2xl bg-[#201E26] sm:h-[300px] lg:h-[400px]">
            <Link
              target="_blank"
              href="https://x.com/IamEnergyI/status/1827746502514544777"
            >
              <Image
                src="/tweet1.png"
                alt="tweet1"
                fill
                objectFit="contain"
                className="w-[90%] rounded-[1rem] border border-[#A1A1ED4D] lg:rounded-3xl lg:border-none"
              />
            </Link>
          </div>
        </div>

        <div className="keen-slider__slide number-slide2 flex items-center justify-center">
          <div className="relative h-[250px] w-[90%] rounded-2xl bg-[#201E26] sm:h-[300px] lg:h-[400px]">
            <Link
              target="_blank"
              href="https://x.com/akashneelesh/status/1814705345555582980"
            >
              <Image
                src="/tweet2.png"
                alt="tweet2"
                fill
                objectFit="contain"
                className="w-[90%] rounded-[1rem] border border-[#A1A1ED4D] lg:rounded-3xl lg:border-none"
              />
            </Link>
          </div>
        </div>

        <div className="keen-slider__slide number-slide3 flex items-center justify-center">
          <div className="relative h-[250px] w-[90%] rounded-2xl bg-[#201E26] sm:h-[300px] lg:h-[400px]">
            <Link
              target="_blank"
              href="https://x.com/odin_free/status/1772202995997937850"
            >
              <Image
                src="/tweet3.png"
                alt="tweet3"
                fill
                objectFit="contain"
                className="w-[90%] rounded-[1rem] border border-[#A1A1ED4D] lg:rounded-3xl lg:border-none"
              />
            </Link>
          </div>
        </div>

        <div className="keen-slider__slide number-slide4 flex items-center justify-center">
          <div className="relative h-[250px] w-[90%] rounded-2xl bg-[#201E26] sm:h-[300px] lg:h-[400px]">
            <Link
              target="_blank"
              href="https://x.com/dave_degeen/status/1780644927258423775"
            >
              <Image
                src="/tweet4.png"
                alt="tweet4"
                fill
                objectFit="contain"
                className="w-[90%] rounded-[1rem] border border-[#A1A1ED4D] lg:rounded-3xl lg:border-none"
              />
            </Link>
          </div>
        </div>
      </div>

      {loaded && instanceRef.current && (
        <>
          <div
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            className="absolute left-[10%] top-[52%] z-50 hidden w-fit cursor-pointer rounded-full bg-white p-0.5 lg:flex"
          >
            <ChevronLeft className="size-5 text-black" />
          </div>

          <div
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            className="absolute right-[10%] top-[52%] z-50 hidden w-fit cursor-pointer rounded-full bg-white p-0.5 lg:flex"
          >
            <ChevronRight className="size-5 text-black" />
          </div>
        </>
      )}

      {loaded && instanceRef.current && (
        <div className="mt-3 flex w-full items-center justify-center gap-2">
          {[
            // @ts-ignore
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={cn(
                  'size-3 cursor-pointer rounded-full border border-[#9069F0] bg-[#A1A1ED1A]',
                  {
                    'border-[#9069F0] bg-[#9069F0]': currentSlide === idx,
                  },
                )}
              />
            );
          })}
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default Carousel;
