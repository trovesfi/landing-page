'use client'

import Image from "next/image";
import Link from "next/link";
import React from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Stats from "./Stats";

const Partners: React.FC = () => {
  return (
    <MaxWidthWrapper className="relative">
      <h5 className="bg-gradient-to-r from-[#9069F0] to-[#C5A6FF] bg-clip-text text-center text-2xl font-medium text-transparent">
        Partners & Backed by
      </h5>

      <div className="w-[793px] h-[787px] absolute -left-[25%] top-[15%] rounded-full bg-gradient-to-r from-[#61FCAE1A] to-[#1111191A] blur-3xl -z-50" />


      <div className="mx-auto mt-6 flex w-full max-w-[50rem] flex-wrap items-center justify-center lg:gap-x-32 gap-x-7 gap-y-5">
        <Link href='https://www.starknet.io/' className="relative w-[152px] h-[34px] lg:w-[165px] lg:h-[44px]">
          <Image src="/starknet.svg" alt="starknet" fill objectFit="contain" />
        </Link>
        <Link href='https://endur.fi/' className="relative w-[190px] lg:w-[190px] h-[45px]">
          <Image src="/endur.svg" alt="Endur" fill objectFit="contain" />
        </Link>
        <Link href='https://vesu.xyz/' className="relative w-[140px] lg:w-[95px] h-[24px] lg:h-[34px]">
          <Image src="/vesu.png" alt="Vesu" fill objectFit="contain" />
        </Link>
        <Link href='https://nostra.finance/' className="relative w-[152px] h-[34px] lg:w-[165px] lg:h-[44px]">
          <Image src="/nostra.svg" alt="zklend" fill objectFit="contain" />
        </Link>
        <Link href='https://www.pragma.build/' className="relative w-[152px] h-[34px] lg:w-[165px] lg:h-[44px]">
          <Image src="/pragma.svg" alt="zklend" fill objectFit="contain" />
        </Link>
      </div>

      <Stats />
    </MaxWidthWrapper>
  );
};

export default Partners;
