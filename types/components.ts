/**
 * Component prop type definitions
 * All component prop interfaces should be defined here for reusability
 */

import type React from "react";
import type { Strategy } from "./api";

// Common shared types
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

// Animation & UI Component Props
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
}

// Card Component Props
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
  className?: string;
  delay?: number;
}

export interface StatBadgeProps {
  label: string;
  value: string;
  unit?: string;
  className?: string;
}

// Button & Interactive Component Props
export interface TokenButtonProps {
  token: string;
  icon: string;
  alt: string;
  className?: string;
  iconClassName?: string;
  isActive?: boolean;
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

// Layout Component Props
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
  alt: string;
  className?: string;
  delay?: number;
}

// Animation Component Props
export interface VaultDot {
  id: string;
  position: {
    xPercent: number;
    yPercent: number;
  };
  size: number;
  token: TokenInfo;
  vault: {
    name: string;
    apy: number;
    tvl?: number;
    curator?: string;
  };
}

export interface HowItWorksAnimationProps {
  className?: string;
  title?: string;
  tokens?: TokenInfo[];
  vaults?: Pick<Strategy, "name" | "apy" | "tvlUsd" | "curator">[];
}

// Provider Props
export interface ProvidersProps {
  children: React.ReactNode;
}
