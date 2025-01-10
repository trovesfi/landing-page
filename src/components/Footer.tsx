import Image from "next/image";
import Link from "next/link";
import React from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn, getHosturl } from "@/lib/utils";
import { Icons } from "./Icons";

const navLinks = [
  {
    category: "Product",
    links: [
      {
        label: "Launch Dapp",
        href: `https://app.${getHosturl()}`,
      },
      {
        label: "Defi Spring",
        href: "https://defispring.starknet.io/",
      },
      // {
      //   label: "Docs",
      //   href: "#",
      // },
    ],
  },
  {
    category: "Developers",
    links: [
      {
        label: "Defi Spring",
        href: "https://defispring.starknet.io/",
      },
      {
        label: "Open-source",
        href: "https://app.onlydust.com/p/strkfarm",
      },
      {
        label: "Audit",
        href: "/audit",
      },
    ],
  },
  {
    category: "General",
    links: [
      {
        label: "Branding kit",
        href: "https://drive.google.com/drive/folders/1-D6uizWgdH2XwbP0f3Fc22wQgxhr_RUY?usp=sharing",
      },
      {
        label: "Status page",
        href: `https://status.${getHosturl()}`,
      },
    ],
  },
  {
    category: "Community",
    links: [
      {
        label: "Telegram",
        href: "/tg",
      },
      {
        label: "Twitter",
        href: "https://twitter.com/strkfarm",
      },
      {
        label: "Github",
        href: "https://github.com/strkfarm/",
      },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="z-20 mt-24 lg:mt-[15.5rem] bg-black">
      <MaxWidthWrapper>
        <div className="gap-3 space-y-12 py-6 md:flex md:justify-between md:space-y-0 lg:py-8">
          <Image width={246} height={58} alt="logo" src="/full-logo.svg" className="my-8 lg:mt-0 mx-auto sm:mr-auto sm:ml-0" />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-16 pl-[16%] sm:pl-0">
            {navLinks.map((navLink, i) => (
              <div key={i}>
                <h2 className="mb-7 text-sm font-semibold">
                  {navLink.category}
                </h2>
                <ul className="text-sm text-gray-400">
                  {navLink.links.map((link) => (
                    <li className="mb-4" key={link.label}>
                      <Link target="_blank" href={link.href} className="hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>

      <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

      <MaxWidthWrapper>
        <div className="pb-8 sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-col-reverse items-center gap-7 md:flex-row">
            <p className="text-sm text-gray-500 text-center dark:text-gray-400">
              &copy; 2024 STRKFarm. All right reserved.
            </p>
            {/* <div className="flex flex-col items-center gap-7 md:flex-row">
              <p className="cursor-pointer text-sm text-gray-500 hover:underline sm:text-center dark:text-gray-400">
                Privacy Policy
              </p>
              <p className="cursor-pointer text-sm text-gray-500 hover:underline sm:text-center dark:text-gray-400">
                Terms of Service
              </p>
              <p className="cursor-pointer text-sm text-gray-500 hover:underline sm:text-center dark:text-gray-400">
                Cookies Settings
              </p>
            </div> */}
          </div>

          <Link target="_blank" href={`https://assets.${getHosturl()}/tnc.pdf`} className="text-sm text-gray-500 dark:text-gray-400 hover:underline mt-6 flex items-center justify-center md:hidden">
            Terms and Conditions
          </Link>

          <div className="mt-6 flex items-center justify-center gap-4 sm:mt-0">
            <Link target="_blank" href={`https://assets.${getHosturl()}/tnc.pdf`} className="text-sm text-gray-500 dark:text-gray-400 hover:underline hidden md:block">
              Terms and Conditions
            </Link>

            <Link target="_blank" href="https://discord.gg/JA8UnuaZSw">
              <Icons.discord />
              <span className="sr-only">Discord</span>
            </Link>

            <Link target="_blank" href="/tg">
              <Icons.tg />
              <span className="sr-only">Telegram</span>
            </Link>

            <Link target="_blank" href="https://twitter.com/strkfarm">
              <Icons.x />
              <span className="sr-only">X/Twitter</span>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
