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
  async redirects() {
    return [
       {
        source: '/discord',
        destination: 'https://discord.gg/RSkDDyfC4G',
        permanent: true,
      },
      {
        source: '/tg',
        destination: 'https://t.me/%2BiWxPIzKAaswyMWQ1',
        permanent: true,
      },
      {
        source: '/twitter',
        destination: 'https://x.com/trovesfi',
        permanent: true,
      },
      {
        source: '/x',
        destination: 'https://x.com/trovesfi',
        permanent: true,
      },
      {
        source: '/audit',
        destination: 'https://docs.troves.fi/p/security',
        permanent: true,
      },
      {
        source: '/r/:path*',
        destination: 'https://app.troves.fi/r/:path*',
        permanent: true,
      },
      {
        source: '/strategy/:path*',
        destination: 'https://app.troves.fi/strategy/:path*',
        permanent: true,
      },
      {
        source: '/blog',
        destination: 'https://blog.troves.fi',
        permanent: true,
      },
      {
        source: '/docs',
        destination: 'https://docs.troves.fi',
        permanent: true,
      },
      // {
      //   source: '/eth',
      //   destination: 'https://app.troves.fi/eth',
      //   permanent: true,
      // },
      // {
      //   source: '/strk',
      //   destination: 'https://app.troves.fi/strk',
      //   permanent: true,
      // },
      // {
      //   source: '/usdc',
      //   destination: 'https://app.troves.fi/usdc',
      //   permanent: true,
      // },
      {
        source: '/xstrk',
        destination: 'https://app.troves.fi/strategy/hyper_xstrk',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
