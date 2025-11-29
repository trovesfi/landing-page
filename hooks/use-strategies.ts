"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchStrategies } from "@/lib/api";

export const strategiesQueryKeys = {
  all: ["strategies"] as const,
};

export function useStrategies() {
  return useQuery({
    queryKey: strategiesQueryKeys.all,
    queryFn: fetchStrategies,
    staleTime: 5 * 60 * 1000,
  });
}

