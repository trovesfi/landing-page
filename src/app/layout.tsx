import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";


import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Troves | One Click Yield Strategies on Starknet",
  description: "Troves (formerly STRKFarm) offers one-click DeFi strategies on Starknet. Maximize returns, minimize risk — all automated. No active management needed.",
  keywords: [
    'starknet yield aggregator', 'defi strategies on starknet', 'automated crypto yield',
    'bitcoin yield optimizer', 'usdc yield optimizer', 'eth yield optimizer', 'passive income defi', 'starknet liquidity management',
    'ekubo liquidity management', 'vesu liquidity management', 'starknet yield farming', 'yield farming starknet',
    'yearn alternative', 'beefy finance alternative', 'web3 investing starknet',
    'high yield crypto strategies', 'strk token utility', 'crypto yield tools', 'bitcoin yield', 
    'bitcoin defi strategies', 'strkfarm troves', 'defi spring'
  ],
  openGraph: {
    title: 'Troves | One Click Yield Strategies on Starknet',
    description:
      'Troves (formerly STRKFarm) offers one-click DeFi strategies on Starknet. Maximize returns, minimize risk — all automated. No active management needed.',
    images: ['https://static-assets-8zct.onrender.com/troves/og-img-png.png'],
    url: 'https://troves.fi',
    type: 'website',
    siteName: 'Troves.fi'
  },
  twitter: {
    creator: '@trovesfi',
    title: 'Troves | One Click Yield Strategies on Starknet',
    description:
      'Troves (formerly STRKFarm) offers one-click DeFi strategies on Starknet. Maximize returns, minimize risk — all automated. No active management needed.',
    card: 'player',
    images: ['https://static-assets-8zct.onrender.com/troves/og-img-png.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <meta name="theme-color" content="black" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body className={inter.className} style={{background: 'black'}}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
