'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from 'next/image';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <MaxWidthWrapper className="z-20 mt-16 lg:mt-56 relative px-0">
      <div className="w-[793px] h-[787px] absolute -left-[25%] -top-[15%] rounded-full bg-black blur-3xl -z-50" />

      <h5 className="mb-8 bg-gradient-to-r from-[#9069F0] to-[#9069F0] bg-clip-text text-center text-2xl font-medium text-transparent">
        What our community says?
      </h5>

      <div ref={sliderRef} className="keen-slider -z-50">
        <div className="keen-slider__slide number-slide1 flex items-center justify-center">
          <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] w-[90%] bg-[#201E26] rounded-2xl">
            <Link target='_blank' href='https://x.com/IamEnergyI/status/1827746502514544777'>
              <Image
                src="/tweet1.png"
                alt="tweet1"
                fill
                objectFit="contain"
                className="w-[90%] rounded-[1rem] lg:rounded-3xl lg:border-none border border-[#A1A1ED4D]"
              />
            </Link>
          </div>
        </div>

        <div className="keen-slider__slide number-slide2 flex items-center justify-center">
          <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] w-[90%] bg-[#201E26] rounded-2xl">
            <Link target='_blank' href='https://x.com/akashneelesh/status/1814705345555582980'>
              <Image
                src="/tweet2.png"
                alt="tweet2"
                fill
                objectFit="contain"
                className="w-[90%] rounded-[1rem] lg:rounded-3xl lg:border-none border border-[#A1A1ED4D]"
              />
            </Link>
          </div>
        </div>

        <div className="keen-slider__slide number-slide3 flex items-center justify-center">
          <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] w-[90%] bg-[#201E26] rounded-2xl">
            <Link target='_blank' href='https://x.com/odin_free/status/1772202995997937850'>
              <Image
                src="/tweet3.png"
                alt="tweet3"
                fill
                objectFit="contain"
                className="w-[90%] rounded-[1rem] lg:rounded-3xl lg:border-none border border-[#A1A1ED4D]"
              />
            </Link>
          </div>
        </div>

        <div className="keen-slider__slide number-slide4 flex items-center justify-center">
          <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] w-[90%] bg-[#201E26] rounded-2xl">
            <Link target='_blank' href='https://x.com/dave_degeen/status/1780644927258423775'>
              <Image
                src="/tweet4.png"
                alt="tweet4"
                fill
                objectFit="contain"
                className="w-[90%] rounded-[1rem] lg:rounded-3xl lg:border-none border border-[#A1A1ED4D]"
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
            className="absolute hidden lg:flex left-[10%] top-[52%] z-50 w-fit cursor-pointer rounded-full bg-white p-0.5"
          >
            <ChevronLeft className="size-5 text-black" />
          </div>

          <div
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            className="absolute hidden lg:flex right-[10%] top-[52%] z-50 w-fit cursor-pointer rounded-full bg-white p-0.5"
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
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={cn(
                  'size-3 rounded-full border border-[#9069F0] bg-[#A1A1ED1A] cursor-pointer',
                  {
                    'border-[#9069F0] bg-[#9069F0]': currentSlide === idx,
                  },
                )}
              />
            )
          })}
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default Carousel;
