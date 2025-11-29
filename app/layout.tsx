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
  "Maximise your crypto returns with automated yield strategies. Troves optimises your assets across Starknet's top protocols while you sleep. Earn passive income with high-yield DeFi strategies.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - The Yield Powerhouse | DeFi Yield Strategies on Starknet`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "DeFi",
    "yield farming",
    "Starknet",
    "crypto yield",
    "automated yield strategies",
    "liquidity provision",
    "crypto investment",
    "passive income",
    "yield aggregator",
    "DeFi protocols",
    "Starknet DeFi",
    "crypto returns",
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
    title: `${siteName} - The Yield Powerhouse | DeFi Yield Strategies on Starknet`,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteName} - The Yield Powerhouse`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - The Yield Powerhouse`,
    description: siteDescription,
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@troves",
    site: "@troves",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Finance",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
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
