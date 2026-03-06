import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import StructuredData from "@/components/seo/structured-data";
import Providers from "@/components/providers";
import { BASE_URLS } from "@/constants/links";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = BASE_URLS.SITE;
const siteName = "Troves";
const siteDescription =
  "Troves is a Starknet yield platform with one-click, curated vault strategies for BTC, ETH, STRK and USDC. Non-custodial execution with transparent audit, risk, redemption and APY methodology information.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  referrer: "origin-when-cross-origin",
  title: {
    default: `${siteName} | Curated Yield Strategies | Starknet`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "starknet yield vaults",
    "curated defi strategies",
    "one click yield vaults",
    "non custodial yield",
    "defi transparency",
    "apy methodology",
    "risk disclosures",
    "vault redemption info",
    "re7 labs",
    "unwrap labs",
    "starknet defi",
    "btc yield strategies",
    "bitcoin yield strategies",
    "btc liquid staing",
    "btc looping vaults",
    "eth yield strategies",
    "ethereum yield strategies",
    "eth liquid staking",
    "eth looping vaults",
    "strk yield strategies",
    "strk liquid staking",
    "strk looping vaults",
    "usdc yield strategies",
    "usdc liquid staking",
    "usdc looping vaults",
    "best yield aggregator on starknet",
    "yield aggregator on starknet",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} | One-Click Curated Yield Vaults on Starknet`,
    description: siteDescription,
    images: [
      {
        url: `https://static-assets-8zct.onrender.com/troves/og-img-png.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} | The #1 Starknet Yield Aggregator`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | One-Click Curated Yield Vaults on Starknet`,
    description: siteDescription,
    images: [`https://static-assets-8zct.onrender.com/troves/og-img-png.png`],
    creator: "@trovesfi",
    site: "@trovesfi",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Finance",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  other: {
    "theme-color": "#6f60ff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-app-bg antialiased`}
      >
        <StructuredData />
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
