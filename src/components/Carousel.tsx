'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';
import { fadeVariants } from '@/constants';

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

      <h5 className="mb-6 bg-gradient-to-r from-[#DDD1FA] to-[#9069F0] bg-clip-text text-center text-2xl font-medium text-transparent">
        What our community says?
      </h5>

      {/* fade out  */}
      <motion.div
        className="gradient-shadow bottom-[-500px] left-[-300px] hidden h-[60%] w-[30%] lg:block"
        variants={fadeVariants}
        initial="fadeIn"
        animate="fadeOut"
      ></motion.div>

      <motion.div
        className="gradient-shadow bottom-[-200px] left-1/2 h-[50%] w-[50%] -translate-x-1/2 lg:hidden"
        variants={fadeVariants}
        initial="fadeIn"
        animate="fadeOut"
      ></motion.div>

      {/* fade in  */}
      <motion.div
        className="gradient-shadow-orange -left-[40%] -top-[30%] hidden h-[936px] w-[943px] lg:block"
        variants={fadeVariants}
        initial="fadeOut"
        animate="fadeIn"
      ></motion.div>

      <motion.div
        className="gradient-shadow-orange bottom-[-200px] left-1/2 h-[50%] w-[50%] -translate-x-1/2 lg:hidden"
        variants={fadeVariants}
        initial="fadeOut"
        animate="fadeIn"
      ></motion.div>

      <div ref={sliderRef} className="keen-slider -z-50">
        <div className="keen-slider__slide number-slide1 flex items-center justify-center">
          <div className="relative flex h-full w-full items-center justify-center lg:h-[400px]">
            <div className="light-purple-gradient hidden h-[250px] w-[89%] rounded-2xl opacity-50 sm:h-[300px] lg:block lg:h-[290px]"></div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="h-full w-[90%] rounded-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:h-[320px] lg:w-[75%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:flex-row"
            >
              <Link
                target="_blank"
                href="https://x.com/IamEnergyI/status/1827746502514544777"
                className="light-purple-gradient relative flex h-full w-full flex-col rounded-2xl lg:flex-row"
              >
                <div className="mx-auto flex w-fit justify-center lg:mx-0">
                  <Image
                    src="/tweet1.png"
                    alt="tweet1"
                    width={500}
                    height={330}
                    objectFit="contain"
                    className="p-3"
                    sizes="(max-width: 1024px) 400px, 500px"
                  />
                </div>

                {/* <div className="relative flex h-[320px] w-full justify-center">
                  <Image
                    src="/tweet1.png"
                    alt="tweet1"
                    fill
                    className="object-contain p-3"
                  />
                </div> */}

                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-2 text-center text-white lg:w-full">
                  <h2 className="font-bold italic">IreofGod.web3</h2>

                  <p className="font-light">
                    “@trovesfi{' '}
                    <span className="font-extralight italic">
                      (formerly @strkfarm)
                    </span>{' '}
                    The yield farming dapp, where you can check and invest in
                    the best $STRK rewarding pools and maximize your rewards.{' '}
                    <br /> <br /> You can easily track @starknet yield across
                    major Dexs and lending protocol.”
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="keen-slider__slide number-slide2 flex items-center justify-center">
          <div className="relative flex h-full w-full items-center justify-center lg:h-[400px]">
            <div className="light-purple-gradient hidden h-[250px] w-[89%] rounded-2xl opacity-50 sm:h-[300px] lg:block lg:h-[290px]"></div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="h-full w-[90%] rounded-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:h-[320px] lg:w-[75%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:flex-row"
            >
              <Link
                target="_blank"
                href="https://x.com/odin_free/status/1772202995997937850"
                className="light-purple-gradient relative flex h-full w-full flex-col rounded-2xl lg:flex-row"
              >
                <div className="mx-auto flex w-fit justify-center lg:mx-0">
                  <Image
                    src="/tweet2.png"
                    alt="tweet2"
                    width={500}
                    height={330}
                    objectFit="contain"
                    className="p-3"
                    sizes="(max-width: 1024px) 400px, 500px"
                  />
                </div>

                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-2 text-center text-white lg:w-full">
                  <h2 className="font-bold italic">br0th3r 0d1n</h2>

                  <p className="font-light">
                    nice rates @strkfarm
                    <br /> <br /> https://strkfarm.xyz
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="keen-slider__slide number-slide3 flex items-center justify-center">
          <div className="relative flex h-full w-full items-center justify-center lg:h-[400px]">
            <div className="light-purple-gradient hidden h-[250px] w-[89%] rounded-2xl opacity-50 sm:h-[300px] lg:block lg:h-[290px]"></div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="h-full w-[90%] rounded-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:h-[320px] lg:w-[75%] lg:-translate-x-1/2 lg:-translate-y-1/2"
            >
              <Link
                target="_blank"
                href="https://x.com/akashneelesh/status/1814705345555582980"
                className="light-purple-gradient relative flex h-full w-full flex-col rounded-2xl lg:flex-row"
              >
                <div className="mx-auto flex w-fit justify-center lg:mx-0">
                  <Image
                    src="/tweet3.png"
                    alt="tweet3"
                    width={500}
                    height={500}
                    objectFit="contain"
                    className="p-3"
                  />
                </div>

                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-2 text-center text-white lg:w-full">
                  <h2 className="font-bold italic">
                    Brother Akash Balasubramani
                  </h2>

                  <p className="font-light">
                    Did @strkfarm just hit the 50k STRK limit like under 2
                    days!!
                    <br /> <br /> Congratulations to @strkfarm and
                    @akiraonstarknet for hitting this huge milestone.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="keen-slider__slide number-slide4 flex items-center justify-center">
          <div className="relative flex h-full w-full items-center justify-center lg:h-[400px]">
            <div className="light-purple-gradient hidden h-[250px] w-[89%] rounded-2xl opacity-50 sm:h-[300px] lg:block lg:h-[290px]"></div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="h-full w-[90%] rounded-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:h-[320px] lg:w-[75%] lg:-translate-x-1/2 lg:-translate-y-1/2"
            >
              <Link
                target="_blank"
                href="https://x.com/dave_degeen/status/1780644927258423775"
                className="light-purple-gradient relative flex h-full w-full flex-col rounded-2xl lg:flex-row"
              >
                <div className="mx-auto flex w-fit justify-center lg:mx-0 lg:w-[50%]">
                  <Image
                    src="/tweet4.png"
                    alt="tweet4"
                    width={400}
                    height={400}
                    objectFit="contain"
                    className="p-3"
                  />
                </div>

                <div className="flex h-full w-[100%] flex-col items-center justify-center gap-2 p-2 text-center text-white lg:w-full">
                  <h2 className="font-bold italic">Degen_Dave.stark</h2>

                  <p className="font-light">
                    Some are harboring resentment against the @Starknet
                    ecosystem, while many are reaping juicy rewards by taking
                    advantage of DeFi Spring.
                    <br /> <br /> @strkfarm is here to help you make the most of
                    DeFi Spring.Before we continue, please follow, retweet, and
                    like.
                  </p>
                </div>
              </Link>
            </div>
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
