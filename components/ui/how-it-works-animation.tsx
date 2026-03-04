"use client";

import Image from "next/image";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

import TokenButton from "@/components/ui/token-button";
import { cn } from "@/lib/utils";
import type {
  HowItWorksAnimationProps,
  TokenInfo,
  VaultDot,
  MinimalVault,
} from "@/types";

const DEFAULT_TOKENS: TokenInfo[] = [
  {
    src: "/tokens/strk-outline.svg",
    token: "STRK",
    icon: "/tokens/strk-outline.svg",
    alt: "STRK",
  },
  { src: "/tokens/btc.svg", token: "BTC", icon: "/tokens/btc.svg", alt: "BTC" },
  {
    src: "/tokens/eth-black.svg",
    token: "ETH",
    icon: "/tokens/eth-black.svg",
    alt: "ETH",
  },
  {
    src: "/tokens/usdc.svg",
    token: "USDC",
    icon: "/tokens/usdc.svg",
    alt: "USDC",
  },
  {
    src: "/tokens/usdt.svg",
    token: "USDT",
    icon: "/tokens/usdt.svg",
    alt: "USDT",
  },
];

const FALLBACK_VAULTS: MinimalVault[] = DEFAULT_TOKENS.map((token, index) => ({
  name: `${token.token} Vault`,
  apy: 0.22 - index * 0.02,
  tvlUsd: 1_200_000 + index * 125_000,
  curator: { name: "Troves" },
}));

