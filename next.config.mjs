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
            source: '/audit',
            destination: 'https://drive.google.com/file/d/1qgxM4AtyUcrpD7V8fNcB4tFI7V7ajf-V/view?usp=sharing',
            permanent: true,
          },
          {
            source: '/r/:path*',
            destination: 'https://app.strkfarm.xyz/r/:path*',
            permanent: true,
          },
          {
            source: '/slinks',
            destination: 'https://app.strkfarm.xyz/slinks',
            permanent: true,
          },
          {
            source: '/strategy/:path*',
            destination: 'https://app.strkfarm.xyz/strategy/:path*',
            permanent: true,
          },
          {
            source: '/eth',
            destination: 'https://app.strkfarm.xyz/eth',
            permanent: true,
          },
          {
            source: '/strk',
            destination: 'https://app.strkfarm.xyz/strk',
            permanent: true,
          },
          {
            source: '/usdc',
            destination: 'https://app.strkfarm.xyz/usdc',
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
