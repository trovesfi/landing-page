export const INTEGRATIONS = [
  { logo: "/logos/dapps/endur.svg", name: "Endur", alt: "Endur logo" },
  { logo: "/logos/dapps/vesu.svg", name: "Vesu", alt: "Vesu logo" },
  { logo: "/logos/dapps/ekubo.svg", name: "Ekubo", alt: "Ekubo logo" },
  {
    logo: "/logos/dapps/extended.svg",
    name: "Extended",
    alt: "Extended logo",
  },
];

export const PARTNERS = [
  { logo: "/tokens/strk.svg", name: "Starknet", alt: "STRK logo" },
  { logo: "/logos/dapps/re7.svg", name: "RE7 Labs", alt: "RE7 Labs logo" },
  { logo: "/logos/dapps/endur.svg", name: "Endur", alt: "Endur logo" },
  {
    logo: "/logos/dapps/vesu.svg",
    name: "Vesu",
    alt: "Vesu logo",
  },
];

import { APP_ROUTES, ANCHOR_LINKS, DOCS_ROUTES } from "./links";

export const NAV_ITEMS = [
  { label: "Home", href: ANCHOR_LINKS.HERO, isActive: true, isExternal: false },
  {
    label: "Strategies",
    href: APP_ROUTES.STRATEGIES,
    isExternal: true,
  },
  { label: "Docs", href: DOCS_ROUTES.HOME, isExternal: true },
];

export interface SocialLink {
  label: string;
  name: string;
  href: string;
  icon: string;
  alt: string;
}

export const SOCIALS: SocialLink[] = [
  {
    label: "X (Twitter)",
    name: "X",
    href: "https://x.com/trovesfi",
    icon: "/icons/x.svg",
    alt: "X (Twitter) icon",
  },
  {
    label: "Discord",
    name: "Discord",
    href: "https://discord.com/invite/RSkDDyfC4Gi",
    icon: "/icons/discord.svg",
    alt: "Discord icon",
  },
  {
    label: "Telegram",
    name: "Telegram",
    href: "https://t.me/%2BiWxPIzKAaswyMWQ1",
    icon: "/icons/tg.svg",
    alt: "Telegram icon",
  },
  {
    label: "GitHub",
    name: "GitHub",
    href: "https://github.com/trovesfi",
    icon: "/icons/github.svg",
    alt: "GitHub icon",
  },
];

export const SOCIAL_URLS = SOCIALS.map((social) => social.href);
