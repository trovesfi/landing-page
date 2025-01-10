import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";


import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STRKFarm | Top Yield Aggregator on Starknet",
  description: "Discover top yield-earning pools and strategies on Starknet. Maximize your crypto earnings with Starknet's DeFi Spring, leveraging cutting-edge decentralized finance opportunities. Start growing your investments today and experience optimized returns this year.",
  keywords: ['starknet', 'yield', 'aggregator', 'yearn', 'beefy', 'finance', 'crypto', 'defi', 'web3', 'blockchain', 'nostra', 'zklend', 'ekubo', 'vesu', 'braavos', 'argent', 'strategy', 'strategies', 'high yield', 'starkware', 'strk token']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#101018" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
