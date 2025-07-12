import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Updates = () => {
  return (
    <MaxWidthWrapper className="relative">
      <h5 className="mt-24 bg-gradient-to-r from-[#9069F0] to-[#9069F0] bg-clip-text text-center text-2xl font-medium text-transparent">
        Updates
      </h5>

      <div className="mt-6 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8">
        <Link
          target="_blank"
          href="https://x.com/trovesfi/status/1788558092109775029"
          className="light-purple-gradient relative z-20 w-fit cursor-pointer rounded-2xl px-8 py-6"
        >
          <Image
            src="og-farmer.svg"
            width={265}
            height={318}
            alt="og-farmer"
            className="rounded-lg bg-black"
          />
          <p className="mt-5 text-center text-white/90">OG farmer NFT launch</p>

          <div className="absolute -left-[7px] top-[25%]">
            <div className="relative h-[15px] w-[13px] lg:h-[14px] lg:w-[13px]">
              <Image src="/star.svg" fill objectFit="cover" alt="star" />
            </div>
          </div>
        </Link>

        <Link
          target="_blank"
          href="https://x.com/trovesfi/status/1787783906982260881"
          className="light-purple-gradient relative z-20 w-fit cursor-pointer rounded-2xl px-8 py-6"
        >
          <Image
            src="starknet-seed-grant.svg"
            width={265}
            height={318}
            alt="og-farmer"
            className="rounded-lg bg-black"
          />
          <p className="mt-5 text-center text-white/90">Starknet seed grant</p>

          <div className="absolute -top-2 left-[50%]">
            <div className="relative h-[15px] w-[13px] lg:h-[14px] lg:w-[13px]">
              <Image src="/star.svg" fill objectFit="cover" alt="star" />
            </div>
          </div>
        </Link>

        <Link
          target="_blank"
          href="https://x.com/trovesfi/status/1817886800318513273"
          className="light-purple-gradient relative z-20 w-fit cursor-pointer rounded-2xl px-8 py-6"
        >
          <Image
            src="yield-strategy.svg"
            width={265}
            height={318}
            alt="og-farmer"
            className="rounded-lg bg-black"
          />
          <p className="mt-5 text-center text-white/90">
            High yield strategy launch
          </p>

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
