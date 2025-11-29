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
    <motion.header
      initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-app-border from-app-navbar-bg-start to-app-navbar-bg-end sticky top-4 z-50 mx-auto flex h-16 w-[95%] items-center justify-between rounded-3xl border bg-linear-to-b px-6 shadow-md lg:top-10 lg:w-[97%]"
    >
      <Link
        href={ANCHOR_LINKS.HERO}
        aria-label="Troves homepage"
        className="shrink-0"
      >
        <FullLogo className="shrink-0" />
      </Link>

      <motion.button
        onClick={toggleMenu}
        className="z-50 flex items-center justify-center lg:hidden"
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none fixed inset-0 z-0 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-transparent"
              onClick={() => setIsMenuOpen(false)}
              style={{ pointerEvents: "auto" }}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", duration: 0.3 }}
              className="border-app-mobile-menu-border bg-app-mobile-menu-overlay pointer-events-auto absolute top-0 right-0 left-0 flex w-full flex-col border-b p-6 pt-20 pb-5 backdrop-blur-md"
            >
              <div className="flex w-full flex-col items-start space-y-2">
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
                    className="mt-4 h-9 w-full px-7"
                    aria-label="Launch Troves Dapp"
                  >
                    Launch Dapp
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            className="h-9 px-7"
            aria-label="Launch Troves Dapp"
          >
            Launch Dapp
          </Button>
        </Link>
      </div>
    </motion.header>
  );
};

export default Navbar;
