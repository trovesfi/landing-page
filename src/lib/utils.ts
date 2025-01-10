import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHosturl() {
  return (typeof window != 'undefined' ? window.location.host : null) || "strkfarm.com";
}

console.log(`getHosturl()`, getHosturl());