/* eslint-disable @next/next/no-img-element */
'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'motion/react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { fadeVariants, TOKENS } from '@/constants';
import { addressEq, getHosturl } from '@/lib/utils';

export const animation = { duration: 40000, easing: (t: number) => t };

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1,
    },
  },
};

const textVariants: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
  },
};

const imageVariants: Variants = {
  hidden: { x: -100, opacity: 0, rotate: -180 },
  visible: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      x: { duration: 0.8, ease: 'easeOut', delay: 0.5 },
      rotate: { duration: 1.5, ease: 'easeOut', delay: 0.5 },
      opacity: { duration: 0.8, delay: 0.5 },
    },
  },
};

const gradientVariants: Variants = {
  hidden: { background: 'linear-gradient(to right, transparent, transparent)' },
  visible: {
    background: 'linear-gradient(to right, #754813, #050302)',
    transition: { duration: 1.2, ease: 'easeOut', delay: 1.5 },
  },
};

const HeroSection: React.FC = () => {
  const [tickerApys, setTickerApys] = useState([
    { token: 'BTC', apy: 0, href: '' },
    { token: 'STRK', apy: 0, href: '' },
    { token: 'USDC', apy: 0, href: '' },
    { token: 'ETH', apy: 0, href: '' },
  ]);

  const [ref, _slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    slides: {
      perView: 2,
    },
    renderMode: 'performance',
    drag: false,
    created(s: {
      moveToIdx: (
        arg0: number,
        arg1: boolean,
        arg2: { duration: number; easing: (t: number) => number },
      ) => void;
    }) {
      s.moveToIdx(5, true, animation);
    },
    updated(s: {
      moveToIdx: (
        arg0: any,
        arg1: boolean,
        arg2: { duration: number; easing: (t: number) => number },
      ) => void;
      track: { details: { abs: number } };
    }) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s: {
      moveToIdx: (
        arg0: any,
        arg1: boolean,
        arg2: { duration: number; easing: (t: number) => number },
      ) => void;
      track: { details: { abs: number } };
    }) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['apys'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://app.${getHosturl()}/api/strategies`,
      );
      return data;
    },
  });

  const strkTokenAddress = TOKENS.find((token) => token.name === 'STRK')?.token;
  const usdcTokenAddress = TOKENS.find((token) => token.name === 'USDC')?.token;
  const ethTokenAddress = TOKENS.find((token) => token.name === 'ETH')?.token;
  const wBTCTokenAddress = TOKENS.find((token) => token.name === 'wBTC')?.token;

  useEffect(() => {
    if (data) {
      let strkStrategy = data?.strategies
        ?.filter((strategy: any) =>
          addressEq(strategy.depositToken[0].address, strkTokenAddress!),
        )
        .reduce((prev: any, current: any) =>
          prev.apy > current.apy ? prev : current,
        );

      let usdcStrategy = data?.strategies
        ?.filter((strategy: any) =>
          addressEq(strategy.depositToken[0].address, usdcTokenAddress!),
        )
        .reduce((prev: any, current: any) =>
          prev.apy > current.apy ? prev : current,
        );

      let ethStrategy = data?.strategies
        ?.filter((strategy: any) =>
          addressEq(strategy.depositToken[0].address, ethTokenAddress!),
        )
        .reduce((prev: any, current: any) =>
          prev.apy > current.apy ? prev : current,
        );

      let btcStrategy = data?.strategies
        ?.filter((strategy: any) =>
          addressEq(strategy.depositToken[0].address, wBTCTokenAddress!),
        )
        .reduce((prev: any, current: any) =>
          prev.apy > current.apy ? prev : current,
        );

      setTickerApys([
        {
          token: 'BTC',
          apy: btcStrategy?.apy,
          href: `https://app.${getHosturl()}/strategy/${btcStrategy?.id}`,
        },
        {
          token: 'STRK',
          apy: strkStrategy?.apy,
          href: `https://app.${getHosturl()}/strategy/${strkStrategy?.id}`,
        },
        {
          token: 'USDC',
          apy: usdcStrategy?.apy,
          href: `https://app.${getHosturl()}/strategy/${usdcStrategy?.id}`,
        },
        {
          token: 'ETH',
          apy: ethStrategy?.apy,
          href: `https://app.${getHosturl()}/strategy/${ethStrategy?.id}`,
        },
      ]);
    }
  }, [
    data,
    ethTokenAddress,
    strkTokenAddress,
    usdcTokenAddress,
    wBTCTokenAddress,
  ]);

  return (
    <MaxWidthWrapper className="relative grid-cols-5 pb-20 sm:pb-32 lg:grid lg:gap-x-8 lg:pb-52 lg:pt-32">
      <div className="absolute left-[100%] top-[-80%] -z-10 h-[787px] w-[793px] -translate-x-[50%] rounded-full bg-black blur-3xl sm:-right-[17%] sm:-top-[20%] sm:left-0 sm:-translate-x-0" />

      <div className="relative col-span-3 px-6 pt-32 lg:pt-0">
        <div className="absolute left-6 top-[15%] flex animate-[bounce_4s_infinite] flex-col items-center justify-center gap-5 rounded-lg border border-[#A1A1ED66] bg-[#A1A1ED1A] px-6 pb-3 pt-2 shadow-2xl backdrop-blur-md sm:hidden">
          <div className="absolute -top-[22%] left-[75%] -translate-x-[50%]">
            <div className="relative h-[8.01px] w-[7.21px]">
              <Image src="/star.svg" fill objectFit="cover" alt="star" />
            </div>
          </div>

          <div className="absolute -top-[25%] left-[50%] -translate-x-[50%]">
            <div className="relative h-[29px] w-[29px]">
              <Image src="/hero2.svg" fill objectFit="cover" alt="hero1" />
            </div>
          </div>

          <p className="mt-4 text-sm font-bold text-white lg:mt-0">25%</p>
        </div>

        <div className="grid-bg-boxes left-1/2 top-[-60px] grid h-[150%] w-[90%] -translate-x-1/2 sm:hidden">
          {Array.from({ length: 200 }).map((_, i) => (
            <div className="box" key={i} />
          ))}
        </div>

        <div className="absolute right-6 top-[10%] flex animate-[bounce_4s_infinite] flex-col items-center justify-center gap-2 rounded-lg border border-[#A1A1ED66] bg-[#A1A1ED1A] px-6 pb-1 pt-2 shadow-2xl backdrop-blur-md sm:hidden">
          {/* fade out  */}
          <motion.div
            className="gradient-shadow right-1/2 top-0 h-[200%] w-[350%] lg:hidden"
            variants={fadeVariants}
            initial="fadeIn"
            animate="fadeOut"
          ></motion.div>

          {/* fade in  */}
          <motion.div
            className="gradient-shadow-orange right-1/2 top-[200%] h-[200%] w-[350%] lg:top-0 lg:hidden"
            variants={fadeVariants}
            initial="fadeOut"
            animate="fadeIn"
          ></motion.div>

          <div className="absolute -right-[4px] top-[20%] -translate-y-[50%]">
            <div className="relative h-[7.76px] w-[6.99px]">
              <Image src="/star.svg" fill objectFit="cover" alt="star" />
            </div>
          </div>

          <div className="absolute -left-3 top-3 z-10">
            <div className="relative h-[18px] w-[18px]">
              <Image src="/coin.svg" fill objectFit="cover" alt="coin1" />
            </div>
          </div>

          <div className="absolute -left-1 top-4 z-0 rotate-[80deg]">
            <div className="relative h-[18px] w-[18px]">
              <Image src="/coin.svg" fill objectFit="cover" alt="coin2" />
            </div>
          </div>

          <div className="relative h-[28px] w-[43px]">
            <Image src="/hero1.svg" fill objectFit="cover" alt="hero1" />
          </div>

          <p className="text-sm font-bold text-white">100%</p>
        </div>

        <div className="mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            className="mb-3 flex w-full items-center justify-center lg:justify-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.img
              src="/hero2.svg"
              alt="btc_token_tilted"
              className="z-10 size-[40px] rounded-full border-[2.5px] border-black lg:size-[64px]"
              variants={imageVariants}
            />

            <motion.div
              className="-ml-3 flex h-[38px] items-center text-nowrap px-4 text-xs text-[#D3D3D3] lg:-ml-2 lg:h-[41px] lg:text-base"
              variants={gradientVariants}
              style={{
                background:
                  'linear-gradient(to right, transparent, transparent)',
              }}
            >
              <motion.span variants={textVariants}>
                Introducing BTCfi strategies on troves
              </motion.span>
            </motion.div>

            <motion.div variants={textVariants}>
              <Link
                href="#"
                target="_blank"
                className="-ml-2 text-nowrap text-[10px] text-[#D3D3D3] underline lg:block lg:text-base"
              >
                Try now.
              </Link>
            </motion.div>
          </motion.div>

          <h1 className="z-20 w-fit text-balance bg-gradient-to-r from-[#9069F0] via-[white] to-[white] bg-clip-text text-[2rem] font-bold leading-9 tracking-tight text-transparent md:text-6xl lg:text-7xl">
            Starknet&#8217;s Yield Powerhouse
          </h1>

          <p className="z-20 mt-4 text-balance text-center text-xl text-[#F8F8FF] md:text-wrap lg:text-left">
            Maximise your crypto earnings by finding{' '}
            <br className="hidden lg:block" />
            the best opportunities.
          </p>

          <div
            ref={ref}
            className="keen-slider mt-16 !hidden !w-[85%] items-center !rounded-lg border border-white/20 bg-gradient-to-r from-[#372B70] to-[#4F4875] px-5 py-2 font-semibold lg:mt-[4.5rem] lg:!flex"
          >
            {tickerApys.map((tickerApy, i) => (
              <Link
                target="_blank"
                href={tickerApy.href}
                key={i}
                className={`keen-slider__slide z-10 select-all number-slide${i + 1} flex items-center text-nowrap text-sm text-white hover:underline`}
              >
                {tickerApy.token}{' '}
                {!isLoading && (tickerApy.apy * 100).toFixed(2)}
                {isLoading && (
                  <div className="mx-1 h-5 w-10 animate-pulse rounded-md bg-gradient-to-r from-[#887eb9] to-[#68628e]" />
                )}
                %
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-full mt-8 flex items-center justify-center sm:hidden">
        <Link
          href={`https://app.${getHosturl()}`}
          className="z-20 rounded-full bg-gradient-to-r from-[#6F4FF2] to-[#9069F0] px-4 py-2 text-sm font-semibold text-[#111119]"
        >
          Launch Dapp
        </Link>
      </div>

      <div className="relative col-span-full -ml-12 mb-7 mt-28 hidden sm:block lg:col-span-2 lg:ml-0 lg:mt-6">
        {/* fade out  */}
        <motion.div
          className="gradient-shadow left-[-50px] top-[-100px] h-[100%] w-[100%]"
          variants={fadeVariants}
          initial="fadeIn"
          animate="fadeOut"
        ></motion.div>

        {/* fade in  */}
        <motion.div
          className="gradient-shadow-orange -left-[18%] -top-[90%] h-[787px] w-[793px]"
          variants={fadeVariants}
          initial="fadeOut"
          animate="fadeIn"
        ></motion.div>

        <div className="grid-bg-boxes right-[-200px] top-[-60px] h-[150%] w-[100%] md:hidden lg:grid">
          {Array.from({ length: 200 }).map((_, i) => (
            <div className="box" key={i} />
          ))}
        </div>
        <div className="relative mx-auto flex h-[162px] w-full max-w-[250px] justify-center rounded-2xl bg-cyan-300 bg-gradient-to-r from-[#DDD1FA] to-[#9069F0] lg:flex lg:h-[293px] lg:max-w-none">
          <div className="absolute -top-[30%] left-4 flex animate-[bounce_4s_infinite] flex-col items-center justify-center gap-2 rounded-xl border border-[#A1A1ED66] bg-[#A1A1ED1A] px-4 py-6 shadow-2xl backdrop-blur-md lg:left-6 lg:gap-5 lg:px-7 lg:py-6 xl:left-8 xl:px-10 xl:py-12">
            <div className="absolute -left-[4px] top-[50%] -translate-y-[50%] lg:-left-[7px]">
              <div className="relative h-[7.76px] w-[6.99px] lg:h-[14px] lg:w-[12px]">
                <Image src="/star.svg" fill objectFit="cover" alt="star" />
              </div>
            </div>

            <div className="absolute -top-4 left-6 z-10 lg:-top-6">
              <div className="relative h-[30px] w-[33px] lg:h-[64px] lg:w-[70px]">
                <Image src="/coin.svg" fill objectFit="cover" alt="coin1" />
              </div>
            </div>

            <div className="absolute -top-4 left-[2.6rem] z-0 rotate-[80deg] lg:-top-5 lg:left-[3.4rem]">
              <div className="relative h-[30px] w-[33px] lg:h-[64px] lg:w-[70px]">
                <Image src="/coin.svg" fill objectFit="cover" alt="coin2" />
              </div>
            </div>

            <div className="relative h-[90px] w-[79px] lg:h-[163px] lg:w-[144px]">
              <Image src="/hero1.svg" fill objectFit="cover" alt="hero1" />
            </div>

            <p className="text-4xl font-bold text-white lg:text-6xl">100%</p>
          </div>

          <div className="absolute -right-6 -top-[10%] flex animate-[bounce_4s_infinite] flex-col items-center justify-center gap-5 rounded-xl border border-[#A1A1ED66] bg-[#A1A1ED1A] p-6 shadow-2xl backdrop-blur-md lg:-right-10 lg:p-10 xl:-right-12 xl:p-12">
            <div className="absolute -top-[18%] left-[69%] -translate-x-[50%] lg:-top-[30%] lg:left-[75%]">
              <div className="relative h-[8.01px] w-[7.21px] lg:h-[16px] lg:w-[15px]">
                <Image src="/star.svg" fill objectFit="cover" alt="star" />
              </div>
            </div>

            <div className="absolute -top-[15%] left-[50%] -translate-x-[50%] lg:-top-[38%]">
              <div className="relative h-[42px] w-[42px] lg:h-[76px] lg:w-[76px]">
                <Image src="/hero2.svg" fill objectFit="cover" alt="hero1" />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-white lg:mt-0 lg:text-4xl">
              25%
            </p>
          </div>

          <div className="absolute -bottom-12 -right-12 flex animate-[bounce_4s_infinite] flex-col items-center justify-center gap-1 rounded-xl border border-[#A1A1ED66] bg-[#A1A1ED1A] px-8 py-3 shadow-2xl backdrop-blur-md lg:-bottom-[15%] lg:-right-16 lg:gap-5 lg:px-12 lg:pb-[5.5rem] lg:pt-5 xl:-right-24 xl:px-16">
            <div className="absolute -right-[4px] top-[75%] -translate-y-[50%] lg:-right-[7px]">
              <div className="relative h-[7.76px] w-[6.99px] lg:h-[14px] lg:w-[12px]">
                <Image src="/star.svg" fill objectFit="cover" alt="star" />
              </div>
            </div>

            <div className="absolute bottom-0 left-[50%] -translate-x-[50%]">
              <div className="relative h-[43px] w-[50px] lg:h-[77px] lg:w-[91px]">
                <Image src="/coin2.svg" fill objectFit="cover" alt="coin2" />
              </div>
            </div>

            <div className="absolute -bottom-[1rem] left-[50%] -translate-x-[50%] lg:-bottom-[1.70rem] lg:hidden">
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
              className="absolute -bottom-[1.70rem] left-[50%] hidden -translate-x-[50%] lg:flex"
              alt="coin_line"
            />

            <div className="relative h-[26px] w-[26px] lg:h-[48px] lg:w-[48px]">
              <Image src="/hero3.svg" fill objectFit="cover" alt="hero3" />
            </div>

            <p className="mb-8 text-lg font-bold text-white lg:mb-0 lg:text-2xl">
              30%+
            </p>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="keen-slider mx-auto mt-12 flex !w-full items-center !rounded-lg border border-white/20 bg-gradient-to-r from-[#372B70] to-[#4F4875] px-5 py-2 font-semibold sm:mt-24 lg:!hidden"
      >
        {tickerApys.map((tickerApy, i) => (
          <Link
            target="_blank"
            href={tickerApy.href}
            key={i}
            className={`keen-slider__slide z-10 select-all number-slide${i + 1} flex items-center text-nowrap text-sm text-white hover:underline`}
          >
            {tickerApy.token} {!isLoading && (tickerApy.apy * 100).toFixed(2)}
            {isLoading && (
              <div className="mx-1 h-5 w-10 animate-pulse rounded-md bg-gradient-to-r from-[#887eb9] to-[#68628e]" />
            )}
            %
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default HeroSection;
