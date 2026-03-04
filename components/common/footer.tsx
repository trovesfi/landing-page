import React from "react";

import Image from "next/image";
import Link from "next/link";

import FullLogo from "@/components/common/full-logo";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import { SOCIALS } from "@/constants";
import { FOOTER_LINKS } from "@/constants/links";

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About us", href: FOOTER_LINKS.COMPANY.ABOUT },
      { label: "Careers", href: FOOTER_LINKS.COMPANY.CAREERS },
      { label: "Blogs", href: FOOTER_LINKS.COMPANY.BLOGS },
      { label: "Press", href: FOOTER_LINKS.COMPANY.PRESS },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: FOOTER_LINKS.RESOURCES.DOCUMENTATION },
      { label: "Research", href: FOOTER_LINKS.RESOURCES.RESEARCH },
      { label: "Github", href: FOOTER_LINKS.RESOURCES.GITHUB },
      { label: "Brand Kit", href: FOOTER_LINKS.RESOURCES.BRAND_KIT },
    ],
  },
  {
    title: "Info",
    links: [
      { label: "Privacy Policy", href: FOOTER_LINKS.INFO.PRIVACY_POLICY },
      { label: "Terms of Use", href: FOOTER_LINKS.INFO.TERMS_OF_USE },
      { label: "License", href: FOOTER_LINKS.INFO.LICENSE },
      { label: "Become a Curator", href: FOOTER_LINKS.INFO.BECOME_CURATOR },
    ],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-app-footer-border bg-app-section-solid w-full border-t py-10">
      <MaxWidthWrapper className="w-[min(90rem,100%-2rem)]">
        <div className="grid-cols-10 items-start justify-between gap-32 xl:grid">
          <div className="col-span-2 flex flex-col items-center gap-4 xl:items-start">
            <FullLogo />
            <p className="text-app-footer-text text-center text-sm xl:text-start">
              Discover Starknet&apos;s automated DeFi vaults and yield
              strategies. Built to compound.
            </p>
            <p className="text-app-footer-text text-sm">
              Copyright © <br className="hidden xl:block" /> Troves {currentYear}{" "}
              · Built by Unwrap Labs
            </p>
          </div>

          {footerSections.map((section) => (
            <nav
              key={section.title}
              aria-label={section.title}
              className="col-span-2 mt-10 flex flex-col items-center gap-4 xl:mt-0 xl:items-start"
            >
              <h2 className="text-app-footer-heading text-lg font-semibold">
                {section.title}
              </h2>
              <ul className="flex flex-col items-center gap-2 xl:items-start">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group"
                      aria-label={`${link.label} - ${section.title}`}
                    >
                      <p className="text-app-footer-text group-hover:text-app-text-primary text-sm font-medium transition-colors">
                        {link.label}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 mt-10 flex flex-col items-center gap-3 xl:mt-0 xl:items-start">
            <h2 className="text-app-footer-heading text-sm font-medium">
              Follow Us
            </h2>
            <nav
              aria-label="Social media links"
              className="flex items-center gap-3"
            >
              {SOCIALS.filter((social) => social.name !== "GitHub").map(
                (social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <Image
                      src={social.icon}
                      className="transition-all group-hover:opacity-70"
                      alt={social.alt}
                      width={32}
                      height={32}
                      loading="lazy"
                    />
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
