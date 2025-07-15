import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { getHosturl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const WhyUs: React.FC = () => {
  return (
    <MaxWidthWrapper>
      <h5 className="mb-12 mt-28 bg-gradient-to-r from-[#DDD1FA] to-[#9069F0] bg-clip-text text-center text-2xl font-medium text-transparent">
        Why us?
      </h5>

      <div className="relative flex w-full grid-cols-2 flex-col items-center gap-10 lg:grid">
        <div className="gradient-shadow bottom-[-600px] right-[-400px] h-[100%] w-[30%]"></div>

        <div className="light-purple-gradient flex h-full w-full flex-col items-center gap-7 rounded-xl p-7 shadow-xl md:flex-row">
          <Image
            src="/why1.svg"
            width={169}
            height={236}
            alt="why1"
            className="rounded-md"
          />
          <p className="text-center text-2xl text-white/80 md:text-start">
            Discover the top <br className="hidden" /> yield opportunities on{' '}
            <br className="hidden lg:block" /> Starknet
          </p>
        </div>

        <div className="light-purple-gradient flex h-full w-full flex-col items-center gap-7 rounded-xl p-7 shadow-xl md:flex-row">
          <Image
            src="/why2.svg"
            width={169}
            height={236}
            alt="why1"
            className="rounded-md"
          />
          <p className="text-center text-2xl text-white/80 md:text-start">
            Maximise returns with <br className="hidden lg:block" /> automated
            yield vaults
          </p>
        </div>
      </div>

      <div className="mt-10 flex w-full grid-cols-2 flex-col items-center gap-10 lg:grid">
        <div className="light-purple-gradient flex h-full w-full flex-col items-center gap-7 rounded-xl p-7 shadow-xl md:flex-row">
          <Image
            src="/why3.svg"
            width={169}
            height={236}
            alt="why1"
            className="rounded-md"
          />
          <p className="text-center text-2xl text-white/80 md:text-start">
            Benefit from custom <br className="hidden lg:block" />
            strategies and
            <br className="hidden lg:block" /> managed market risk
          </p>
        </div>

        <div className="light-purple-gradient flex h-full w-full flex-col items-center gap-7 rounded-xl p-7 shadow-xl md:flex-row">
          <Image
            src="/why4.svg"
            width={169}
            height={236}
            alt="why1"
            className="rounded-md"
          />
          <p className="text-center text-2xl text-white/80 md:text-start">
            Designed for crypto <br className="hidden lg:block" />
            beginners, DeFi
            <br className="hidden lg:block" /> devotees, and Dapp{' '}
            <br className="hidden lg:block" />
            treasuries.
          </p>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-5 lg:mt-32">
        <p className="text-center text-sm text-[#D3D3D3] lg:text-2xl">
          Don&apos;t miss out on this DeFi spring;{' '}
          <br className="hidden lg:block" />
          investing wisely would be the smartest move you&apos;ll make!
        </p>
        <Link
          href={`https://app.${getHosturl()}`}
          className="rounded-full bg-[#9069F0] px-4 py-2 text-sm font-bold text-[#111119]"
        >
          Launch Dapp
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default WhyUs;
