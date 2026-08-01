export const CHART_FORMATTERS = {
  currency: (value: number) => {
    if (value >= 1_000_000) {
      return `KES ${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
      return `KES ${(value / 1_000).toFixed(0)}K`;
    }
    return `KES ${value}`;
  },
  
  number: (value: number) => {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }
    return value.toString();
  },
  
  percentage: (value: number) => `${value.toFixed(1)}%`,
  
  dateShort: (value: string) => {
    try {
      const d = new Date(value);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return value;
    }
  }
};
export default CHART_FORMATTERS;
