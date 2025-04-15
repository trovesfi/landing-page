import { type ClassValue, clsx } from "clsx";
import { num } from "starknet";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// get domain name without subdomain
export function getHosturl() {
  const FALLBACK = "strkfarm.com";
  try {
    return (typeof window != 'undefined' ? window.location.hostname.split('.').slice(-2).join('.') : null) || FALLBACK;
  } catch (e) {
    return FALLBACK;
  }
}

export function standardise(address: string | bigint) {
  let _a = address;
  if (!address) {
      _a = "0";
  }
  const a = num.getHexString(num.getDecimalString(_a.toString()));
  return a;
}

export function addressEq(a: string | bigint, b: string | bigint) {
  return standardise(a) === standardise(b);
}