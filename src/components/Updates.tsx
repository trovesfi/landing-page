'use client';

import Image from 'next/image';

import Link from 'next/link';
import React from 'react';
import { motion } from 'motion/react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { fadeVariants } from '@/constants';

const Updates = () => {
  return (
    <MaxWidthWrapper className="relative">
      <h5 className="mt-24 bg-gradient-to-r from-[#DDD1FA] to-[#9069F0] bg-clip-text text-center text-2xl font-medium text-transparent">
        Updates
      </h5>

      <div className="grid-bg-boxes left-[-50px] top-[120px] hidden lg:grid">
        {Array.from({ length: 100 }).map((_, i) => (
          <div className="box" key={i} />
        ))}
      </div>

      <div className="grid-bg-boxes right-[-100px] top-[250px] hidden lg:grid">
        {Array.from({ length: 80 }).map((_, i) => (
          <div className="box" key={i} />
        ))}
      </div>

      {/* fade out  */}
      <motion.div
        className="gradient-shadow absolute left-[-200px] top-[50px] hidden h-[40%] w-[30%] lg:block"
        variants={fadeVariants}
        initial="fadeIn"
        animate="fadeOut"
      ></motion.div>

      <motion.div
        className="gradient-shadow absolute right-[-200px] top-[900px] h-[40%] w-[40%] lg:hidden"
        variants={fadeVariants}
        initial="fadeIn"
        animate="fadeOut"
      ></motion.div>

      {/* fade in  */}
      <motion.div
        className="gradient-shadow-orange absolute left-[-200px] top-[50px] hidden h-[40%] w-[30%] lg:block"
        variants={fadeVariants}
        initial="fadeOut"
        animate="fadeIn"
      ></motion.div>

      <motion.div
        className="gradient-shadow-orange absolute right-[-200px] top-[900px] h-[40%] w-[40%] lg:hidden"
        variants={fadeVariants}
        initial="fadeOut"
        animate="fadeIn"
      ></motion.div>

      <div className="mt-12 flex w-full flex-col items-center justify-center gap-6 md:flex-row md:gap-8">
        <Link
          target="_blank"
          href="https://x.com/trovesfi/status/1913230041267556386"
          className="light-purple-gradient relative z-20 w-full cursor-pointer rounded-2xl px-8 py-6"
        >
          <Image
            src="ekubo-xstrk-strk.svg"
            width={320}
            height={300}
            alt="og-farmer"
            className="ml-auto mr-auto rounded-lg"
          />
          <p className="mt-5 text-center text-lg text-white/90">
            Leveraged liquid staking
          </p>
          <p className="text-center text-lg text-white/90">on Endur</p>

          <div className="absolute -left-[7px] top-[25%]">
            <div className="relative h-[15px] w-[13px] lg:h-[14px] lg:w-[13px]">
              <Image src="/star.svg" fill objectFit="cover" alt="star" />
            </div>
          </div>
        </Link>

        <Link
          target="_blank"
          href="https://x.com/trovesfi/status/1905576309709046025"
          className="light-purple-gradient relative z-20 w-full cursor-pointer rounded-2xl px-8 py-6"
        >
          <Image
            src="vesu.svg"
            width={320}
            height={300}
            alt="og-farmer"
            className="ml-auto mr-auto rounded-lg bg-black"
          />
          <p className="mt-5 text-center text-lg text-white/90">
            Liquid staking
          </p>
          <p className="text-center text-lg text-white/90">Ekubo vaults</p>

          <div className="absolute -top-2 left-[50%]">
            <div className="relative h-[15px] w-[13px] lg:h-[14px] lg:w-[13px]">
              <Image src="/star.svg" fill objectFit="cover" alt="star" />
            </div>
          </div>
        </Link>

        <Link
          target="_blank"
          href="https://x.com/trovesfi/status/1817886800318513273"
          className="light-purple-gradient pointer-events-none relative z-20 w-full cursor-pointer select-none rounded-2xl px-8 py-6"
          tabIndex={-1}
          aria-disabled="true"
        >
          <Image
            src="re7-banner.svg"
            width={320}
            height={300}
            alt="og-farmer"
            className="ml-auto mr-auto rounded-lg bg-black"
          />
          <p className="mt-5 text-center text-lg text-white/90">
            Curated strategies
          </p>
          <p className="text-center text-lg text-white/90">by RE7</p>

          <div className="absolute -right-[7px] bottom-[25%]">
            <div className="relative h-[15px] w-[13px] lg:h-[14px] lg:w-[13px]">
              <Image src="/star.svg" fill objectFit="cover" alt="star" />
            </div>
          </div>
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default Updates;
