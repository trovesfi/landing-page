import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getHosturl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WhyUs: React.FC = () => {
  return (
    <MaxWidthWrapper>
      <h5 className="mb-8 mt-28 bg-gradient-to-r from-[#B0F6FF] to-[#61FCAE] bg-clip-text text-center text-2xl font-medium text-transparent">
        Why us?
      </h5>

      <div className="flex w-full grid-cols-2 flex-col items-center gap-10 lg:grid">
        <div className="col-span-1 h-full w-full rounded-xl bg-gradient-to-r from-[#2F245A] to-[#295846] p-0.5">
          <div className="flex h-full w-full flex-col items-center gap-7 rounded-xl bg-gradient-to-r from-[#171626] to-[#171E23] p-7 shadow-xl md:flex-row">
            <Image
              src="/why1.svg"
              width={169}
              height={236}
              alt="why1"
              className="rounded-md"
            />
            <p className="text-center text-2xl text-white/80 md:text-start">
              Discover the top <br className="hidden" /> yield opportunities on{" "}
              <br className="hidden lg:block" /> Starknet
            </p>
          </div>
        </div>

        <div className="col-span-1 h-full w-full rounded-xl bg-gradient-to-r from-[#295846] to-[#2F245A] p-0.5">
          <div className="flex h-full w-full flex-col items-center gap-7 rounded-xl bg-gradient-to-r from-[#171E23] to-[#171626] p-7 shadow-xl md:flex-row">
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
      </div>

      <div className="mt-10 flex w-full grid-cols-2 flex-col items-center gap-10 lg:grid">
        <div className="col-span-1 h-full w-full rounded-xl bg-gradient-to-r from-[#2F245A] to-[#295846] p-0.5">
          <div className="flex h-full w-full flex-col items-center gap-7 rounded-xl bg-gradient-to-r from-[#171626] to-[#171E23] p-7 shadow-xl md:flex-row">
            <Image
              src="/why3.svg"
              width={169}
              height={236}
              alt="why1"
              className="rounded-md"
            />
            <p className="text-center text-2xl text-white/80 md:text-start">
              Benefit from custom{" "}
              <br className="hidden lg:block" />
              strategies and
              <br className="hidden lg:block" />{" "}
              managed market risk
            </p>
          </div>
        </div>

        <div className="col-span-1 h-full w-full rounded-xl bg-gradient-to-r from-[#295846] to-[#2F245A] p-0.5">
          <div className="flex h-full w-full flex-col items-center gap-7 rounded-xl bg-gradient-to-r from-[#171E23] to-[#171626] p-7 shadow-xl md:flex-row">
            <Image
              src="/why4.svg"
              width={169}
              height={236}
              alt="why1"
              className="rounded-md"
            />
            <p className="text-center text-2xl text-white/80 md:text-start">
              Designed for crypto{" "}
              <br className="hidden lg:block" />
              beginners, DeFi
              <br className="hidden lg:block" />{" "}
              devotees, and Dapp <br className="hidden lg:block" />
              treasuries.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 lg:mt-32 flex flex-col items-center gap-5">
        <p className="text-center text-sm lg:text-2xl text-[#8484C3]">
          Don&apos;t miss out on this DeFi spring; <br className="hidden lg:block" />
          investing wisely would be the smartest move you&apos;ll make!
        </p>
        <Link
          href={`https://app.${getHosturl()}`}
          className="rounded-full bg-gradient-to-r from-[#6F4FF2] to-[#61FCAE] px-4 py-2 text-sm font-bold text-[#111119]"
        >
          Launch Dapp
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default WhyUs;
