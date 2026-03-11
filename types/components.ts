import type React from "react";

import type { Strategy } from "./api";

// common shared types
export interface ImageInfo {
  src: string;
  alt: string;
}

export interface TokenInfo extends ImageInfo {
  token: string;
  icon: string;
}

export interface CuratorInfo {
  name: string;
  logo?: string;
}

export interface StatInfo {
  label: string;
  value: string;
}

// animation & ui component props
export interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  as?: "div" | "section" | "article" | "span" | "header" | "footer" | "li";
  once?: boolean;
}

export interface InteractiveNebulaShaderProps {
  hasActiveReminders?: boolean;
  hasUpcomingReminders?: boolean;
  disableCenterDimming?: boolean;
  className?: string;
  interactive?: boolean;
  /** When true, fills the parent container instead of the viewport */
  contained?: boolean;
  /** Scale of the nebula (default 1). Higher values make it appear smaller. */
  scale?: number;
}

// card component props
export interface VaultCardProps {
  tokens: ImageInfo[];
  pairName: string;
  curator: CuratorInfo;
  description: React.ReactNode;
  riskLabel?: string;
  stats: StatInfo[];
  ctaLabel?: string;
  ctaIcon?: React.ReactNode;
  className?: string;
  ctaLink?: string;
}

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating?: number;
  avatar?: string;
  className?: string;
}

export interface FeatureCardProps {
  icon: string;
  iconAlt: string;
  iconWidth?: number;
  iconHeight?: number;
  title: string;
  description: React.ReactNode;
  className?: string;
  imageClassName?: string;
}

export interface StatCardProps {
  value: string | number;
  label: string;
  size?: "large" | "default";
  className?: string;
  delay?: number;
}

export interface StatBadgeProps {
  label: string;
  value: string;
  unit?: string;
  className?: string;
}

// button & interactive component props
export interface TokenButtonProps {
  token: string;
  icon: string;
  alt: string;
  className?: string;
  iconClassName?: string;
  isActive?: boolean;
  showToken?: boolean;
  onClick?: () => void;
}

export interface MobileMenuLinkProps {
  href: string;
  label: string;
  target: string;
  icon?: ImageInfo;
  onClick: () => void;
  index?: number;
}

// layout component props
export interface MainHeadingProps {
  title: string;
  description?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

export interface HeadingTagProps {
  text: string;
  icon?: string;
  text2?: string;
  delay?: number;
}

export interface FullLogoProps {
  className?: string;
}

export interface MaxWidthWrapperProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface PlatformCardProps {
  logo: string;
  name: string;
  href?: string;
  alt: string;
  className?: string;
  delay?: number;
}

// animation component props
export interface VaultDot {
  id: string;
  position: {
    /** Radius in px from ring center */
    radiusPx: number;
    /** Angle in degrees: 0=right, 90=down, 180=left, 270=top */
    angleDeg: number;
    /** Ring index (0=inner, 3=outer) for wrapper placement */
    ringIndex: number;
  };
  size: number;
  token: TokenInfo;
  vault: {
    name: string;
    apy: number | string;
    tvl?: number;
    curator?: string;
  };
}

export interface HowItWorksAnimationProps {
  className?: string;
  title?: string;
  tokens?: TokenInfo[];
  vaults?: Pick<Strategy, "name" | "apy" | "tvlUsd" | "curator" | "depositToken">[];
}

// provider props
export interface ProvidersProps {
  children: React.ReactNode;
}
