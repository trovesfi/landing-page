import { type ClassValue, clsx } from "clsx";
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