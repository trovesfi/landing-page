/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/discord',
            destination: 'https://discord.gg/JA8UnuaZSw',
            permanent: true,
          },
          {
            source: '/tg',
            destination: 'https://t.me/%2BHQ_eHaXmF-1lZDc1',
            permanent: true,
          },
          {
            source: '/twitter',
            destination: 'https://twitter.com/strkfarm',
            permanent: true,
          },
          {
            source: '/audit',
            destination: 'https://drive.google.com/file/d/1qgxM4AtyUcrpD7V8fNcB4tFI7V7ajf-V/view?usp=sharing',
            permanent: true,
          },
          {
            source: '/r/:path*',
            destination: 'https://app.strkfarm.com/r/:path*',
            permanent: true,
          },
          {
            source: '/slinks',
            destination: 'https://app.strkfarm.com/slinks',
            permanent: true,
          },
          {
            source: '/strategy/:path*',
            destination: 'https://app.strkfarm.com/strategy/:path*',
            permanent: true,
          },
          {
            source: '/eth',
            destination: 'https://app.strkfarm.com/eth',
            permanent: true,
          },
          {
            source: '/strk',
            destination: 'https://app.strkfarm.com/strk',
            permanent: true,
          },
          {
            source: '/usdc',
            destination: 'https://app.strkfarm.com/usdc',
            permanent: true,
          },
          {
            source: '/xstrk',
            destination: 'https://app.strkfarm.com/strategy/xstrk_sensei',
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
