"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchStats } from "@/lib/api";

export const statsQueryKeys = {
  all: ["stats"] as const,
};

export function useStats() {
  return useQuery({
    queryKey: statsQueryKeys.all,
    queryFn: fetchStats,
    staleTime: 5 * 60 * 1000,
  });
}
