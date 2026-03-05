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

export interface StrategyVaultType {
  type?: string;
  description?: string;
}

export interface Strategy {
  id: string;
  name: string;
  /** APY as number (0-1) or display string (e.g. "YOLO" for accumulation vaults) */
  apy: number | string;
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
  vaultType?: StrategyVaultType;
  isRetired?: boolean;
  isDeprecated?: boolean;
  realizedApy?: number;
  realizedApyMethodology?: string;
  tags?: string[];
  assets?: string[];
  protocols?: string[];
  auditUrl?: string;
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
