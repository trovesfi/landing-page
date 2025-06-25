import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";


import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Troves | Yield Strategies on Starknet",
  description: "Troves (Previously STRKFarm) provides automated DeFi Strategies on Starknet. Maximize your crypto earnings with Starknet's DeFi Spring, leveraging cutting-edge decentralized finance opportunities. Start growing your investments today and experience optimized returns this year.",
  keywords: [
    'starknet yield aggregator', 'defi strategies on starknet', 'automated crypto yield',
    'bitcoin yield optimizer', 'usdc yield optimizer', 'eth yield optimizer', 'passive income defi', 'starknet liquidity management',
    'ekubo liquidity management', 'vesu liquidity management', 'starknet yield farming', 'yield farming starknet',
    'yearn alternative', 'beefy finance alternative', 'web3 investing starknet',
    'high yield crypto strategies', 'strk token utility', 'crypto yield tools', 'bitcoin yield', 
    'bitcoin defi strategies'
  ]
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
