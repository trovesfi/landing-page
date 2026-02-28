"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

import FullLogo from "@/components/common/full-logo";
import MobileMenuLink from "@/components/ui/mobile-menu-link";

import { Button } from "@/components/ui/button";
import { NAV_ITEMS, SOCIALS } from "@/constants";
import { APP_ROUTES, ANCHOR_LINKS } from "@/constants/links";

// Get Telegram social from centralized SOCIALS
const TELEGRAM_SOCIAL = SOCIALS.find((s) => s.name === "Telegram") ?? {
  label: "Telegram",
  name: "Telegram",
  href: SOCIALS[2]?.href ?? "#",
  icon: SOCIALS[2]?.icon ?? "/icons/tg.svg",
  alt: SOCIALS[2]?.alt ?? "Telegram icon",
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="flex justify-center pt-4 lg:pt-[24px]">
        <motion.header
          initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="border-app-border from-app-navbar-bg-start to-app-navbar-bg-end flex w-[95%] flex-col overflow-hidden rounded-3xl border bg-linear-to-b px-6 shadow-md lg:h-16 lg:w-[97%] lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Top bar: logo + menu button (mobile) or full nav (desktop) - same structure as original */}
          <div className="flex h-16 min-h-16 shrink-0 items-center justify-between lg:contents">
            <Link
              href={ANCHOR_LINKS.HERO}
              aria-label="Troves homepage"
              className="shrink-0"
            >
              <FullLogo className="shrink-0" />
            </Link>

            <motion.button
              onClick={toggleMenu}
              className="flex items-center justify-center lg:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence initial={false} mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="text-app-mobile-menu-icon h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="text-app-mobile-menu-icon h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <nav aria-label="Main navigation" className="hidden lg:block">
              <ul className="ml-24 flex items-center gap-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Button variant="ghostFaded" asChild>
                      <Link
                        href={item.href}
                        aria-label={`Navigate to ${item.label}`}
                        target={item.isExternal ? "_blank" : "_self"}
                      >
                        {item.label}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden items-center gap-2.5 lg:flex">
              <Link
                href={TELEGRAM_SOCIAL.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-app-border-dark bg-app-social-bg hover:bg-app-card-bg flex size-9 items-center justify-center rounded-full border transition-colors"
                aria-label={`Join us on ${TELEGRAM_SOCIAL.label}`}
              >
                <Image
                  src={TELEGRAM_SOCIAL.icon}
                  alt={TELEGRAM_SOCIAL.alt}
                  width={17}
                  height={17}
                  className="mt-0.5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href={APP_ROUTES.LAUNCH_DAPP}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Launch Troves Dapp"
              >
                <Button
                  variant="primary"
                  className="h-9 px-7 btn-glow-shimmer"
                  aria-label="Launch Troves Dapp"
                >
                  Launch Dapp
                </Button>
              </Link>
            </div>
          </div>

          {/* Expandable mobile menu - part of navbar */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="border-app-mobile-menu-border overflow-hidden border-t lg:hidden"
              >
                <div className="flex w-full flex-col items-start space-y-2 pb-5 pt-2">
                  {NAV_ITEMS.map((item, index) => (
                    <MobileMenuLink
                      key={item.href}
                      href={item.href}
                      target={item.isExternal ? "_blank" : "_self"}
                      label={item.label}
                      onClick={() => setIsMenuOpen(false)}
                      index={index}
                    />
                  ))}
                  <MobileMenuLink
                    href={TELEGRAM_SOCIAL.href}
                    target="_blank"
                    label={TELEGRAM_SOCIAL.label}
                    icon={{
                      src: TELEGRAM_SOCIAL.icon,
                      alt: TELEGRAM_SOCIAL.alt,
                    }}
                    onClick={() => setIsMenuOpen(false)}
                    index={NAV_ITEMS.length}
                  />
                  <Link
                    href={APP_ROUTES.LAUNCH_DAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="primary"
                      className="mt-4 h-9 w-full px-7 btn-glow-shimmer"
                      aria-label="Launch Troves Dapp"
                    >
                      Launch Dapp
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </div>
    </div>
  );
};

export default Navbar;
