import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// get domain name without subdomain
export function getHosturl() {
  return (typeof window != undefined ? window.location.hostname.split('.').slice(-2).join('.') : null) || 'strkfarm.com';
}

console.log(`getHosturl()`, getHosturl());