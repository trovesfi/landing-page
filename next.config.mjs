/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          // {
          //   source: '/discord',
          //   destination: 'https://discord.gg/JA8UnuaZSw',
          //   permanent: true,
          // },
          {
            source: '/tg',
            destination: 'https://t.me/+iWxPIzKAaswyMWQ1',
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
            destination: 'https://drive.google.com/file/d/1qgxM4AtyUcrpD7V8fNcB4tFI7V7ajf-V/view?usp=sharing',
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
            source: '/eth',
            destination: 'https://app.troves.fi/eth',
            permanent: true,
          },
          {
            source: '/strk',
            destination: 'https://app.troves.fi/strk',
            permanent: true,
          },
          {
            source: '/usdc',
            destination: 'https://app.troves.fi/usdc',
            permanent: true,
          },
          {
            source: '/xstrk',
            destination: 'https://app.troves.fi/strategy/xstrk_sensei',
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
