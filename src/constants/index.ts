import { type Variants } from 'motion/react';

import { TokenInfo } from '@/types';

export const TOKENS: TokenInfo[] = [
  {
    token: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    name: 'ETH',
    decimals: 18,
    displayDecimals: 2,
    isERC4626: false,
  },
  {
    token: '0x3fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac',
    name: 'wBTC',
    decimals: 8,
    displayDecimals: 2,
    isERC4626: false,
  },
  {
    token: '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
    name: 'STRK',
    decimals: 18,
    displayDecimals: 2,
    isERC4626: false,
  },
  {
    token: '0x06d8fa671ef84f791b7f601fa79fea8f6ceb70b5fa84189e3159d532162efc21',
    name: 'zSTRK',
    decimals: 18,
    displayDecimals: 2,
    isERC4626: false,
  },
  {
    token: '0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8',
    name: 'USDC',
    decimals: 6,
    displayDecimals: 2,
    isERC4626: false,
  },
  {
    token: '0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8',
    name: 'USDT',
    decimals: 6,
    displayDecimals: 2,
    isERC4626: false,
  },
  {
    token: '0x047ad51726d891f972e74e4ad858a261b43869f7126ce7436ee0b2529a98f486',
    name: 'zUSDC',
    decimals: 6,
    displayDecimals: 2,
    isERC4626: false,
  },
];

export const fadeVariants: Variants = {
  fadeIn: {
    opacity: 1,
    transition: { duration: 2, delay: 1, ease: 'easeInOut' },
  },
  fadeOut: {
    opacity: 0,
    transition: { duration: 2, delay: 1, ease: 'easeInOut' },
  },
};
