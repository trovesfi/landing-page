import { BASE_URLS } from "@/constants/links";
import type { StatsResponse, StrategiesResponse } from "@/types/api";

// re-export types for backward compatibility
export type {
  StatsResponse,
  StrategyStatus,
  StrategyToken,
  StrategyCurator,
  StrategyApySplit,
  Strategy,
  StrategiesResponse,
  MinimalVault,
} from "@/types";

const API_BASE_URL = BASE_URLS.APP;

async function handleResponse<T>(response: Response) {
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const json = (await response.json()) as T;

  return json;
}

export async function fetchStats(): Promise<StatsResponse> {
  const response = await fetch(`${API_BASE_URL}/api/stats`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<StatsResponse>(response);
}

export async function fetchStrategies(): Promise<StrategiesResponse> {
  const response = await fetch(`${API_BASE_URL}/api/strategies`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<StrategiesResponse>(response);
}
