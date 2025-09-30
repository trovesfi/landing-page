'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Stats from './Stats';

const Partners: React.FC = () => {
  return (
    <MaxWidthWrapper className="relative">
      <h5 className="bg-gradient-to-r from-[#DDD1FA] to-[#9069F0] bg-clip-text text-center text-2xl font-medium text-transparent">
        Partners & Backed by
      </h5>

      <div className="absolute -left-[25%] top-[15%] -z-50 h-[787px] w-[793px] rounded-full bg-black blur-3xl" />

      <div className="mx-auto mt-12 flex w-full max-w-[50rem] flex-wrap items-center justify-center gap-x-7 gap-y-5 lg:gap-x-32">
        <Link
          href="https://www.starknet.io/"
          className="relative h-[34px] w-[152px] lg:h-[44px] lg:w-[165px]"
          target="_blank"
        >
          <Image src="/starknet.svg" alt="starknet" fill objectFit="contain" />
        </Link>
        <Link
          href="https://endur.fi/"
          className="relative h-[45px] w-[190px] lg:w-[190px]"
          target="_blank"
        >
          <Image src="/endur.svg" alt="Endur" fill objectFit="contain" />
        </Link>
        <Link
          href="https://vesu.xyz/"
          className="relative h-[24px] w-[140px] lg:h-[34px] lg:w-[95px]"
          target="_blank"
        >
          <Image src="/vesu.png" alt="Vesu" fill objectFit="contain" />
        </Link>
        <Link
          href="https://re7.capital/"
          className="relative h-[24px] w-[190px] lg:h-[34px] lg:w-[190px]"
          target="_blank"
        >
          <Image src="/re7.svg" alt="re7" fill objectFit="contain" />
        </Link>
        <Link
          href="https://nostra.finance/"
          className="relative h-[34px] w-[152px] lg:h-[44px] lg:w-[165px]"
          target="_blank"
        >
          <Image src="/nostra.svg" alt="zklend" fill objectFit="contain" />
        </Link>
        <Link
          href="https://www.pragma.build/"
          className="relative h-[34px] w-[152px] lg:h-[44px] lg:w-[165px]"
          target="_blank"
        >
          <Image src="/pragma.svg" alt="zklend" fill objectFit="contain" />
        </Link>
      </div>

      <div className="gradient-shadow left-[-250px] top-[200px] h-[50%] w-[70%] lg:hidden"></div>
      <Stats />
    </MaxWidthWrapper>
  );
};

export default Partners;
