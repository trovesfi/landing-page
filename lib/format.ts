export function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumSignificantDigits: 3,
  }).format(value);
}

export function formatPercentage(value?: number | null) {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";

  return `${(value * 100).toFixed(2)}%`;
}

export function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "—";

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
