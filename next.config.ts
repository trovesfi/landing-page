import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler:
    process.env.NODE_ENV == "development"
      ? {}
      : {
          removeConsole: {
            exclude: ["error"],
          },
        },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.troves.fi",
      },
      {
        protocol: "https",
        hostname: "assets.strkfarm.com",
      },
      {
        protocol: "https",
        hostname: "www.re7labs.xyz",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/strk-incentives/:path*",
        destination:
          "https://kx58j6x5me.execute-api.us-east-1.amazonaws.com/starknet/:path*",
      },
      {
        source: "/zklend/:path*",
        destination: "https://app.zklend.com/:path*",
      },
      {
        source: "/jediswap/:path*",
        destination: "https://api.jediswap.xyz/:path*",
      },
      {
        source: "/ekubo/:path*",
        destination: "https://mainnet-api.ekubo.org/:path*",
      },
      {
        source: "/haiko/:path*",
        destination: "https://app.haiko.xyz/api/v1/:path*",
      },
      {
        source: "/nostra/:path*",
        destination: "https://us-east-2.aws.data.mongodb-api.com/:path*",
      },
      {
        source: "/carmine/:path*",
        destination: "https://api.carmine.finance/:path*",
      },
      {
        source: "/myswap/:path*",
        destination: "https://myswap-cl-charts.s3.amazonaws.com/:path*",
      },
      {
        source: "/imagedelivery/:path*",
        destination: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/:path*",
      },
      {
        source: "/vesu/:path*",
        destination: "https://api.vesu.xyz/:path*",
      },
      {
        source: "/api/price/:path*",
        destination: "https://cache-server-t2me.onrender.com/api/price/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/usdc",
        destination: "https://app.troves.fi/strategy/usdc_sensei",
        permanent: true,
      },
      {
        source: "/strk",
        destination: "https://app.troves.fi/strategy/strk_sensei",
        permanent: true,
      },
      {
        source: "/eth",
        destination: "https://app.troves.fi/strategy/eth_sensei",
        permanent: true,
      },
      {
        source: "/tnc/v1",
        destination:
          "https://github.com/trovesfi/static-assets/blob/177389cad715d69245c1b125df87f90318ac2d7b/tnc.pdf",
        permanent: true,
      },
      {
        source: "/tnc/v2",
        destination:
          "https://github.com/trovesfi/static-assets/blob/a0b4ff3a3533df35570311d95be37f1ffcb7fb54/tnc_v2.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
