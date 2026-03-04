export const INTEGRATIONS = [
  {
    logo: "/logos/dapps/endur.svg",
    name: "Endur",
    alt: "Endur logo",
    href: "https://endur.fi/",
  },
  {
    logo: "/logos/dapps/vesu.svg",
    name: "Vesu",
    alt: "Vesu logo",
    href: "https://vesu.xyz/",
  },
  {
    logo: "/logos/dapps/ekubo.svg",
    name: "Ekubo",
    alt: "Ekubo logo",
    href: "https://ekubo.org/",
  },
  {
    logo: "/logos/dapps/extended.svg",
    name: "Extended",
    alt: "Extended logo",
    href: "https://extended.exchange/",
  },
];

export const PARTNERS = [
  {
    logo: "/tokens/strk.svg",
    name: "Starknet",
    alt: "— Ethereum ZK-rollup Layer 2",
  },
  {
    logo: "/logos/dapps/re7.svg",
    name: "RE7 Labs",
    alt: "— institutional DeFi strategy curation",
  },
  {
    logo: "/logos/dapps/endur.svg",
    name: "Endur",
    alt: "— Starknet liquid staking protocol",
  },
  {
    logo: "/logos/dapps/vesu.svg",
    name: "Vesu",
    alt: "— Starknet lending protocol",
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
