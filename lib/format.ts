export function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumSignificantDigits: 3,
  }).format(value);
}

/**
 * Get numeric APY for sorting. Returns 0 for non-numeric values (e.g. "YOLO").
 */
export function getNumericApy(apy: number | string | undefined): number {
  if (apy === undefined || typeof apy === "string") return 0;
  return Number.isFinite(apy) ? apy : 0;
}

/**
 * Format APY for display. Handles both numeric (0-1) and string values (e.g. "YOLO").
 */
export function formatPercentage(value?: number | string | null) {
  if (value === undefined || value === null) return "—";
  if (typeof value === "string") return value;
  if (Number.isNaN(value)) return "—";

  return `${(value * 100).toFixed(2)}%`;
}

export function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "—";

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
