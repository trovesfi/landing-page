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

  // Generate vault dots positioned on circles (two per circle)
  const vaultDots = React.useMemo<VaultDot[]>(() => {
    if (resolvedTokens.length === 0 || resolvedVaults.length === 0) return [];

    const DOT_LAYOUT: Array<{ xPercent: number; yPercent: number }> = [
      { xPercent: 59.2, yPercent: 57.7 },
      { xPercent: 40.8, yPercent: 57.7 },
      { xPercent: 47.1, yPercent: 66.7 },
      { xPercent: 33.3, yPercent: 52.9 },
      { xPercent: 69, yPercent: 50.9 },
      { xPercent: 59.3, yPercent: 69.9 },
      { xPercent: 37.4, yPercent: 68 },
      { xPercent: 39, yPercent: 26.4 },
      { xPercent: 43.3, yPercent: 75.1 },
    ];
    const maxDots = Math.min(DOT_LAYOUT.length, resolvedVaults.length);

    const dots: VaultDot[] = [];
    for (let i = 0; i < maxDots; i++) {
      const layout = DOT_LAYOUT[i];
      const vault = resolvedVaults[i];
      const token = resolvedTokens[i % resolvedTokens.length];

      dots.push({
        id: `dot-${i}`,
        position: layout,
        size: 12,
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
  }, [resolvedTokens, resolvedVaults]);

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

  const connectorPathData = [
    {
      id: "conn-1",
      startX: 30,
      path: "M 25 10 v 15 q 0 5 5 5 h 65 q 5 0 5 5 v 10",
    },
    {
      id: "conn-2",
      startX: 63,
      path: "M 60 10 v 10 q 0 5 5 5 h 30 q 5 0 5 5 v 10",
    },
    {
      id: "conn-3",
      startX: 100,
      path: "M 100 10 v 25 q 0 5 0 5 v 10",
    },
    {
      id: "conn-4",
      startX: 135,
      path: "M 140 10 v 10 q 0 5 -5 5 h -30 q -5 0 -5 5 v 10",
    },
    {
      id: "conn-5",
      startX: 170,
      path: "M 175 10 v 15 q 0 5 -5 5 h -65 q -5 0 -5 5 v 10",
    },
  ];

  const tokenPositions = connectorPathData.map(
    (connector) => (connector.startX / 200) * 100,
  );

  return (
    <div className={cn("relative h-[250px] w-full md:h-[350px]", className)}>
      <motion.div
        className="relative flex h-[250px] w-full flex-col items-center md:h-[350px]"
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* SVG Paths  */}
        <svg
          className="hidden h-full w-full md:block"
          width="100%"
          height="100%"
          viewBox="0 0 200 100"
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
        <div className="border-app-flow-panel-border bg-app-flow-panel-bg relative mt-16 h-12 w-full rounded-2xl border md:hidden">
          <div className="flex h-full items-center justify-center gap-3">
            <div className="h-1 w-20 animate-pulse rounded-full bg-linear-to-r from-transparent via-blue-400 to-transparent opacity-60" />
          </div>
        </div>

        {resolvedTokens.length > 0 && (
          <>
            {/* Mobile: Token buttons in a row at the top */}
            <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 flex flex-wrap items-center justify-center gap-2 px-4 py-3 md:hidden">
              {resolvedTokens.map((token) => (
                <div key={token.token} className="pointer-events-auto">
                  <TokenButton
                    token={token.token}
                    icon={token.icon}
                    alt={token.alt}
                    className="h-7 cursor-default gap-1 rounded-sm px-2 text-[10px]"
                    iconClassName="size-3"
                  />
                </div>
              ))}
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
                      "pointer-events-auto absolute top-[8%] -translate-x-1/2",
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
        <div className="absolute -bottom-4 z-50 flex w-full flex-col items-center md:-bottom-7">
          {/* box title */}
          <div className="border-app-flow-panel-border bg-app-box-bg absolute -top-2 z-20 flex items-center justify-center rounded-lg border px-2 py-1 text-center md:-top-3 md:px-4 md:py-1.5">
            <span className="text-app-text-primary text-[9px] leading-tight font-medium md:ml-2 md:text-xs md:leading-normal">
              {title ? title : "Sending your assets to Troves vaults"}
            </span>
          </div>

          {/* box content */}
          <div className="border-app-flow-panel-border bg-app-flow-panel-bg relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-xl border shadow-md md:h-[229px]">
            {/* Circles */}
            <motion.div
              className="border-app-flow-panel-border bg-app-flow-panel-bg absolute -bottom-[50px] z-40 size-[98px] rounded-full border-t md:-bottom-[75px] md:size-[147px]"
              animate={{
                scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="border-app-flow-panel-border bg-app-flow-panel-bg absolute -bottom-[65px] z-30 size-[138px] rounded-full border-t opacity-85 md:-bottom-[100px] md:size-[207px]"
              animate={{
                scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="border-app-flow-panel-border bg-app-flow-panel-bg absolute -bottom-[80px] z-20 size-[180px] rounded-full border-t opacity-70 md:-bottom-[120px] md:size-[270px]"
              animate={{
                scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="border-app-flow-panel-border bg-app-flow-panel-bg absolute -bottom-[105px] z-10 size-[232px] rounded-full border-t opacity-55 md:-bottom-[160px] md:size-[348px]"
              animate={{
                scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {vaultDots.map((dot) => {
              const position = dot.position;
              const isActive = dot.id === activeDotId;
              const baseSize = dot.size;
              const activeSize = baseSize * 1.3;

              return (
                <div
                  key={dot.id}
                  className={cn("absolute z-40", {
                    "left-[50%]!": dot.token.icon.includes("eth-black"),
                  })}
                  style={{
                    left: `${position.xPercent}%`,
                    top: `${position.yPercent}%`,
                    transform: "translate(-50%, -50%)",
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
                        },
                      )}
                    >
                      <Image
                        src={dot.token.icon}
                        alt={dot.token.alt}
                        width={isActive ? activeSize : baseSize}
                        height={isActive ? activeSize : baseSize}
                        className="size-2 rounded-full md:size-3"
                      />
                    </div>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={cn(
                            "border-app-flow-tooltip-border bg-app-flow-tooltip-bg absolute z-9999 max-w-[120px] min-w-[100px] rounded-md border px-1.5 py-1 text-left shadow-lg",
                            position.xPercent < 50
                              ? "left-full ml-2"
                              : "right-full mr-2",
                            position.yPercent < 50 ? "top-0" : "bottom-0",
                          )}
                        >
                          <div className="space-y-0.5">
                            <p className="text-app-text-primary truncate text-[10px] font-semibold">
                              {dot.vault.name}
                            </p>
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] font-bold text-green-500">
                                {(dot.vault.apy * 100).toFixed(2)}%
                              </span>
                              <span className="text-app-text-muted text-[8px]">
                                APY
                              </span>
                            </div>
                            {dot.vault.tvl && (
                              <p className="text-app-text-muted text-[8px]">
                                ${(dot.vault.tvl / 1e6).toFixed(1)}M
                              </p>
                            )}
                          </div>

                          {/* Tooltip arrow */}
                          <div
                            className={cn(
                              "border-app-flow-tooltip-border bg-app-flow-tooltip-bg absolute top-1/2 hidden h-1.5 w-1.5 rotate-45 border",
                              position.xPercent < 50
                                ? "-left-0.5 border-r-0 border-b-0"
                                : "-right-0.5 border-t-0 border-l-0",
                            )}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Troves Logo */}
      <div className="border-app-flow-panel-border bg-app-circle-bg absolute -bottom-10 left-1/2 z-9999 grid size-[50px] -translate-x-1/2 place-items-center rounded-full border-t text-xs font-semibold md:-bottom-14 md:size-[60px] lg:-bottom-18 lg:size-[90px]">
        <Image
          src="/logos/dapps/troves-gradient.svg"
          alt="troves"
          width={90}
          height={90}
          className="size-full"
        />
      </div>
    </div>
  );
};

export default HowItWorksAnimation;
