"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { TOKENS } from "@/constants";
import { getHosturl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const animation = { duration: 40000, easing: (t: number) => t };

const HeroSection: React.FC = () => {
  const [tickerApys, setTickerApys] = useState([
    { token: "STRK", apy: 0, href: '' },
    { token: "USDC", apy: 0, href: '' },
    { token: "ETH", apy: 0, href: '' },
  ])

  const [ref, _slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: 2,
    },
    renderMode: "performance",
    drag: false,
    created(s: {
      moveToIdx: (
        arg0: number,
        arg1: boolean,
        arg2: { duration: number; easing: (t: number) => number }
      ) => void;
    }) {
      s.moveToIdx(5, true, animation);
    },
    updated(s: {
      moveToIdx: (
        arg0: any,
        arg1: boolean,
        arg2: { duration: number; easing: (t: number) => number }
      ) => void;
      track: { details: { abs: number } };
    }) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s: {
      moveToIdx: (
        arg0: any,
        arg1: boolean,
        arg2: { duration: number; easing: (t: number) => number }
      ) => void;
      track: { details: { abs: number } };
    }) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["apys"],
    queryFn: async () => {
      const { data } = await axios.get(`https://app.${getHosturl()}/api/strategies`)
      return data
    }
  });

  const strkTokenAddress = TOKENS.find((token) => token.name === "STRK")?.token;
  const usdcTokenAddress = TOKENS.find((token) => token.name === "USDC")?.token;
  const ethTokenAddress = TOKENS.find((token) => token.name === "ETH")?.token;

  useEffect(() => {
    if (data) {
      let strkStrategy = data?.strategies?.filter((strategy: any) => strategy.depositToken[0] === strkTokenAddress).reduce((prev: any, current: any) => (prev.apy > current.apy) ? prev : current)

      let usdcStrategy = data?.strategies?.filter((strategy: any) => strategy.depositToken[0] === usdcTokenAddress).reduce((prev: any, current: any) => (prev.apy > current.apy) ? prev : current)

      let ethStrategy = data?.strategies?.filter((strategy: any) => strategy.depositToken[0] === ethTokenAddress).reduce((prev: any, current: any) => (prev.apy > current.apy) ? prev : current)


      console.log(strkStrategy, 'strkStrategy')
      console.log(usdcStrategy, 'usdcStrategy')
      console.log(ethStrategy, 'ethStrategy')

      setTickerApys([
        { token: "STRK", apy: strkStrategy?.apy, href: `https://app.${getHosturl()}/strategy/${strkStrategy?.id}` },
        { token: "USDC", apy: usdcStrategy?.apy, href: `https://app.${getHosturl()}/strategy/${usdcStrategy?.id}` },
        { token: "ETH", apy: ethStrategy?.apy, href: `https://app.${getHosturl()}/strategy/${ethStrategy?.id}` },
      ]);
    }
  }, [data, ethTokenAddress, strkTokenAddress, usdcTokenAddress])

  return (
    <MaxWidthWrapper className="relative grid-cols-5 pb-20 sm:pb-32 lg:pb-52 lg:grid lg:gap-x-8 lg:pt-32">
      <Image
        src="/right-grid.svg"
        alt="right-grid"
        width={413}
        height={476}
        className="absolute -right-[4.5rem] top-[12%] hidden lg:block"
      />

      <Image
        src="/center-grid.svg"
        alt="center-grid"
        width={264}
        height={264}
        className="absolute top-0 left-[50%] -translate-x-[50%] lg:hidden"
      />

      <div className="-z-10 w-[793px] h-[787px] absolute top-[-80%] left-[100%] -translate-x-[50%] sm:left-0 sm:-right-[17%] sm:-top-[20%] sm:-translate-x-0 rounded-full bg-gradient-to-r from-[#61FCAE1A] to-[#1111191A] blur-3xl" />

      <div className="relative col-span-3 px-6 pt-32 lg:pt-0">
        <div className="sm:hidden absolute left-6 top-[15%] flex animate-[bounce_4s_infinite] flex-col items-center justify-center gap-5 rounded-lg border border-[#A1A1ED66] bg-[#A1A1ED1A] pb-3 pt-2 px-6 shadow-2xl backdrop-blur-md">
          <div className="absolute -top-[22%] left-[75%] -translate-x-[50%]">
            <div className="relative w-[7.21px] h-[8.01px]">
              <Image
                src="/star.svg"
                fill
                objectFit="cover"
                alt="star"
              />
            </div>
          </div>

          <div className="absolute -top-[25%] left-[50%] -translate-x-[50%]">
            <div className="relative h-[29px] w-[29px] ">
              <Image
                src="/hero2.svg"
                fill
                objectFit="cover"
                alt="hero1"
              />
            </div>
          </div>

          <p className="text-sm font-bold text-white mt-4 lg:mt-0">25%</p>
        </div>

        <div className="sm:hidden absolute top-[10%] right-6 flex animate-[bounce_4s_infinite] flex-col items-center justify-center gap-2 rounded-lg border border-[#A1A1ED66] bg-[#A1A1ED1A] px-6 pb-1 pt-2 shadow-2xl backdrop-blur-md">
          <div className="absolute -right-[4px] top-[20%] -translate-y-[50%]">
            <div className="relative w-[6.99px] h-[7.76px]">
              <Image
                src="/star.svg"
                fill
                objectFit="cover"
                alt="star"
              />
            </div>
          </div>

          <div className="absolute top-3 -left-3 z-10">
            <div className="relative w-[18px] h-[18px]">
              <Image
                src="/coin.svg"
                fill
                objectFit="cover"
                alt="coin1"
              />
            </div>
          </div>

          <div className="absolute top-4 -left-1 z-0 rotate-[80deg]">
            <div className="relative w-[18px] h-[18px]">
              <Image
                src="/coin.svg"
                fill
                objectFit="cover"
                alt="coin2"
              />
            </div>
          </div>

          <div className="relative w-[43px] h-[28px]">
            <Image src="/hero1.svg" fill objectFit="cover" alt="hero1" />
          </div>

          <p className="text-sm font-bold text-white">100%</p>
        </div>

        <div className="mx-auto flex flex-col items-center text-center lg:text-left lg:items-start">
          <h1 className="z-20 w-fit text-balance bg-gradient-to-r from-[#6F4FF2] via-[#B0F6FF] to-[#61FCAE] bg-clip-text text-[2rem] leading-9 font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl">
            Starknet&#8217;s Yield Powerhouse
          </h1>

          <p className="mt-4 text-balance text-center text-xl text-[#F8F8FF] md:text-wrap lg:text-left z-20">
            Maximise your crypto earnings by finding{" "}
            <br className="hidden lg:block" />
            the best opportunities.
          </p>

          <div
            ref={ref}
            className="!hidden keen-slider mt-16 lg:!flex !w-[85%] items-center !rounded-lg border border-white/20 bg-gradient-to-r from-[#372B70] to-[#4F4875] px-5 py-2 font-semibold lg:mt-[4.5rem]"
          >
            {tickerApys.map((tickerApy, i) => (
              <Link target="_blank" href={tickerApy.href} key={i} className={`keen-slider__slide z-10 select-all number-slide${i + 1} flex items-center text-nowrap text-sm text-white hover:underline`}>
                {tickerApy.token} {!isLoading && (tickerApy.apy * 100).toFixed(2)}
                {isLoading && <div className='h-5 mx-1 w-10 animate-pulse rounded-md bg-gradient-to-r from-[#887eb9] to-[#68628e]' />}%
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-full flex justify-center items-center sm:hidden mt-8">
        <Link
          href="https://app.strkfarm.xyz"
          className="rounded-full bg-gradient-to-r from-[#6F4FF2] to-[#61FCAE] px-4 py-2 text-sm font-semibold text-[#111119] z-20"
        >
          Launch Dapp
        </Link>
      </div>

      <div className="col-span-full hidden sm:block -ml-12 lg:ml-0 mt-28 lg:mt-6 mb-7 lg:col-span-2">
        <div className="relative flex h-[162px] lg:h-[293px] w-full max-w-[250px] lg:max-w-none justify-center rounded-2xl bg-cyan-300 bg-gradient-to-r from-[#AD99FF] to-[#61FCAE]  lg:flex mx-auto">

          <div className="absolute -top-[30%] left-4 lg:left-6 xl:left-8 flex animate-[bounce_4s_infinite] flex-col items-center justify-center gap-2 lg:gap-5 rounded-xl border border-[#A1A1ED66] bg-[#A1A1ED1A] lg:px-7 lg:py-6 xl:px-10 xl:py-12 px-4 py-6 shadow-2xl backdrop-blur-md">
            <div className="absolute -left-[4px] lg:-left-[7px] top-[50%] -translate-y-[50%]">
              <div className="relative w-[6.99px] h-[7.76px] lg:w-[12px] lg:h-[14px]">
                <Image
                  src="/star.svg"
                  fill
                  objectFit="cover"
                  alt="star"
                />
              </div>
            </div>

            <div className="absolute -top-4 lg:-top-6 left-6 z-10">
              <div className="relative w-[33px] h-[30px] lg:w-[70px] lg:h-[64px]">
                <Image
                  src="/coin.svg"
                  fill
                  objectFit="cover"
                  alt="coin1"
                />
              </div>
            </div>

            <div className="absolute -top-4 lg:-top-5 left-[2.6rem] lg:left-[3.4rem] z-0 rotate-[80deg]">
              <div className="relative w-[33px] h-[30px] lg:w-[70px] lg:h-[64px]">
                <Image
                  src="/coin.svg"
                  fill
                  objectFit="cover"
                  alt="coin2"
                />
              </div>
            </div>

            <div className="relative w-[79px] lg:w-[144px] h-[90px] lg:h-[163px]">

              <Image src="/hero1.svg" fill objectFit="cover" alt="hero1" />
            </div>

            <p className="text-4xl lg:text-6xl font-bold text-white">100%</p>
          </div>

          <div className="absolute -right-6 -top-[10%] lg:-right-10 xl:-right-12 flex animate-[bounce_4s_infinite] flex-col items-center justify-center gap-5 rounded-xl border border-[#A1A1ED66] bg-[#A1A1ED1A] lg:p-10 xl:p-12 p-6 shadow-2xl backdrop-blur-md">
            <div className="absolute -top-[18%] left-[69%] lg:-top-[30%] lg:left-[75%] -translate-x-[50%]">
              <div className="relative w-[7.21px] h-[8.01px] lg:w-[13px] lg:h-[14px]">
                <Image
                  src="/star.svg"
                  fill
                  objectFit="cover"
                  alt="star"
                />
              </div>
            </div>

            <div className="absolute -top-[15%] lg:-top-[30%] left-[50%] -translate-x-[50%]">
              <div className="relative h-[42px] w-[42px] lg:h-[76px] lg:w-[76px]">
                <Image
                  src="/hero2.svg"
                  fill
                  objectFit="cover"
                  alt="hero1"
                />
              </div>
            </div>

            <p className="text-2xl lg:text-4xl font-bold text-white mt-4 lg:mt-0">25%</p>
          </div>

          <div className="absolute -right-12 -bottom-12 lg:-bottom-[15%] lg:-right-16 xl:-right-24 flex animate-[bounce_4s_infinite] flex-col items-center justify-center gap-1 lg:gap-5 rounded-xl border border-[#A1A1ED66] bg-[#A1A1ED1A] px-8 py-3 lg:px-12 xl:px-16 lg:pb-[5.5rem] lg:pt-5 shadow-2xl backdrop-blur-md">
            <div className="absolute -right-[4px] lg:-right-[7px] top-[75%] -translate-y-[50%]">
              <div className="relative w-[6.99px] h-[7.76px] lg:w-[12px] lg:h-[14px]">
                <Image
                  src="/star.svg"
                  fill
                  objectFit="cover"
                  alt="star"
                />
              </div>
            </div>

            <div className="absolute bottom-0 left-[50%] -translate-x-[50%]">
              <div className="relative h-[43px] w-[50px] lg:h-[77px] lg:w-[91px]">
                <Image
                  src="/coin2.svg"
                  fill
                  objectFit="cover"
                  alt="coin2"
                />
              </div>
            </div>

            <div className="lg:hidden absolute -bottom-[1rem] lg:-bottom-[1.70rem] left-[50%] -translate-x-[50%]">
              <div className="relative h-[30px] w-[74px] lg:h-[133px] lg:w-[55px]">
                <Image
                  src="/coin_line.svg"
                  fill
                  objectFit="cover"
                  alt="coin_line"
                />
              </div>
            </div>

            <Image
              src="/coin_line.svg"
              width={133}
              height={55}
              className="hidden lg:flex absolute left-[50%] -bottom-[1.70rem] -translate-x-[50%]"
              alt="coin_line"
            />

            <div className="relative h-[26px] w-[26px] lg:h-[48px] lg:w-[48px]">
              <Image src="/hero3.svg" fill objectFit="cover" alt="hero1" />
            </div>

            <p className="text-lg lg:text-2xl font-bold text-white mb-8 lg:mb-0">30%+</p>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="lg:!hidden keen-slider mt-12 sm:mt-24 flex !w-full items-center !rounded-lg border border-white/20 bg-gradient-to-r from-[#372B70] to-[#4F4875] px-5 py-2 font-semibold mx-auto"
      >
        {tickerApys.map((tickerApy, i) => (
          <Link
            target="_blank" href={tickerApy.href} key={i} className={`keen-slider__slide z-10 select-all number-slide${i + 1} flex items-center text-nowrap text-sm text-white hover:underline`}>
            {tickerApy.token} {!isLoading && (tickerApy.apy * 100).toFixed(2)}
            {isLoading && <div className='h-5 mx-1 w-10 animate-pulse rounded-md bg-gradient-to-r from-[#887eb9] to-[#68628e]' />}%
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default HeroSection;