const HowItWorksAnimation = ({
  className,
  title,
  tokens = [],
  vaults = [],
}: HowItWorksAnimationProps) => {
  const resolvedTokens = tokens.length > 0 ? tokens : DEFAULT_TOKENS;
  const resolvedVaults = vaults.length > 0 ? vaults : FALLBACK_VAULTS;
  const [activeDotId, setActiveDotId] = React.useState<string | null>(null);
  const hideTooltipTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const activeDotRef = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [tooltipPlacement, setTooltipPlacement] = React.useState<{
    dot: VaultDot;
    left: number;
    top: number;
    isLeftOfCenter: boolean;
    isUpperHalf: boolean;
  } | null>(null);

  const [isDesktop, setIsDesktop] = React.useState(true);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Ring radii (half of circle sizes): mobile / desktop
  const RING_RADII = [
    [49, 73.5],
    [69, 103.5],
    [90, 135],
    [116, 174],
  ] as const;

  // Ring wrapper classes - must match circle divs exactly (position + size)
  const RING_WRAPPER_CLASSES = [
    "absolute -bottom-[50px] left-1/2 size-[98px] -translate-x-1/2 md:-bottom-[75px] md:size-[147px]",
    "absolute -bottom-[65px] left-1/2 size-[138px] -translate-x-1/2 md:-bottom-[100px] md:size-[207px]",
    "absolute -bottom-[80px] left-1/2 size-[180px] -translate-x-1/2 md:-bottom-[120px] md:size-[270px]",
    "absolute -bottom-[105px] left-1/2 size-[232px] -translate-x-1/2 md:-bottom-[160px] md:size-[348px]",
  ] as const;

  // Scale animation for each ring - staggered pulse, must match circle animations
  const RING_SCALE_ANIMATION: number[][] = [
    [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
    [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
    [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
  ];

  // Generate vault dots positioned on ring paths (orbital alignment)
  const vaultDots = React.useMemo<VaultDot[]>(() => {
    if (resolvedTokens.length === 0 || resolvedVaults.length === 0) return [];

    // Polar positions: (radiusIndex, angleDeg) - scattered across upper semicircle
    // Angles span 180°–360° for varied vertical & horizontal placement on each ring
    const ORBITAL_LAYOUT: Array<{ ringIndex: number; angleDeg: number }> = [
      { ringIndex: 0, angleDeg: 190 },
      { ringIndex: 0, angleDeg: 270 },
      { ringIndex: 1, angleDeg: 220 },
      { ringIndex: 1, angleDeg: 310 },
      { ringIndex: 2, angleDeg: 255 },
      { ringIndex: 2, angleDeg: 335 },
      { ringIndex: 3, angleDeg: 285 },
      { ringIndex: 3, angleDeg: 355 },
    ];
    const maxDots = Math.min(ORBITAL_LAYOUT.length, resolvedVaults.length);

    const dots: VaultDot[] = [];
    for (let i = 0; i < maxDots; i++) {
      const { ringIndex, angleDeg } = ORBITAL_LAYOUT[i];
      const radiusPx = RING_RADII[ringIndex][isDesktop ? 1 : 0];
      const vault = resolvedVaults[i];
      const token = resolvedTokens[i % resolvedTokens.length];

      dots.push({
        id: `dot-${i}`,
        position: { radiusPx, angleDeg, ringIndex },
        size: 20,
        token: {
          token: token.token,
          icon: token.icon,
          src: token.src,
          alt: token.alt,
        },
        vault: {
          name: vault.name,
          apy: vault.apy,
          tvl: vault.tvlUsd,
          curator: vault.curator?.name,
        },
      });
    }

    return dots;
  }, [resolvedTokens, resolvedVaults, isDesktop]);

  // Update tooltip position when active dot changes - use rAF to ensure ref is set
  // Position relative to container so tooltip scrolls with the animation card
  React.useEffect(() => {
    if (!activeDotId) {
      setTooltipPlacement(null);
      return;
    }
    const raf = requestAnimationFrame(() => {
      if (!activeDotRef.current || !containerRef.current) return;
      const dot = vaultDots.find((d) => d.id === activeDotId);
      if (!dot) return;
      const dotRect = activeDotRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const { angleDeg } = dot.position;
      const isLeftOfCenter = angleDeg > 90 && angleDeg < 270;
      const isUpperHalf = angleDeg > 180 && angleDeg < 360;
      const TOOLTIP_WIDTH = 180;
      const TOOLTIP_HEIGHT = 80;
      const GAP = 8;
      const left = isLeftOfCenter
        ? dotRect.right - containerRect.left + GAP
        : dotRect.left - containerRect.left - TOOLTIP_WIDTH - GAP;
      const top = isUpperHalf
        ? dotRect.top - containerRect.top
        : dotRect.bottom - containerRect.top - TOOLTIP_HEIGHT;
      setTooltipPlacement({ dot, left, top, isLeftOfCenter, isUpperHalf });
    });
    return () => cancelAnimationFrame(raf);
  }, [activeDotId, vaultDots]);

  const TOOLTIP_INTERVAL = 3000;
  const TOOLTIP_VISIBLE_TIME = 2000;

  // Show random tooltips at fixed interval
  React.useEffect(() => {
    if (vaultDots.length === 0) return;

    const showRandomTooltip = () => {
      const randomIndex = Math.floor(Math.random() * vaultDots.length);
      const randomDot = vaultDots[randomIndex];
      setActiveDotId(randomDot.id);

      if (hideTooltipTimeoutRef.current) {
        clearTimeout(hideTooltipTimeoutRef.current);
      }
      hideTooltipTimeoutRef.current = setTimeout(() => {
        setActiveDotId(null);
      }, TOOLTIP_VISIBLE_TIME);
    };

    showRandomTooltip();
    const intervalId = setInterval(showRandomTooltip, TOOLTIP_INTERVAL);

    return () => {
      clearInterval(intervalId);
      if (hideTooltipTimeoutRef.current) {
        clearTimeout(hideTooltipTimeoutRef.current);
        hideTooltipTimeoutRef.current = null;
      }
    };
  }, [vaultDots]);

  // Path start Y – lines start at token bottom (tokens at top 8% + ~10% height)
  const pathStartY = 15;
  const connectorPathData = [
    {
      id: "conn-1",
      path: `M 25 ${pathStartY} v 15 q 0 5 5 5 h 65 q 5 0 5 5 v 10`,
    },
    {
      id: "conn-2",
      path: `M 60 ${pathStartY} v 10 q 0 5 5 5 h 30 q 5 0 5 5 v 10`,
    },
    {
      id: "conn-3",
      path: `M 100 ${pathStartY} v 25 q 0 5 0 5 v 10`,
    },
    {
      id: "conn-4",
      path: `M 140 ${pathStartY} v 10 q 0 5 -5 5 h -30 q -5 0 -5 5 v 10`,
    },
    {
      id: "conn-5",
      path: `M 175 ${pathStartY} v 15 q 0 5 -5 5 h -65 q -5 0 -5 5 v 10`,
    },
  ];

  // Derive token positions from path start X (the "M x y" coordinate in each path)
  const viewBoxWidth = 200;
  const tokenPositions = connectorPathData.map((connector) => {
    const match = connector.path.match(/^M\s*([\d.]+)/);
    const pathStartX = match ? parseFloat(match[1]) : 100;
    return (pathStartX / viewBoxWidth) * 100;
  });

  const hasMobileTokens = resolvedTokens.length > 0;
  const mobileHeight = hasMobileTokens ? "h-[280px]" : "h-[250px]";

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full md:h-[350px]", mobileHeight, className)}
    >
      <motion.div
        className={cn(
          "relative flex w-full flex-col items-center md:h-[350px]",
          mobileHeight
        )}
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* SVG Paths  */}
        <svg
          className=" h-full w-full md:block"
          width="100%"
          height="100%"
          viewBox="0 0 200 100"
          preserveAspectRatio="xMidYMin meet"
        >
          <defs>
            {connectorPathData.map((connector, index) => (
              <mask id={`db-mask-${index + 1}`} key={connector.id}>
                <path
                  d={connector.path}
                  strokeWidth="0.9"
                  stroke="var(--app-flow-line-highlight)"
                />
              </mask>
            ))}

            {/* Blue Grad */}
            <radialGradient id="db-blue-grad" fx="0.5">
              <stop
                offset="0%"
                stopColor="var(--app-flow-line-highlight)"
                stopOpacity="0.75"
              />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <g
            stroke="var(--app-flow-line-base)"
            fill="none"
            strokeWidth="0.5"
            strokeDasharray="100 100"
            pathLength="100"
          >
            {connectorPathData.map((connector) => (
              <path key={connector.id} d={connector.path} />
            ))}
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="0"
              dur="1s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.25,0.1,0.5,1"
              keyTimes="0; 1"
            />
          </g>

          {/* Blue Lights - Animated gradient moving along paths */}
          {connectorPathData.map((connector, index) => (
            <g
              key={`gradient-${connector.id}`}
              mask={`url(#db-mask-${index + 1})`}
            >
              <circle
                className="database"
                cx="0"
                cy="0"
                r="12"
                fill="url(#db-blue-grad)"
              >
                <animateMotion
                  dur="2.5s"
                  repeatCount="indefinite"
                  begin="0s"
                  path={connector.path}
                />
              </circle>
            </g>
          ))}
        </svg>

        {/* Mobile shimmer bar - simple flow indicator */}
        {/* <div className="border-app-flow-panel-border bg-app-flow-panel-bg relative mt-16 h-12 w-full rounded-2xl border md:hidden">
          <div className="flex h-full items-center justify-center gap-3">
            <div className="h-1 w-20 animate-pulse rounded-full bg-linear-to-r from-transparent via-blue-400 to-transparent opacity-60" />
          </div>
        </div> */}

        {resolvedTokens.length > 0 && (
          <>
            {/* Mobile: Token buttons positioned to align with connector paths (same % as desktop) */}
            <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 md:hidden">
              {tokenPositions.map((leftPercent, index) => {
                const token = resolvedTokens[index];
                if (!token) return null;
                return (
                  <div
                    key={`mobile-${token.token}-${index}`}
                    className="pointer-events-auto absolute top-[8%] -translate-x-1/2"
                    style={{ left: `${leftPercent}%` }}
                  >
                    <TokenButton
                      token={token.token}
                      showToken={false}
                      icon={token.icon}
                      alt={token.alt}
                      className="h-7 cursor-default gap-1 rounded-sm px-2 text-[10px]"
                      iconClassName="size-3"
                    />
                  </div>
                );
              })}
            </div>

            {/* Desktop: Token buttons positioned along SVG paths */}
            <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
              {tokenPositions.map((leftPercent, index) => {
                const token = resolvedTokens[index];

                if (!token) return null;

                return (
                  <div
                    key={`${token.token}-${index}`}
                    className={cn(
                      "pointer-events-auto absolute top-[8%] -translate-x-1/2"
                    )}
                    style={{ left: `${leftPercent}%` }}
                  >
                    <TokenButton
                      token={token.token}
                      icon={token.icon}
                      alt={token.alt}
                      className="h-8 cursor-default gap-2 rounded-sm px-3 text-sm"
                      iconClassName="size-5"
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Main Box */}
        <div className="absolute -bottom-2 z-50 flex w-full flex-col items-center md:-bottom-7">
          {/* box title */}
          <div className="border-app-flow-panel-border bg-app-box-bg absolute -top-2 z-20 flex items-center justify-center rounded-lg border px-2 py-1 text-center md:-top-3 md:px-4 md:py-1.5">
            <span className="text-app-text-primary text-[9px] leading-tight font-medium md:ml-2 md:text-xs md:leading-normal">
              {title ? title : "You deposit into a Troves vault"}
            </span>
          </div>

          {/* box content */}
          <div className="border-app-flow-panel-border bg-app-flow-panel-bg relative z-10 flex h-[200px] w-full items-center justify-center rounded-xl border shadow-md md:h-[229px]">
            {/* Circles - clipped to rounded box */}
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <motion.div
                className={cn(
                  "border-app-flow-panel-border bg-app-flow-panel-bg absolute -bottom-[50px] left-1/2 z-40 size-[98px] -translate-x-1/2 rounded-full border md:-bottom-[75px] md:size-[147px]",
                  "[box-shadow:0px_3.02px_2.26px_-0.75px_#00000014,0px_3.02px_4.52px_0px_#FFFFFF08_inset]"
                )}
                animate={{
                  scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="border-app-flow-panel-border bg-app-flow-panel-bg absolute -bottom-[65px] left-1/2 z-30 size-[138px] -translate-x-1/2 rounded-full border opacity-85 md:-bottom-[100px] md:size-[207px] [box-shadow:0px_3.02px_2.26px_-0.75px_#00000014,0px_3.02px_4.52px_0px_#FFFFFF08_inset]"
                animate={{
                  scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="border-app-flow-panel-border bg-app-flow-panel-bg absolute -bottom-[80px] left-1/2 z-20 size-[180px] -translate-x-1/2 rounded-full border opacity-70 md:-bottom-[120px] md:size-[270px] [box-shadow:0px_3.02px_2.26px_-0.75px_#00000014,0px_3.02px_4.52px_0px_#FFFFFF08_inset]"
                animate={{
                  scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="border-app-flow-panel-border bg-app-flow-panel-bg absolute -bottom-[105px] left-1/2 z-10 size-[232px] -translate-x-1/2 rounded-full border opacity-55 md:-bottom-[160px] md:size-[348px] [box-shadow:0px_3.02px_2.26px_-0.75px_#00000014,0px_3.02px_4.52px_0px_#FFFFFF08_inset]"
                animate={{
                  scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Ring wrappers - same position/size as circles so dots share coordinate system */}
            {RING_WRAPPER_CLASSES.map((wrapperClass, ringIndex) => {
              const ringDots = vaultDots.filter(
                (d) => d.position.ringIndex === ringIndex
              );
              if (ringDots.length === 0) return null;

              return (
                <motion.div
                  key={`ring-${ringIndex}`}
                  className={cn(
                    wrapperClass,
                    "z-40 pointer-events-none [&>*]:pointer-events-auto"
                  )}
                  animate={{ scale: RING_SCALE_ANIMATION[ringIndex] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {ringDots.map((dot) => {
                    const { radiusPx, angleDeg } = dot.position;
                    const angleRad = (angleDeg * Math.PI) / 180;
                    const offsetX = radiusPx * Math.cos(angleRad);
                    const offsetY = radiusPx * Math.sin(angleRad);
                    const isActive = dot.id === activeDotId;
                    const baseSize = dot.size;
                    const activeSize = baseSize * 1.3;
                    const isLeftOfCenter = angleDeg > 90 && angleDeg < 270;
                    const isUpperHalf = angleDeg > 180 && angleDeg < 360;

                    return (
                      <div
                        key={dot.id}
                        ref={
                          isActive
                            ? (el) => {
                                activeDotRef.current = el;
                              }
                            : undefined
                        }
                        className="absolute left-1/2 top-1/2"
                        style={{
                          transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: isActive ? activeSize / baseSize : 1,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="relative"
                        >
                          <div
                            className={cn(
                              "bg-app-flow-panel-bg relative rounded-full border",
                              {
                                "border-app-flow-node-border": isActive,
                                "border-transparent": !isActive,
                              }
                            )}
                          >
                            <Image
                              src={dot.token.icon}
                              alt={dot.token.alt}
                              width={isActive ? activeSize : baseSize}
                              height={isActive ? activeSize : baseSize}
                              className="rounded-full"
                            />
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Troves Logo */}
      <div className="border-app-flow-panel-border bg-app-circle-bg absolute -bottom-8 left-1/2 z-9999 grid size-[50px] -translate-x-1/2 place-items-center rounded-full border-t text-xs font-semibold md:-bottom-14 md:size-[60px] lg:-bottom-18 lg:size-[90px]">
        <Image
          src="/logos/dapps/troves-gradient.svg"
          alt="troves"
          width={90}
          height={90}
          className="size-full"
        />
      </div>

      {/* Tooltip - rendered inside container so it scrolls with the animation card */}
      <AnimatePresence>
        {tooltipPlacement && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="border-app-flow-tooltip-border bg-app-flow-tooltip-bg absolute z-[99999] max-w-[180px] min-w-[140px] rounded-lg border px-3 py-2 text-left shadow-lg"
            style={{
              left: tooltipPlacement.left,
              top: tooltipPlacement.top,
            }}
          >
            <div className="space-y-1">
              <p className="text-app-text-primary truncate text-sm font-semibold">
                {tooltipPlacement.dot.vault.name}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-green-500">
                  {(tooltipPlacement.dot.vault.apy * 100).toFixed(2)}%
                </span>
                <span className="text-app-text-muted text-[10px]">APY</span>
              </div>
              {tooltipPlacement.dot.vault.tvl && (
                <p className="text-app-text-muted text-[10px]">
                  ${(tooltipPlacement.dot.vault.tvl / 1e6).toFixed(1)}M
                </p>
              )}
            </div>
            <div
              className={cn(
                "border-app-flow-tooltip-border bg-app-flow-tooltip-bg absolute top-1/2 hidden h-2 w-2 rotate-45 border",
                tooltipPlacement.isLeftOfCenter
                  ? "-left-0.5 border-r-0 border-b-0"
                  : "-right-0.5 border-t-0 border-l-0"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HowItWorksAnimation;
