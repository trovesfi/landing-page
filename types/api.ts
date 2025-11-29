export interface StatsResponse {
  tvl: number;
  lastUpdated: string;
}

export interface StrategyStatus {
  number: number;
  value: string;
}

export interface StrategyToken {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
}

export interface StrategyCurator {
  name?: string;
  logo?: string;
}

export interface StrategyApySplit {
  baseApy?: number;
  rewardsApy?: number;
}

export interface Strategy {
  id: string;
  name: string;
  apy: number;
  apyMethodology?: string;
  apySplit?: StrategyApySplit;
  tvlUsd?: number;
  status: StrategyStatus;
  logos?: string[];
  depositToken?: StrategyToken[];
  curator?: StrategyCurator;
  riskFactor?: number;
  isAudited?: boolean;
  leverage?: number;
}

export interface StrategiesResponse {
  status: boolean;
  strategies: Strategy[];
  lastUpdated?: string;
}

export type MinimalVault = Pick<
  Strategy,
  "name" | "apy" | "tvlUsd" | "curator"
>;
